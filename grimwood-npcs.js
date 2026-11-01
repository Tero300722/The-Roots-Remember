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

  // Face-centred crops, shared by the directory and the large profile portrait.
  const crops = [
    { x: 51, y: 12, scale: 3 },
    { x: 59, y: 19, scale: 2.8 },
    { x: 50, y: 11, scale: 2.6 },
    { x: 48, y: 11, scale: 3 },
    { x: 50, y: 10, scale: 3 },
    { x: 50, y: 10, scale: 2.8 }
  ];
  people.forEach((person, index) => {
    person.portraitCrop = crops[index];
    person.description = person.paragraphs;
    person.aliases = person.shortName ? [person.shortName] : [];
  });
  const session = {
  "number": "Session 1",
  "title": "The Invitation",
  "paragraphs": [
    "The adventure began at the western gate of Silvercrest, where Elior Ilphelkiir, Theodas Ilphelkiir, Vaelis Rimehart, and Edwin Everbane gathered to make the journey to Grimwood Manor. Each of their names was called in turn before they boarded an official wagon of the Adventurers’ Guild, which had been arranged to carry the invited guests to the manor. The journey initially proceeded without incident, until the wagon suddenly took a sharp turn away from the main road and began travelling along a far rougher and more uneven path. As they drew closer to their destination, both Theodas and Edwin began to feel a strange sense of unease about the journey ahead.",
    "Eventually, the wagon came to a stop, where the party was greeted by an automaton servant sent to escort them the remainder of the way. Following it through the grounds, they finally arrived before Grimwood Manor. Numerous other automatons awaited them there, with two opening the manor’s great front doors as the party approached. Inside, they were personally greeted by Baron Vane Grimwood, master of the estate.",
    "Vane led the adventurers to the dining room, where they were introduced to the manor’s other invited guests: Vice Emberclaw, Charlotte Fleaklight, Empior Windveil, and Adam Newport. The group spent some time dining and conversing with one another. Elior, being an automaton himself, received a mixed reception from some of the other guests, though this did little to trouble him. At one point during the meal, Elior wandered into a nearby storage room to investigate and noticed that some of its wooden floorboards appeared strangely elevated. Nothing further came of the discovery at the time, and he eventually returned to the others.",
    "Once the meal had concluded, Vane excused himself, claiming that he needed to attend to the guests’ bedding. Suspicious of the Baron, Edwin secretly sent his spider familiar to follow him. Through it, Edwin discovered Vane using strange magic throughout the manor to restore portions of the building that had become rotten or decayed, concealing its deterioration beneath magically restored surfaces.",
    "As the party was later shown to their rooms, they encountered Vane standing before a painting and staring at it. Elior questioned him about it, and Vane explained that the landscape depicted in the painting was the hometown of his late wife. The interaction passed without incident, and the party continued on to their rooms.",
    "Once alone, Edwin attempted to cast Detect Magic. The result was overwhelming. Magic permeated the manor to such an extraordinary degree that merely perceiving it almost caused Edwin to vomit. Now convinced that something was deeply wrong, he attempted to send an eagle back toward Silvercrest. The creature barely had the opportunity to escape before shadows rose against it and slaughtered it in flight. Realising that something was preventing them from freely communicating with the outside world, Edwin remained in his room as the rest of the guests retired for the night.",
    "Their rest did not last long. During the night, a tremendous crash was heard from outside their rooms, followed by the sound of something scraping through the corridor. Theodas opened his door to investigate and found himself face-to-face with an enormous automaton wielding a massive butcher’s cleaver. He immediately attempted to shut the door, only for the creature to begin breaking its way through. Seeing his brother under attack, Elior rushed to his aid, and the party was soon drawn into battle against the construct.",
    "As the automaton attempted to advance upon the party, Vaelis used his magic to freeze its legs and the ground beneath it, trapping the construct in place and preventing it from moving forward. With the cleaver-wielding automaton immobilised, the party was able to keep their distance and continue their assault until the creature was finally destroyed.",
    "Investigation of its remains revealed that a magical rune of silence had been embedded within it, allowing the creature to carry out its attacks without its victims being able to easily call for aid. Vice Emberclaw had managed to interfere with the rune during the confrontation by embedding one of his dragon scales into it, breaking its effect.",
    "During the chaos, Edwin had retreated downstairs. Using his druidic abilities, he transformed into a spider and began covering portions of the manor in webs. These webs would allow him to sense movement through the building should anything disturb them during the remainder of the night. With the immediate threat seemingly dealt with, the party eventually returned to their rooms and attempted to recover from the battle.",
    "After resting, they went to check on the other guests. They discovered that the giant automaton had not come solely for them. Vice Emberclaw, Charlotte Fleaklight, Empior Windveil, and Adam Newport had all been slain during the night. There were signs that they had attempted to resist their attacker, but the party could not even locate their bodies. Whatever had happened while the automaton’s silence rune concealed the struggle, the other guests of Grimwood Manor were gone.",
    "The party subsequently turned their attention toward Vane’s study. Searching it revealed a notebook written by the Baron himself, detailing the deterioration of his life following the illness of his wife. Vane described how she had slowly wasted away despite the efforts of doctors and physicians to save her. His writings grew increasingly desperate and frustrated as her condition worsened, culminating in vague references to Vane having summoned or contacted something shortly thereafter. The exact nature of what he had called upon remained unclear.",
    "Meanwhile, Edwin felt something disturb the webs he had left inside the storage room. Remembering the unusual floorboards Elior had discovered earlier, the party returned to investigate. Beneath them, they uncovered a concealed trapdoor leading into the manor’s basement.",
    "There, they encountered an unexpected prisoner: Alistair Percival Bartholomew Wrennington, more commonly known simply as Al. Al had been trapped beneath Grimwood Manor for some time, and provided the adventurers with information about the manor and its master. With his guidance, the party discovered how to access a hidden room connected to Vane’s work.",
    "Inside, they uncovered further notes documenting the experiments Vane had conducted. These writings revealed the extent of his increasingly unnatural research and the numerous attempts he had made to accomplish his goals. Within the same area stood an enormous magical door that the party could not open, as it required a key they did not possess.",
    "When questioned about where Vane might have kept such a key, Al recalled overhearing the Baron speaking to himself while passing through the basement. During one such occasion, Vane had mentioned a painting in connection with the key. Elior realised that the painting they had previously seen Vane staring at could therefore be more important than it had first appeared.",
    "Before they could proceed without interruption, Edwin suddenly sensed disturbances across every other web he had placed throughout Grimwood Manor. Something was moving through the house.",
    "The party climbed back through the trapdoor into the storage room and emerged into the manor proper. There, a grotesque automaton with spider-like proportions descended from the ceiling alongside multiple smaller automatons. Elior, seeing the group of enemies descend upon them, did not hesitate to charge his core and unleash a Fireball, immediately wiping out half of the smaller constructs. Before the party could stop it, the larger creature seized Theodas and carried him upstairs. On the first floor, Theodas found himself confronted not merely by his captor, but by a second spider-like automaton as the two creatures began attacking him together.",
    "Despite being isolated from his companions, Theodas fought back against the constructs until the others could come to his aid. During the struggle, one of the automatons attempted to hurl him over the first-floor railing and down the open stairwell to the base floor below. Theodas managed to catch hold of the railing before he could fall, leaving him hanging precariously above the floor below.",
    "The resulting battle spread across the manor. The party rushed to Theodas’ aid while Edwin attempted to reach and investigate the painting they now suspected concealed the key. At the same time, Vaelis was beset by smaller automatons that crawled toward and over him, forcing him to fight off the remaining creatures separately.",
    "Edwin soon found himself in dire circumstances. After suffering grievous injuries, he was left barely clinging to life, held aloft by one of the towering automatons and seemingly moments away from being killed. Before the construct could finish him off, Elior intervened, using his magic to teleport Edwin out of its grasp and to safety.",
    "When Vaelis finally managed to reach the first floor and join his allies, he too was immediately placed in danger. One of the enormous spider-like automatons seized him and attempted to hurl him through a window and into the shadows outside. Vaelis managed to catch hold of the edges of the window at the last moment, desperately preventing himself from being thrown out of the manor. Once again, Elior intervened, teleporting Vaelis away from the window and back to safety. Despite several members of the party being brought dangerously close to death, the adventurers ultimately prevailed and destroyed the remaining constructs.",
    "With the immediate threat eliminated, the party was finally able to properly investigate the painting. Hidden behind it, they discovered the key they had been searching for.",
    "Badly wounded and drained of much of their strength, the adventurers returned to the basement with the key. Seeing their condition after the battle, Al used what power he could to restore some of their health and replenish a portion of their expended magical energy.",
    "Now armed with the key to Vane Grimwood’s mysterious magical door, the party stands once again beneath Grimwood Manor. The other invited guests are dead, the manor itself has turned against them, and Vane Grimwood is nowhere to be found. With the Baron’s writings having revealed only fragments of what occurred within the estate, Elior, Theodas, Vaelis, and Edwin prepare themselves to unlock the door and discover what lies beyond."
  ]
};
  window.GrimwoodArchive = { npcs: people, sessions: [session] };
  window.NpcArchive.mount(document.getElementById('grimwood-npc-directory'), people, { chronicle: 'grimwood' });
  document.getElementById('grimwood-session-list').appendChild(buildSessionCard(session, 0, 'grimwood'));
})();
