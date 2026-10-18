/* Decorative, randomly generated symbols. No concealed identity or cipher key. */
(() => {
  'use strict';
  const symbols = Array.from('ᚠᚢᚦᚬᚱᚴᚼᚾᛁᛅᛋᛏᛒᛘᛚᛦ');
  const mounted = new WeakMap();
  const controllers = new Set();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const controller = mounted.get(entry.target);
      if (controller) { controller.visible = entry.isIntersecting; controller.sync(); }
    });
  });

  function randomSymbol(previous) {
    const choices = symbols.filter(symbol => symbol !== previous);
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function field(element, label, lengths, canRun, prose = false) {
    const wrapper = document.createElement('span');
    wrapper.className = 'mystery-symbols' + (prose ? ' mystery-prose' : '');
    wrapper.setAttribute('role', 'img');
    wrapper.setAttribute('aria-label', label);
    const cells = [];
    let running = false;
    lengths.forEach(length => {
      const line = document.createElement('span');
      line.className = prose ? 'mystery-symbol-word' : 'mystery-symbol-line';
      line.setAttribute('aria-hidden', 'true');
      for (let i = 0; i < length; i++) {
        const slot = document.createElement('span');
        slot.className = 'mystery-symbol-slot';
        const layers = [0, 1].map(index => {
          const layer = document.createElement('span');
          layer.className = 'mystery-symbol-glyph';
          layer.textContent = randomSymbol();
          layer.style.transform = index ? 'translateY(110%)' : 'translateY(0)';
          layer.style.opacity = index ? '0' : '1';
          slot.appendChild(layer);
          return layer;
        });
        cells.push({ layers, current: 0, timer: null, animations: [] });
        line.appendChild(slot);
      }
      wrapper.appendChild(line);
    });
    element.replaceChildren(wrapper);
    function stop() {
      running = false;
      cells.forEach(cell => {
        if (cell.timer !== null) window.clearTimeout(cell.timer);
        cell.timer = null;
        cell.animations.forEach(animation => animation.cancel());
        cell.animations = [];
      });
    }
    function turn(cell) {
      cell.timer = null;
      if (!running) return;
      if (!canRun()) { stop(); return; }
      cell.animations.forEach(animation => animation.cancel());
      cell.animations = [];
      const outgoing = cell.layers[cell.current];
      const incoming = cell.layers[1 - cell.current];
      const direction = Math.random() < .5 ? -1 : 1;
      const exit = `translateY(${direction * 110}%)`;
      const enter = `translateY(${-direction * 110}%)`;
      incoming.textContent = randomSymbol(outgoing.textContent);
      // Re-roll the pace after EVERY turn, independently for every glyph.
      // Rapid bursts, quick turns and slower rolls mingle without a shared cycle.
      const pace = Math.random();
      const duration = pace < .3 ? 140 + Math.random() * 100
        : pace < .75 ? 250 + Math.random() * 170 : 500 + Math.random() * 350;
      const pause = pace < .3 ? 60 + Math.random() * 120
        : pace < .75 ? 80 + Math.random() * 140 : 180 + Math.random() * 270;
      const timing = { duration, easing: 'cubic-bezier(.22,.7,.25,1)', fill: 'backwards' };
      outgoing.style.transform = exit;
      outgoing.style.opacity = '0';
      incoming.style.transform = 'translateY(0)';
      incoming.style.opacity = '1';
      if (typeof outgoing.animate === 'function') {
        cell.animations.push(outgoing.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: exit, opacity: 0 }], timing));
        cell.animations.push(incoming.animate([{ transform: enter, opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], timing));
      }
      cell.current = 1 - cell.current;
      cell.timer = window.setTimeout(() => turn(cell), duration + pause);
    }
    return {
      stop,
      start() {
        if (running) return;
        running = true;
        cells.forEach((cell, index) => {
          if (index === 0) turn(cell);
          else cell.timer = window.setTimeout(() => turn(cell), Math.random() * 140);
        });
      }
    };
  }

  function mount(root, profile = false) {
    if (!root || mounted.has(root)) return;
    root.classList.add('mystery-character');
    const fields = [];
    const add = (selector, label, lengths) => {
      root.querySelectorAll(selector).forEach(el => fields.push(field(el, label, lengths, () => root.isConnected && !document.hidden && !reducedMotion.matches)));
    };
    add(profile ? 'h2' : 'h3', 'Identity concealed', [7]);
    add(profile ? '.detail-row:first-child strong' : '.tag:first-child', 'Class concealed', [4]);
    add(profile ? '.detail-row:last-child strong' : '.tag:last-child', 'Subclass concealed', [6]);
    if (profile) root.querySelectorAll('.character-profile-description p').forEach(el => {
      const lengths = el.textContent.trim().split(/\s+/).map(word => Array.from(word).length);
      fields.push(field(el, 'Description concealed', lengths,
        () => root.isConnected && !document.hidden && !reducedMotion.matches, true));
    });
    const portrait = root.querySelector('img');
    if (portrait) portrait.alt = 'Silhouetted adventurer — identity concealed';
    if (!profile) root.setAttribute('aria-label', 'Open the mysterious adventurer, played by Daniel Mercieca');
    const controller = {
      visible: false,
      sync() {
        const active = root.isConnected && this.visible && !document.hidden && !reducedMotion.matches;
        fields.forEach(field => active ? field.start() : field.stop());
      },
      dispose() {
        fields.forEach(field => field.stop());
        observer.unobserve(root);
      }
    };
    mounted.set(root, controller);
    controllers.add(controller);
    observer.observe(root);
  }

  function unmount(root) {
    const controller = root && mounted.get(root);
    if (!controller) return;
    controller.dispose();
    controllers.delete(controller);
    mounted.delete(root);
  }

  const sync = () => controllers.forEach(controller => controller.sync());
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  window.MysteryCharacter = { mount, unmount };
})();
