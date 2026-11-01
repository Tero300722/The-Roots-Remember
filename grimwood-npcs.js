/* A searchable, compact NPC directory for Grimwood Manor. */
(() => {
  'use strict';
  const people = [
    {
      name: 'Baron Vane Grimwood', role: 'Baron of Grimwood Manor', tier: 'Manor Host', importance: 'major',
      image: 'assets/grimwood/npcs/full/baron-vane-grimwood.webp', focus: 'center 25%',
      paragraphs: [
        'Few had heard the name Vane Grimwood until recent years.',
        "Then, seemingly from nowhere, came the estate, the wealth, and the title. Grimwood's name began appearing among merchants and nobility alike, accompanied by stories of extravagant purchases, valuable holdings, and a fortune whose true extent remains a matter of speculation.",
        'Where this sudden prosperity came from is uncertain. Some attribute it to shrewd investments, others to distant inheritance or simple good fortune. The Baron himself has offered little explanation.',
        'Those who have met Baron Vane Grimwood describe a tall, imposing man with long black hair swept neatly back, distinguished by a single streak of silver. He is unfailingly composed and courteous, though there is something unusually intense about his gaze. Even when smiling warmly, he has a habit of making people feel as though they are being carefully studied.'
      ]
    },
    {
      name: 'Alistair Percival Bartholomew Wrennington', shortName: 'Al', role: 'Former royal advisor · Scholar and statesman', tier: 'Major NPC', importance: 'major',
      image: 'assets/grimwood/npcs/full/alistair-percival-bartholomew-wrennington.webp', focus: 'center 24%',
      paragraphs: [
        'Alistair Percival Bartholomew Wrennington, more commonly known as Al, was a respected scholar, statesman, and royal advisor who served King Aurelius II during the early years of his reign. Known for his sharp intellect, meticulous nature, and dry wit, Al was frequently entrusted with investigating matters deemed too unusual or sensitive for the Crown’s ordinary officials.',
        'In CR 260, reports reached the royal court of a manor that had appeared seemingly overnight where no estate had previously stood. With no records of its construction and little known of its owner, the sudden appearance of Grimwood Manor quickly attracted the Crown’s attention.',
        'Al was dispatched to investigate the estate alongside a small contingent of royal guards. He entered Grimwood Manor shortly thereafter.',
        'Neither Al nor the guards were ever seen again. Search parties found no trace of the missing men, and before a proper investigation could be mounted, Grimwood Manor itself disappeared as mysteriously as it had arrived. Al’s fate remains one of the stranger unresolved mysteries of King Aurelius II’s reign.'
      ]
    },
    {
      name: 'Vice Emberclaw', role: 'Mining magnate', tier: 'Guest of Note', importance: 'supporting',
      image: 'assets/grimwood/npcs/full/vice-emberclaw.webp', focus: 'center 24%',
      paragraphs: [
        'Vice Emberclaw built his fortune beneath the Ironpeak Mountains, where his mining company extracts iron, coal, and smaller quantities of precious metals. His wealth has earned him a place among respectable society, though older noble families sometimes regard him more as a businessman than a true aristocrat.',
        'Vice is broad and imposing, with dull black scales and several old scars across his hands and snout. Unlike many of the guests, he dresses practically: a well-tailored dark coat, heavy boots, and only enough jewelry to demonstrate that he can afford it.',
        'He is blunt, practical, and difficult to impress. Vice dislikes excessive ceremony and has little patience for nobles who inherited everything they own. He respects people who work for their success, making adventurers considerably more interesting to him than most of Grimwood’s guests.'
      ]
    },
    {
      name: 'Charlotte Fleaklight', role: 'Noble widow of the Verdant Reach', tier: 'Guest of Note', importance: 'supporting',
      image: 'assets/grimwood/npcs/full/charlotte-fleaklight.webp', focus: 'center 22%',
      paragraphs: [
        'Charlotte Fleaklight is the widow of a prominent nobleman from the Verdant Reach, a man remembered as one of the region’s strongest advocates for druidic rights and protections. His considerable fortune funded sanctuaries, legal campaigns, protected woodland, and efforts to curb the exploitation of druidic communities.',
        'Following his death, that fortune passed almost entirely to Charlotte.',
        'Unfortunately, Charlotte could not care less about his life’s work.',
        'Since inheriting his estate, she has steadily withdrawn funding from her husband’s causes and redirected the money toward lavish parties, expensive clothing, exotic luxuries, travel, and whatever happens to amuse her that month. She rarely speaks badly of her late husband; she simply considers his ideals an unfortunate waste of perfectly good money.'
      ]
    },
    {
      name: 'Empior Windveil', role: 'Royal Academy patron · Admissions council member', tier: 'Guest of Note', importance: 'supporting',
      image: 'assets/grimwood/npcs/full/empior-windveil.webp', focus: 'center 23%',
      paragraphs: [
        'Empior Windveil is one of the most influential figures associated with the prestigious Royal Academy of Valemere. Though not primarily known as a scholar himself, his extensive financial contributions have funded new wings, research programs, scholarships, and the acquisition of rare magical texts and artifacts.',
        'More importantly, Windveil holds a powerful position on the Academy’s admissions council. Few students enter the Academy without his approval.',
        'Applicants may spend years studying for the Academy’s examinations, but exceptional grades alone are rarely enough. Windveil believes that the Academy’s students must possess more than intelligence—they must demonstrate ambition, discipline, composure, and the potential to someday enhance the Academy’s reputation.',
        'This has made an audience with Empior nearly as intimidating as the entrance examinations themselves.'
      ]
    },
    {
      name: 'Adam Newport', role: 'Independent porter of the Emberford Docks', tier: 'Guest of Note', importance: 'supporting',
      image: 'assets/grimwood/npcs/full/adam-newport.webp', focus: 'center 22%',
      paragraphs: [
        'Adam Newport is one of the most successful independent porters operating from the Emberford Docks. For decades, his ships have carried cargo between distant ports and the markets of Valemere, earning him both considerable wealth and a reputation for getting valuable goods where they need to go.',
        'Spices, medicines, foreign textiles, enchanted materials, rare wines, and countless mundane necessities have passed through Newport’s hands. Many merchants throughout Valemere owe at least some portion of their success to his trade routes.',
        'But there is one possession Adam values above his fortune: The Righteous Anne.',
        'His ship is his pride and joy. Ask Adam about his wealth and he’ll shrug. Ask about The Righteous Anne and you’ll struggle to stop him talking. He knows every plank, sail, and repair the vessel has received and becomes genuinely offended if anyone refers to her as simply “a boat.”',
        'Despite his success, Adam retains much of the personality of a working sailor. He is boisterous, sociable, outspoken, and somewhat rough around the edges, making him stand out considerably among Grimwood’s carefully mannered aristocratic guests.'
      ]
    }
  ];

  const root = document.getElementById('grimwood-npc-directory');
  const dialog = document.getElementById('grimwood-npc-dialog');
  if (!root || !dialog) return;
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  const make = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const toolbar = make('div', 'grimwood-directory-tools');
  const searchWrap = make('label', 'grimwood-directory-search');
  searchWrap.append(make('span', 'grimwood-directory-search-label', 'Search the manor records'));
  const search = make('input', 'grimwood-directory-input');
  search.type = 'search';
  search.placeholder = 'Search names, roles, or details…';
  search.setAttribute('aria-label', 'Search Grimwood Manor NPCs');
  search.autocomplete = 'off';
  searchWrap.append(search);
  const filters = make('div', 'grimwood-directory-filters');
  filters.setAttribute('role', 'group');
  filters.setAttribute('aria-label', 'Filter the NPC archive');
  let activeFilter = 'all';
  const options = [
    ['all', 'All figures'],
    ['major', 'Major NPCs'],
    ['supporting', 'Other guests']
  ];
  const buttons = options.map(([value, label]) => {
    const button = make('button', 'grimwood-directory-filter', label);
    button.type = 'button';
    button.dataset.filter = value;
    button.setAttribute('aria-pressed', String(value === activeFilter));
    button.addEventListener('click', () => { activeFilter = value; render(); });
    filters.append(button);
    return button;
  });
  toolbar.append(searchWrap, filters);
  const status = make('p', 'grimwood-directory-status');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  const grid = make('div', 'grimwood-directory-grid');
  const empty = make('div', 'grimwood-directory-empty');
  empty.append(make('strong', '', 'No figures found'), make('span', '', 'Try a different search or filter.'));
  root.replaceChildren(toolbar, status, grid, empty);

  const modalTitle = dialog.querySelector('[data-profile-title]');
  const modalRole = dialog.querySelector('[data-profile-role]');
  const modalTier = dialog.querySelector('[data-profile-tier]');
  const modalImage = dialog.querySelector('[data-profile-image]');
  const modalBody = dialog.querySelector('[data-profile-body]');
  const close = dialog.querySelector('[data-profile-close]');
  close?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

  function openProfile(person, trigger) {
    modalTitle.textContent = person.shortName ? `${person.shortName} · ${person.name}` : person.name;
    modalRole.textContent = person.role;
    modalTier.textContent = person.tier;
    modalImage.src = person.image;
    modalImage.alt = person.name;
    modalImage.style.objectPosition = person.focus || 'center';
    modalBody.replaceChildren(...person.paragraphs.map(text => make('p', '', text)));
    dialog.showModal();
    close?.focus();
    dialog.addEventListener('close', () => trigger.focus(), { once: true });
  }

  function render() {
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter)));
    const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    const matches = people.filter(person => {
      const text = normalize([person.name, person.shortName, person.role, person.tier, ...person.paragraphs].join(' '));
      return (activeFilter === 'all' || person.importance === activeFilter) && terms.every(term => text.includes(term));
    });
    status.textContent = `${matches.length} ${matches.length === 1 ? 'figure' : 'figures'} in the archive`;
    empty.hidden = matches.length > 0;
    grid.hidden = matches.length === 0;
    grid.replaceChildren(...matches.map(person => {
      const card = make('button', `grimwood-directory-card${person.importance === 'major' ? ' is-major' : ''}`);
      card.type = 'button';
      card.setAttribute('aria-haspopup', 'dialog');
      card.setAttribute('aria-label', `Open profile: ${person.shortName ? `${person.shortName}, ` : ''}${person.name}, ${person.role}`);
      const art = make('span', 'grimwood-directory-art');
      const image = document.createElement('img');
      image.src = person.image;
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.style.objectPosition = person.focus || 'center';
      art.append(image);
      const copy = make('span', 'grimwood-directory-copy');
      copy.append(make('span', 'grimwood-directory-tier', person.tier));
      copy.append(make('span', 'grimwood-directory-name', person.shortName || person.name));
      if (person.shortName) copy.append(make('span', 'grimwood-directory-fullname', person.name));
      copy.append(make('span', 'grimwood-directory-role', person.role));
      copy.append(make('span', 'grimwood-directory-cta', 'Read profile  ↗'));
      card.append(art, copy);
      card.addEventListener('click', () => openProfile(person, card));
      return card;
    }));
  }
  search.addEventListener('input', render);
  render();
})();
