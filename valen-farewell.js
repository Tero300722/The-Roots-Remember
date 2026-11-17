/* Local, replayable farewell. No campaign navigation, network calls, or saved state. */
(() => {
  'use strict';
  const dialogue = [
    "Oh, dear... That wasn't supposed to happen, was it? Or... perhaps it was? Hehehe...",
    "Now, now... I know what you're thinking. Why should you trust a word I say? After all, I've betrayed your beloved characters... who are *very much real*, I assure you. And alas, I fear your trust in me is lost forever. How tragic...",
    "Unfortunately, dear friends, I come bearing dreadful tidings. This little realm you call a *website* is no more. Shocking, I know! But do try to contain yourselves. There's no need for such theatrics... Yes, Gianluca, I'm looking directly at you.",
    "Alas, my lips are sealed. There are secrets even I dare not whisper... not yet, anyway. But tell me, dear friends... if this little realm is fading into oblivion, surely that means its creator has something far grander in store... does it not?",
    "And with that, I bid you farewell... for now. Remember, dear friends... patience. A little patience is all I ask. After all... the greatest tales are never told in haste. Hehehe..."
  ];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const scene = document.createElement('section');
  scene.className = 'valen-scene'; scene.hidden = true;
  scene.setAttribute('role', 'dialog'); scene.setAttribute('aria-modal', 'true');
  scene.setAttribute('aria-labelledby', 'valen-name'); scene.tabIndex = -1;
  scene.innerHTML = `
    <div class="valen-backdrop" aria-hidden="true"></div>
    <div class="valen-atmosphere" aria-hidden="true"></div>
    <canvas class="valen-canvas" aria-hidden="true"></canvas>
    <div class="valen-vignette" aria-hidden="true"></div>
    <p class="valen-location">The Infinite Corridor</p>
    <button type="button" class="valen-exit" aria-label="Return to the chronicle menu">Return to menu <span aria-hidden="true">×</span></button>
    <figure class="valen-figure"><img class="valen-portrait" src="assets/valen-farewell/valen.png" alt="Valen, smiling with his travelling pack and green cloak" width="1024" height="1536" decoding="async"></figure>
    <div class="valen-dialogue">
      <h2 class="valen-name" id="valen-name">Valen</h2>
      <p class="valen-text" aria-hidden="true"></p>
      <p class="valen-sr" aria-live="polite" aria-atomic="true"></p>
      <div class="valen-footer"><span class="valen-counter" aria-label="Dialogue progress"></span>
        <button type="button" class="valen-reveal">Show full dialogue</button>
        <button type="button" class="valen-next" hidden>Next <span aria-hidden="true">▸</span></button>
      </div>
    </div>`;
  document.body.appendChild(scene);
  const text = scene.querySelector('.valen-text');
  const announcement = scene.querySelector('.valen-sr');
  const next = scene.querySelector('.valen-next');
  const reveal = scene.querySelector('.valen-reveal');
  const canvas = scene.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  let line = 0, letters = [], shown = 0, timer = null, frame = null, start = 0;
  let active = false, previousFocus, siblings = [], scrollPosition;

  // Allocate at native device resolution, up to 3840×2160. Effects stay sharp on 4K screens.
  function resize() {
    const w = scene.clientWidth, h = scene.clientHeight;
    const scale = Math.min(devicePixelRatio || 1, 3840 / Math.max(w, 1), 2160 / Math.max(h, 1));
    canvas.width = Math.round(w * scale); canvas.height = Math.round(h * scale);
  }
  function draw(now) {
    if (!active || !ctx) return;
    const w = canvas.width, h = canvas.height, t = (now - start) / 1000;
    ctx.clearRect(0, 0, w, h);
    const cx = w * .51, cy = h * .44, radius = Math.hypot(w, h) * .65;
    // Expanding, slowly twisting arcs create depth without flashing or a video download.
    for (let i = 0; i < 18; i++) {
      const depth = ((i / 18 + t * .025) % 1);
      const r = (0.025 + depth * depth) * radius;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * .045 + i * .61);
      ctx.strokeStyle = i % 2 ? `rgba(103,240,229,${Math.sin(depth * Math.PI) * .16})` : `rgba(214,129,243,${Math.sin(depth * Math.PI) * .13})`;
      ctx.lineWidth = Math.max(1, w / 1900) * (1 + depth * 2);
      ctx.beginPath(); ctx.ellipse(0, 0, r, r * .74, 0, .2, Math.PI * 1.35); ctx.stroke();
      ctx.restore();
    }
    for (let i = 0; i < 65; i++) {
      const d = ((i * .6180339 + t * (.018 + (i % 4) * .003)) % 1);
      const angle = i * 2.39996 + t * .012, r = d * d * radius;
      const x = cx + Math.cos(angle) * r, y = cy + Math.sin(angle) * r * .8;
      ctx.fillStyle = `rgba(180,246,237,${Math.sin(d * Math.PI) * .5})`;
      ctx.beginPath(); ctx.arc(x, y, Math.max(.7, w / 1900) * (.35 + d), 0, Math.PI * 2); ctx.fill();
    }
    if (!motion.matches && !document.hidden) frame = requestAnimationFrame(draw);
  }
  function startEffects() {
    cancelAnimationFrame(frame); resize(); start = performance.now(); draw(start);
  }
  function finish() {
    clearTimeout(timer);
    window.ChroniclesRift?.stopVoice();
    letters.forEach(letter => letter.classList.add('is-visible')); shown = letters.length;
    const hadFocus = document.activeElement === reveal;
    reveal.hidden = true; next.hidden = false;
    if (hadFocus) next.focus({ preventScroll: true });
  }
  function tick() {
    if (!active || document.hidden) return;
    if (shown >= letters.length) { finish(); return; }
    const letter = letters[shown++]; letter.classList.add('is-visible');
    if (shown === letters.length) { finish(); return; }
    const char = letter.textContent;
    window.ChroniclesRift?.blip(char);
    const delay = /[.!?]/.test(char) ? 125 : /[,;:]/.test(char) ? 85 : char === ' ' ? 15 : 24;
    timer = setTimeout(tick, delay);
  }
  function showLine() {
    clearTimeout(timer); text.replaceChildren(); shown = 0; letters = [];
    next.hidden = true; reveal.hidden = false;
    next.innerHTML = line === dialogue.length - 1 ? 'Farewell <span aria-hidden="true">▸</span>' : 'Next <span aria-hidden="true">▸</span>';
    scene.querySelector('.valen-counter').textContent = `0${line + 1} / 05`;
    // Construct text nodes, not HTML; asterisks mark the two requested italic phrases.
    dialogue[line].split('*').forEach((part, index) => {
      const parent = index % 2 ? document.createElement('em') : document.createElement('span');
      for (const char of part) {
        const span = document.createElement('span'); span.className = 'valen-letter'; span.textContent = char;
        parent.appendChild(span); letters.push(span);
      }
      text.appendChild(parent);
    });
    announcement.textContent = dialogue[line].replace(/\*/g, '');
    if (motion.matches) finish(); else tick();
  }
  function open() {
    if (active || window.ChroniclesRift?.loading) return;
    window.ChroniclesRift?.enter(scene);
    active = true; line = 0; previousFocus = document.activeElement;
    scrollPosition = { left: scrollX, top: scrollY };
    // Keep the menu behind the scene, with its preview and scroll position untouched.
    siblings = [...document.body.children].filter(el => el !== scene).map(el => [el, el.inert]);
    siblings.forEach(([el]) => { el.inert = true; });
    document.querySelectorAll('audio:not([data-rift-music]),video').forEach(media => media.pause());
    document.body.classList.add('valen-open'); scene.hidden = false;
    scene.focus({ preventScroll: true }); showLine(); startEffects();
  }
  function close() {
    if (!active) return;
    active = false; clearTimeout(timer); cancelAnimationFrame(frame); announcement.textContent = '';
    scene.hidden = true; document.body.classList.remove('valen-open');
    siblings.forEach(([el, inert]) => { el.inert = inert; }); siblings = [];
    window.scrollTo({ ...scrollPosition, behavior: 'instant' });
    window.ChroniclesRift?.leave();
    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  }
  next.addEventListener('click', () => {
    if (next.hidden || !active) return;
    if (line === dialogue.length - 1) close();
    else { line++; showLine(); (motion.matches ? next : reveal).focus({ preventScroll: true }); }
  });
  reveal.addEventListener('click', finish);
  scene.querySelector('.valen-exit').addEventListener('click', close);
  scene.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key === 'Tab') {
      const buttons = [...scene.querySelectorAll('button,input')].filter(button => !button.hidden);
      const index = buttons.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); buttons.at(-1).focus(); }
      else if (!event.shiftKey && (index < 0 || index === buttons.length - 1)) { event.preventDefault(); buttons[0].focus(); }
    }
    if ((event.key === ' ' || event.key === 'Enter') && event.target === scene) {
      event.preventDefault(); if (shown < letters.length) finish(); else next.click();
    }
  });
  window.addEventListener('resize', () => { if (active) { resize(); if (motion.matches) draw(performance.now()); } });
  document.addEventListener('visibilitychange', () => {
    if (!active) return;
    clearTimeout(timer); cancelAnimationFrame(frame);
    if (!document.hidden) { if (shown < letters.length) tick(); draw(performance.now()); }
  });
  motion.addEventListener('change', () => { if (active) { if (motion.matches) finish(); startEffects(); } });
  window.ValenFarewell = Object.freeze({ open, close });
})();
