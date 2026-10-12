const ECHOES_DATA = {
  "title": "Echoes of Eternity",
  "creator": "Mikael Delia",
  "status": "Cancelled",
  "premise": [
    "Three worlds. Seven strangers. One shattered reality.",
    "Across three vastly different universes, seven individuals find themselves bound by an extraordinary phenomenon known as the Shattering. From the treacherous seas of the Pirate World to the technologically advanced streets of Night City and the magical lands of Elysia, their lives become intertwined by forces beyond their understanding.",
    "Each bears a mysterious arcane scar, a mark that grants them the ability to defy death itself. When tragedy strikes, time can rewind, allowing them to change their fate. Yet this extraordinary gift comes at a terrible cost. Every revival weakens the boundaries separating the worlds, bringing reality closer to complete collapse.",
    "Their journey leads them to discover the existence of a shattered medallion, its fragments scattered across the three universes. As they search for these pieces, they encounter powerful corporations, ancient magical civilizations, mysterious merchants, forgotten gods, and individuals whose ambitions threaten the very fabric of existence.",
    "But beneath the chaos lies a far older mystery.",
    "Long before their arrival, seven champions stood against Ithilia, a goddess consumed by her desire to rule the realms. Their battle reshaped existence and gave rise to the world now known as Elysia. History has forgotten their names, yet the pattern of their existence appears to be repeating.",
    "As the boundaries between worlds deteriorate, the seven adventurers must confront an increasingly devastating truth: the very power keeping them alive may be responsible for destroying everything around them.",
    "Every death presents a choice. Every revival carries consequences. And every decision brings them closer to discovering whether they are destined to save reality or repeat the catastrophe that once destroyed it.",
    "For the world has broken before. And this time, it may not survive being rewritten."
  ],
  "characters": [
    {
      "name": "Captain Morgan Dreadwake",
      "player": "Matthias Martino",
      "slug": "captain-morgan-dreadwake",
      "universe": "pirate",
      "universeName": "Pirate Universe",
      "accent": "227, 78, 82",
      "borderColour": "red",
      "fullImage": "assets/echoes/characters/captain-morgan-dreadwake-portrait.png",
      "cardImage": "assets/echoes/characters/captain-morgan-dreadwake-portrait.png",
      "width": 1024,
      "height": 1536,
      "description": []
    },
    {
      "name": "Bob D. Smith",
      "player": "Remsi Agius",
      "slug": "bob-d-smith",
      "universe": "pirate",
      "universeName": "Pirate Universe",
      "accent": "45, 137, 86",
      "borderColour": "dark green",
      "fullImage": "assets/echoes/characters/bob-d-smith-portrait.png",
      "cardImage": "assets/echoes/characters/bob-d-smith-portrait.png",
      "width": 1024,
      "height": 1536,
      "description": []
    },
    {
      "name": "Genesis Andromeda",
      "player": "Gianluca Amato",
      "slug": "genesis-andromeda",
      "universe": "cyberpunk",
      "universeName": "Cyberpunk Universe",
      "accent": "243, 146, 69",
      "borderColour": "orange",
      "fullImage": "assets/echoes/characters/genesis-andromeda.png",
      "cardImage": "assets/echoes/characters/genesis-andromeda.png",
      "width": 1024,
      "height": 1536,
      "description": []
    },
    {
      "name": "Ultimus Andromeda",
      "player": "Dathan Baldacchino",
      "slug": "ultimus-andromeda",
      "universe": "cyberpunk",
      "universeName": "Cyberpunk Universe",
      "accent": "165, 120, 227",
      "borderColour": "purple",
      "fullImage": "assets/echoes/characters/ultimus-andromeda.png",
      "cardImage": "assets/echoes/characters/ultimus-andromeda.png",
      "width": 1024,
      "height": 1536,
      "description": []
    },
    {
      "name": "Lyrielle Morwyn Cantorae",
      "player": "Solange Abdilla",
      "slug": "lyrielle-morwyn-cantorae",
      "universe": "fantasy",
      "universeName": "Fantasy Universe",
      "accent": "143, 206, 238",
      "borderColour": "light blue",
      "fullImage": "assets/echoes/characters/lyrielle-morwyn-cantorae.png",
      "cardImage": "assets/echoes/characters/lyrielle-morwyn-cantorae.png",
      "width": 1024,
      "height": 1535,
      "description": []
    },
    {
      "name": "Dariel Belmont",
      "player": "Daniel Mercieca",
      "slug": "dariel-belmont",
      "universe": "fantasy",
      "universeName": "Fantasy Universe",
      "accent": "153, 56, 71",
      "borderColour": "dark red",
      "fullImage": "assets/echoes/characters/dariel-belmont-portrait.png",
      "cardImage": "assets/echoes/characters/dariel-belmont-portrait.png",
      "width": 1024,
      "height": 1536,
      "description": []
    },
    {
      "name": "Jack Vinland",
      "player": "James Bianco",
      "slug": "jack-vinland",
      "universe": "fantasy",
      "universeName": "Fantasy Universe",
      "accent": "241, 241, 239",
      "borderColour": "white",
      "fullImage": "assets/echoes/characters/jack-vinland-portrait.png",
      "cardImage": "assets/echoes/characters/jack-vinland-portrait.png",
      "width": 1087,
      "height": 1447,
      "description": []
    }
  ]
};

/* Echoes of Eternity — a self-contained chronicle using the shared navigation and search. */
const ECHOES_UNIVERSES = [
  { id: 'pirate', name: 'Pirate Universe', place: 'The Pirate World', label: 'Across the treacherous seas', numeral: 'I', mark: 'compass' },
  { id: 'cyberpunk', name: 'Cyberpunk Universe', place: 'Night City', label: 'Through the streets of Night City', numeral: 'II', mark: 'circuit' },
  { id: 'fantasy', name: 'Fantasy Universe', place: 'Elysia', label: 'Within the magical lands of Elysia', numeral: 'III', mark: 'star' }
];

(() => {
  'use strict';
  const shell = document.getElementById('echoes-shell');
  const pages = [...shell.querySelectorAll('.echoes-page')];
  const nav = [...shell.querySelectorAll('[data-echoes-page]')];
  const detail = document.getElementById('echoes-character-detail-content');
  const back = document.getElementById('echoes-character-back');
  let lastCharacter = null;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function focusTitle(node) {
    if (!node) return;
    node.tabIndex = -1;
    node.focus({ preventScroll: true });
  }

  function applyTheme(universe = 'premise') {
    shell.dataset.universe = universe;
    document.body.dataset.echoesUniverse = universe;
  }

  function syncUniverseMusic(universe) {
    if (currentChronicle !== 'echoes') return;
    const isUniverse = ECHOES_UNIVERSES.some(item => item.id === universe);
    if (!isUniverse) {
      if (chronicleMusic.active) chronicleMusic.leave();
      return;
    }
    const key = `echoes-${universe}`;
    // Keep playback, pause state and the selected volume while browsing this world.
    // A different world uses the same fresh-start and outgoing-fade rules as a chronicle.
    if (chronicleMusic.active?.key !== key) chronicleMusic.enter(key);
  }

  function setActive(id, universe = id) {
    pages.forEach(page => {
      const active = page.id === `echoes-${id}`;
      page.classList.toggle('active', active);
      page.hidden = !active;
    });
    nav.forEach(button => {
      const active = button.dataset.echoesPage === universe;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    applyTheme(universe);
    syncUniverseMusic(universe);
  }

  function route(path, replace) {
    const hash = `#/echoes/${path}`;
    if (location.hash !== hash) history[replace ? 'replaceState' : 'pushState'](null, '', hash);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  function showPage(id, { replace = false, focus = true } = {}) {
    if (!['premise', ...ECHOES_UNIVERSES.map(item => item.id)].includes(id)) id = 'premise';
    setActive(id);
    route(id, replace);
    if (focus) focusTitle(document.getElementById(`echoes-${id}`).querySelector('h1, h2'));
  }

  function renderCharacter(character) {
    detail.replaceChildren();
    const profile = element('article', 'echoes-profile');
    profile.style.setProperty('--accent-rgb', character.accent);
    profile.dataset.character = character.slug;
    const portrait = element('figure', 'echoes-profile-art');
    const img = element('img');
    img.src = character.fullImage;
    img.alt = character.name;
    img.width = character.width;
    img.height = character.height;
    img.decoding = 'async';
    portrait.appendChild(img);
    const copy = element('div', 'echoes-profile-copy');
    copy.appendChild(element('p', 'eyebrow', character.universeName));
    copy.appendChild(element('h2', '', character.name));
    copy.appendChild(element('p', 'echoes-player-credit', `Played by ${character.player}`));
    const universe = ECHOES_UNIVERSES.find(item => item.id === character.universe);
    const rule = element('div', 'echoes-profile-rule');
    rule.setAttribute('aria-hidden', 'true');
    copy.appendChild(rule);
    const details = element('dl', 'echoes-profile-facts');
    [['World', universe.place], ['Class', character.className], ['Subclass', character.subclass]].forEach(([label, value]) => {
      if (!value) return;
      const row = element('div');
      row.append(element('dt', '', label), element('dd', '', value));
      details.appendChild(row);
    });
    copy.appendChild(details);
    if (character.description?.length) {
      const description = element('div', 'echoes-biography');
      character.description.forEach(paragraph => description.appendChild(element('p', '', paragraph)));
      copy.appendChild(description);
    }
    profile.append(portrait, copy);
    detail.appendChild(profile);
    window.ChronicleTools?.updateCharacterNavigation('echoes', character);
  }

  function openCharacter(character, { replace = false } = {}) {
    if (currentChronicle !== 'echoes' || !ECHOES_DATA.characters.includes(character)) return;
    lastCharacter = character;
    setActive('character-detail', character.universe);
    renderCharacter(character);
    back.textContent = `← Return to ${character.universeName}`;
    route(`character-${character.slug}`, replace);
    focusTitle(detail.querySelector('h2'));
  }

  function makeCard(character) {
    const card = element('button', 'echoes-character-card');
    card.type = 'button';
    card.dataset.character = character.slug;
    card.style.setProperty('--accent-rgb', character.accent);
    card.setAttribute('aria-label', `Open ${character.name}, played by ${character.player}`);
    const art = element('span', 'echoes-character-art');
    const img = element('img');
    img.src = character.fullImage;
    img.alt = character.name;
    img.width = character.width;
    img.height = character.height;
    img.loading = 'lazy';
    img.decoding = 'async';
    art.appendChild(img);
    const copy = element('span', 'echoes-character-copy');
    copy.appendChild(element('strong', 'echoes-character-name', character.name));
    copy.appendChild(element('span', 'echoes-character-player', `Played by ${character.player}`));
    const cta = element('span', 'echoes-character-open', 'View character');
    const arrow = element('span', '', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    cta.appendChild(arrow);
    copy.appendChild(cta);
    card.append(art, copy);
    card.addEventListener('click', () => openCharacter(character));
    return card;
  }

  ECHOES_DATA.characters.forEach(character => {
    document.getElementById(`echoes-${character.universe}-grid`).appendChild(makeCard(character));
  });
  nav.forEach(button => button.addEventListener('click', () => showPage(button.dataset.echoesPage)));
  back.addEventListener('click', () => {
    if (!lastCharacter) { showPage('premise'); return; }
    showPage(lastCharacter.universe, { replace: true, focus: false });
    shell.querySelector(`.echoes-character-card[data-character="${lastCharacter.slug}"]`).focus({ preventScroll: true });
  });

  window.EchoesChronicle = {
    characters: ECHOES_DATA.characters,
    universes: ECHOES_UNIVERSES,
    premise: ECHOES_DATA.premise,
    shell,
    detail,
    showPage,
    openCharacter,
    enter() { showPage('premise', { replace: true }); },
    renderFromHash(hash) {
      const page = hash.startsWith('echoes/') ? hash.slice(7) : 'premise';
      if (page.startsWith('character-')) {
        const character = ECHOES_DATA.characters.find(person => person.slug === page.slice(10));
        if (character) { openCharacter(character, { replace: true }); return; }
      }
      showPage(page, { replace: true });
    }
  };
})();
