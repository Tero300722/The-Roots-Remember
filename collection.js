/* The collection previews a volume; only Open chronicle starts its music or trailer. */
(() => {
  const volumes = [
    {id:'trr',title:'The Roots Remember',type:'Main Campaign',status:'Ongoing · Pinned',creator:'Mikael Delia',art:'assets/campaign-hero.webp',color:'148, 178, 126',note:'The story continues. Return to the party, follow the latest leads, and revisit the adventures that brought them here.'},
    {id:'grimwood',title:'Into the Grimwood Manor',type:'Mini Campaign',status:'Completed',creator:'Gianluca Amato',art:'assets/grimwood-manor-title.png',color:'198, 129, 95',note:'The invitation has ended. Two sessions, a haunted estate, and a sacrifice whose consequences reach beyond its crumbling walls.'},
    {id:'echoes',title:'Echoes of Eternity',type:'Multiverse Campaign',status:'Cancelled',creator:'Mikael Delia',art:'assets/echoes/echoes-title-cover.png',color:'167, 159, 205',note:'Three worlds. Seven strangers. One shattered reality. Explore the people and stories of the Pirate, Cyberpunk, and Fantasy universes.'},
    {id:'elden',title:'Beyond the Frenzied Flame',series:'Elden Ring',type:'Mini Campaign',status:'Completed',creator:'Mikael Delia',art:'assets/elden/chronicle-cover-v38.png',color:'215, 167, 93',note:'The Lands Between are burning. Seven fallen champions answer Melina’s call to hunt down the Lord of Frenzied Flame.'},
    {id:'serpent',title:'The Serpent’s Lament',series:'Elden Ring',type:'Sequel · Mini Campaign',status:'Planned',creator:'Mikael Delia',art:'assets/serpent/chronicle-cover-v38.png',color:'172, 153, 100',note:'Beyond the sight of the Erdtree, a forsaken realm waits beneath the Scadutree. At the end of the road stands Messmer the Impaler.'}
  ];
  const shelf=document.getElementById('library-shelf'), selector=document.getElementById('chronicle-selector');
  const numerals=['I','II','III','IV','V']; let selected=0;
  const buttons=volumes.map((volume,i)=>{
    const b=document.createElement('button'); b.type='button'; b.className='library-book';
    b.dataset.volume=volume.id; b.style.setProperty('--volume-accent',volume.color);
    b.setAttribute('aria-label',`Preview ${volume.series ? volume.series+': ' : ''}${volume.title}, ${volume.status}`);
    b.innerHTML=`<span class="book-cover"><img src="${volume.art}" alt="" decoding="async"><span class="book-number">${numerals[i]}</span><span class="book-title">${volume.series?`<small>${volume.series}</small>`:''}${volume.title}</span></span><span class="book-status">${volume.status}</span>`;
    b.addEventListener('click',()=>choose(i));
    b.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight') next=(i+1)%volumes.length;
      if(event.key==='ArrowLeft') next=(i+volumes.length-1)%volumes.length;
      if(event.key==='Home') next=0;
      if(event.key==='End') next=volumes.length-1;
      if(next!==undefined){event.preventDefault();choose(next);buttons[next].focus();}
    });
    shelf.appendChild(b); return b;
  });
  function choose(i){
    selected=i;const v=volumes[i];selector.style.setProperty('--library-accent',v.color);
    buttons.forEach((b,n)=>{b.setAttribute('aria-pressed',String(n===i));});
    document.getElementById('library-art').src=v.art;
    document.getElementById('library-art').alt=`${v.series?v.series+': ':''}${v.title} cover artwork`;
    document.getElementById('library-title').textContent=v.title;
    document.getElementById('library-type').textContent=`Volume ${numerals[i]} · ${v.series||v.type}`;
    document.getElementById('library-status').textContent=v.status;
    document.getElementById('library-description').textContent=v.note;
    document.getElementById('library-creator').textContent=v.creator;
    const enter=document.getElementById('library-enter');enter.dataset.chronicle=v.id;
    enter.setAttribute('aria-label',`Open ${v.series?v.series+': ':''}${v.title}`);
    document.getElementById('library-position').textContent=`0${i+1} / 05`;
    document.getElementById('library-trailer').hidden=v.id!=='serpent';
    if(shelf.scrollWidth>shelf.clientWidth) shelf.scrollTo({left:buttons[i].offsetLeft-shelf.offsetLeft-5,behavior:'auto'});
  }
  document.getElementById('library-prev').addEventListener('click',()=>choose((selected+4)%5));
  document.getElementById('library-next').addEventListener('click',()=>choose((selected+1)%5));
  choose(0);
})();
