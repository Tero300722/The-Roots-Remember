/* The artwork and ability scores are independent: scores remain editable text. */
(() => {
  'use strict';
  const sheets = {
    'elior-ilphelkiir': { art: 'elior' },
    'theodas-ilphelkiir': { art: 'theodas', scores: [8, 18, 14, 8, 10, 16] },
    'vaelis-rimehart': { art: 'vaelis', scores: [8, 14, 14, 10, 10, 18] },
    'edwin-everbane': { art: 'edwin' }
  };
  const abilities = [
    ['STR', 'Strength', 'M8 4h8v6l4 4v6H4v-6l4-4V4Zm0 6h8M8 16h8'],
    ['DEX', 'Dexterity', 'm14 2-9 12h6l-1 8 9-12h-6l1-8Z'],
    ['CON', 'Constitution', 'M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6l-9-4Zm0 4v12'],
    ['INT', 'Intelligence', 'M12 5C9 2 4 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-7-2-10 1Zm0 0v15M5 7l4 1M15 8l4-1M5 11l4 1M15 12l4-1'],
    ['WIS', 'Wisdom', 'M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Zm15 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'],
    ['CHA', 'Charisma', 'm12 1 2.5 7.5L22 12l-7.5 2.5L12 23l-2.5-8.5L2 12l7.5-3.5L12 1Z']
  ];
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function frame() {
    return `<svg class="grimoire-frame" viewBox="0 0 500 410" preserveAspectRatio="none" aria-hidden="true" fill="none">
      <path class="frame-shadow" d="M250 14 270 34H418Q425 66 470 64V340Q428 338 418 376H270L250 396 230 376H82Q74 340 30 340V64Q75 66 82 34H230Z"/>
      <g class="frame-gold">
        <path d="M250 14 270 34H418Q425 66 470 64V340Q428 338 418 376H270L250 396 230 376H82Q74 340 30 340V64Q75 66 82 34H230Z"/>
        <path d="M231 43H91Q82 74 40 74V331Q81 334 91 366H231M269 43H409Q419 74 460 74V331Q419 334 409 366H269" opacity=".5"/>
        <path d="M42 91C9 66 26 32 58 40c22 5 11 29-2 20C38 47 70 15 110 29M458 91c33-25 16-59-16-51-22 5-11 29 2 20 18-13-14-45-54-31M42 314c-33 25-16 59 16 51 22-5 11-29-2-20-18 13 14 45 54 31M458 314c33 25 16 59-16 51-22-5-11-29 2-20 18 13-14 45-54 31"/>
        <path d="M92 33c44 25 94-25 138 1M270 34c44-26 94 26 138-1M92 377c44-25 94 25 138-1M270 376c44 26 94-26 138 1"/>
        <path d="m250 3 17 22-17 22-17-22Zm0 360 17 22-17 22-17-22ZM14 193l14-17 14 17-14 17Zm444 0 14-17 14 17-14 17Z"/>
      </g>
      <path class="frame-gem" d="m250 13 9 12-9 12-9-12Zm0 362 9 22-9 12-9-12ZM20 193l8-10 8 10-8 10Zm444 0 8-10 8 10-8 10Z"/>
    </svg>`;
  }
  function stats(character, scores) {
    return `<section class="grimoire-stats" aria-label="${escape(character.name)} ability scores">
      ${frame()}
      <div class="grimoire-stats-inner">
        <p class="grimoire-stats-label">Ability Scores</p>
        <h3>${escape(character.className)}</h3>
        <p class="grimoire-specialty">${escape(character.subclass)}</p>
        <div class="grimoire-divider" aria-hidden="true"><span>◆</span></div>
        <dl class="grimoire-abilities">${[0,3,1,4,2,5].map(i => {
          const [short, long, path] = abilities[i];
          return `<div class="grimoire-ability"><dt><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg><abbr title="${long}">${short}</abbr></dt><dd>${scores[i]}</dd></div>`;
        }).join('')}</dl>
      </div>
    </section>`;
  }
  function render(character, asset) {
    const sheet = sheets[character.slug];
    const root = 'assets/grimwood/characters/sheets/';
    return `<article class="grimwood-sheet" style="--char-rgb:${character.accent}">
      <header class="grimwood-sheet-heading">
        <p class="eyebrow">Into the Grimwood Manor · Character Chronicle</p>
        <h2>${escape(character.name)}</h2>
        <p class="player-credit">Played by ${escape(character.player)}</p>
      </header>
      <div class="grimwood-sheet-art">
        <img class="grimwood-landscape" src="${asset(root + sheet.art + '.png')}" alt="${escape(character.name)} before Grimwood Manor" decoding="async" width="1671" height="942">
        ${sheet.scores ? stats(character, sheet.scores) : `<img class="grimwood-wip" src="${asset(root + 'work-in-progress.png')}" alt="Ability scores — work in progress" width="1774" height="887">`}
      </div>
      <div class="grimwood-sheet-lore">
        <aside class="grimwood-sheet-identity" aria-label="Character class">
          <span class="eyebrow">The Adventurer</span>
          <dl><div><dt>Class</dt><dd>${escape(character.className)}</dd></div><div><dt>Subclass</dt><dd>${escape(character.subclass)}</dd></div></dl>
        </aside>
        <section class="grimwood-sheet-story character-profile-description" aria-label="${escape(character.name)} description">
          <h3>Character Story</h3>
          ${(character.description || []).map(p => `<p>${escape(p)}</p>`).join('')}
        </section>
      </div>
    </article>`;
  }
  window.GrimwoodSheet = { render };
})();
