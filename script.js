/* -------------------------
   CONFIG: Replace your message here.
   ------------------------- */
const LOVE_MESSAGE = `My dearest love,

On this day I want to tell you just how much you mean to me. You are the dawn in my darkest night, the laughter in my quietest hour, and the home my heart always finds.

Every moment with you is an adventure I'm grateful to share. Will you continue to be my partner in all the small, silly, grand and tender things that make us -- us?

Forever yours,
[Your Name]
`;

/* -------------------------
   End config
   ------------------------- */

document.addEventListener('DOMContentLoaded', ()=>{

  const scene = document.querySelector('.scene');

  const garden = document.getElementById('garden');

  function flowerSVG({petal="#ff2b7a", highlight="#ff6aa8", shadow="#d1005a", stem="#2b8b4a", leaf="#1c5b33"}={}){
    return `
    <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="80" fill="transparent"/>
      <g shape-rendering="crispEdges">
        <rect x="26" y="46" width="8" height="18" fill="${stem}"/>
        <rect x="22" y="58" width="4" height="6" fill="${leaf}"/>
        <rect x="12" y="56" width="10" height="4" fill="${stem}"/>
        <rect x="38" y="56" width="10" height="4" fill="${stem}"/>
        <rect x="18" y="20" width="24" height="20" fill="${petal}"/>
        <rect x="24" y="14" width="12" height="6" fill="${highlight}"/>
        <rect x="22" y="28" width="4" height="6" fill="${shadow}"/>
        <rect x="34" y="28" width="4" height="6" fill="${shadow}"/>
      </g>
    </svg>`.trim();
  }

  const flowerPalettes = [
    {petal:'#ff2b7a', highlight:'#ff6aa8', shadow:'#d1005a'},
    {petal:'#ffb703', highlight:'#ffd166', shadow:'#d28b00'},
    {petal:'#7c4dff', highlight:'#b79cff', shadow:'#4f2bd6'},
    {petal:'#00d4ff', highlight:'#8eefff', shadow:'#00a2c8'},
    {petal:'#ff4d6d', highlight:'#ff97a8', shadow:'#c92a47'},
    {petal:'#5cff98', highlight:'#a7ffd0', shadow:'#23b463'},
  ];

  // MORE flowers blooming 🌸🌼🌷
  const flowerCount = Math.max(12, Math.floor(window.innerWidth / 85));
  for(let i=0;i<flowerCount;i++){
    const pal = flowerPalettes[Math.floor(Math.random()*flowerPalettes.length)];
    const wrapper = document.createElement('div');
    wrapper.className = 'rose';
    wrapper.style.transform = `translateY(${10 + Math.random()*12}px) scale(${0.75 + Math.random()*0.45})`;
    wrapper.style.opacity = 0.95;
    wrapper.innerHTML = flowerSVG(pal);
    garden.appendChild(wrapper);
    setTimeout(()=> wrapper.classList.add('bloom'), 450 + i*140);
  }

  // MORE twinkling stars ✨
  const starfield = document.querySelector('.starfield');
  function seedStars(count=160){
    for(let i=0;i<count;i++){
      const s = document.createElement('div');
      s.className = 'star';
      s.style.left = (Math.random()*100) + '%';
      s.style.top = (Math.random()*65) + '%';
      const size = (Math.random()<0.18) ? 3 : 2;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.opacity = (0.25 + Math.random()*0.75).toFixed(2);
      s.style.setProperty('--tw', (2.2 + Math.random()*3.5).toFixed(2) + 's');
      starfield.appendChild(s);
    }
  }
  seedStars(180);

  // SOOOO many falling petals 💮
  const petalsEl = document.getElementById('petals');
  function seedPetals(count=260){
    petalsEl.innerHTML = '';
    for(let i=0;i<count;i++){
      const p = document.createElement('div');
      p.className = 'petal';
      p.style.left = (Math.random()*100) + '%';
      p.style.setProperty('--d', (5.5 + Math.random()*7.5).toFixed(2) + 's');
      p.style.setProperty('--s', (1.8 + Math.random()*2.2).toFixed(2) + 's');
      p.style.setProperty('--p', (1.8 + Math.random()*2.8).toFixed(2) + 's');
      p.style.setProperty('--x', ((Math.random()*120)-60).toFixed(0) + 'px');
      p.style.setProperty('--r', ((Math.random()*360)-180).toFixed(0) + 'deg');
      p.style.setProperty('--o', (0.2 + Math.random()*0.8).toFixed(2));
      const w = 5 + Math.random()*10;
      const h = 4 + Math.random()*8;
      p.style.width = w.toFixed(0) + 'px';
      p.style.height = h.toFixed(0) + 'px';
      p.style.animationDelay = (-Math.random()*10).toFixed(2) + 's';
      // randomize petal tint slightly
      const tint = 215 + Math.floor(Math.random()*40);
      p.style.background = `rgba(255, ${tint}, ${tint+10}, ${0.55 + Math.random()*0.4})`;
      petalsEl.appendChild(p);
    }
  }
  seedPetals(320);

  const askModal = document.getElementById('askModal');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const qEl = document.getElementById('q');
  const ORIGINAL_Q = qEl ? qEl.textContent : 'Will you be my Valentine? <3';
  const scrollWrap = document.getElementById('scrollWrap');
  const typedEl = document.getElementById('typed');
  const closeScroll = document.getElementById('closeScroll');
  const restart = document.getElementById('restart');
  const kapiBtn = document.getElementById('kapiBtn');

  function moveNoButtonRandomly(){
    const x = (Math.random()*320-160);
    const y = (Math.random()*140-70);
    const r = (Math.random()*14-7);
    noBtn.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
    noBtn.style.transition = 'transform .22s cubic-bezier(.15,1.1,.15,1)';
  }

  function scoldNo(){
    if(!qEl) return;
    qEl.textContent = 'NOOOO you cannttt click NO 😠🥺';
    askModal.classList.add('shake');
    // Re-ask quickly, like nothing happened 😤
    window.setTimeout(()=>{
      qEl.textContent = ORIGINAL_Q;
      askModal.classList.remove('shake');
    }, 1100);
  }

  noBtn.addEventListener('mouseenter', moveNoButtonRandomly);
  noBtn.addEventListener('mouseover', moveNoButtonRandomly);
  noBtn.addEventListener('pointerenter', moveNoButtonRandomly);
  noBtn.addEventListener('focus', moveNoButtonRandomly);
  noBtn.addEventListener('mousedown', (e)=>{ e.preventDefault(); moveNoButtonRandomly(); });
  noBtn.addEventListener('touchstart', (e)=>{ e.preventDefault(); moveNoButtonRandomly(); }, {passive:false});
  noBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    moveNoButtonRandomly();
    scoldNo();
    // Keep the question visible no matter what
    askModal.style.display = 'flex';
  });

  yesBtn.addEventListener('click', ()=>{
    askModal.style.display = 'none';
    scrollWrap.classList.add('show');
    // Hide the Kapi Dawara button until the message fully finishes typing
    if(kapiBtn) kapiBtn.style.display = 'none';
    startTypewriter(LOVE_MESSAGE, ()=>{
      if(kapiBtn) kapiBtn.style.display = 'inline-flex';
    });
    document.querySelectorAll('.rose').forEach((r,i)=> {
      r.classList.remove('bloom');
      setTimeout(()=> r.classList.add('bloom'), 150 + i*100);
    });
    // start audio
    playBackgroundAudio();

    // extra petals + sparkle on YES
    seedPetals(420);
  });

  closeScroll.addEventListener('click', ()=> {
    scrollWrap.classList.remove('show');
    askModal.style.display = 'block';
    typedEl.textContent = '';
    if(kapiBtn) kapiBtn.style.display = 'none';
    pauseBackgroundAudio();

    // calm petals a bit when closed
    seedPetals(280);
  });

  restart.addEventListener('click', ()=> {
    typedEl.textContent = '';
    if(kapiBtn) kapiBtn.style.display = 'none';
    startTypewriter(LOVE_MESSAGE, ()=>{
      if(kapiBtn) kapiBtn.style.display = 'inline-flex';
    });
  });

  function startTypewriter(message, onDone){
    typedEl.textContent = '';
    let i=0;
    const speed = 18;
    function step(){
      if(i>=message.length){
        try{ onDone && onDone(); }catch(e){}
        return;
      }
      const ch = message[i++];
      typedEl.textContent += ch;
      const scroll = document.getElementById('scroll');
      scroll.scrollTop = scroll.scrollHeight;
      const delay = speed + Math.floor(Math.random()*18);
      setTimeout(step, delay);
    }
    step();
  }

  document.querySelector('.center-content').addEventListener('click', ()=> {
    askModal.style.display = 'block';
    askModal.style.transform = 'translate(-50%,-50%) scale(1)';
  });

  // audio controls: use actual audio file (put assets/chiptune.wav in repo)
  const bgAudio = document.getElementById('bgAudio');
  const muteBtn = document.getElementById('muteBtn');
  const victoryAudio = document.getElementById('victoryAudio');

  function ensureAudioGesture(){
    // browsers require a user gesture to play, so this is hooked to the first click
    if(bgAudio.paused){
      try { bgAudio.play().catch(()=>{}); } catch(e){}
    }
    document.body.removeEventListener('click', ensureAudioGesture);
  }
  document.body.addEventListener('click', ensureAudioGesture, {once:true});
  document.body.addEventListener('touchstart', ensureAudioGesture, {once:true});

  function playBackgroundAudio(){
    try { bgAudio.currentTime = 0; bgAudio.play().catch(()=>{}); } catch(e){}
    muteBtn.textContent = 'Mute music';
  }
  function pauseBackgroundAudio(){ bgAudio.pause(); muteBtn.textContent = 'Unmute music'; }

  muteBtn.addEventListener('click', ()=>{
    if(bgAudio.paused){ bgAudio.play().catch(()=>{}); muteBtn.textContent = 'Mute music'; }
    else { bgAudio.pause(); muteBtn.textContent = 'Unmute music'; }
  });

  /* -------------------------
     Easter egg: Kapi Dawara + Cup
     - toggles a cute filter
     - plays victory sound
     - opens a collage/montage
     - lets you click a photo to store it in the "kapi dawara" drawer (localStorage)
     ------------------------- */

  // Kapi Dawara opens from a button that appears after the message finishes typing
  const montage = document.getElementById('montage');
  const montageGrid = document.getElementById('montageGrid');
  const kapiShelf = document.getElementById('kapiShelf');
  const closeMontage = document.getElementById('closeMontage');
  const addPhotos = document.getElementById('addPhotos');
  const clearKapi = document.getElementById('clearKapi');

  const KAPI_KEY = 'kapi_dawara_photos_v1';
  const MAX_STORED = 3;

  // Keep the default grid small (4–5 moments by default)
  const builtInMoments = [
    'assets/moments/1.jpg',
    'assets/moments/2.jpg',
    svgMoment('our first quest', '💖'),
    svgMoment('stargazing', '✨'),
    svgMoment('cozy cafe', '☕'),
  ];

  function svgMoment(label, emoji){
    const safe = encodeURIComponent(label);
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='420' viewBox='0 0 600 420'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='#ff5c8a'/>
          <stop offset='1' stop-color='#6c63ff'/>
        </linearGradient>
      </defs>
      <rect width='600' height='420' fill='url(#g)'/>
      <circle cx='520' cy='80' r='55' fill='rgba(255,255,255,0.18)'/>
      <circle cx='85' cy='340' r='80' fill='rgba(0,0,0,0.12)'/>
      <text x='50%' y='44%' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='96'>${emoji}</text>
      <text x='50%' y='72%' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='28' fill='rgba(255,255,255,0.92)'>${label}</text>
    </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function getStored(){
    try{ return JSON.parse(localStorage.getItem(KAPI_KEY) || '[]'); }catch{ return []; }
  }
  function setStored(arr){
    localStorage.setItem(KAPI_KEY, JSON.stringify(arr.slice(0, MAX_STORED)));
  }

  function renderShelf(){
    const items = getStored();
    kapiShelf.innerHTML = '';
    const slots = Math.max(8, items.length);
    for(let i=0;i<slots;i++){
      const slot = document.createElement('div');
      slot.className = 'slot';
      if(items[i]){
        const img = document.createElement('img');
        img.src = items[i];
        img.alt = 'stored moment';
        slot.appendChild(img);
      }
      kapiShelf.appendChild(slot);
    }
  }

  function addToKapi(src){
    const cur = getStored();
    if(cur.includes(src)) return;
    if(cur.length >= MAX_STORED){
      alert(`kapi dawara is full (max ${MAX_STORED}). Clear the drawer to store more.`);
      return;
    }
    cur.unshift(src);
    setStored(cur);
    renderShelf();
  }

  function addMomentTile(src){
    const tile = document.createElement('div');
    tile.className = 'moment';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'moment';
    img.loading = 'lazy';
    img.onerror = ()=>{
      // If the assets/moments/*.jpg doesn't exist, swap to a cute fallback.
      img.onerror = null;
      img.src = svgMoment('missing moment (add your own!)', '📸');
    };
    tile.appendChild(img);
    tile.addEventListener('click', ()=> addToKapi(img.src));
    montageGrid.appendChild(tile);
  }

  function buildMontageGrid(){
    montageGrid.innerHTML = '';
    // built-ins
    builtInMoments.forEach(addMomentTile);
    // stored moments also appear in the grid
    getStored().forEach(addMomentTile);
  }

  let montageTimer = null;
  function startMontagePop(){
    stopMontagePop();
    montageTimer = setInterval(()=>{
      const tiles = montageGrid.querySelectorAll('.moment');
      if(!tiles.length) return;
      const t = tiles[Math.floor(Math.random()*tiles.length)];
      t.classList.remove('pop');
      // force reflow so animation retriggers
      void t.offsetWidth;
      t.classList.add('pop');
    }, 420);
  }
  function stopMontagePop(){
    if(montageTimer) clearInterval(montageTimer);
    montageTimer = null;
  }

  function openMontage(){
    scene.classList.add('kapi-filter');
    montage.classList.add('show');
    buildMontageGrid();
    renderShelf();
    startMontagePop();
  }
  function closeMontageNow(){
    montage.classList.remove('show');
    scene.classList.remove('kapi-filter');
    stopMontagePop();
  }

  function playVictory(){
    try{ victoryAudio.currentTime = 0; victoryAudio.play().catch(()=>{}); }catch(e){}
  }

  if(kapiBtn){
    kapiBtn.addEventListener('click', ()=>{
      playVictory();
      openMontage();
    });
  }
  closeMontage.addEventListener('click', closeMontageNow);
  montage.addEventListener('click', (e)=>{
    // click outside the card closes
    if(e.target === montage) closeMontageNow();
  });

  clearKapi.addEventListener('click', ()=>{
    localStorage.removeItem(KAPI_KEY);
    renderShelf();
    buildMontageGrid();
  });

  addPhotos.addEventListener('change', async (e)=>{
    const files = Array.from(e.target.files || []);
    if(!files.length) return;
    for(const file of files){
      if(!file.type.startsWith('image/')) continue;
      if(getStored().length >= MAX_STORED){
        alert(`kapi dawara is full (max ${MAX_STORED}). Clear the drawer to store more.`);
        break;
      }
      // lightweight size guard (keeps localStorage from exploding)
      if(file.size > 900_000){
        alert(`"${file.name}" is a bit large for storage. Try a smaller image (under ~900KB).`);
        continue;
      }
      const dataUrl = await readFileAsDataURL(file);
      addToKapi(dataUrl);
    }
    buildMontageGrid();
    e.target.value = '';
  });

  function readFileAsDataURL(file){
    return new Promise((resolve, reject)=>{
      const r = new FileReader();
      r.onload = ()=> resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  setInterval(()=> {
    document.querySelector('.moon').animate([
      { transform: 'scale(1) translateY(0)' },
      { transform: 'scale(1.02) translateY(-2px)' },
      { transform: 'scale(1) translateY(0)' }
    ], { duration: 6000, iterations: 1});
  }, 6200);

  document.addEventListener('keydown', (e)=>{
    if(e.key.toLowerCase() === 'y') yesBtn.click();
    if(e.key.toLowerCase() === 'n') moveNoButtonRandomly();
    // secret-ish: press K to open the kapi dawara (only after it becomes available)
    if(e.key.toLowerCase() === 'k'){
      if(kapiBtn && kapiBtn.style.display !== 'none'){
        playVictory();
        openMontage();
      }
    }
  });

});
