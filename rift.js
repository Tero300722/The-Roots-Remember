/* v60: a staged ten-second boot, brief corrupted frames, and local audio. */
(() => {
  'use strict';
  const body = document.body, loader = document.getElementById('rift-loader');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const menu = document.getElementById('chronicle-selector');
  const logo = menu.querySelector('.library-brand img');
  const oldLogo = logo.getAttribute('src');
  const gateLogo = 'assets/rift/world-gate-logo.png';
  let loading = true, inScene = false, burstTimer = 0, burstSteps = [], bootFrame = 0;
  const controls = document.createElement('div'); controls.className = 'rift-controls';
  controls.setAttribute('role', 'group'); controls.setAttribute('aria-label', 'Sound controls');
  controls.innerHTML = '<button type="button" class="rift-sound">Enable sound</button><label>Volume <input type="range" min="0" max="100" value="5" aria-label="Music volume"></label>';
  body.appendChild(controls);
  const soundButton = controls.querySelector('button'), volumeInput = controls.querySelector('input');
  let volume = .05, muted = false;
  try { const saved = localStorage.getItem('chronicles-rift-volume'); if (saved !== null && Number.isFinite(+saved)) volume = Math.max(0, Math.min(1, +saved)); } catch (_) {}
  volumeInput.value = Math.round(volume * 100);
  const tracks = [0, 1].map(() => {
    const audio = document.createElement('audio'); audio.src = 'assets/rift/corrupted-archive.mp3';
    audio.preload = 'auto'; audio.dataset.riftMusic = ''; audio.volume = 0; body.appendChild(audio); return audio;
  });
  let current = 0, playing = false, starting = false, crossfade = null, fadingNext = false;
  let audioFrame = 0, gain = 0, lastAudioTime = 0, startedAt = 0;
  let voiceContext, voiceMaster, lastBlip = -1, voiceIndex = 0;
  const voices = new Map();
  function soundLabel() {
    soundButton.textContent = muted ? 'Sound off' : playing ? 'Sound on' : 'Enable sound';
    soundButton.setAttribute('aria-label', muted ? 'Enable music and dialogue sounds' : playing ? 'Mute music and dialogue sounds' : 'Enable music and dialogue sounds');
    soundButton.setAttribute('aria-pressed', String(playing && !muted));
  }
  function unlockVoice() {
    try {
      if (!voiceContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        voiceContext = new AudioContext(); voiceMaster = voiceContext.createGain();
        voiceMaster.gain.value = muted ? 0 : .7; voiceMaster.connect(voiceContext.destination);
      }
      if (voiceContext.state === 'suspended') voiceContext.resume().catch(() => {});
    } catch (_) { /* Dialogue remains fully usable if audio is unavailable. */ }
  }
  function stopVoice() {
    for (const [node, envelope] of voices) {
      try { const now = voiceContext.currentTime; envelope.gain.cancelScheduledValues(now); envelope.gain.setTargetAtTime(.0001, now, .003); node.stop(now + .015); } catch (_) {}
    }
    voices.clear(); lastBlip = -1;
  }
  function blip(char) {
    if (!inScene || muted || document.hidden || !/[a-z0-9]/i.test(char) || !voiceContext || voiceContext.state !== 'running') return;
    const now = voiceContext.currentTime;
    if (lastBlip >= 0 && now - lastBlip < .065) return;
    lastBlip = now;
    // Original warm, short two-tone syllables; no sampled character voice.
    const pitch = [185, 208, 196, 220, 202, 174, 196][voiceIndex++ % 7];
    const envelope = voiceContext.createGain(), filter = voiceContext.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 1250; filter.Q.value = .5;
    envelope.gain.setValueAtTime(0, now); envelope.gain.linearRampToValueAtTime(.11, now + .006);
    envelope.gain.exponentialRampToValueAtTime(.001, now + .058);
    envelope.connect(filter); filter.connect(voiceMaster);
    [1, 2.02].forEach((multiple, i) => {
      const oscillator = voiceContext.createOscillator(), level = voiceContext.createGain();
      oscillator.type = i ? 'sine' : 'triangle'; level.gain.value = i ? .2 : 1;
      oscillator.frequency.setValueAtTime(pitch * multiple, now);
      oscillator.frequency.exponentialRampToValueAtTime(pitch * multiple * .88, now + .055);
      oscillator.connect(level); level.connect(envelope); voices.set(oscillator, envelope);
      oscillator.onended = () => { voices.delete(oscillator); oscillator.disconnect(); level.disconnect(); if (!i) { envelope.disconnect(); filter.disconnect(); } };
      oscillator.start(now); oscillator.stop(now + .065);
    });
  }
  function animateAudio(now) {
    const dt = lastAudioTime ? Math.min((now - lastAudioTime) / 1000, .1) : 0; lastAudioTime = now;
    const target = muted ? 0 : volume * (inScene ? .5 : 1);
    const intro = Math.min(1, (now - startedAt) / 2400);
    gain += (target * intro - gain) * (1 - Math.exp(-dt * 7));
    if (crossfade) {
      const p = Math.min(1, (now - crossfade.start) / crossfade.duration);
      tracks[current].volume = gain * (1 - p); tracks[1 - current].volume = gain * p;
      if (p >= 1) { tracks[current].pause(); tracks[current].currentTime = 0; current = 1 - current; crossfade = null; }
    } else { tracks[current].volume = gain; tracks[1 - current].volume = 0; }
    if (!document.hidden && playing) audioFrame = requestAnimationFrame(animateAudio);
  }
  async function startMusic() {
    if (muted || document.hidden || starting || playing) return;
    starting = true;
    tracks[current].volume = .0001;
    try {
      await tracks[current].play();
      if (document.hidden || muted) { tracks[current].pause(); return; }
      playing = true; gain = 0; startedAt = performance.now(); lastAudioTime = 0;
      cancelAnimationFrame(audioFrame); audioFrame = requestAnimationFrame(animateAudio);
    } catch (_) { playing = false; }
    finally { starting = false; soundLabel(); }
  }
  async function beginLoop() {
    if (crossfade || fadingNext || !playing || document.hidden) return;
    fadingNext = true;
    const next = tracks[1 - current]; next.currentTime = 0; next.volume = 0;
    try {
      await next.play();
      if (!playing || document.hidden) { next.pause(); return; }
      const remaining = tracks[current].duration - tracks[current].currentTime;
      crossfade = { start: performance.now(), duration: Math.max(100, Math.min(2000, remaining * 1000 || 2000)) };
    } catch (_) { tracks[current].currentTime = 0; tracks[current].play().catch(() => {}); }
    finally { fadingNext = false; }
  }
  tracks.forEach((track, i) => {
    track.addEventListener('timeupdate', () => { if (i === current && track.duration - track.currentTime <= 2.2) beginLoop(); });
    track.addEventListener('ended', () => { if (i === current) beginLoop(); });
  });
  soundButton.addEventListener('click', () => {
    if (!playing && !muted) { unlockVoice(); startMusic(); return; }
    muted = !muted;
    if (voiceMaster) voiceMaster.gain.setTargetAtTime(muted ? 0 : .7, voiceContext.currentTime, .015);
    if (muted) stopVoice(); else { unlockVoice(); startMusic(); }
    soundLabel();
  });
  volumeInput.addEventListener('input', () => { volume = +volumeInput.value / 100; try { localStorage.setItem('chronicles-rift-volume', String(volume)); } catch (_) {} });
  function activateSound(event) {
    // Let the explicit sound button handle its own first click, avoiding a toggle race.
    if (event.target.closest?.('.rift-sound')) return;
    unlockVoice(); startMusic();
  }
  document.addEventListener('pointerdown', activateSound, true);
  document.addEventListener('keydown', activateSound, true);

  const interference = document.createElement('div'); interference.className = 'rift-interference'; interference.setAttribute('aria-hidden', 'true');
  interference.innerHTML = '<div class="rift-frame"></div><div class="rift-strip rift-strip-a"></div><div class="rift-strip rift-strip-b"></div><div class="rift-strip rift-strip-c"></div>';
  body.appendChild(interference);
  function clearBurst() {
    burstSteps.forEach(clearTimeout); burstSteps = []; body.classList.remove('rift-burst'); delete body.dataset.riftFrame; logo.src = oldLogo;
  }
  function scheduleBurst(delay = 7500 + Math.random() * 8500) {
    clearTimeout(burstTimer);
    if (!inScene && !loading && !document.hidden && !motion.matches) burstTimer = setTimeout(burst, delay);
  }
  function burst() {
    if (inScene || loading || document.hidden || motion.matches) return;
    clearBurst(); body.classList.add('rift-burst'); body.dataset.riftFrame = 'tear'; logo.src = gateLogo;
    // One sustained intrusion, with torn strips on entry and exit. No strobe loop.
    [[220, 'invade'], [980, 'echo'], [1320, 'scar']].forEach(([ms, frame]) => burstSteps.push(setTimeout(() => { body.dataset.riftFrame = frame; }, ms)));
    burstSteps.push(setTimeout(() => { clearBurst(); scheduleBurst(); }, 1620));
  }
  const protectedElements = [...body.children].filter(el => ![loader, controls].includes(el) && !['SCRIPT', 'AUDIO'].includes(el.tagName)).map(el => [el, el.inert]);
  protectedElements.forEach(([el]) => { el.inert = true; });
  loader.focus({ preventScroll: true });
  const bootStart = performance.now();
  const bootStates = [
    [0, 'clean', 'Opening the archive…', 'Main Manual Campaigns'],
    [1500, 'split', 'Restoring the archive…', 'Main Manual Campaigns'],
    [2400, 'gate', 'ERROR 0x03 — Unknown archive signature.', 'The World Gate'],
    [3500, 'fracture', 'ERROR 0x17 — Archive identity mismatch.', 'Main Manual Campaigns'],
    [4400, 'clean', 'Restoring the archive…', 'Main Manual Campaigns'],
    [5800, 'split', 'WARNING — Archive integrity compromised.', 'Main Manual Campaigns'],
    [6700, 'gate', 'This is not where you left it.', 'The World Gate'],
    [7900, 'fracture', 'ERROR 0x59 — Restoration failed.', 'The World Gate'],
    [9000, 'lost', 'RECOVERY FAILED — Opening remaining connection…', 'The World Gate']
  ];
  let lastState = -1;
  function boot(now) {
    const elapsed = now - bootStart;
    if (elapsed >= 10000) {
      loading = false; loader.hidden = true; body.classList.remove('rift-booting');
      protectedElements.forEach(([el, value]) => { el.inert = value; });
      document.getElementById('library-enter')?.focus({ preventScroll: true }); scheduleBurst(3500); return;
    }
    const index = bootStates.findLastIndex(state => elapsed >= state[0]);
    if (index !== lastState) {
      lastState = index; const [, phase, status, title] = bootStates[index];
      loader.dataset.phase = motion.matches ? (index >= 4 ? 'gate' : 'clean') : phase;
      loader.querySelector('.rift-boot-status').textContent = status;
      loader.querySelector('.rift-boot-title').textContent = title;
    }
    const checkpoints = [[0,0],[450,3],[1000,11],[1800,11],[2400,29],[3100,34],[3900,34],[4500,52],[5400,58],[6200,73],[7100,73],[7900,86],[8800,91],[9500,99],[9800,100]];
    const percent = checkpoints.findLast(point => elapsed >= point[0])[1];
    loader.querySelector('.rift-progress span').style.width = `${percent}%`;
    loader.querySelector('.rift-boot-count').textContent = `${percent}%`;
    bootFrame = requestAnimationFrame(boot);
  }
  document.addEventListener('keydown', event => {
    if (!loading) return;
    if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); }
    if (event.key === 'Tab') {
      const items = [soundButton, volumeInput], i = items.indexOf(document.activeElement);
      event.preventDefault(); items[event.shiftKey ? (i <= 0 ? 1 : 0) : (i === 0 ? 1 : 0)].focus({ preventScroll: true });
    }
  }, true);
  document.addEventListener('visibilitychange', () => {
    clearTimeout(burstTimer); clearBurst(); stopVoice();
    if (document.hidden) {
      tracks.forEach(audio => { audio.pause(); audio.volume = 0; }); playing = false; crossfade = null; cancelAnimationFrame(audioFrame);
      if (voiceContext?.state === 'running') voiceContext.suspend().catch(() => {});
    } else { startMusic(); if (voiceContext) unlockVoice(); scheduleBurst(); }
  });
  motion.addEventListener('change', () => { clearTimeout(burstTimer); clearBurst(); scheduleBurst(); });
  window.ChroniclesRift = Object.freeze({
    get loading() { return loading; },
    blip, stopVoice,
    enter(scene) { inScene = true; clearTimeout(burstTimer); clearBurst(); scene.appendChild(controls); unlockVoice(); startMusic(); },
    leave() { inScene = false; stopVoice(); body.appendChild(controls); scheduleBurst(); }
  });
  startMusic(); bootFrame = requestAnimationFrame(boot);
})();
