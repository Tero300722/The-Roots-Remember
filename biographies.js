/* Shared biography presentation. Keep names, credits and controls outside the reading area. */
(() => {
  'use strict';
  const regions = new Set();
  let queued = false;
  function measure() {
    queued = false;
    regions.forEach(region => {
      if (!region.isConnected) {
        observer?.unobserve(region);
        [...region.children].forEach(child => observer?.unobserve(child));
        regions.delete(region);
        return;
      }
      const overflows = region.clientHeight > 0 && region.scrollHeight > region.clientHeight + 1;
      region.classList.toggle('is-scrollable', overflows);
      if (overflows) {
        region.tabIndex = 0;
        region.setAttribute('role', 'region');
        region.setAttribute('aria-label', region.dataset.biographyLabel);
      } else {
        region.removeAttribute('tabindex');
        region.removeAttribute('role');
        region.removeAttribute('aria-label');
      }
    });
  }
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(measure);
  }
  const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : null;
  function prepare(root = document) {
    const selectors = '.character-profile-description, .echoes-biography, .elden-biography, .npc-copy, .recap-person-copy';
    root.querySelectorAll(selectors).forEach(container => {
      if (container.querySelector('.biography-scroll')) return;
      const paragraphs = [...container.children].filter(node => node.tagName === 'P' && !node.className);
      if (!paragraphs.length) return;
      const region = document.createElement('div');
      region.className = 'biography-scroll';
      const profile = container.closest('.character-detail-copy, .echoes-profile-copy, .elden-profile-copy, .npc-copy');
      const name = profile?.querySelector('h2, h3')?.textContent || document.getElementById('chronicle-tools-title')?.textContent;
      region.dataset.biographyLabel = name ? `${name} — description` : 'Character description';
      container.insertBefore(region, paragraphs[0]);
      paragraphs.forEach(paragraph => region.appendChild(paragraph));
      regions.add(region);
      observer?.observe(region);
      paragraphs.forEach(paragraph => observer?.observe(paragraph));
    });
    schedule();
  }
  window.addEventListener('resize', schedule);
  document.fonts?.ready.then(schedule);
  window.ChronicleBiography = { prepare };
  prepare();
})();
