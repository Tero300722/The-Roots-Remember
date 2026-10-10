/* Chronicle soundtracks: HTML audio, with independent volume and fade envelopes. */
(() => {
  'use strict';

  const START_DELAY = 700;
  const LOOP_GAP = 3000;
  const FADE_IN = 2;
  const FADE_OUT = 3;
  const EXIT_FADE = 700;
  const DEFAULT_VOLUME = 0.5;

  class ChronicleMusic {
    constructor(player, tracks) {
      this.player = player;
      this.tracks = tracks;
      this.active = null;
      this.context = null;
      this.voices = new Set();
      this.ticker = null;
      this.button = player.querySelector('[data-music-toggle]');
      this.title = player.querySelector('[data-music-title]');
      this.status = player.querySelector('[data-music-status]');
      this.volume = player.querySelector('[data-music-volume]');
      this.volumeText = player.querySelector('[data-music-volume-text]');
      this.time = player.querySelector('[data-music-time]');
      this.progress = player.querySelector('[data-music-progress]');
      this.button.addEventListener('click', () => this.toggle());
      this.volume.addEventListener('input', () => this.setVolume(Number(this.volume.value) / 100));
      window.addEventListener('pagehide', () => this.destroy());
      document.addEventListener('visibilitychange', () => this.render());
    }

    owns(session) {
      return this.active === session && !session.voice.disposed;
    }

    audioContext() {
      if (this.context) return this.context;
      if (window.location?.protocol === 'file:') return null;
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return null;
      try { this.context = new Context(); } catch (_) { return null; }
      return this.context;
    }

    makeVoice(track) {
      // A fresh element lets an outgoing song finish fading even on a quick re-entry.
      const audio = track.element.cloneNode(true);
      audio.removeAttribute('id');
      audio.removeAttribute('data-chronicle-audio');
      audio.hidden = true;
      audio.loop = false;
      audio.volume = 0;
      audio.preload = 'auto';
      document.body.appendChild(audio);
      const voice = { audio, disposed: false, audible: false, ready: false, attempt: 0,
        plan: null, volume: DEFAULT_VOLUME, source: null, envelope: null, level: null,
        context: null, exitTimer: null, rewinding: false };
      const context = this.audioContext();
      if (context) {
        try {
          voice.envelope = context.createGain();
          voice.level = context.createGain();
          voice.envelope.gain.value = 0;
          voice.level.gain.value = DEFAULT_VOLUME;
          voice.source = context.createMediaElementSource(audio);
          voice.source.connect(voice.envelope);
          voice.envelope.connect(voice.level);
          voice.level.connect(context.destination);
          voice.context = context;
          audio.volume = 1;
        } catch (_) {
          // If graph creation failed, retain a normal HTML-audio volume path.
          if (voice.source) {
            voice.source.disconnect();
            voice.source.connect(context.destination);
          }
          voice.envelope?.disconnect();
          voice.level?.disconnect();
          voice.envelope = voice.level = null;
          audio.volume = 0;
        }
      }
      this.voices.add(voice);
      if (!this.ticker) this.ticker = window.setInterval(() => this.tick(), 50);
      return voice;
    }

    clock(voice) {
      return voice.context ? voice.context.currentTime * 1000 : performance.now();
    }

    envelopeValue(voice) {
      const plan = voice.plan;
      if (!plan) return 0;
      const elapsed = Math.max(0, this.clock(voice) - plan.start);
      const points = plan.points;
      for (let i = 1; i < points.length; i++) {
        if (elapsed <= points[i][0]) {
          const [t0, v0] = points[i - 1];
          const [t1, v1] = points[i];
          return v0 + (v1 - v0) * (elapsed - t0) / (t1 - t0);
        }
      }
      return points[points.length - 1][1];
    }

    planEnvelope(voice, points) {
      voice.plan = { start: this.clock(voice), points };
      if (voice.envelope) {
        const now = voice.context.currentTime;
        const gain = voice.envelope.gain;
        gain.cancelScheduledValues(now);
        gain.setValueAtTime(points[0][1], now);
        for (const [milliseconds, value] of points.slice(1)) {
          gain.linearRampToValueAtTime(value, now + milliseconds / 1000);
        }
      } else {
        voice.audio.volume = Math.max(0, Math.min(1, points[0][1] * voice.volume));
      }
    }

    scheduleSongEnvelope(voice, resumeFade = 0) {
      const time = voice.audio.currentTime || 0;
      const duration = Number.isFinite(voice.audio.duration) ? voice.audio.duration : Infinity;
      const levelAt = t => Math.max(0, Math.min(1, t / FADE_IN, (duration - t) / FADE_OUT));
      const remaining = Math.max(0, duration - time);
      const boundaries = [FADE_IN - time, duration - FADE_OUT - time, remaining];
      if (resumeFade > 0) boundaries.push(Math.min(resumeFade, remaining));
      const seconds = [...new Set(boundaries.filter(t => Number.isFinite(t) && t > 0))].sort((a, b) => a - b);
      const points = [[0, resumeFade > 0 ? 0 : levelAt(time)]];
      for (const secondsFromNow of seconds) {
        const resumeLevel = resumeFade > 0 ? Math.min(1, secondsFromNow / resumeFade) : 1;
        points.push([secondsFromNow * 1000, levelAt(time + secondsFromNow) * resumeLevel]);
      }
      this.planEnvelope(voice, points);
      voice.anchorMedia = time;
      voice.anchorClock = this.clock(voice);
    }

    enter(key) {
      const track = this.tracks[key];
      if (!track) return;
      this.leave();
      const session = { key, track, voice: this.makeVoice(track), wanted: true,
        phase: 'starting', timer: null, delayElapsed: false, gapRemaining: LOOP_GAP };
      this.active = session;
      this.bindVoice(session);
      this.player.hidden = false;
      this.player.dataset.chronicle = key;
      document.body.classList.add('has-music-player');
      this.startTrack(session, START_DELAY);
    }

    bindVoice(session) {
      const voice = session.voice;
      const audio = voice.audio;
      audio.addEventListener('ended', () => {
        if (!this.owns(session) || !session.wanted || !voice.audible) return;
        voice.audible = false;
        this.planEnvelope(voice, [[0, 0]]);
        this.queueGap(session, LOOP_GAP);
      });
      audio.addEventListener('seeked', () => {
        if (!this.owns(session) || !session.wanted) return;
        if (voice.rewinding) this.activate(session);
        else if (voice.audible) this.scheduleSongEnvelope(voice, 0.12);
      });
      audio.addEventListener('playing', () => {
        if (!this.owns(session) || !session.wanted || !voice.audible) return;
        session.phase = 'playing';
        this.scheduleSongEnvelope(voice, 0.12);
        this.render();
      });
      audio.addEventListener('waiting', () => {
        if (!this.owns(session) || !session.wanted || !voice.audible) return;
        session.phase = 'buffering';
        this.planEnvelope(voice, [[0, 0]]);
        this.render();
      });
      audio.addEventListener('durationchange', () => {
        if (this.owns(session) && session.phase === 'playing') this.scheduleSongEnvelope(voice);
        this.render();
      });
      audio.addEventListener('timeupdate', () => {
        if (this.owns(session) && session.phase === 'playing') {
          const expected = voice.anchorMedia + (this.clock(voice) - voice.anchorClock) / 1000;
          if (Math.abs(audio.currentTime - expected) > 0.35) this.scheduleSongEnvelope(voice, 0.08);
        }
        this.render();
      });
      audio.addEventListener('pause', () => {
        if (this.owns(session) && session.wanted && voice.audible && !audio.ended) this.pause(session);
      });
      audio.addEventListener('error', () => {
        if (this.owns(session)) this.failed(session, new Error('audio-file'));
      });
    }

    requestPlay(session, onReady) {
      const voice = session.voice;
      const attempt = ++voice.attempt;
      let contextReady;
      let mediaReady;
      try {
        // Both calls run directly in the chronicle/play click, before any timer.
        contextReady = this.context && this.context.state !== 'running' ? this.context.resume() : undefined;
        mediaReady = voice.audio.play();
      } catch (error) {
        this.failed(session, error);
        return;
      }
      Promise.all([contextReady, mediaReady]).then(() => {
        if (!this.owns(session) || !session.wanted || attempt !== voice.attempt) return;
        voice.ready = true;
        onReady();
      }).catch(error => {
        if (this.owns(session) && session.wanted && attempt === voice.attempt) this.failed(session, error);
      });
    }

    startTrack(session, delay) {
      window.clearTimeout(session.timer);
      session.phase = 'starting';
      session.wanted = true;
      session.delayElapsed = delay === 0;
      session.voice.audible = false;
      session.voice.ready = false;
      session.voice.rewinding = false;
      this.planEnvelope(session.voice, [[0, 0]]);
      this.setVolume(DEFAULT_VOLUME);
      session.timer = window.setTimeout(() => {
        if (!this.owns(session) || !session.wanted) return;
        session.delayElapsed = true;
        this.beginWhenReady(session);
      }, delay);
      // Prime silently on the click; rewind only when the 0.7-second gate opens.
      this.requestPlay(session, () => this.beginWhenReady(session));
      this.render();
    }

    beginWhenReady(session) {
      if (!this.owns(session) || !session.wanted || session.phase !== 'starting' ||
          !session.delayElapsed || !session.voice.ready || session.voice.rewinding) return;
      const voice = session.voice;
      voice.rewinding = true;
      try { voice.audio.currentTime = 0; } catch (_) { voice.rewinding = false; this.failed(session, new Error('seek')); return; }
      if (!voice.audio.seeking) this.activate(session);
    }

    activate(session) {
      if (!this.owns(session) || !session.wanted || session.phase !== 'starting') return;
      const voice = session.voice;
      voice.rewinding = false;
      voice.audible = true;
      session.phase = 'playing';
      this.scheduleSongEnvelope(voice);
      this.render();
    }

    queueGap(session, delay) {
      window.clearTimeout(session.timer);
      session.phase = 'gap';
      session.gapDeadline = performance.now() + delay;
      session.timer = window.setTimeout(() => {
        if (this.owns(session) && session.wanted) this.startTrack(session, 0);
      }, delay);
      this.render();
    }

    pause(session) {
      session.resumePhase = session.phase === 'gap' ? 'gap' : ['playing', 'buffering', 'resuming'].includes(session.phase) ? 'playing' : 'starting';
      if (session.phase === 'gap') session.gapRemaining = Math.max(0, session.gapDeadline - performance.now());
      window.clearTimeout(session.timer);
      session.wanted = false;
      session.phase = 'paused';
      session.voice.attempt++;
      session.voice.audible = false;
      session.voice.rewinding = false;
      this.planEnvelope(session.voice, [[0, 0]]);
      session.voice.audio.pause();
      this.render();
    }

    toggle() {
      const session = this.active;
      if (!session) return;
      if (session.wanted) { this.pause(session); return; }
      session.wanted = true;
      if (session.phase === 'paused' && session.resumePhase === 'gap') {
        this.queueGap(session, session.gapRemaining);
      } else if (session.phase === 'paused' && session.resumePhase === 'playing') {
        session.phase = 'resuming';
        this.requestPlay(session, () => {
          session.phase = 'playing';
          session.voice.audible = true;
          this.scheduleSongEnvelope(session.voice, 0.25);
          this.render();
        });
      } else {
        if (session.voice.audio.error) session.voice.audio.load();
        this.startTrack(session, START_DELAY);
      }
      this.render();
    }

    setVolume(value) {
      if (!this.active) return;
      const voice = this.active.voice;
      voice.volume = Math.max(0, Math.min(1, Number.isFinite(value) ? value : DEFAULT_VOLUME));
      if (voice.level) {
        const gain = voice.level.gain;
        const now = voice.context.currentTime;
        const previous = gain.value;
        gain.cancelScheduledValues(now);
        gain.setValueAtTime(previous, now);
        gain.linearRampToValueAtTime(voice.volume, now + 0.05);
      } else {
        voice.audio.volume = voice.volume * this.envelopeValue(voice);
      }
      this.render();
    }

    failed(session, error) {
      if (!this.owns(session)) return;
      window.clearTimeout(session.timer);
      session.wanted = false;
      session.phase = error?.name === 'NotAllowedError' ? 'blocked' : 'error';
      session.voice.attempt++;
      session.voice.audible = false;
      this.planEnvelope(session.voice, [[0, 0]]);
      session.voice.audio.pause();
      this.render();
    }

    leave() {
      const session = this.active;
      this.active = null;
      this.player.hidden = true;
      document.body.classList.remove('has-music-player');
      if (!session) return;
      window.clearTimeout(session.timer);
      session.wanted = false;
      session.voice.attempt++;
      const voice = session.voice;
      const level = this.envelopeValue(voice);
      if (!voice.audio.paused && voice.audible && level > 0) {
        voice.audible = false;
        this.planEnvelope(voice, [[0, level], [EXIT_FADE, 0]]);
        voice.exitTimer = window.setTimeout(() => this.dispose(voice), EXIT_FADE);
      } else this.dispose(voice);
    }

    dispose(voice) {
      if (voice.disposed) return;
      voice.disposed = true;
      voice.attempt++;
      window.clearTimeout(voice.exitTimer);
      voice.audio.pause();
      voice.audio.removeAttribute('src');
      voice.audio.load();
      voice.audio.remove();
      voice.source?.disconnect();
      voice.envelope?.disconnect();
      voice.level?.disconnect();
      this.voices.delete(voice);
      if (!this.voices.size) {
        window.clearInterval(this.ticker);
        this.ticker = null;
      }
    }

    tick() {
      for (const voice of this.voices) {
        if (!voice.envelope && !voice.disposed) voice.audio.volume = Math.max(0, Math.min(1, voice.volume * this.envelopeValue(voice)));
      }
      this.render();
    }

    render() {
      const session = this.active;
      if (!session) return;
      const audio = session.voice.audio;
      const duration = Number.isFinite(audio.duration) ? audio.duration : Number(session.track.element.dataset.duration) || 0;
      const time = session.phase === 'starting' ? 0 : Math.min(audio.currentTime || 0, duration);
      const states = { starting: 'Starting…', playing: 'Now playing', buffering: 'Loading…',
        resuming: 'Resuming…', paused: 'Paused', blocked: 'Press play to start', error: 'Unable to play · try again' };
      if (this.title.textContent !== session.track.title) this.title.textContent = session.track.title;
      const status = session.phase === 'gap' ? `Repeats in ${Math.max(1, Math.ceil((session.gapDeadline - performance.now()) / 1000))}s` : states[session.phase];
      if (this.status.textContent !== status) this.status.textContent = status;
      this.player.dataset.state = session.wanted ? 'playing' : 'paused';
      this.button.setAttribute('aria-label', session.wanted ? 'Pause music' : 'Play music');
      this.button.setAttribute('title', session.wanted ? 'Pause music' : 'Play music');
      const percent = Math.round(session.voice.volume * 100);
      this.volume.value = percent;
      this.volume.setAttribute('aria-valuetext', `${percent} percent`);
      this.volume.style.setProperty('--volume-fill', `${percent}%`);
      this.volumeText.textContent = `${percent}%`;
      const stamp = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
      const timeText = `${stamp(time)} / ${stamp(duration)}`;
      if (this.time.textContent !== timeText) this.time.textContent = timeText;
      this.progress.max = duration || 1;
      this.progress.value = time;
    }

    destroy() {
      this.leave();
      for (const voice of [...this.voices]) this.dispose(voice);
    }
  }

  window.ChronicleMusic = ChronicleMusic;
})();
