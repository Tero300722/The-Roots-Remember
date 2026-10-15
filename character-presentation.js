/* Shared card and profile structure, matching Roots Remember and Grimwood Manor. */
(() => {
  'use strict';
  let frenzyAudioContext = null;
  let stopFrenzySound = null;
  window.addEventListener('pagehide', () => {
    stopFrenzySound?.();
    frenzyAudioContext?.close().catch(() => {});
    frenzyAudioContext = null;
  });
  function prepareTransformationSurge(frenzied = false) {
    const silent = () => () => {};
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return silent;
    let unlocked;
    try {
      if (!frenzyAudioContext || frenzyAudioContext.state === 'closed') frenzyAudioContext = new Context();
      // Start unlocking during the click; a fresh context may need a moment to resume.
      unlocked = frenzyAudioContext.state === 'suspended' ? frenzyAudioContext.resume() : Promise.resolve();
      unlocked.catch(() => {});
    } catch { return silent; }
    const context = frenzyAudioContext;
    return () => {
      const volume = document.querySelector('[data-music-volume]');
      const level = () => Math.min(.2, Math.sqrt(Math.max(0, Math.min(100, Number(volume?.value ?? 5))) / 100) * .45);
      const voices = [];
      let master, stopped = false;
      const adjustVolume = () => master.gain.setTargetAtTime(level(), context.currentTime, .02);
      const stop = () => {
        if (stopped) return;
        stopped = true;
        if (stopFrenzySound === stop) stopFrenzySound = null;
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
          const notes = frenzied
            ? [[73.42, 196, .16], [110, 329.63, .1], [146.83, 493.88, .07]]
            : [[146.83, 293.66, .2], [220, 440, .12], [293.66, 587.33, .08]];
          notes.forEach(([frequency, peak, strength], index) => {
            const oscillator = context.createOscillator();
            const envelope = context.createGain();
            voices.push({ source: oscillator, nodes: [envelope] });
            oscillator.type = frenzied ? (index ? 'sawtooth' : 'triangle') : 'sine';
            oscillator.detune.value = frenzied ? (index === 1 ? -19 : index === 2 ? 23 : 0) : 0;
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
          filter.type = 'bandpass';filter.Q.value = frenzied ? 2.2 : .7;
          filter.frequency.setValueAtTime(frenzied ? 180 : 400, now);
          filter.frequency.exponentialRampToValueAtTime(frenzied ? 3400 : 2600, now + 1.8);
          filter.frequency.exponentialRampToValueAtTime(frenzied ? 520 : 900, now + 3.12);
          swell(envelope.gain, .24);
          wind.connect(filter);filter.connect(envelope);envelope.connect(master);
          wind.onended = stop;
          wind.start(now);wind.stop(now + 3.2);
        } catch { stop(); }
      };
      stopFrenzySound?.();
      stopFrenzySound = stop;
      if (context.state === 'running') startSound();
      else unlocked.then(startSound).catch(stop);
      return stop;
    };
  }
  function prepareRuneShatter() {
    let audio;
    try {
      audio = new Audio('assets/audio/runeshatter.mp3');
      audio.preload = 'auto';
    } catch { return { play() {}, stop() {} }; }
    const volume = document.querySelector('[data-music-volume]');
    const level = () => Math.min(.55, Math.sqrt(Math.max(0, Math.min(100, Number(volume?.value ?? 5))) / 100) * .62);
    let triggered = false, stopped = false;
    const adjustVolume = () => { audio.volume = level(); };
    // Prime the media element during the click so delayed playback remains allowed.
    audio.volume = 0;
    audio.play().then(() => {
      if (triggered || stopped) return;
      audio.pause();
      try { audio.currentTime = 0; } catch {}
    }).catch(() => {});
    return {
      play() {
        if (stopped) return;
        triggered = true;
        audio.pause();
        try { audio.currentTime = 0; } catch {}
        adjustVolume();
        volume?.addEventListener('input', adjustVolume);
        audio.play().catch(() => {});
      },
      stop() {
        if (stopped) return;
        stopped = true;
        volume?.removeEventListener('input', adjustVolume);
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
      }
    };
  }
  function prepareHolyTransformationSound() {
    let audio;
    try {
      audio = new Audio('assets/audio/holyTransform.mp3');
      audio.preload = 'auto';
    } catch { return () => () => {}; }
    const volume = document.querySelector('[data-music-volume]');
    const level = () => Math.min(.5, Math.sqrt(Math.max(0, Math.min(100, Number(volume?.value ?? 5))) / 100) * .58);
    let started = false, stopped = false;
    const adjustVolume = () => { audio.volume = level(); };
    const stop = () => {
      if (stopped) return;
      stopped = true;
      volume?.removeEventListener('input', adjustVolume);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    };
    // Prime playback during the initiating click, before the delayed rune sequence.
    audio.volume = 0;
    audio.play().then(() => {
      if (started || stopped) return;
      audio.pause();
      try { audio.currentTime = 0; } catch {}
    }).catch(() => {});
    return () => {
      if (stopped) return () => {};
      started = true;
      audio.pause();
      try { audio.currentTime = 0; } catch {}
      adjustVolume();
      volume?.addEventListener('input', adjustVolume);
      audio.addEventListener('ended', stop, { once: true });
      audio.play().catch(() => {});
      return stop;
    };
  }
  function prepareFlameTransformationSound() {
    let audio;
    try {
      audio = new Audio('assets/audio/flameTransformation.mp3');
      audio.preload = 'auto';
    } catch { return () => () => {}; }
    const volume = document.querySelector('[data-music-volume]');
    const level = () => Math.min(.52, Math.sqrt(Math.max(0, Math.min(100, Number(volume?.value ?? 5))) / 100) * .6);
    let started = false, stopped = false;
    const adjustVolume = () => { audio.volume = level(); };
    const stop = () => {
      if (stopped) return;
      stopped = true;
      volume?.removeEventListener('input', adjustVolume);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    };
    // Prime playback during the click while the WebGL scene is preparing.
    audio.volume = 0;
    audio.play().then(() => {
      if (started || stopped) return;
      audio.pause();
      try { audio.currentTime = 0; } catch {}
    }).catch(() => {});
    return () => {
      if (stopped) return () => {};
      started = true;
      audio.pause();
      try { audio.currentTime = 0; } catch {}
      adjustVolume();
      volume?.addEventListener('input', adjustVolume);
      audio.play().catch(() => {});
      return stop;
    };
  }
  function startHolyLightRenderer(canvas) {
    const gl = canvas.getContext('webgl', {
      alpha: true, antialias: false, depth: false, stencil: false,
      premultipliedAlpha: false, powerPreference: 'high-performance'
    });
    if (!gl) return null;
    const vertexSource = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
    const fragmentSource = `precision highp float;
      uniform vec2 uRes; uniform float uTime; uniform float uProgress; uniform float uReach;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=mat2(1.62,-1.17,1.17,1.62)*p+7.3;a*=.52;}return v;}
      void main(){
        vec2 uv=(gl_FragCoord.xy-.5*uRes)/min(uRes.x,uRes.y);
        float r=length(uv), angle=atan(uv.y,uv.x), t=uTime;
        float p=uProgress*uProgress*(3.-2.*uProgress);
        float turbulence=fbm(uv*4.2+vec2(t*.14,-t*.22));
        float radius=mix(.018,uReach+.28,p)+(.035+.055*p)*(turbulence-.5);
        float inside=1.-smoothstep(radius-.13,radius+.025,r);
        float front=exp(-pow((r-radius)/(.034+.055*p),2.));
        float spokes=pow(max(0.,cos(angle*14.-t*.48+turbulence*2.8)),18.);
        spokes+=.55*pow(max(0.,cos(angle*23.+t*.31-turbulence*2.)),24.);
        float rayMask=(1.-smoothstep(.02,radius+.32,r))*smoothstep(.015,.1,r);
        float rays=spokes*rayMask*(.25+.75*(1.-p*.45));
        float rings=exp(-pow((r-radius*.54)/(.012+.02*p),2.))*.55;
        rings+=exp(-pow((r-radius*.78)/(.008+.016*p),2.))*.35;
        float shimmer=.72+.28*fbm(vec2(angle*2.8+t*.18,r*13.-t*.7));
        vec3 amber=vec3(.95,.42,.035), gold=vec3(1.,.77,.19), white=vec3(1.,.985,.79);
        float energy=inside*(.32+.5*p+.2*turbulence)+front*1.8+rays*1.2+rings;
        vec3 col=mix(amber,gold,clamp(energy*.62,0.,1.));
        col=mix(col,white,clamp(front*.82+rays*.32+inside*p*.42,0.,1.));
        col*=energy*shimmer;
        col+=white*exp(-r*r/(.008+.055*p))*(1.8-p*.55);
        col=1.-exp(-col*1.55);
        float alpha=clamp(inside*.97+front+rays*.38+rings*.25,0.,1.)*smoothstep(0.,.065,uProgress);
        gl_FragColor=vec4(col,alpha);
      }`;
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader);throw new Error('shader'); }
      return shader;
    };
    let program, vertex, fragment;
    try {
      vertex = compile(gl.VERTEX_SHADER, vertexSource);
      fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
      program = gl.createProgram();gl.attachShader(program, vertex);gl.attachShader(program, fragment);gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('program');
    } catch {
      if (program) gl.deleteProgram(program);
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      return null;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, 'uRes');
    const time = gl.getUniformLocation(program, 'uTime');
    const progress = gl.getUniformLocation(program, 'uProgress');
    const reach = gl.getUniformLocation(program, 'uReach');
    let frameId = 0, stopped = false, clock = 0, previous = performance.now();
    const frame = now => {
      if (stopped) return;
      clock += Math.min((now - previous) / 1000, .05);previous = now;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width;canvas.height = height;gl.viewport(0, 0, width, height); }
      const minimum = Math.min(width, height);
      gl.uniform2f(resolution, width, height);
      gl.uniform1f(time, clock);
      gl.uniform1f(progress, Math.min(clock / 1.8, 1));
      gl.uniform1f(reach, .5 * Math.hypot(width / minimum, height / minimum));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameId = requestAnimationFrame(frame);
    };
    frameId = requestAnimationFrame(frame);
    return () => {
      if (stopped) return;
      stopped = true;cancelAnimationFrame(frameId);
      gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vertex);gl.deleteShader(fragment);
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
  function profile(character, eyebrow, { holyTransformation = false, frenziedTransformation = false } = {}) {
    const el = node('article', 'character-detail-wrap chronicle-character-profile');
    el.dataset.character = character.slug;
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
      let godly = false, ready = false, failed = false, transforming = false, sizeAnimation = null;
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
      function setGodlyState(nextGodly, smoothSize = false) {
        sizeAnimation?.cancel();
        sizeAnimation = null;
        const before = smoothSize ? el.getBoundingClientRect().height : 0;
        godly = nextGodly;
        update();
        if (!smoothSize) return;
        const after = el.getBoundingClientRect().height;
        if (Math.abs(after - before) < 1) return;
        sizeAnimation = el.animate([
          { height: `${before}px` },
          { height: `${after}px` }
        ], { duration: 720, easing: 'cubic-bezier(.22, .72, .2, 1)' });
        const animation = sizeAnimation;
        animation.onfinish = animation.oncancel = () => {
          if (sizeAnimation === animation) sizeAnimation = null;
        };
      }
      async function switchForm() {
        if (!ready || transforming) return;
        const playSurge = holyTransformation && !godly
          ? frenziedTransformation ? prepareFlameTransformationSound() : prepareHolyTransformationSound()
          : null;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!holyTransformation || godly || reducedMotion
          || typeof el.animate !== 'function') {
          setGodlyState(!godly, holyTransformation && !reducedMotion && typeof el.animate === 'function');
          return;
        }
        const light = node('div', frenziedTransformation ? 'form-frenzied-flame' : 'form-holy-light');
        light.setAttribute('aria-hidden', 'true');
        const rays = node('div', frenziedTransformation ? 'form-frenzy-tendrils' : 'form-holy-rays');
        const bloom = node('div', frenziedTransformation ? 'form-frenzy-core' : 'form-holy-bloom');
        const halo = node('div', frenziedTransformation ? 'form-frenzy-ring' : 'form-holy-halo');
        const motes = frenziedTransformation ? null : node('div', 'form-holy-motes');
        let heat, holyCanvas, maelstrom, aura, sigil, sigilFragments, referenceFrame, referenceReady, wisps = [], sigilShards = [];
        if (frenziedTransformation) {
          heat = node('div', 'form-frenzy-heat');
          maelstrom = node('div', 'form-frenzy-maelstrom');
          aura = node('div', 'form-frenzy-aura');
          wisps = Array.from({ length: 11 }, () => node('i', 'form-frenzy-wisp'));
          maelstrom.append(...wisps);
          referenceFrame = node('iframe', 'form-frenzy-reference');
          referenceFrame.title = '';
          referenceFrame.tabIndex = -1;
          referenceFrame.setAttribute('aria-hidden', 'true');
          referenceReady = new Promise(resolve => {
            let settled = false;
            const finish = value => {
              if (settled) return;
              settled = true;
              clearTimeout(timeout);
              resolve(value);
            };
            const timeout = setTimeout(() => finish(false), 1200);
            referenceFrame.addEventListener('load', () => {
              try {
                referenceFrame.contentDocument?.getElementById('ui')?.remove();
                const error = referenceFrame.contentDocument?.getElementById('error');
                finish(!error || referenceFrame.contentWindow?.getComputedStyle(error).display === 'none');
              } catch { finish(false); }
            }, { once: true });
            referenceFrame.addEventListener('error', () => finish(false), { once: true });
          });
          referenceFrame.src = 'assets/frenzied_flame_fixed.html';
          light.append(heat, aura, rays, bloom, halo, maelstrom, referenceFrame);
        } else {
          sigil = node('img', 'form-holy-sigil');
          sigil.src = 'assets/ER_golden_order.png';
          sigil.alt = '';
          sigil.setAttribute('aria-hidden', 'true');
          sigil.decoding = 'async';
          sigilFragments = node('div', 'form-holy-sigil-fragments');
          sigilShards = Array.from({ length: 8 }, () => {
            const shard = node('img', 'form-holy-sigil-shard');
            shard.src = 'assets/ER_golden_order.png';
            shard.alt = '';
            shard.setAttribute('aria-hidden', 'true');
            shard.decoding = 'async';
            return shard;
          });
          sigilFragments.append(...sigilShards);
          holyCanvas = node('canvas', 'form-holy-webgl');
          holyCanvas.setAttribute('aria-hidden', 'true');
          light.append(sigil, sigilFragments, rays, bloom, halo, motes, holyCanvas);
        }
        function sizeLight() {
          // The opaque core reaches every corner, including tall mobile cards.
          light.style.setProperty(frenziedTransformation ? '--frenzy-diameter' : '--holy-diameter', `${Math.hypot(el.clientWidth, el.clientHeight) * (frenziedTransformation ? 2.25 : 1.5)}px`);
        }
        sizeLight();
        transforming = true;
        el.classList.add('is-transforming');
        el.setAttribute('aria-busy', 'true');
        el.appendChild(light);
        update();
        const runeShatterSound = frenziedTransformation ? null : prepareRuneShatter();
        let expansion, shake, stopHolyRenderer, stopSurge;
        try {
          if (frenziedTransformation) {
            const useReference = await referenceReady;
            stopSurge = playSurge?.();
            if (useReference) {
              expansion = referenceFrame.animate([
                { opacity: 0, transform: 'scale(.94)', filter: 'brightness(.55) saturate(.8)' },
                { opacity: 1, transform: 'scale(1)', filter: 'brightness(1) saturate(1)', offset: .2 },
                { opacity: 1, transform: 'scale(1.025)', filter: 'brightness(1.08) saturate(1.08)' }
              ], { duration: 1150, easing: 'cubic-bezier(.2, .65, .22, 1)', fill: 'forwards' });
            } else {
              heat.animate([
              { opacity: 0, transform: 'scale(.86) translateY(2%)' },
              { opacity: .8, transform: 'scale(1.03) translateY(-1%)', offset: .38 },
              { opacity: .45, transform: 'scale(.98) translateY(-3%)', offset: .72 },
              { opacity: 0, transform: 'scale(1.08) translateY(-5%)' }
            ], { duration: 3000, easing: 'cubic-bezier(.2, .7, .2, 1)', fill: 'forwards' });
            rays.animate([
              { opacity: 0, transform: 'rotate(-18deg) scale(.55)' },
              { opacity: .82, offset: .2 },
              { opacity: .6, transform: 'rotate(46deg) scale(1.02)', offset: .72 },
              { opacity: 0, transform: 'rotate(78deg) scale(1.2)' }
            ], { duration: 2850, easing: 'cubic-bezier(.2, .7, .2, 1)', fill: 'forwards' });
            halo.animate([
              { transform: 'translate(-50%, -50%) scale(.12) rotate(-22deg)', opacity: 0 },
              { transform: 'translate(-50%, -50%) scale(.86) rotate(12deg)', opacity: .92, offset: .2 },
              { transform: 'translate(-50%, -50%) scale(1.08) rotate(68deg)', opacity: 1, offset: .65 },
              { transform: 'translate(-50%, -50%) scale(1.45) rotate(115deg)', opacity: 0 }
            ], { duration: 2400, easing: 'cubic-bezier(.16, .78, .24, 1)', fill: 'forwards' });
            aura.animate([
              { opacity: 0, transform: 'translate(-50%, -50%) scale(.25) rotate(-15deg)' },
              { opacity: .85, transform: 'translate(-50%, -50%) scale(.9) rotate(15deg)', offset: .25 },
              { opacity: .55, transform: 'translate(-50%, -50%) scale(1.18) rotate(65deg)', offset: .72 },
              { opacity: 0, transform: 'translate(-50%, -50%) scale(1.5) rotate(95deg)' }
            ], { duration: 2900, easing: 'cubic-bezier(.18, .72, .25, 1)', fill: 'forwards' });
            wisps.forEach((wisp, index) => {
              const start = index * (360 / wisps.length) - 30;
              const curl = 72 + (index % 4) * 13;
              const swell = .72 + (index % 3) * .16;
              wisp.animate([
                { opacity: 0, transform: `translate(-4%, 0) rotate(${start}deg) scale(.18, .35)` },
                { opacity: .82, transform: `translate(-4%, -3%) rotate(${start + 18}deg) scale(${swell}, .8)`, offset: .18 + (index % 3) * .025 },
                { opacity: .95, transform: `translate(4%, -10%) rotate(${start + curl}deg) scale(${swell * 1.16}, 1.18)`, offset: .58 },
                { opacity: 0, transform: `translate(18%, -28%) rotate(${start + curl + 42}deg) scale(${swell * .7}, 1.55)` }
              ], { duration: 1900 + (index % 5) * 140, delay: index * 24, easing: 'cubic-bezier(.2, .68, .24, 1)', fill: 'forwards' });
            });
            expansion = bloom.animate([
              { transform: 'translate(-50%, -50%) scale(.015)', opacity: 0, filter: 'brightness(1)' },
              { transform: 'translate(-50%, -50%) scale(.065)', opacity: .96, filter: 'brightness(1.35)', offset: .2 },
              { transform: 'translate(-50%, -50%) scale(.12)', opacity: 1, filter: 'brightness(1.55)', offset: .52 },
              { transform: 'translate(-50%, -50%) scale(.3)', opacity: 1, filter: 'brightness(1.2)', offset: .72 },
              { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 }
            ], { duration: 1150, easing: 'cubic-bezier(.25, .55, .2, 1)', fill: 'forwards' });
            }
          } else {
            await sigil.animate([
              { opacity: 0, transform: 'translate(-50%, -50%) scale(.68) rotate(-10deg)', filter: 'sepia(.2) saturate(1.1) brightness(.55) drop-shadow(0 0 2px #d99b37)' },
              { opacity: .92, transform: 'translate(-50%, -50%) scale(.94) rotate(-2deg)', filter: 'sepia(.08) saturate(1.3) brightness(.9) drop-shadow(0 0 7px #f6ca66) drop-shadow(0 0 24px #dc9d3d8c)', offset: .34 },
              { opacity: 1, transform: 'translate(-50%, -50%) scale(1) rotate(5deg)', filter: 'sepia(0) saturate(1.38) brightness(1.12) drop-shadow(0 0 10px #ffe193) drop-shadow(0 0 38px #e4a63da8)' }
            ], { duration: 1100, easing: 'cubic-bezier(.2, .72, .25, 1)', fill: 'forwards' }).finished;
            if (!ready || !el.isConnected || !el.getClientRects().length) return;
            sigil.animate([
              { opacity: 1, transform: 'translate(-50%, -50%) scale(1) rotate(5deg)' },
              { opacity: 0, transform: 'translate(-50%, -50%) scale(1.035) rotate(5deg)', filter: 'brightness(2.2) drop-shadow(0 0 22px #fff4c7)' }
            ], { duration: 170, easing: 'ease-out', fill: 'forwards' });
            runeShatterSound?.play();
            const directions = [[-1, -.72], [-.35, -1], [.42, -.94], [1, -.55], [-1, .3], [-.42, .92], [.38, 1], [1, .38]];
            const spread = Math.min(170, Math.max(90, el.clientWidth * .15));
            const shatter = sigilShards.map((shard, index) => {
              const [x, y] = directions[index];
              return shard.animate([
                { opacity: 1, transform: 'translate(-50%, -50%) translate(0, 0) rotate(5deg) scale(1)', filter: 'brightness(1.45) drop-shadow(0 0 10px #ffe193)' },
                { opacity: .95, offset: .28 },
                { opacity: 0, transform: `translate(-50%, -50%) translate(${x * spread}px, ${y * spread}px) rotate(${5 + x * 34}deg) scale(.78)`, filter: 'brightness(.8) drop-shadow(0 0 4px #d88727)' }
              ], { duration: 620 + (index % 3) * 55, delay: (index % 2) * 18, easing: 'cubic-bezier(.15, .7, .25, 1)', fill: 'forwards' });
            });
            await Promise.all(shatter.map(animation => animation.finished));
            if (!ready || !el.isConnected || !el.getClientRects().length) return;
            stopSurge = playSurge?.();
            stopHolyRenderer = startHolyLightRenderer(holyCanvas);
            if (stopHolyRenderer) {
              expansion = holyCanvas.animate([
                { opacity: 0, filter: 'brightness(.7) saturate(.85)' },
                { opacity: 1, filter: 'brightness(1) saturate(1)', offset: .12 },
                { opacity: 1, filter: 'brightness(1.08) saturate(1.06)' }
              ], { duration: 1800, easing: 'cubic-bezier(.18, .72, .22, 1)', fill: 'forwards' });
            } else {
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
            }
          }
          await expansion.finished;
          if (!ready || !el.isConnected || !el.getClientRects().length) return;
          // Change the portrait and name only once the light covers the entire card.
          setGodlyState(true, true);
          sizeLight();
          shake = el.animate(frenziedTransformation ? [
            { transform: 'translateY(0) scale(1)' },
            { transform: 'translateY(2px) scale(1.006)', offset: .35 },
            { transform: 'translateY(-1px) scale(1.003)', offset: .68 },
            { transform: 'translateY(0) scale(1)' }
          ] : [
            { transform: 'none' },
            { transform: 'translate(-3px, 1px) rotate(-.12deg)' },
            { transform: 'translate(3px, -1px) rotate(.12deg)' },
            { transform: 'translate(-2px, 0) rotate(-.08deg)' },
            { transform: 'translate(2px, 1px) rotate(.08deg)' },
            { transform: 'translate(-1px, 0)' },
            { transform: 'none' }
          ], { duration: frenziedTransformation ? 650 : 420, easing: 'ease-out' });
          shake.id = 'god-form-shake';
          await light.animate([{ opacity: 1 }, { opacity: .95, offset: .2 }, { opacity: 0 }], {
            duration: frenziedTransformation ? 750 : 1400, easing: 'ease-in-out', fill: 'forwards'
          }).finished;
        } catch {
          // A cancelled or unsupported effect must still leave the form switch usable.
          if (ready) setGodlyState(true, true);
        } finally {
          shake?.cancel();
          stopHolyRenderer?.();
          stopSurge?.();
          runeShatterSound?.stop();
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
