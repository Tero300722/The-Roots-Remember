/* Decorative, randomly generated symbols. No concealed identity or cipher key. */
(() => {
  'use strict';
  const symbols = Array.from('∴∵⋄◇⊙⊗⋈⌁⊹⊥∷⊕∿⌖');
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

  function field(element, label, lengths) {
    const wrapper = document.createElement('span');
    wrapper.className = 'mystery-symbols';
    wrapper.setAttribute('role', 'img');
    wrapper.setAttribute('aria-label', label);
    const cells = [];
    let animations = [];
    lengths.forEach(length => {
      const line = document.createElement('span');
      line.className = 'mystery-symbol-line';
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
        cells.push({ layers, current: 0 });
        line.appendChild(slot);
      }
      wrapper.appendChild(line);
    });
    element.replaceChildren(wrapper);
    function stop() {
      animations.forEach(animation => animation.cancel());
      animations = [];
    }
    return {
      stop,
      change() {
        stop();
        cells.forEach(cell => {
          const outgoing = cell.layers[cell.current];
          const incoming = cell.layers[1 - cell.current];
          const direction = Math.random() < .5 ? -1 : 1;
          const exit = `translateY(${direction * 110}%)`;
          const enter = `translateY(${-direction * 110}%)`;
          incoming.textContent = randomSymbol(outgoing.textContent);
          // Each glyph has its own direction, delay and speed; all settle before the next 1.2s cycle.
          const timing = { duration: 280 + Math.random() * 140, delay: Math.random() * 650,
            easing: 'cubic-bezier(.22,.7,.25,1)', fill: 'backwards' };
          outgoing.style.transform = exit;
          outgoing.style.opacity = '0';
          incoming.style.transform = 'translateY(0)';
          incoming.style.opacity = '1';
          if (typeof outgoing.animate === 'function') {
            animations.push(outgoing.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: exit, opacity: 0 }], timing));
            animations.push(incoming.animate([{ transform: enter, opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], timing));
          }
          cell.current = 1 - cell.current;
        });
      }
    };
  }

  function mount(root, profile = false) {
    if (!root || mounted.has(root)) return;
    root.classList.add('mystery-character');
    const fields = [];
    const add = (selector, label, lengths) => {
      root.querySelectorAll(selector).forEach(el => fields.push(field(el, label, lengths)));
    };
    add(profile ? 'h2' : 'h3', 'Identity concealed', [7]);
    add(profile ? '.detail-row:first-child strong' : '.tag:first-child', 'Class concealed', [4]);
    add(profile ? '.detail-row:last-child strong' : '.tag:last-child', 'Subclass concealed', [6]);
    if (profile) add('.character-profile-description p', 'Description concealed', [10, 9, 10, 7]);
    const portrait = root.querySelector('img');
    if (portrait) portrait.alt = 'Silhouetted adventurer — identity concealed';
    if (!profile) root.setAttribute('aria-label', 'Open the mysterious adventurer, played by Daniel Mercieca');
    let timer = null;
    let hovering = false;
    let focused = false;
    const bindings = [];
    const controller = {
      visible: false,
      sync() {
        const active = root.isConnected && this.visible && !document.hidden && !reducedMotion.matches && (profile || hovering || focused);
        if (active && timer === null) timer = window.setInterval(() => {
          if (!root.isConnected) { unmount(root); return; }
          fields.forEach(field => field.change());
        }, 1200);
        if (!active) {
          if (timer !== null) { window.clearInterval(timer); timer = null; }
          fields.forEach(field => field.stop());
        }
      },
      dispose() {
        fields.forEach(field => field.stop());
        if (timer !== null) window.clearInterval(timer);
        bindings.forEach(([event, callback]) => root.removeEventListener(event, callback));
        observer.unobserve(root);
      }
    };
    function listen(event, callback) { root.addEventListener(event, callback); bindings.push([event, callback]); }
    if (!profile) {
      listen('pointerenter', event => { hovering = event.pointerType !== 'touch'; controller.sync(); });
      listen('pointerleave', () => { hovering = false; controller.sync(); });
      listen('focusin', () => { focused = true; controller.sync(); });
      listen('focusout', event => { focused = root.contains(event.relatedTarget); controller.sync(); });
    }
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
