/* Shared card and profile structure, matching Roots Remember and Grimwood Manor. */
(() => {
  'use strict';
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
  function profile(character, eyebrow) {
    const el = node('article', 'character-detail-wrap chronicle-character-profile');
    el.style.setProperty('--char-rgb', character.accent);
    el.style.setProperty('--detail-bg', `url("${character.fullImage}")`);
    const bg = node('div', 'character-detail-bg');
    const rune = node('div', 'character-detail-rune');
    bg.setAttribute('aria-hidden', 'true');rune.setAttribute('aria-hidden', 'true');
    const grid = node('div', 'character-detail-grid');
    const stage = node('div', 'character-portrait-stage');
    const copy = node('div', 'character-detail-copy');
    copy.append(node('p', 'eyebrow', eyebrow), node('h2', '', character.name), node('div', 'player-credit', `Played by ${character.player}`));
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
      let godly = false, ready = false, failed = false;
      function update() {
        el.classList.toggle('show-godly', godly);
        const action = godly ? 'Switch to the Original Form' : 'Switch to the Godly Form';
        toggle.textContent = action;
        [toggle, frame].forEach(button => {
          button.disabled = !ready;
          button.setAttribute('aria-label', `${action} of ${character.name}`);
          button.setAttribute('aria-pressed', String(godly));
        });
        frame.setAttribute('aria-busy', String(!ready && !failed));
        base.alt = `${character.name} — ${godly ? 'godly' : 'original'} form`;
        if (ready) {
          status.textContent = godly ? 'Godly Form' : 'Original Form';
          help.textContent = 'Click the portrait or use the button to switch forms.';
        }
      }
      function loaded() { ready = true; failed = false; update(); }
      function error() {
        ready = false;failed = true;godly = false;update();
        status.textContent = 'Godly form could not load. Original form shown.';
        help.textContent = 'Reopen this character to try again.';
      }
      variant.addEventListener('load', loaded);variant.addEventListener('error', error);
      [toggle, frame].forEach(button => button.addEventListener('click', () => { if (ready) { godly = !godly;update(); } }));
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
