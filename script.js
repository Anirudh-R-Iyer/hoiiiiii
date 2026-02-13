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

  const garden = document.getElementById('garden');
  const roseSVG = `
  <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="80" fill="transparent"/>
    <g shape-rendering="crispEdges">
      <rect x="26" y="46" width="8" height="18" fill="#2b8b4a"/>
      <rect x="22" y="58" width="4" height="6" fill="#1c5b33"/>
      <rect x="12" y="56" width="10" height="4" fill="#2b8b4a"/>
      <rect x="38" y="56" width="10" height="4" fill="#2b8b4a"/>
      <rect x="18" y="20" width="24" height="20" fill="#ff2b7a"/>
      <rect x="24" y="14" width="12" height="6" fill="#ff6aa8"/>
      <rect x="22" y="28" width="4" height="6" fill="#d1005a"/>
      <rect x="34" y="28" width="4" height="6" fill="#d1005a"/>
    </g>
  </svg>`.trim();

  for(let i=0;i<5;i++){
    const wrapper = document.createElement('div');
    wrapper.className = 'rose';
    wrapper.style.transform = `translateY(${10 + Math.random()*10}px) scale(${0.9 + Math.random()*0.25})`;
    wrapper.style.opacity = 0.95;
    wrapper.innerHTML = roseSVG;
    garden.appendChild(wrapper);
    setTimeout(()=> wrapper.classList.add('bloom'), 600 + i*350);
  }

  const askModal = document.getElementById('askModal');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const scrollWrap = document.getElementById('scrollWrap');
  const typedEl = document.getElementById('typed');
  const closeScroll = document.getElementById('closeScroll');
  const restart = document.getElementById('restart');

  function moveNoButtonRandomly(){
    noBtn.style.transform = `translate(${(Math.random()*160-80)}px, ${(Math.random()*40-20)}px)`;
    noBtn.style.transition = 'transform .35s cubic-bezier(.2,.9,.2,1)';
  }

  noBtn.addEventListener('mouseover', moveNoButtonRandomly);
  noBtn.addEventListener('touchstart', (e)=>{ e.preventDefault(); moveNoButtonRandomly(); }, {passive:false});
  noBtn.addEventListener('click', (e)=>{ moveNoButtonRandomly(); });

  yesBtn.addEventListener('click', ()=>{
    askModal.style.display = 'none';
    scrollWrap.classList.add('show');
    startTypewriter(LOVE_MESSAGE);
    document.querySelectorAll('.rose').forEach((r,i)=> {
      r.classList.remove('bloom');
      setTimeout(()=> r.classList.add('bloom'), 150 + i*100);
    });
    // start audio
    playBackgroundAudio();
  });

  closeScroll.addEventListener('click', ()=> {
    scrollWrap.classList.remove('show');
    askModal.style.display = 'block';
    typedEl.textContent = '';
    pauseBackgroundAudio();
  });

  restart.addEventListener('click', ()=> {
    typedEl.textContent = '';
    startTypewriter(LOVE_MESSAGE);
  });

  function startTypewriter(message){
    typedEl.textContent = '';
    let i=0;
    const speed = 18;
    function step(){
      if(i>=message.length) return;
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
  });

});
