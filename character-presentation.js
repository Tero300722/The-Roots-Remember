/* Shared card and profile structure, matching Roots Remember and Grimwood Manor. */
(() => {
  'use strict';
  let holyAudioContext = null;
  let stopHolySound = null;
  window.addEventListener('pagehide', () => {
    stopHolySound?.();
    holyAudioContext?.close().catch(() => {});
    holyAudioContext = null;
  });
  function prepareHolySurge() {
    const silent = () => () => {};
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return silent;
    let unlocked;
    try {
      if (!holyAudioContext || holyAudioContext.state === 'closed') holyAudioContext = new Context();
      // Start unlocking during the click; a fresh context may need a moment to resume.
      unlocked = holyAudioContext.state === 'suspended' ? holyAudioContext.resume() : Promise.resolve();
      unlocked.catch(() => {});
    } catch { return silent; }
    const context = holyAudioContext;
    return () => {
      const volume = document.querySelector('[data-music-volume]');
      const level = () => Math.min(.2, Math.sqrt(Math.max(0, Math.min(100, Number(volume?.value ?? 5))) / 100) * .45);
      const voices = [];
      let master, stopped = false;
      const adjustVolume = () => master.gain.setTargetAtTime(level(), context.currentTime, .02);
      const stop = () => {
        if (stopped) return;
        stopped = true;
        if (stopHolySound === stop) stopHolySound = null;
        volume?.removeEventListener('input', adjustVolume);
        voices.forEach(({ source, nodes }) => {
          source.onended = null;
          try { source.stop(); } catch {}
          source.disconnect();nodes.forEach(node => node.disconnect());
        });
        master?.disconnect();
      };
      const startSound = () => {
        if (stopped || context.state !== 'running' || document.hidden || !level()) { stop();return; }
        try {
          master = context.createGain();
          master.gain.value = level();
          master.connect(context.destination);
          volume?.addEventListener('input', adjustVolume);
          const now = context.currentTime + .015;
          const swell = (gain, strength) => {
            gain.setValueAtTime(.0001, now);
            gain.exponentialRampToValueAtTime(strength * .15, now + .12);
            gain.exponentialRampToValueAtTime(strength, now + 1.8);
            gain.exponentialRampToValueAtTime(strength * .65, now + 2.1);
            gain.exponentialRampToValueAtTime(.0001, now + 3.12);
          };
          // A warm rising chord swells with the expanding light, then dissolves with it.
          [[146.83, 293.66, .2], [220, 440, .12], [293.66, 587.33, .08]].forEach(([frequency, peak, strength]) => {
            const oscillator = context.createOscillator();
            const envelope = context.createGain();
            voices.push({ source: oscillator, nodes: [envelope] });
            oscillator.type = 'sine';
            oscillator.frequency.value = frequency;
            oscillator.frequency.setValueAtTime(frequency, now);
            oscillator.frequency.exponentialRampToValueAtTime(peak, now + 1.8);
            swell(envelope.gain, strength);
            oscillator.connect(envelope);envelope.connect(master);
            oscillator.start(now);oscillator.stop(now + 3.2);
          });
          const wind = context.createBufferSource();
          const filter = context.createBiquadFilter();
          const envelope = context.createGain();
          voices.push({ source: wind, nodes: [filter, envelope] });
          const noise = context.createBuffer(1, Math.ceil(context.sampleRate * 3.2), context.sampleRate);
          const samples = noise.getChannelData(0);
          for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
          wind.buffer = noise;
          filter.type = 'bandpass';filter.Q.value = .7;
          filter.frequency.setValueAtTime(400, now);
          filter.frequency.exponentialRampToValueAtTime(2600, now + 1.8);
          filter.frequency.exponentialRampToValueAtTime(900, now + 3.12);
          swell(envelope.gain, .24);
          wind.connect(filter);filter.connect(envelope);envelope.connect(master);
          wind.onended = stop;
          wind.start(now);wind.stop(now + 3.2);
        } catch { stop(); }
      };
      stopHolySound?.();
      stopHolySound = stop;
      if (context.state === 'running') startSound();
      else unlocked.then(startSound).catch(stop);
      return stop;
    };
  }
  function node(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }
  function image(character, variant = false, card = false) {
    const img = node('img', variant ? 'form-image form-image-godly' : 'form-image form-image-original');
    img.alt = variant ? '' : character.name;
    if (variant) img.setAttribute('aria-hidden', 'true');
    img.decoding = 'async';
    if (card) img.loading = 'lazy';
    img.width = variant ? character.variantWidth || character.width : character.width;
    img.height = variant ? character.variantHeight || character.height : character.height;
    img.src = card ? (variant ? character.variantCardImage || character.variantImage : character.cardImage || character.fullImage)
      : (variant ? character.variantImage : character.fullImage);
    return img;
  }
  function card(character, open) {
    const el = node('div', 'character-card chronicle-character-card');
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Open ${character.name}, played by ${character.player}`);
    el.dataset.character = character.slug;
    el.style.setProperty('--accent-rgb', character.accent);
    el.appendChild(image(character, false, true));
    if (character.variantImage) {
      const variant = image(character, true, true);
      const ready = () => el.classList.add('variant-ready');
      variant.addEventListener('load', ready);
      variant.addEventListener('error', () => el.classList.remove('variant-ready'));
      el.appendChild(variant);
      if (variant.complete && variant.naturalWidth) ready();
    }
    const copy = node('div', 'character-info');
    copy.append(node('h3', '', character.name), node('div', 'character-player', `Played by ${character.player}`));
    const tags = node('div', 'character-tags');
    [character.className, character.subclass].filter(Boolean).forEach(value => tags.appendChild(node('span', 'tag', value)));
    if (tags.children.length) copy.appendChild(tags);
    el.appendChild(copy);
    el.addEventListener('click', () => open(character));
    el.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(character); }
    });
    return el;
  }
  function profile(character, eyebrow, { holyTransformation = false } = {}) {
    const el = node('article', 'character-detail-wrap chronicle-character-profile');
    if (holyTransformation) el.classList.add('holy-form-profile');
    el.style.setProperty('--char-rgb', character.accent);
    el.style.setProperty('--detail-bg', `url("${character.fullImage}")`);
    const bg = node('div', 'character-detail-bg');
    const rune = node('div', 'character-detail-rune');
    bg.setAttribute('aria-hidden', 'true');rune.setAttribute('aria-hidden', 'true');
    const grid = node('div', 'character-detail-grid');
    const stage = node('div', 'character-portrait-stage');
    const copy = node('div', 'character-detail-copy');
    const title = node('h2', '', character.name);
    copy.append(node('p', 'eyebrow', eyebrow), title, node('div', 'player-credit', `Played by ${character.player}`));
    const base = image(character);
    if (character.variantImage) {
      const frame = node('button', 'form-portrait');frame.type = 'button';
      const variant = image(character, true);
      frame.append(base, variant);
      stage.appendChild(frame);
      const controls = node('div', 'form-controls');
      const toggle = node('button', 'btn btn-primary form-toggle');toggle.type = 'button';
      const status = node('p', 'form-status', 'Loading godly form…');
      status.setAttribute('role', 'status');status.setAttribute('aria-live', 'polite');
      const help = node('p', 'form-help', 'The form switch will be available when the portrait finishes loading.');
      controls.append(toggle, status, help);copy.appendChild(controls);
      let godly = false, ready = false, failed = false, transforming = false;
      function update() {
        el.classList.toggle('show-godly', godly);
        if (holyTransformation) title.textContent = godly
          ? character.variantName || `${character.name} \u2014 ${character.variantLabel || 'Godly Form'}`
          : character.name;
        const action = godly ? 'Switch to the Original Form' : 'Switch to the Godly Form';
        toggle.textContent = action;
        [toggle, frame].forEach(button => {
          button.disabled = !ready || transforming;
          button.setAttribute('aria-label', `${action} of ${character.name}`);
          button.setAttribute('aria-pressed', String(godly));
        });
        frame.setAttribute('aria-busy', String(transforming || (!ready && !failed)));
        base.alt = `${character.name} — ${godly ? 'godly' : 'original'} form`;
        if (ready) {
          status.textContent = transforming ? 'Transforming into Godly Form\u2026' : godly ? 'Godly Form' : 'Original Form';
          help.textContent = 'Click the portrait or use the button to switch forms.';
        }
      }
      async function switchForm() {
        if (!ready || transforming) return;
        const playSurge = holyTransformation && !godly ? prepareHolySurge() : null;
        if (!holyTransformation || godly || window.matchMedia('(prefers-reduced-motion: reduce)').matches
          || typeof el.animate !== 'function') {
          godly = !godly;update();playSurge?.();return;
        }
        const light = node('div', 'form-holy-light');
        light.setAttribute('aria-hidden', 'true');
        const rays = node('div', 'form-holy-rays');
        const bloom = node('div', 'form-holy-bloom');
        const halo = node('div', 'form-holy-halo');
        const motes = node('div', 'form-holy-motes');
        light.append(rays, bloom, halo, motes);
        function sizeLight() {
          // The opaque core reaches every corner, including tall mobile cards.
          light.style.setProperty('--holy-diameter', `${Math.hypot(el.clientWidth, el.clientHeight) * 1.5}px`);
        }
        sizeLight();
        transforming = true;
        el.classList.add('is-transforming');
        el.setAttribute('aria-busy', 'true');
        el.appendChild(light);
        update();
        let expansion, shake, stopSurge;
        try {
          stopSurge = playSurge?.();
          rays.animate([
            { opacity: 0, transform: 'scale(.92)' },
            { opacity: .65, offset: .35 },
            { opacity: 0, transform: 'scale(1.08)' }
          ], { duration: 1800, easing: 'ease-in-out', fill: 'forwards' });
          halo.animate([
            { transform: 'translate(-50%, -50%) scale(.025)', opacity: 0 },
            { opacity: .8, offset: .2 },
            { opacity: .4, offset: .65 },
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 }
          ], { duration: 1800, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'forwards' });
          motes.animate([
            { opacity: 0, transform: 'translateY(22px)' },
            { opacity: .8, offset: .25 },
            { opacity: .5, offset: .7 },
            { opacity: 0, transform: 'translateY(-35px)' }
          ], { duration: 3200, easing: 'ease-out', fill: 'forwards' });
          expansion = bloom.animate([
            { transform: 'translate(-50%, -50%) scale(.015)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(.08)', opacity: 1, offset: .2 },
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 }
          ], { duration: 1800, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'forwards' });
          await expansion.finished;
          if (!ready || !el.isConnected || !el.getClientRects().length) return;
          // Change the portrait and name only once the light covers the entire card.
          godly = true;update();
          sizeLight();
          shake = el.animate([
            { transform: 'none' },
            { transform: 'translate(-3px, 1px) rotate(-.12deg)' },
            { transform: 'translate(3px, -1px) rotate(.12deg)' },
            { transform: 'translate(-2px, 0) rotate(-.08deg)' },
            { transform: 'translate(2px, 1px) rotate(.08deg)' },
            { transform: 'translate(-1px, 0)' },
            { transform: 'none' }
          ], { duration: 420, easing: 'ease-out' });
          shake.id = 'god-form-shake';
          await light.animate([{ opacity: 1 }, { opacity: .95, offset: .2 }, { opacity: 0 }], {
            duration: 1400, easing: 'ease-in-out', fill: 'forwards'
          }).finished;
        } catch {
          // A cancelled or unsupported effect must still leave the form switch usable.
          if (ready) godly = true;
        } finally {
          shake?.cancel();
          stopSurge?.();
          light.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
          light.remove();
          transforming = false;
          el.classList.remove('is-transforming');
          el.removeAttribute('aria-busy');
          update();
        }
      }
      function loaded() { ready = true; failed = false; update(); }
      function error() {
        ready = false;failed = true;godly = false;update();
        status.textContent = 'Godly form could not load. Original form shown.';
        help.textContent = 'Reopen this character to try again.';
      }
      variant.addEventListener('load', loaded);variant.addEventListener('error', error);
      [toggle, frame].forEach(button => button.addEventListener('click', switchForm));
      update();
      if (variant.complete) { if (variant.naturalWidth) loaded(); else error(); }
    } else stage.appendChild(base);
    const facts = node('div', 'detail-stack');
    [['Class', character.className], ['Subclass', character.subclass]].forEach(([label, value]) => {
      if (!value) return;
      const row = node('div', 'detail-row');row.append(node('span', '', label), node('strong', '', value));facts.appendChild(row);
    });
    if (facts.children.length) copy.appendChild(facts);
    if (character.description?.length) {
      const bio = node('div', 'character-profile-description');
      bio.appendChild(node('span', '', 'Character Description'));
      character.description.forEach(text => bio.appendChild(node('p', '', text)));
      copy.appendChild(bio);
    }
    grid.append(stage, copy);el.append(bg, rune, grid);return el;
  }
  window.CharacterPresentation = { card, profile };
})();
