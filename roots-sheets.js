(() => {
 const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(character, asset) {
    return `<article class="grimwood-sheet roots-sheet" style="--char-rgb:${character.accent}">
      <header class="grimwood-sheet-heading">
        <p class="eyebrow">The Roots Remember · Level 4</p>
        <h2>${escape(character.name)}</h2>
        <p class="player-credit">Played by ${escape(character.player)}</p>
      </header>
      <div class="grimwood-sheet-art">
        <img class="grimwood-landscape" src="${asset(character.fullImage)}" alt="${escape(character.name)}" decoding="async" width="1672" height="941">
        ${window.GrimwoodSheet.stats(character, character.abilityScores || ['?','?','?','?','?','?'], 'Level 4 · Ability Scores')}
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
 window.RootsSheet = { render };
})();
