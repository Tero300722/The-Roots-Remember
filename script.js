const DATA = {
  characters: [
    {
      slug: "aurelius-tempestine",
      name: "Aurelius Tempestine",
      player: "Dathan Baldacchino",
      sheetImage: "assets/characters/full/aurelius-tempestine.webp",
      cardImage: "assets/characters/cards/aurelius-tempestine.webp",
      fullImage: "assets/characters/full/aurelius-tempestine.webp",
      className: "Monk",
      subclass: "Warrior of the Storm Dragon",
      accent: "151, 113, 255",
      cardDescription: "A disciplined elven martial artist from distant Vidrora, striving to master his strength, emotions, and pride.",
      description: [
        "Aurelius Tempestine is a young elven martial artist who hails from Vidrora, a distant continent far from the lands in which he now travels. Having grown up in harsh circumstances, Aurelius developed a strong sense of independence, determination, and adaptability from an early age.",
        "Now carrying the Tempestine name, Aurelius follows a disciplined martial path inspired by the power and presence of dragons. He is generally focused and determined, constantly striving to keep his strength, emotions, and pride under control.",
        "Aurelius seeks to use his abilities for something greater than himself. Far from his homeland of Vidrora, he travels as an adventurer, hoping to prove through his actions what kind of person he chooses to become."
      ],
    },
    {
      slug: "cassian-caelaris",
      name: "Cassian Caelaris",
      player: "Matthias Martino",
      sheetImage: "assets/characters/full/cassian-caelaris.webp",
      cardImage: "assets/characters/cards/cassian-caelaris.webp",
      fullImage: "assets/characters/full/cassian-caelaris.webp",
      className: "Paladin",
      subclass: "Oath of the Noble Genies",
      accent: "218, 68, 61",
      cardDescription: "A calm and disciplined noble paladin who protects his allies through swordsmanship, mobility, and elemental power.",
      description: [
        "Cassian Caelaris is a 20-year-old Winged Tiefling Paladin of House Caelaris, a noble family devoted to the Noble Genies and the four elements. Calm, disciplined, loyal, and observant, Cassian values honor, justice, protection, and responsibility, though his past has left him with a harder edge beneath his noble demeanor.",
        "In combat, Cassian fights with Dawnbringer and a shield, combining disciplined swordsmanship, mobility, and elemental power. He prefers a tactical and protective fighting style, using Fire, Water, Earth, and Air to adapt to the battlefield, defend allies, and strike when necessary."
      ],
    },
    {
      slug: "leoric-everheart",
      name: "Leoric Everheart",
      player: "Daniel Mercieca",
      sheetImage: "assets/characters/full/leoric-everheart.webp",
      cardImage: "assets/characters/cards/leoric-everheart.webp",
      fullImage: "assets/characters/full/leoric-everheart.webp",
      className: "Wizard / Bard",
      subclass: "Bibliomancy",
      accent: "224, 183, 104",
      cardDescription: "A pacifistic Khoravar scholar, librarian, and magical tinkerer who prefers resolving conflict through persuasion before turning to magic.",
      description: [
        "Leoric is a 5'8\" Khoravar with short brown hair and amber eyes. He is often seen wearing a red tie paired with formal attire, with a spellbook kept at his hip. When he was young, he was often seen alongside his best friend Cassian, whose family is known for its renowned paladins. The two occasionally found themselves in trouble with Cassian's family because of their escapades.",
        "Leoric has spent most of his life studying the arcane arts and is currently enrolled at Silvercrest Academy, where he also works part time as a librarian. In his free time, he takes part in the Magical Crafts Club, tinkering with and crafting magical gadgets that either intrigue him or have been requested through the club.",
        "Outside of student life, Leoric pursues the role of a mediator. Fueled by his pacifistic nature, he tries to resolve conflicts as peacefully as possible, ideally with both sides walking away with something from the encounter. He usually relies on his affinity for persuasion, but if push comes to shove, he may use magical means to bring a conflict to an end."
      ],
    },
    {
      slug: "morvan-nyx",
      name: "Morvan Nyx",
      player: "Remsi Agius",
      sheetImage: "assets/characters/full/morvan-nyx.webp",
      cardImage: "assets/characters/cards/morvan-nyx.webp",
      fullImage: "assets/characters/full/morvan-nyx.webp",
      className: "Fighter",
      subclass: "Umbral Tempest",
      accent: "49, 78, 175",
    },
    {
      slug: "syrsa-orsona",
      name: "Syrsa Orsona",
      player: "James Bianco",
      sheetImage: "assets/characters/full/syrsa-orsona.webp",
      cardImage: "assets/characters/cards/syrsa-orsona.webp",
      fullImage: "assets/characters/full/syrsa-orsona.webp",
      className: "Bard",
      subclass: "College of the Unbound Song",
      accent: "255, 220, 58",
    },
    {
      slug: "vaeloryn-starsong",
      name: "Vaeloryn Starsong",
      player: "Gianluca Amato",
      sheetImage: "assets/characters/full/vaeloryn-starsong.webp",
      cardImage: "assets/characters/cards/vaeloryn-starsong.webp",
      fullImage: "assets/characters/full/vaeloryn-starsong.webp",
      className: "Warlock",
      subclass: "Eightfold Covenant",
      accent: "237, 132, 45",
      cardDescription: "Bold, heroic, and eager to charge first, Vaeloryn fights on the front line with martial skill, magic, and spectral pact weapons.",
      description: [
        "Bold, confident, and possessed of a heroic ego to match, Vaeloryn is always the first to throw himself into danger and often assumes everyone else will follow. He carries himself like the hero of a story already being written, meeting impossible odds with bravado, determination, and an almost reckless eagerness to prove himself.",
        "In battle, he fights on the front lines, weaving martial skill and magic together while calling upon the Vestiges—souls of the departed that manifest through him as spectral pact weapons with mystical abilities."
      ],
    }
  ],
  quests: [
    {
      title: "Investigate the Robbery of Stardust and Slag",
      status: "In Progress",
      state: "active",
      givenBy: "Orthen Solaris",
      location: "Industrial Area of Elaris",
      image: "assets/orthen-solaris.webp",
      description: "Orthen started off the party's adventure by sending them out of Valemere and into the industrial area of Elaris. Their task is to investigate who robbed Stardust and Slag, uncover why the supplier was targeted, and bring the person responsible for the break-in and theft to justice.",
      objectives: [
        "Investigate the break-in at Stardust and Slag",
        "Discover who carried out the robbery and why",
        "Bring the person responsible to justice"
      ]
    }
  ],
  npcs: [
    {
      name: "Orthen Solaris",
      role: "Quest Giver • House Solaris",
      importance: "major",
      image: "assets/npcs/cards/orthen-solaris.webp",
      description: "Orthen is a Leonin and a descendant of the Solaris family. He serves as the party's quest giver and has spent the last 18 years searching for his missing brother, who vanished after being sent on a mission. Even after all that time, Orthen still holds on to the hope that one day he will find him—dead or alive."
    },
    {
      name: "Pip",
      role: "Owner • The Middle Fiddler Tavern/Inn",
      importance: "supporting",
      image: "assets/npcs/cards/pip.webp",
      description: "Pip owns and runs The Middle Fiddler Tavern/Inn. She keeps the entire business moving and, as part of the job, deals with drunkards on a daily basis."
    },
    {
      name: "Sebastian",
      role: "Orthen Solaris' Butler",
      importance: "supporting",
      image: "assets/npcs/cards/sebastian.webp",
      description: "Sebastian is Orthen's butler and has remained by his side for many years, becoming a familiar and dependable presence in the Solaris household."
    }
  ],
  sessions: [
    {
      number: "Session I",
      title: "A New Beginning in Valemere",
      paragraphs: [
        "Aurelius Tempestine arrived in the Kingdom of Valemere for the first time, unaware that the guards at the gate had quietly stolen his coin. Still, the lively streets ahead filled him with hope for a fresh beginning.",
        "His first stop was the Middle Fiddler Tavern, packed with people celebrating the upcoming 10-Year Veridium Anniversary. Inside, Syrsa Orsona’s music had the entire tavern captivated, while childhood brothers Cassian Caelaris and Leoric Everheart relaxed together at the back.",
        "Elsewhere, Vaeloryn Starsong found himself chasing a young white vulpin who had stolen his gold. The chase ended when the cub crashed into the mysterious Morvan Nyx. After a tearful confession—and the unfortunate revelation that the gold had been thrown somewhere into the market—Vaeloryn accepted his loss and headed toward the anniversary celebrations alongside Morvan.",
        "At the plaza, the King unveiled Valemere’s future: Veridium, an endless source of energy for the kingdom. Then everything went wrong. The machine overloaded, sending strange energy across the plaza. Copper statues and armor came alive, attacking civilians as panic spread through the streets.",
        "Six strangers stood together and fought back. After Leoric discovered that destroying the machine was the only way to stop the constructs, a Leonin warrior descended from the rooftops—Orthen Solaris—hurling his lance into the battle. Together, they destroyed the machine.",
        "Instead of being celebrated as heroes, however, the six were blamed for the disaster. Orthen defended them, saving them from imprisonment, but they were placed under house arrest beneath his supervision.",
        "And so, six strangers ended the night beneath Orthen’s roof, unaware that this was only the beginning of their journey."
      ]
    },
    {
      number: "Session II",
      title: "The Lion's Trial",
      paragraphs: [
        "The group arrived at Orthen Solaris' home, where they finally had the chance to speak about everything that had happened. But Orthen had something else in mind.",
        "While his butler, Sebastian, prepared dinner, Orthen brought the six into his training room and challenged them himself. Six against one. Despite being a 64-year-old Leonin and admittedly rusty, Orthen fought with a grin on his face, constantly pushing them to stop holding back. As they listened, the sparring quickly became far more aggressive, with both sides throwing everything they had into the fight.",
        "The battle only ended when Sebastian calmly entered the room to announce that dinner was ready.",
        "Around the table, Orthen revealed the truth: the fight was never about winning. He wanted to understand who they were through the way they fought. As the setting sun filled the room with a golden light, Orthen critiqued each of them and asked a much bigger question: What do you want from your life?",
        "One by one, they answered honestly, and Orthen offered what advice he could. Eventually, he pulled out several mission requests and chose one for the group. A mineral shop had been robbed, and their task was simple: investigate the theft, find whoever was responsible, and bring them in.",
        "But Orthen had one personal request. While investigating, he asked them to keep an eye out for a Leonin who looked very much like him. His brother. He had been sent on a mission long ago... and never returned.",
        "Before beginning their adventure, the group decided to write letters to their loved ones. Meanwhile, Orthen began disabling the many traps scattered throughout his home so they could safely sleep in the guest rooms.",
        "Leoric, naturally, asked about books. Orthen showed him his study, with Morvan and Vaeloryn following close behind. The three searched through shelves of old books and scrolls, with Leoric eventually discovering a Misty Step spell scroll. Hours later, Orthen practically had to drag them out.",
        "Before heading to bed, he went around wishing everyone goodnight. Unfortunately for him, when Syrsa opened her door, Orthen found himself staring at far more than he expected. After several seconds of completely losing the ability to form a sentence, the old Leonin finally composed himself, said goodnight, and escaped."
      ]
    },
    {
      number: "Session III",
      title: "The Road Beyond Valemere",
      paragraphs: [
        "The group woke in Orthen’s guest rooms and made their way downstairs, finding him quietly reading over breakfast. Naturally, they had questions.",
        "Orthen revealed why the Solaris name carried so much weight. His family had helped found part of the Royal Academy, with an entire school house—Solaris—named in their honour. For generations, the family had sworn to protect the innocent, though many viewed them less as heroes and more as vigilantes.",
        "Before sending the group out, Orthen gave one warning: Do not use his name. Too much attention could ruin the investigation. To keep them unnoticed, Sebastian prepared an ordinary commoner’s carriage.",
        "After sending their letters at the post office, the group reached the city gates, where guards searched both them and the carriage. Everything was cleared. But before they left, the guards gave them one final warning. Travellers and supply caravans using this road had been disappearing.",
        "And so, their first true journey began. Aurelius played his lyre, Syrsa joined with her lute, and the others talked, joked, and slowly began learning more about one another.",
        "Until Vaeloryn spotted something strange beside the road. What initially looked like a pile of wood turned out to be a destroyed carriage, surrounded by worn clothing and the unmistakable stench of death.",
        "While Morvan turned invisible and scouted ahead, Syrsa, Vaeloryn, and Cassian investigated. Then came the growl. A grey wolf watched them from the rocks above. Then another appeared behind them. The group quickly regrouped and fought them off—but the forest had something much worse waiting.",
        "A massive shadow passed overhead. One of the dead wolves suddenly vanished, leaving only enormous claw marks behind. Then, with a violent crash, a winged owlbear descended.",
        "The battle was brutal. Eventually, Morvan ended it by driving a lance straight through the creature’s heart, pinning it against a nearby tree. But during the fight, Leoric had learned the truth. The owlbear was a mother. She had young nearby.",
        "Unable to leave them to starve, the group cut meat from their fallen mother and brought it to the cubs. Most accepted it. One did not. It stared directly at Leoric with hatred, promising that they would meet again. And next time, it would not be peacefully.",
        "After a short rest, the group climbed back into their carriage and continued toward the industrial district. Their destination: Stardust and Slag. The mineral shop that had been robbed."
      ]
    }
  ]
};

const ASSET_VERSION = '20260919-leoric1';
const asset = path => `${path}?v=${ASSET_VERSION}`;

const landing = document.getElementById('landing');
const enterButton = document.getElementById('enter-site');
const pages = [...document.querySelectorAll('.page')];
const navButtons = [...document.querySelectorAll('.nav-link[data-page]')];
const transitionOverlay = document.getElementById('page-transition');
const latestRecap = document.getElementById('latest-recap');
const characterGrid = document.getElementById('character-grid');
const characterDetailContent = document.getElementById('character-detail-content');
const characterBack = document.getElementById('character-back');
const sessionList = document.getElementById('session-list');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let currentPage = 'home';
let transitionBusy = false;

/* -------------------- Landing -------------------- */
document.body.classList.add('intro-open');

function enterSite() {
  landing.classList.add('dismissed');
  document.body.classList.remove('intro-open');
  document.body.classList.add('site-entered');
  window.setTimeout(() => landing.setAttribute('aria-hidden', 'true'), 900);
}

enterButton.addEventListener('click', enterSite);

if (new URLSearchParams(location.search).get('skipIntro') === '1') {
  landing.classList.add('dismissed');
  landing.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('intro-open');
  document.body.classList.add('site-entered');
}

/* -------------------- Navigation -------------------- */
function setActiveNav(id) {
  const navId = id === 'character-detail' ? 'characters' : id;
  navButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.page === navId);
  });
}

function actuallyShowPage(id) {
  pages.forEach(page => page.classList.toggle('active', page.id === id));
  setActiveNav(id);
  currentPage = id;
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function navigateTo(id, { immediate = false, replace = false, hash = null } = {}) {
  if (!document.getElementById(id)) return;
  if (transitionBusy && !immediate) return;

  const targetHash = hash ?? `#${id}`;
  const applyHistory = () => {
    const method = replace ? 'replaceState' : 'pushState';
    history[method](null, '', targetHash);
  };

  if (id === currentPage && id !== 'character-detail') {
    if (location.hash !== targetHash) applyHistory();
    return;
  }

  if (immediate || reducedMotion.matches) {
    actuallyShowPage(id);
    if (location.hash !== targetHash) applyHistory();
    return;
  }

  transitionBusy = true;
  document.body.classList.add('transitioning');
  transitionOverlay.classList.add('active');

  window.setTimeout(() => {
    actuallyShowPage(id);
    if (location.hash !== targetHash) applyHistory();
  }, 230);

  window.setTimeout(() => {
    transitionOverlay.classList.remove('active');
    document.body.classList.remove('transitioning');
    transitionBusy = false;
  }, 580);
}

navButtons.forEach(button => {
  button.addEventListener('click', () => navigateTo(button.dataset.page));
});

document.querySelectorAll('[data-jump]').forEach(button => {
  button.addEventListener('click', () => navigateTo(button.dataset.jump));
});

/* -------------------- Latest recap -------------------- */
DATA.sessions.at(-1).paragraphs.forEach(text => {
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  latestRecap.appendChild(paragraph);
});

/* -------------------- Characters -------------------- */
function makeCharacterCard(character, index) {
  const card = document.createElement('article');
  card.className = 'character-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Open ${character.name}'s character profile`);
  card.style.animationDelay = `${index * 70}ms`;
  card.style.setProperty('--accent-rgb', character.accent);
  card.innerHTML = `
    <img
      src="${asset(character.cardImage)}"
      alt="${character.name}"
      loading="lazy"
      decoding="async"
    >
    <div class="character-info">
      <h3>${character.name}</h3>
      <div class="character-player">Played by ${character.player}</div>
      <div class="character-tags">
        <span class="tag">${character.className}</span>
        <span class="tag">${character.subclass}</span>
      </div>
    </div>
  `;

  const open = () => openCharacter(character);
  card.addEventListener('click', open);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  });
  return card;
}

DATA.characters.forEach((character, index) => {
  characterGrid.appendChild(makeCharacterCard(character, index));
});

function renderCharacterDetail(character) {
  characterDetailContent.innerHTML = `
    <article class="character-detail-wrap" style="--char-rgb:${character.accent}; --detail-bg:url('${asset(character.sheetImage)}')">
      <div class="character-detail-bg" aria-hidden="true"></div>
      <div class="character-detail-rune" aria-hidden="true"></div>
      <div class="character-detail-grid">
        <div class="character-portrait-stage">
          <img src="${asset(character.fullImage)}" alt="${character.name}" decoding="async">
        </div>
        <div class="character-detail-copy">
          <p class="eyebrow">Character Profile</p>
          <h2>${character.name}</h2>
          <div class="player-credit">Played by ${character.player}</div>
          <div class="detail-stack">
            <div class="detail-row"><span>Class</span><strong>${character.className}</strong></div>
            <div class="detail-row"><span>Subclass</span><strong>${character.subclass}</strong></div>
          </div>
          ${character.description ? `
            <div class="character-profile-description">
              <span>Character Description</span>
              ${character.description.map(paragraph => `<p>${paragraph}</p>`).join("")}
            </div>
          ` : ""}
        </div>
      </div>
    </article>
  `;
}

function openCharacter(character, { immediate = false, replace = false } = {}) {
  renderCharacterDetail(character);
  navigateTo('character-detail', {
    immediate,
    replace,
    hash: `#character-${character.slug}`
  });
}

characterBack.addEventListener('click', () => {
  navigateTo('characters', { replace: true });
});

/* -------------------- Quest board -------------------- */
const questBoard = document.getElementById('quest-board');
const activeQuests = DATA.quests.filter(quest => quest.state === 'active');
const completedQuests = DATA.quests.filter(quest => quest.state === 'completed');

function renderActiveQuest(quest) {
  return `
    <article class="quest-card">
      <div class="quest-card-head">
        <div class="quest-heading-group">
          <div class="quest-seal" aria-hidden="true">✦</div>
          <div>
            <p class="eyebrow">Active Contract</p>
            <h3>${quest.title}</h3>
          </div>
        </div>
        <span class="status"><span class="status-dot" aria-hidden="true"></span>${quest.status}</span>
      </div>

      <div class="quest-card-body">
        <p class="quest-description">${quest.description}</p>

        <div class="quest-meta">
          <div class="meta-box"><span>Quest Giver</span><strong>${quest.givenBy}</strong></div>
          <div class="meta-box"><span>Destination</span><strong>${quest.location}</strong></div>
        </div>

        <div class="quest-objectives">
          <div class="quest-objectives-title">Known Objectives</div>
          <div class="quest-objective-list">
            ${quest.objectives.map((objective, index) => `
              <div class="quest-objective">
                <span class="objective-mark">${index + 1}</span>
                <span>${objective}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderCompletedQuest(quest) {
  return `
    <article class="completed-quest-card">
      <div class="completed-quest-copy">
        <p class="eyebrow">Completed Contract</p>
        <h4>${quest.title}</h4>
        <div class="completed-quest-meta">
          <span>${quest.givenBy}</span>
          <span>${quest.location}</span>
        </div>
      </div>
      <img
        class="quest-complete-stamp"
        src="${asset("assets/quest-complete-stamp.png")}"
        alt="Quest Complete"
        loading="lazy"
        decoding="async"
      >
    </article>
  `;
}

questBoard.innerHTML = `
  <div class="quest-board-layout">
    <div class="active-quest-column">
      ${activeQuests.length
        ? activeQuests.map(renderActiveQuest).join('')
        : `<div class="quest-empty active-empty"><span>✦</span><strong>No active contract</strong><p>The board is quiet for now.</p></div>`
      }
    </div>
    <aside class="completed-quest-column" aria-label="Completed quests">
      <div class="completed-board-heading">
        <p class="eyebrow">Archived Contracts</p>
        <h3>Completed Quests</h3>
        <p>Finished quests are moved here and marked with the royal completion stamp.</p>
      </div>
      <div class="completed-quest-list">
        ${completedQuests.length
          ? completedQuests.map(renderCompletedQuest).join('')
          : `<div class="quest-empty"><span>◇</span><strong>No completed quests yet</strong><p>When the party finishes a contract, it will be archived here.</p></div>`
        }
      </div>
    </aside>
  </div>
`;

/* -------------------- NPC archive -------------------- */
const majorNpcList = document.getElementById('npc-major-list');
const supportingNpcList = document.getElementById('npc-supporting-list');

function buildNpcCard(npc, index) {
  const card = document.createElement('article');
  card.className = `npc-card ${npc.importance === 'major' ? 'npc-card-major' : ''}`;
  card.style.animationDelay = `${index * 80}ms`;
  card.innerHTML = `
    <div class="npc-portrait">
      <img src="${asset(npc.image)}" alt="${npc.name}" loading="lazy" decoding="async">
    </div>
    <div class="npc-copy">
      <h3>${npc.name}</h3>
      <div class="npc-role">${npc.role}</div>
      <p>${npc.description}</p>
    </div>
  `;
  return card;
}

DATA.npcs.filter(npc => npc.importance === 'major').forEach((npc, index) => {
  majorNpcList.appendChild(buildNpcCard(npc, index));
});
DATA.npcs.filter(npc => npc.importance === 'supporting').forEach((npc, index) => {
  supportingNpcList.appendChild(buildNpcCard(npc, index));
});

/* -------------------- Session archive -------------------- */
function buildSessionCard(session, index) {
  const card = document.createElement('article');
  const bodyId = `session-body-${index + 1}`;
  card.className = 'session-card';
  card.style.animationDelay = `${index * 80}ms`;
  card.innerHTML = `
    <button
      class="session-head"
      type="button"
      aria-expanded="false"
      aria-controls="${bodyId}"
    >
      <div>
        <div class="session-number">${session.number}</div>
        <h3>${session.title}</h3>
      </div>
      <span class="session-plus" aria-hidden="true">+</span>
    </button>
    <div class="session-body" id="${bodyId}">
      <div class="session-body-inner"></div>
    </div>
  `;

  const inner = card.querySelector('.session-body-inner');
  session.paragraphs.forEach(text => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    inner.appendChild(paragraph);
  });

  const head = card.querySelector('.session-head');
  head.addEventListener('click', () => {
    const open = !card.classList.contains('open');
    card.classList.toggle('open', open);
    head.setAttribute('aria-expanded', String(open));
  });

  return card;
}

DATA.sessions.forEach((session, index) => {
  sessionList.appendChild(buildSessionCard(session, index));
});

/* -------------------- Campaign map viewer -------------------- */
const mapModal = document.getElementById('map-modal');
const mapPreview = document.getElementById('map-preview');
const openMapButton = document.getElementById('open-map');
const closeMapButton = document.getElementById('map-close');
const mapViewport = document.getElementById('map-viewport');
const mapImage = document.getElementById('map-full-image');
const mapZoomIn = document.getElementById('map-zoom-in');
const mapZoomOut = document.getElementById('map-zoom-out');
const mapReset = document.getElementById('map-reset');

const mapState = {
  scale: 1,
  x: 0,
  y: 0,
  dragging: false,
  startX: 0,
  startY: 0,
  originX: 0,
  originY: 0,
  lastFocus: null
};

const MAP_MIN_SCALE = 1;
const MAP_MAX_SCALE = 4;
const MAP_ZOOM_STEP = 0.35;

function clampMapPan() {
  if (!mapViewport || !mapImage) return;
  const baseWidth = mapImage.clientWidth;
  const baseHeight = mapImage.clientHeight;
  const maxX = Math.max(0, (baseWidth * mapState.scale - mapViewport.clientWidth) / 2);
  const maxY = Math.max(0, (baseHeight * mapState.scale - mapViewport.clientHeight) / 2);
  mapState.x = Math.max(-maxX, Math.min(maxX, mapState.x));
  mapState.y = Math.max(-maxY, Math.min(maxY, mapState.y));
}

function renderMapTransform() {
  clampMapPan();
  mapImage.style.transform = `translate3d(${mapState.x}px, ${mapState.y}px, 0) scale(${mapState.scale})`;
  mapViewport.classList.toggle('is-zoomed', mapState.scale > 1.01);
  mapZoomOut.disabled = mapState.scale <= MAP_MIN_SCALE + 0.001;
  mapZoomIn.disabled = mapState.scale >= MAP_MAX_SCALE - 0.001;
}

function setMapScale(nextScale) {
  mapState.scale = Math.max(MAP_MIN_SCALE, Math.min(MAP_MAX_SCALE, nextScale));
  if (mapState.scale === MAP_MIN_SCALE) {
    mapState.x = 0;
    mapState.y = 0;
  }
  renderMapTransform();
}

function resetMapView() {
  mapState.scale = 1;
  mapState.x = 0;
  mapState.y = 0;
  renderMapTransform();
}

function openMapViewer(trigger) {
  mapState.lastFocus = trigger || document.activeElement;
  mapModal.classList.add('open');
  mapModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('map-open');
  resetMapView();
  window.setTimeout(() => closeMapButton.focus({ preventScroll: true }), 50);
}

function closeMapViewer() {
  if (!mapModal.classList.contains('open')) return;
  mapModal.classList.remove('open');
  mapModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('map-open');
  mapState.dragging = false;
  if (mapState.lastFocus && typeof mapState.lastFocus.focus === 'function') {
    mapState.lastFocus.focus({ preventScroll: true });
  }
}

mapPreview.addEventListener('click', () => openMapViewer(mapPreview));
openMapButton.addEventListener('click', () => openMapViewer(openMapButton));
closeMapButton.addEventListener('click', closeMapViewer);
mapModal.querySelector('[data-map-close]').addEventListener('click', closeMapViewer);
mapZoomIn.addEventListener('click', () => setMapScale(mapState.scale + MAP_ZOOM_STEP));
mapZoomOut.addEventListener('click', () => setMapScale(mapState.scale - MAP_ZOOM_STEP));
mapReset.addEventListener('click', resetMapView);

mapViewport.addEventListener('wheel', event => {
  if (!mapModal.classList.contains('open')) return;
  event.preventDefault();
  const direction = event.deltaY < 0 ? MAP_ZOOM_STEP : -MAP_ZOOM_STEP;
  setMapScale(mapState.scale + direction);
}, { passive: false });

mapViewport.addEventListener('pointerdown', event => {
  if (mapState.scale <= 1.01 || event.button !== 0) return;
  mapState.dragging = true;
  mapState.startX = event.clientX;
  mapState.startY = event.clientY;
  mapState.originX = mapState.x;
  mapState.originY = mapState.y;
  mapViewport.classList.add('is-dragging');
  mapViewport.setPointerCapture(event.pointerId);
});

mapViewport.addEventListener('pointermove', event => {
  if (!mapState.dragging) return;
  mapState.x = mapState.originX + (event.clientX - mapState.startX);
  mapState.y = mapState.originY + (event.clientY - mapState.startY);
  renderMapTransform();
});

function stopMapDrag(event) {
  if (!mapState.dragging) return;
  mapState.dragging = false;
  mapViewport.classList.remove('is-dragging');
  if (event && mapViewport.hasPointerCapture(event.pointerId)) {
    mapViewport.releasePointerCapture(event.pointerId);
  }
}

mapViewport.addEventListener('pointerup', stopMapDrag);
mapViewport.addEventListener('pointercancel', stopMapDrag);
mapViewport.addEventListener('dblclick', resetMapView);

window.addEventListener('resize', () => {
  if (mapModal.classList.contains('open')) renderMapTransform();
});

document.addEventListener('keydown', event => {
  if (!mapModal.classList.contains('open')) return;
  if (event.key === 'Escape') closeMapViewer();
  if (event.key === '+' || event.key === '=') setMapScale(mapState.scale + MAP_ZOOM_STEP);
  if (event.key === '-') setMapScale(mapState.scale - MAP_ZOOM_STEP);
  if (event.key === '0') resetMapView();
});

/* -------------------- Custom cursor -------------------- */
const cursor = document.getElementById('custom-cursor');
const finePointer = window.matchMedia('(pointer:fine)');

function updateCursorMode() {
  const enabled = finePointer.matches && !reducedMotion.matches;
  document.body.classList.toggle('custom-cursor-enabled', enabled);
  if (!enabled) cursor.classList.remove('visible', 'active');
}

updateCursorMode();
if (typeof finePointer.addEventListener === 'function') finePointer.addEventListener('change', updateCursorMode);
if (typeof reducedMotion.addEventListener === 'function') reducedMotion.addEventListener('change', updateCursorMode);

window.addEventListener('mousemove', event => {
  if (!document.body.classList.contains('custom-cursor-enabled')) return;
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
  cursor.classList.add('visible');
});

document.addEventListener('mouseleave', () => cursor.classList.remove('visible'));
document.addEventListener('mouseover', event => {
  if (!document.body.classList.contains('custom-cursor-enabled')) return;
  cursor.classList.toggle('active', Boolean(event.target.closest('button, .character-card, a')));
});

/* -------------------- Ambient particle field -------------------- */
const canvas = document.getElementById('magic-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrame = null;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(innerWidth * ratio);
  canvas.height = Math.floor(innerHeight * ratio);
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  makeParticles();
}

function makeParticles() {
  const count = Math.min(68, Math.max(28, Math.floor(innerWidth / 24)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.4 + 0.3,
    vy: -(Math.random() * 0.16 + 0.03),
    vx: (Math.random() - 0.5) * 0.06,
    a: Math.random() * 0.34 + 0.08,
    phase: Math.random() * Math.PI * 2
  }));
}

function drawParticles(time = 0) {
  if (reducedMotion.matches) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    animationFrame = null;
    return;
  }

  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    if (particle.y < -10) {
      particle.y = innerHeight + 10;
      particle.x = Math.random() * innerWidth;
    }
    if (particle.x < -10) particle.x = innerWidth + 10;
    if (particle.x > innerWidth + 10) particle.x = -10;

    const glow = particle.a * (0.72 + Math.sin(time * 0.001 + particle.phase) * 0.28);
    ctx.beginPath();
    ctx.fillStyle = `rgba(231, 190, 111, ${glow})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(228, 184, 101, .48)';
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.shadowBlur = 0;
  animationFrame = requestAnimationFrame(drawParticles);
}

function syncParticleMotion() {
  if (reducedMotion.matches) {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = null;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
  } else if (!animationFrame) {
    animationFrame = requestAnimationFrame(drawParticles);
  }
}

window.addEventListener('resize', resizeCanvas);
if (typeof reducedMotion.addEventListener === 'function') reducedMotion.addEventListener('change', syncParticleMotion);
resizeCanvas();
syncParticleMotion();

/* -------------------- Hash routing -------------------- */
function renderFromHash({ immediate = true } = {}) {
  const hash = location.hash.replace('#', '');

  if (hash.startsWith('character-')) {
    const slug = hash.replace('character-', '');
    const character = DATA.characters.find(item => item.slug === slug);
    if (character) {
      renderCharacterDetail(character);
      actuallyShowPage('character-detail');
      return;
    }
  }

  const validPages = ['home', 'characters', 'quests', 'map', 'npcs', 'sessions'];
  const target = validPages.includes(hash) ? hash : 'home';
  actuallyShowPage(target);

  if (!hash) history.replaceState(null, '', '#home');
}

window.addEventListener('popstate', () => renderFromHash({ immediate: true }));
renderFromHash({ immediate: true });
