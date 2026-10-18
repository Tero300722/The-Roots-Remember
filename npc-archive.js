/* Compact Roots Remember archive. Full biographies use the existing accessible dialog. */
(() => {
  'use strict';
  const PAGE_SIZE = 6;
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  function select(records, query = '', filter = 'all', requestedPage = 1) {
    const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
    const matches = records.filter(person => {
      const text = normalize([person.name, person.epithet, person.role,
        ...(Array.isArray(person.description) ? person.description : [person.description])].filter(Boolean).join(' '));
      return (filter === 'all' || person.importance === filter) && terms.every(term => text.includes(term));
    });
    if (terms.length) {
      const rank = person => {
        const name = normalize(person.name);
        return name === terms.join(' ') ? 3 : terms.every(term => name.includes(term)) ? 2
          : terms.every(term => normalize(person.role).includes(term)) ? 1 : 0;
      };
      matches.sort((a, b) => rank(b) - rank(a));
    }
    const pages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
    const page = Math.max(1, Math.min(requestedPage, pages));
    return { items: matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), total: matches.length, page, pages };
  }
  function el(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function mount(root, records) {
    if (!root) return;
    let query = '', filter = 'all', page = 1;
    const toolbar = el('div', 'npc-directory-toolbar');
    const search = el('div', 'npc-directory-search');
    const label = el('label', 'npc-directory-label', 'Find a familiar face');
    label.htmlFor = 'roots-npc-search';
    const input = el('input', 'npc-directory-input');
    input.id = label.htmlFor;
    input.type = 'search';
    input.placeholder = 'Search names, places, roles or lore…';
    input.autocomplete = 'off';
    const clear = el('button', 'npc-directory-clear', 'Clear');
    clear.type = 'button';
    clear.setAttribute('aria-label', 'Clear NPC search');
    search.append(label, input, clear);
    const filters = el('div', 'npc-directory-filters');
    filters.setAttribute('role', 'group');
    filters.setAttribute('aria-label', 'Filter NPCs by importance');
    const filterButtons = ['all', 'major', 'supporting'].map(value => {
      const count = value === 'all' ? records.length : records.filter(npc => npc.importance === value).length;
      const button = el('button', 'npc-directory-filter', `${value === 'all' ? 'All NPCs' : value === 'major' ? 'Major' : 'Supporting'} · ${count}`);
      button.type = 'button';
      button.addEventListener('click', () => { filter = value; page = 1; render(); });
      filters.appendChild(button);
      return { button, value };
    });
    toolbar.append(search, filters);
    const summary = el('p', 'npc-directory-summary');
    summary.setAttribute('role', 'status');
    summary.setAttribute('aria-live', 'polite');
    summary.setAttribute('aria-atomic', 'true');
    const grid = el('div', 'npc-directory-grid');
    grid.id = 'roots-npc-results';
    const empty = el('div', 'npc-directory-empty');
    empty.append(el('h3', '', 'No familiar faces found'), el('p', '', 'Try another name or clear the filters.'));
    const reset = el('button', 'btn btn-secondary', 'Show all NPCs');
    reset.type = 'button';
    reset.addEventListener('click', () => { query = ''; input.value = ''; filter = 'all'; page = 1; render(); input.focus(); });
    empty.appendChild(reset);
    const navigation = el('nav', 'npc-directory-pagination');
    navigation.setAttribute('aria-label', 'NPC archive pages');
    const previous = el('button', 'npc-directory-page', '← Previous');
    const next = el('button', 'npc-directory-page', 'Next →');
    previous.type = next.type = 'button';
    previous.setAttribute('aria-controls', grid.id);
    next.setAttribute('aria-controls', grid.id);
    const position = el('span', 'npc-directory-position');
    navigation.append(previous, position, next);
    root.replaceChildren(toolbar, summary, grid, empty, navigation);
    function render() {
      const result = select(records, query, filter, page);
      page = result.page;
      filterButtons.forEach(({ button, value }) => button.setAttribute('aria-pressed', String(filter === value)));
      clear.disabled = !query;
      summary.textContent = result.total ? `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, result.total)} of ${result.total} NPCs · Select a portrait to read their story` : '0 NPCs found';
      empty.hidden = result.total !== 0;
      navigation.hidden = result.pages <= 1;
      previous.disabled = page <= 1;
      next.disabled = page >= result.pages;
      position.textContent = `Page ${page} of ${result.pages}`;
      grid.replaceChildren(...result.items.map(person => {
        const button = el('button', 'npc-directory-card');
        button.type = 'button';
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-label', `Read about ${person.name}, ${person.role}`);
        const frame = el('span', 'npc-directory-portrait');
        const image = el('img', '');
        image.src = person.image;
        image.alt = '';
        image.width = person.imageSize?.[0] || 96;
        image.height = person.imageSize?.[1] || 96;
        if (person.portraitCrop) {
          const { x, y, scale } = person.portraitCrop;
          frame.dataset.focus = 'true';
          image.style.width = `${scale * 100}%`;
          image.style.transform = `translate(-${x}%, -${y}%)`;
        }
        frame.appendChild(image);
        image.loading = 'lazy';
        image.decoding = 'async';
        const copy = el('span', 'npc-directory-copy');
        copy.append(el('span', 'npc-directory-tier', person.importance === 'major' ? 'Major NPC' : 'Supporting NPC'),
          el('span', 'npc-directory-name', person.name));
        if (person.epithet) copy.appendChild(el('span', 'npc-directory-epithet', person.epithet));
        copy.append(el('span', 'npc-directory-role', person.role), el('span', 'npc-directory-read', 'Read profile →'));
        button.append(frame, copy);
        button.addEventListener('click', () => window.ChronicleTools.openNpc('trr', person.name, button));
        return button;
      }));
    }
    input.addEventListener('input', () => { query = input.value; page = 1; render(); });
    clear.addEventListener('click', () => { input.value = ''; query = ''; page = 1; render(); input.focus(); });
    previous.addEventListener('click', () => { page--; render(); });
    next.addEventListener('click', () => { page++; render(); });
    render();
  }
  window.NpcArchive = { mount, select };
})();
