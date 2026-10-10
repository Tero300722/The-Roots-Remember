/* Small conveniences for each chronicle. Campaign data and audio stay in their own files. */
(() => {
  'use strict';

  const names = { trr: 'The Roots Remember', grimwood: 'Into the Grimwood Manor' };
  const rosters = { trr: DATA.characters, grimwood: GRIMWOOD_CHARACTERS };
  const shells = { trr: siteShell, grimwood: grimwoodShell };
  const modal = document.getElementById('chronicle-tools-modal');
  const panel = modal.querySelector('.chronicle-tools-panel');
  const heading = document.getElementById('chronicle-tools-title');
  const kicker = document.getElementById('chronicle-tools-kicker');
  const content = document.getElementById('chronicle-tools-content');
  const queries = { trr: '', grimwood: '' };
  let returnFocus = null;
  let inertElements = [];

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Existing NPC records are the source of truth, including Grimwood's HTML records.
  const npcs = {
    trr: DATA.npcs.map(npc => ({ ...npc, paragraphs: [npc.description],
      target: [...siteShell.querySelectorAll('.npc-card')].find(card => card.querySelector('h3').textContent === npc.name) })),
    grimwood: [...grimwoodShell.querySelectorAll('.npc-card')].map(card => ({
      name: card.querySelector('.npc-copy h3').textContent,
      role: card.querySelector('.npc-role').textContent,
      image: card.querySelector('.npc-portrait img').getAttribute('src'),
      paragraphs: [...card.querySelectorAll('.npc-copy p')].map(p => p.textContent),
      target: card
    }))
  };

  function close({ restoreFocus = true } = {}) {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('chronicle-tools-open');
    inertElements.forEach(([node, value]) => { node.inert = value; });
    inertElements = [];
    const previous = returnFocus;
    returnFocus = null;
    if (restoreFocus && previous?.isConnected) previous.focus({ preventScroll: true });
  }

  function open(chronicle, title, category, trigger) {
    if (currentChronicle !== chronicle) return false;
    close({ restoreFocus: false });
    returnFocus = trigger || document.activeElement;
    modal.dataset.chronicle = chronicle;
    heading.textContent = title;
    kicker.textContent = category;
    content.replaceChildren();
    content.scrollTop = 0;
    panel.style.removeProperty('--person-accent');
    modal.hidden = false;
    document.body.classList.add('chronicle-tools-open');
    // Keep keyboard and assistive-technology navigation inside the open dialog.
    inertElements = [siteShell, grimwoodShell, chronicleSelector,
      document.getElementById('chronicle-music-player'), document.getElementById('map-modal')]
      .map(node => [node, node.inert]);
    inertElements.forEach(([node]) => { node.inert = true; });
    panel.focus({ preventScroll: true });
    return true;
  }

  modal.addEventListener('click', event => {
    if (event.target.closest('[data-tools-close]')) close();
  });
  document.addEventListener('keydown', event => {
    if (modal.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...panel.querySelectorAll('button:not([disabled]), input:not([disabled]), [href], [tabindex="0"]')]
      .filter(node => !node.hidden && node.offsetParent !== null);
    if (!focusable.length) { event.preventDefault(); panel.focus(); return; }
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel)) {
      event.preventDefault(); first.focus();
    }
  });
  window.addEventListener('popstate', () => close({ restoreFocus: false }));

  function showPerson(chronicle, person, type, trigger) {
    if (!open(chronicle, person.name, type === 'character' ? 'Character Profile' : 'NPC Archive', trigger)) return;
    panel.style.setProperty('--person-accent', person.deceased ? '156, 156, 156' : person.accent || (chronicle === 'grimwood' ? '221, 126, 86' : '212, 173, 103'));
    const profile = element('article', 'recap-person' + (person.deceased ? ' is-deceased' : ''));
    const portrait = element('div', 'recap-person-portrait');
    const img = element('img');
    img.src = person.fullImage || person.image;
    img.alt = person.name;
    img.decoding = 'async';
    portrait.appendChild(img);
    const copy = element('div', 'recap-person-copy');
    if (person.player) copy.appendChild(element('p', 'recap-person-credit', `Played by ${person.player}`));
    copy.appendChild(element('p', 'recap-person-role', type === 'character'
      ? `${person.className} · ${person.subclass}` : person.role));
    const paragraphs = type === 'character' ? person.description || [] : person.paragraphs;
    paragraphs.forEach(text => copy.appendChild(element('p', '', text)));
    if (person.deceased && person.death) copy.appendChild(element('p', 'recap-person-memorial', `Fell during ${person.death.session}`));
    if (type === 'character') {
      const button = element('button', 'btn btn-primary recap-person-full', person.deceased ? 'View memorial' : 'View full profile');
      button.type = 'button';
      button.addEventListener('click', () => {
        close({ restoreFocus: false });
        visitCharacter(chronicle, person);
      });
      copy.appendChild(button);
    }
    profile.append(portrait, copy);
    content.appendChild(profile);
  }

  // Link full names and unambiguous first names; leave the recap text exactly as written.
  function linkRecaps(chronicle) {
    const aliases = new Map();
    const people = [
      ...rosters[chronicle].map(person => ({ person, type: 'character' })),
      ...npcs[chronicle].map(person => ({ person, type: 'npc' }))
    ];
    people.forEach(entry => {
      const words = entry.person.name.split(/\s+/);
      const first = /^(baron|lady|lord|sir)$/i.test(words[0]) ? words[1] : words[0];
      [entry.person.name, first].forEach(alias => {
        if (!alias) return;
        const key = alias.toLocaleLowerCase();
        if (!aliases.has(key)) aliases.set(key, entry);
        else if (aliases.get(key)?.person !== entry.person) aliases.set(key, null);
      });
    });
    const options = [...aliases].filter(([, entry]) => entry).map(([alias]) => alias).sort((a, b) => b.length - a.length);
    if (!options.length) return;
    const pattern = new RegExp(options.map(escapeRegex).join('|'), 'giu');
    const word = /[\p{L}\p{N}_]/u;
    shells[chronicle].querySelectorAll('#latest-recap p, .session-body-inner p').forEach(paragraph => {
      if (paragraph.dataset.namesLinked === 'true') return;
      const text = paragraph.textContent;
      const fragment = document.createDocumentFragment();
      let end = 0;
      for (const match of text.matchAll(pattern)) {
        const before = text[match.index - 1] || '';
        const after = text[match.index + match[0].length] || '';
        if (word.test(before) || word.test(after)) continue;
        fragment.appendChild(document.createTextNode(text.slice(end, match.index)));
        const entry = aliases.get(match[0].toLocaleLowerCase());
        const button = element('button', 'recap-name', match[0]);
        button.type = 'button';
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-label', `Read about ${entry.person.name}`);
        button.title = `Read about ${entry.person.name}`;
        button.addEventListener('click', () => showPerson(chronicle, entry.person, entry.type, button));
        fragment.appendChild(button);
        end = match.index + match[0].length;
      }
      fragment.appendChild(document.createTextNode(text.slice(end)));
      paragraph.replaceChildren(fragment);
      paragraph.dataset.namesLinked = 'true';
    });
  }

  function focusTarget(node) {
    if (!node) return;
    if (!['button', 'a', 'input', 'select', 'textarea'].includes(node.tagName.toLowerCase()) && !node.hasAttribute('tabindex')) {
      node.tabIndex = -1;
    }
    node.focus({ preventScroll: true });
    node.scrollIntoView({ block: 'start', behavior: 'auto' });
  }

  function visitCharacter(chronicle, character) {
    if (currentChronicle !== chronicle) return;
    if (chronicle === 'grimwood') openGrimwoodCharacter(character);
    else if (character.deceased) {
      navigateTo('remembered');
      const index = DATA.characters.filter(item => item.deceased && item.death).indexOf(character);
      focusTarget(rememberedPlayerList.children[index]);
      return;
    } else openCharacter(character);
    const container = chronicle === 'grimwood' ? grimwoodCharacterDetailContent : characterDetailContent;
    const title = container.querySelector('h2');
    title.tabIndex = -1;
    title.focus({ preventScroll: true });
  }

  function visitPage(chronicle, page, target) {
    if (currentChronicle !== chronicle) return;
    if (chronicle === 'grimwood') showGrimwoodPage(page);
    else navigateTo(page);
    focusTarget(target);
  }

  const index = { trr: [], grimwood: [] };
  function addEntry(chronicle, title, type, text, visit) {
    index[chronicle].push({ title, type, text, visit, titleKey: normalize(title), key: normalize(`${title} ${type} ${text}`) });
  }
  Object.keys(names).forEach(chronicle => {
    rosters[chronicle].forEach(person => addEntry(chronicle, person.name, person.deceased ? 'The Remembered' : 'Character',
      [person.player, person.className, person.subclass, person.cardDescription, ...(person.description || []),
        ...(person.death ? Object.values(person.death) : [])].filter(Boolean).join(' · '),
      () => visitCharacter(chronicle, person)));
    npcs[chronicle].forEach(person => addEntry(chronicle, person.name, 'NPC',
      [person.role, ...person.paragraphs].join(' · '), () => visitPage(chronicle, 'npcs', person.target)));
    shells[chronicle].querySelectorAll('.session-card').forEach(card => {
      const head = card.querySelector('.session-head');
      const body = card.querySelector('.session-body-inner');
      body.inert = !card.classList.contains('open');
      head.addEventListener('click', () => { body.inert = !card.classList.contains('open'); });
      const title = `${card.querySelector('.session-number').textContent} — ${card.querySelector('h3').textContent}`;
      addEntry(chronicle, title, 'Session', card.querySelector('.session-body-inner').textContent, () => {
        card.classList.add('open');
        head.setAttribute('aria-expanded', 'true');
        body.inert = false;
        visitPage(chronicle, 'sessions', head);
      });
    });
    linkRecaps(chronicle);
  });
  DATA.quests.forEach(quest => {
    const target = [...siteShell.querySelectorAll('.quest-feature-card, .ledger-card')]
      .find(card => card.querySelector('h3, h4')?.textContent === quest.title);
    addEntry('trr', quest.title, 'Quest', [quest.status, quest.givenBy, quest.location, quest.description, ...quest.objectives].join(' · '),
      () => visitPage('trr', 'quests', target));
  });
  addEntry('trr', 'Kingdom of Valemere', 'Map', 'Campaign map · roads, settlements, regions and landmarks',
    () => visitPage('trr', 'map', document.getElementById('open-map')));

  function excerpt(text, query) {
    const terms = query.trim().split(/\s+/).filter(Boolean);
    const lower = text.toLocaleLowerCase();
    const positions = terms.map(term => lower.indexOf(term.toLocaleLowerCase())).filter(n => n >= 0);
    let start = Math.max(0, (positions.length ? Math.min(...positions) : 0) - 65);
    if (start) {
      const space = text.indexOf(' ', start);
      if (space !== -1) start = space + 1;
    }
    const sample = text.slice(start, start + 215);
    return (start ? '…' : '') + sample + (start + sample.length < text.length ? '…' : '');
  }

  function highlight(node, text, query) {
    const terms = query.trim().split(/\s+/).filter(Boolean).sort((a, b) => b.length - a.length);
    if (!terms.length) { node.textContent = text; return; }
    const pattern = new RegExp(terms.map(escapeRegex).join('|'), 'giu');
    let end = 0;
    for (const match of text.matchAll(pattern)) {
      node.appendChild(document.createTextNode(text.slice(end, match.index)));
      node.appendChild(element('mark', '', match[0]));
      end = match.index + match[0].length;
    }
    node.appendChild(document.createTextNode(text.slice(end)));
  }

  function showSearch(chronicle, trigger) {
    if (!open(chronicle, 'Search the Chronicle', names[chronicle], trigger)) return;
    const label = element('label', 'chronicle-search-label', 'Search names, players, classes, places or recaps');
    label.htmlFor = 'chronicle-search-input';
    const input = element('input', 'chronicle-search-input');
    input.id = 'chronicle-search-input';
    input.type = 'search';
    input.placeholder = chronicle === 'trr' ? 'Try Orthen, Veridium or Session V…' : 'Try Edwin, Druid or Grimwood…';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.maxLength = 120;
    input.value = queries[chronicle];
    input.setAttribute('aria-controls', 'chronicle-search-results');
    const status = element('p', 'chronicle-search-status');
    status.setAttribute('role', 'status');
    const results = element('div', 'chronicle-search-results');
    results.id = 'chronicle-search-results';
    content.append(label, input, status, results);
    function renderResults() {
      queries[chronicle] = input.value;
      results.replaceChildren();
      const query = normalize(input.value);
      if (!query) {
        status.textContent = `Search ${index[chronicle].length} records in ${names[chronicle]}.`;
        return;
      }
      const terms = query.split(' ');
      const matches = index[chronicle].filter(entry => terms.every(term => entry.key.includes(term)))
        .map(entry => ({ entry, score: (entry.titleKey === query ? 100 : entry.titleKey.startsWith(query) ? 60 : 0)
          + terms.filter(term => entry.titleKey.includes(term)).length * 15 }))
        .sort((a, b) => b.score - a.score);
      status.textContent = matches.length ? `${matches.length} ${matches.length === 1 ? 'result' : 'results'} in ${names[chronicle]}`
        : 'No matches in this chronicle. Try another name or keyword.';
      matches.forEach(({ entry }) => {
        const button = element('button', 'chronicle-search-result');
        button.type = 'button';
        button.appendChild(element('span', 'chronicle-search-type', entry.type));
        const title = element('strong');
        highlight(title, entry.title, input.value);
        const snippet = element('span', 'chronicle-search-snippet');
        highlight(snippet, excerpt(entry.text, input.value), input.value);
        button.append(title, snippet);
        button.addEventListener('click', () => { close({ restoreFocus: false }); entry.visit(); });
        results.appendChild(button);
      });
    }
    input.addEventListener('input', renderResults);
    input.addEventListener('keydown', event => {
      const buttons = [...results.querySelectorAll('button')];
      if (event.isComposing || !buttons.length) return;
      if (event.key === 'ArrowDown') { event.preventDefault(); buttons[0].focus(); }
      if (event.key === 'ArrowUp') { event.preventDefault(); buttons.at(-1).focus(); }
      if (event.key === 'Enter') { event.preventDefault(); buttons[0].click(); }
    });
    results.addEventListener('keydown', event => {
      if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
      const buttons = [...results.querySelectorAll('button')];
      const at = buttons.indexOf(document.activeElement);
      if (at < 0) return;
      event.preventDefault();
      const next = at + (event.key === 'ArrowDown' ? 1 : -1);
      if (next < 0) input.focus();
      else buttons[Math.min(next, buttons.length - 1)].focus();
    });
    renderResults();
    input.focus({ preventScroll: true });
  }

  document.querySelectorAll('[data-chronicle-search]').forEach(button => {
    button.addEventListener('click', () => showSearch(button.dataset.chronicleSearch, button));
  });

  function updateCharacterNavigation(chronicle, character) {
    const container = chronicle === 'trr' ? characterDetailContent : grimwoodCharacterDetailContent;
    const roster = rosters[chronicle].filter(person => Boolean(person.deceased) === Boolean(character.deceased));
    const position = roster.indexOf(character);
    if (position < 0 || roster.length < 2) return;
    const nav = element('nav', 'character-browse');
    nav.setAttribute('aria-label', 'Browse characters');
    nav.style.setProperty('--browse-accent', character.accent);
    [-1, 1].forEach(direction => {
      const next = roster[(position + direction + roster.length) % roster.length];
      const button = element('button', 'character-browse-button');
      button.type = 'button';
      button.dataset.characterStep = String(direction);
      button.setAttribute('aria-label', `${direction < 0 ? 'Previous' : 'Next'} character: ${next.name}`);
      button.append(element('span', 'character-browse-direction', direction < 0 ? '← Previous' : 'Next →'),
        element('strong', '', next.name));
      button.addEventListener('click', () => {
        if (currentChronicle !== chronicle) return;
        if (chronicle === 'trr') openCharacter(next);
        else openGrimwoodCharacter(next);
        container.querySelector(`[data-character-step="${direction}"]`).focus({ preventScroll: true });
      });
      nav.appendChild(button);
      if (direction < 0) {
        const count = element('span', 'character-browse-count', `${position + 1} / ${roster.length}`);
        count.setAttribute('aria-label', `${character.name}, character ${position + 1} of ${roster.length}`);
        nav.appendChild(count);
      }
    });
    container.prepend(nav);
  }

  // Collapse is presentation-only: it never pauses, seeks, or changes the volume.
  const player = document.getElementById('chronicle-music-player');
  const collapse = player.querySelector('[data-music-collapse]');
  collapse.addEventListener('click', () => {
    const collapsed = player.classList.toggle('is-collapsed');
    document.body.classList.toggle('music-is-collapsed', collapsed);
    collapse.setAttribute('aria-expanded', String(!collapsed));
    collapse.setAttribute('aria-label', collapsed ? 'Expand music player' : 'Minimise music player');
    collapse.title = collapsed ? 'Expand music player' : 'Minimise music player';
  });

  window.ChronicleTools = { close, updateCharacterNavigation };
})();
