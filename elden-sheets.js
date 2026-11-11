/* Landscape character sheets. Scores and level always follow the selected form. */
(() => {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function profile(character) {
    const el = document.createElement('article');
    el.className = 'grimwood-sheet elden-sheet';
    el.style.setProperty('--char-rgb', character.accent);
    el.innerHTML = `
      <header class="grimwood-sheet-heading">
        <p class="eyebrow">Beyond the Frenzied Flame · Character Chronicle</p>
        <h2>${escape(character.name)}</h2>
        <p class="player-credit">Played by ${escape(character.player)}</p>
      </header>
      <div class="elden-sheet-controls">
        <p class="elden-sheet-status" role="status" aria-live="polite"><span class="elden-sheet-form">Original Form</span><span aria-hidden="true"> · </span><strong class="elden-sheet-level">Level ${character.originalLevel}</strong></p>
        <button type="button" class="elden-sheet-toggle">Switch to the Godly Form</button>
      </div>
      <div class="grimwood-sheet-art elden-sheet-art">
        <button type="button" class="elden-landscape-toggle" aria-label="Switch to the Godly Form of ${escape(character.name)}">
          <img class="elden-sheet-image elden-sheet-original" src="${character.fullImage}" width="${character.width}" height="${character.height}" alt="${escape(character.name)} — Original Form" decoding="async">
          <img class="elden-sheet-image elden-sheet-godly" src="${character.variantImage}" width="${character.variantWidth}" height="${character.variantHeight}" alt="" aria-hidden="true" decoding="async">
        </button>
        ${character.abilityScores ? window.GrimwoodSheet.stats(character, character.abilityScores) : ''}
      </div>
      <p class="elden-sheet-help">Click the artwork or use the button to switch forms.</p>
      <div class="grimwood-sheet-lore">
        <aside class="grimwood-sheet-identity" aria-label="Character class">
          <span class="eyebrow">The Champion</span>
          <dl><div><dt>Class</dt><dd>${escape(character.className)}</dd></div><div><dt>Subclass</dt><dd>${escape(character.subclass)}</dd></div></dl>
        </aside>
        <section class="grimwood-sheet-story character-profile-description" aria-label="${escape(character.name)} description">
          <h3>Character Story</h3>
          ${(character.description || []).map(p => `<p>${escape(p)}</p>`).join('')}
        </section>
      </div>`;
    const frame = el.querySelector('.elden-landscape-toggle');
    const toggle = el.querySelector('.elden-sheet-toggle');
    const images = [...frame.querySelectorAll('img')];
    const form = el.querySelector('.elden-sheet-form');
    const level = el.querySelector('.elden-sheet-level');
    const stats = el.querySelector('.grimoire-stats');
    const help = el.querySelector('.elden-sheet-help');
    const cells = [...el.querySelectorAll('.grimoire-ability dd')];
    let godly = false;
    const ready = [false, false];
    function update() {
      el.classList.toggle('is-godly', godly);
      const label = godly ? 'Godly Form' : 'Original Form';
      const value = godly ? character.godlyLevel : character.originalLevel;
      const action = godly ? 'Switch to the Original Form' : 'Switch to the Godly Form';
      const scores = godly ? character.godlyAbilityScores : character.abilityScores;
      form.textContent = label;
      level.textContent = `Level ${value}`;
      if (stats) {
        stats.querySelector('.grimoire-stats-label').textContent = `${label} · Level ${value}`;
        stats.setAttribute('aria-label', `${character.name} — ${label}, level ${value}, ability scores`);
        [0,3,1,4,2,5].forEach((scoreIndex, cellIndex) => { cells[cellIndex].textContent = scores[scoreIndex]; });
      }
      toggle.textContent = action;
      [toggle, frame].forEach(button => {
        button.disabled = !ready[godly ? 0 : 1];
        button.setAttribute('aria-label', `${action} of ${character.name}`);
        button.setAttribute('aria-pressed', String(godly));
      });
      images.forEach((image, i) => {
        const active = i === (godly ? 1 : 0);
        image.alt = active ? `${character.name} — ${label}` : '';
        image.setAttribute('aria-hidden', String(!active));
      });
    }
    [toggle, frame].forEach(button => button.addEventListener('click', () => {
      if (!ready[godly ? 0 : 1]) return;
      godly = !godly;
      update();
    }));
    images.forEach((image, i) => {
      const loaded = () => { ready[i] = true; update(); };
      image.addEventListener('load', loaded);
      image.addEventListener('error', () => {
        ready[i] = false;
        help.textContent = 'A portrait could not load. Reopen this character to try again.';
        update();
      });
      if (image.complete && image.naturalWidth) ready[i] = true;
    });
    update();
    return el;
  }
  window.EldenSheet = { profile };
})();
