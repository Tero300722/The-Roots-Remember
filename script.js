const DATA = {
  characters: [
    {
      slug: "aurelius-tempestine",
      name: "Aurelius Tempestine",
      player: "Dathan Baldacchino",
      sheetImage: "assets/characters/full/aurelius-tempestine.jpg",
      cardImage: "assets/characters/cards/aurelius-tempestine.jpg",
      fullImage: "assets/characters/full/aurelius-tempestine.jpg",
      className: "Monk",
      subclass: "Warrior of the Storm Dragon",
      accent: "151, 113, 255",
    },
    {
      slug: "cassian-caelaris",
      name: "Cassian Caelaris",
      player: "Matthias Martino",
      sheetImage: "assets/characters/full/cassian-caelaris.jpg",
      cardImage: "assets/characters/cards/cassian-caelaris.jpg",
      fullImage: "assets/characters/full/cassian-caelaris.jpg",
      className: "Paladin",
      subclass: "Oath of the Noble Genies",
      accent: "218, 68, 61",
    },
    {
      slug: "leoric-everheart",
      name: "Leoric Everheart",
      player: "Daniel Mercieca",
      sheetImage: "assets/characters/full/leoric-everheart.jpg",
      cardImage: "assets/characters/cards/leoric-everheart.jpg",
      fullImage: "assets/characters/full/leoric-everheart.jpg",
      className: "Wizard / Bard",
      subclass: "Bibliomancy",
      accent: "224, 183, 104",
    },
    {
      slug: "morvan-nyx",
      name: "Morvan Nyx",
      player: "Remsi Agius",
      sheetImage: "assets/characters/full/morvan-nyx.jpg",
      cardImage: "assets/characters/cards/morvan-nyx.jpg",
      fullImage: "assets/characters/full/morvan-nyx.jpg",
      className: "Fighter",
      subclass: "Umbral Tempest",
      accent: "49, 78, 175",
    },
    {
      slug: "syrsa-orsona",
      name: "Syrsa Orsona",
      player: "James Bianco",
      sheetImage: "assets/characters/full/syrsa-orsona.jpg",
      cardImage: "assets/characters/cards/syrsa-orsona.jpg",
      fullImage: "assets/characters/full/syrsa-orsona.jpg",
      className: "Bard",
      subclass: "College of the Unbound Song",
      accent: "255, 220, 58",
    },
    {
      slug: "vaeloryn-starsong",
      name: "Vaeloryn Starsong",
      player: "Gianluca Amato",
      sheetImage: "assets/characters/full/vaeloryn-starsong.jpg",
      cardImage: "assets/characters/cards/vaeloryn-starsong.jpg",
      fullImage: "assets/characters/full/vaeloryn-starsong.jpg",
      className: "Warlock",
      subclass: "Eightfold Covenant",
      accent: "237, 132, 45",
    }
  ],
  quest: {
    title: "Investigate the Robbery of Stardust and Slag",
    status: "In Progress",
    givenBy: "Orthen Solaris",
    location: "Industrial Area of Elaris",
    image: "assets/orthen-solaris.png",
    description: "Orthen started off the party's adventure by sending them out of Valemere and into the industrial area of Elaris. Their task is to investigate who robbed Stardust and Slag, uncover why the supplier was targeted, and bring the person responsible for the break-in and theft to justice.",
    objectives: [
      "Investigate the break-in at Stardust and Slag",
      "Discover who carried out the robbery and why",
      "Bring the person responsible to justice"
    ]
  },
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

let currentPage = 'home';
let transitionBusy = false;

/* -------------------- Landing screen -------------------- */
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

/* -------------------- Navigation + transitions -------------------- */
function setActiveNav(id) {
  const navId = id === 'character-detail' ? 'characters' : id;
  navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.page === navId));
}

function routeHashFor(id) {
  if (id === 'character-detail') return location.hash || '#characters';
  return `#${id}`;
}

function afterPageShown(id) {
  if (id === 'sessions') refreshOpenSessions();
}

function actuallyShowPage(id) {
  pages.forEach(page => page.classList.toggle('active', page.id === id));
  setActiveNav(id);
  currentPage = id;
  window.scrollTo({ top: 0, behavior: 'auto' });
  afterPageShown(id);
}

function showPage(id, { immediate = false, updateHash = true } = {}) {
  if (!document.getElementById(id)) return;
  if (id === currentPage && !immediate) {
    afterPageShown(id);
    return;
  }
  if (transitionBusy && !immediate) return;

  if (immediate) {
    actuallyShowPage(id);
    if (updateHash && id !== 'character-detail') history.replaceState(null, '', routeHashFor(id));
    return;
  }

  transitionBusy = true;
  document.body.classList.add('transitioning');
  transitionOverlay.classList.add('active');

  window.setTimeout(() => {
    actuallyShowPage(id);
    if (updateHash && id !== 'character-detail') history.pushState(null, '', routeHashFor(id));
  }, 250);

  window.setTimeout(() => {
    transitionOverlay.classList.remove('active');
    document.body.classList.remove('transitioning');
    transitionBusy = false;
  }, 620);
}

navButtons.forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.page)));
document.querySelectorAll('[data-jump]').forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.jump)));

/* -------------------- Latest recap -------------------- */
DATA.sessions.at(-1).paragraphs.forEach(text => {
  const p = document.createElement('p');
  p.textContent = text;
  latestRecap.appendChild(p);
});

/* -------------------- Characters -------------------- */
function makeCharacterCard(character, index) {
  const card = document.createElement('article');
  card.className = 'character-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Open ${character.name}'s character profile`);
  card.style.animationDelay = `${index * 85}ms`;
  card.style.setProperty('--accent-rgb', character.accent);
  card.innerHTML = `
    <img src="${character.cardImage}" alt="${character.name}">
    <div class="character-orbit" aria-hidden="true"></div>
    <div class="character-info">
      <h3>${character.name}</h3>
      <div class="character-player">Played by ${character.player}</div>
      <div class="character-tags">
        <span class="tag">${character.className}</span>
        <span class="tag">${character.subclass}</span>
      </div>
    </div>
  `;

  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });

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

DATA.characters.forEach((character, index) => characterGrid.appendChild(makeCharacterCard(character, index)));

function renderCharacterDetail(character) {
  characterDetailContent.innerHTML = `
    <article class="character-detail-wrap" style="--char-rgb:${character.accent}; --detail-bg:url('${character.sheetImage}')">
      <div class="character-detail-bg" aria-hidden="true"></div>
      <div class="character-detail-rune" aria-hidden="true"></div>
      <div class="character-detail-grid">
        <div class="character-portrait-stage">
          <img src="${character.fullImage}" alt="${character.name}">
        </div>
        <div class="character-detail-copy">
          <p class="eyebrow">Character Profile</p>
          <h2>${character.name}</h2>
          <div class="player-credit">Played by ${character.player}</div>
          <div class="detail-stack">
            <div class="detail-row"><span>Class</span><strong>${character.className}</strong></div>
            <div class="detail-row"><span>Subclass</span><strong>${character.subclass}</strong></div>
          </div>
        </div>
      </div>
    </article>
  `;
}

function openCharacter(character, { immediate = false } = {}) {
  renderCharacterDetail(character);
  history.pushState(null, '', `#character-${character.slug}`);
  showPage('character-detail', { immediate, updateHash: false });
}

characterBack.addEventListener('click', () => showPage('characters'));

/* -------------------- Quest board -------------------- */
const q = DATA.quest;
document.getElementById('quest-board').innerHTML = `
  <article class="quest-card">
    <div class="quest-copy">
      <div class="quest-seal" aria-hidden="true">✦</div>
      <p class="eyebrow">Active Contract</p>
      <div class="quest-title-line">
        <h3>${q.title}</h3>
        <span class="status">${q.status}</span>
      </div>
      <p>${q.description}</p>
      <div class="quest-meta">
        <div class="meta-box"><span>Quest Giver</span><strong>${q.givenBy}</strong></div>
        <div class="meta-box"><span>Destination</span><strong>${q.location}</strong></div>
      </div>
      <div class="quest-objectives">
        <div class="quest-objectives-title">Known Objectives</div>
        ${q.objectives.map((objective, i) => `
          <div class="quest-objective">
            <span class="objective-mark">${i + 1}</span>
            <span>${objective}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="quest-art">
      <img src="${q.image}" alt="Orthen Solaris">
      <div class="quest-giver-label"><span>Quest Giver</span><strong>${q.givenBy}</strong></div>
    </div>
  </article>
`;

/* -------------------- Session archive -------------------- */
function buildSessionCard(session, index) {
  const card = document.createElement('article');
  card.className = 'session-card';
  card.style.animationDelay = `${index * 90}ms`;
  card.innerHTML = `
    <button class="session-head" type="button">
      <div>
        <div class="session-number">${session.number}</div>
        <h3>${session.title}</h3>
      </div>
      <span class="session-plus">+</span>
    </button>
    <div class="session-body"><div class="session-body-inner"></div></div>
  `;

  const inner = card.querySelector('.session-body-inner');
  session.paragraphs.forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    inner.appendChild(p);
  });

  const head = card.querySelector('.session-head');
  head.addEventListener('click', () => toggleSessionCard(card));

  return card;
}

function getSessionBodyParts(card) {
  const body = card.querySelector('.session-body');
  const inner = card.querySelector('.session-body-inner');
  return { body, inner };
}

function setSessionOpen(card, open) {
  const { body, inner } = getSessionBodyParts(card);
  card.classList.toggle('open', open);
  body.style.maxHeight = open ? `${inner.scrollHeight + 36}px` : '0px';
}

function refreshOpenSessions() {
  document.querySelectorAll('.session-card.open').forEach(card => {
    const { body, inner } = getSessionBodyParts(card);
    body.style.maxHeight = `${inner.scrollHeight + 36}px`;
  });
}

function toggleSessionCard(card) {
  const opening = !card.classList.contains('open');
  document.querySelectorAll('.session-card.open').forEach(other => {
    if (other !== card) setSessionOpen(other, false);
  });
  setSessionOpen(card, opening);
}

DATA.sessions.forEach((session, index) => sessionList.appendChild(buildSessionCard(session, index)));
window.addEventListener('resize', refreshOpenSessions);

/* -------------------- Custom cursor -------------------- */
const cursor = document.getElementById('custom-cursor');
const finePointer = window.matchMedia('(pointer:fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateCursorMode() {
  const enabled = finePointer.matches && !reducedMotion.matches;
  document.body.classList.toggle('custom-cursor-enabled', enabled);
  if (!enabled) {
    cursor.classList.remove('visible', 'active');
  }
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
  const interactive = event.target.closest('button, .character-card, a');
  cursor.classList.toggle('active', Boolean(interactive));
});

/* -------------------- Magical particle field -------------------- */
const canvas = document.getElementById('magic-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

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
  const count = Math.min(78, Math.max(36, Math.floor(innerWidth / 21)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.55 + 0.35,
    vy: -(Math.random() * 0.19 + 0.035),
    vx: (Math.random() - 0.5) * 0.07,
    a: Math.random() * 0.42 + 0.10,
    phase: Math.random() * Math.PI * 2
  }));
}

function drawParticles(t = 0) {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.y < -10) {
      p.y = innerHeight + 10;
      p.x = Math.random() * innerWidth;
    }
    if (p.x < -10) p.x = innerWidth + 10;
    if (p.x > innerWidth + 10) p.x = -10;
    const glow = p.a * (0.72 + Math.sin(t * 0.001 + p.phase) * 0.28);
    ctx.beginPath();
    ctx.fillStyle = `rgba(231, 190, 111, ${glow})`;
    ctx.shadowBlur = 9;
    ctx.shadowColor = 'rgba(228, 184, 101, .55)';
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.shadowBlur = 0;
  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawParticles();

/* -------------------- Hash routing -------------------- */
function handleHash({ immediate = true } = {}) {
  const hash = location.hash.replace('#', '');
  if (hash.startsWith('character-')) {
    const slug = hash.replace('character-', '');
    const character = DATA.characters.find(item => item.slug === slug);
    if (character) {
      renderCharacterDetail(character);
      showPage('character-detail', { immediate, updateHash: false });
      return;
    }
  }
  const valid = ['home', 'characters', 'quests', 'sessions'];
  const target = valid.includes(hash) ? hash : 'home';
  showPage(target, { immediate, updateHash: false });
}

window.addEventListener('popstate', () => handleHash({ immediate: false }));
handleHash({ immediate: true });
