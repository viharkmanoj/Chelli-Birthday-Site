const palettes=[["#10274a", "#4777cc", "#254b94", "#c7d9ff"], ["#15284e", "#6477d6", "#3e4d9e", "#d6ddff"], ["#0e2b4c", "#4a91c6", "#276493", "#c6e8ff"], ["#17264b", "#697dc1", "#415393", "#e0e8ff"], ["#122b51", "#4274c7", "#24539c", "#bed4fa"], ["#102447", "#578bca", "#35619c", "#d2e8ff"], ["#192b52", "#778bd2", "#5161ad", "#e3e5ff"], ["#0f2c4e", "#3f86b8", "#265e8c", "#c4e6fa"], ["#16274c", "#5275cc", "#3452a1", "#d3dcff"], ["#172f56", "#6898d5", "#3f6ca7", "#f0dfb8"]];
const grid=document.getElementById('gifts');
function illustration(p,i){return `<svg viewBox="0 0 200 190" aria-hidden="true"><ellipse cx="100" cy="171" rx="58" ry="8" fill="#73604b" opacity=".09"/><path class="star-detail" d="M30 74v10m-5-5h10M163 118v8m-4-4h8" stroke="${p[2]}" stroke-width="1"/><circle cx="157" cy="61" r="2" fill="${p[2]}" opacity=".4"/><g><path d="M48 100h104v59q0 7-7 7H55q-7 0-7-7z" fill="${p[1]}"/><path d="M48 100h104v12H48z" fill="${p[2]}" opacity=".27"/><path d="M91 105h19v61H91z" fill="${p[3]}"/><path d="M48 100h104v59q0 7-7 7h-7v-66z" fill="${p[2]}" opacity=".16"/><g class="inside"><path d="M49 100l12-12h78l12 12-12 13H61z" fill="${p[2]}"/><path d="M61 100l7-7h64l7 7-7 6H68z" fill="#020b20" opacity=".30"/></g><g class="lid"><path d="M99 85C64 88 59 62 71 60c14-2 27 18 29 24" fill="none" stroke="${p[2]}" stroke-width="9"/><path d="M101 85c34 3 41-23 29-25-13-2-26 18-29 24" fill="none" stroke="${p[2]}" stroke-width="9"/><path d="M99 83C66 85 62 61 73 61c12 0 24 18 26 22M102 83c31 2 36-22 25-22-12 0-23 18-25 22" fill="none" stroke="${p[3]}" stroke-width="6"/><path d="M97 82l-17 33 11-4 5 8 9-35" fill="${p[3]}"/><rect x="43" y="87" width="114" height="24" rx="4" fill="${p[1]}"/><path d="M44 90h112" stroke="white" opacity=".3"/><path d="M91 87h19v24H91z" fill="${p[3]}"/><rect x="94" y="78" width="14" height="12" rx="5" fill="${p[3]}"/></g></g></svg>`}
const reviewKey='annaiya-review-2026-round3';
let reviewFinished=false;
try{reviewFinished=localStorage.getItem(reviewKey)==='finished'}catch{}
const reviewMode=new URLSearchParams(location.search).get('review')==='annaiya3'&&!reviewFinished;
const unlockStart=Date.parse('2026-11-24T00:00:00+05:30');
const unlockAt=day=>unlockStart+(10-day)*86400000;
const isUnlocked=(day,now=Date.now())=>reviewMode||now>=unlockAt(day);
const unlockLabel=day=>new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Kolkata'}).format(new Date(unlockAt(day)))+' · 00:00 IST';
let openedDays=[];
try { const saved=JSON.parse(localStorage.getItem('chelli-opened-boxes')||'[]'); if(Array.isArray(saved))openedDays=saved.filter(d=>Number.isInteger(d)&&d>=1&&d<=10); } catch {}
const giftButtons=new Map();
for(let i=0;i<10;i++) {
  const day=10-i,p=palettes[i],b=document.createElement('button');
  b.type='button';b.className='gift';b.style.setProperty('--bg',p[0]);
  b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-expanded','false');
  b.innerHTML=`<img class="box-lotus" src="lotus.svg" alt=""><span class="day">DAY ${String(day).padStart(2,'0')}</span>${illustration(p,i)}<span class="gift-label">${day===1?'One day to go':day+' days to go'}</span><span class="action"></span>`;
  b.addEventListener('click',()=>openLetter(day,b,p));grid.appendChild(b);giftButtons.set(day,b);
}
function refreshLocks(){
  giftButtons.forEach((b,day)=>{
    const ready=isUnlocked(day),opened=ready&&openedDays.includes(day);
    b.classList.toggle('locked',!ready);b.classList.toggle('open',opened);
    b.setAttribute('aria-label',ready?`Read box ${day}: ${giftMessages[day].title}`:`Box ${day}: Locked`);
    b.querySelector('.action').textContent=opened?'Yours to keep':ready?'Untie the ribbon':'Locked';
  });
  document.querySelectorAll('#letter-nav button').forEach(b=>{const day=Number(b.dataset.day);b.classList.toggle('locked',!isUnlocked(day));b.setAttribute('aria-label',isUnlocked(day)?`Read box ${day}`:`Box ${day}: Locked`)});
}

function burst(el,p,container=document.getElementById('confetti')){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=el.getBoundingClientRect();for(let j=0;j<42;j++){const c=document.createElement('i');c.style.left=r.left+r.width/2+'px';c.style.top=r.top+r.height*.45+'px';c.style.setProperty('--x',(Math.random()-.5)*210+'px');c.style.setProperty('--y',(Math.random()-.7)*180+'px');c.style.setProperty('--r',Math.random()*540+'deg');c.style.setProperty('--color',[p[1],p[2],p[3],'#d4b579'][j%4]);if(j%3===0)c.style.borderRadius='50%';container.appendChild(c);setTimeout(()=>c.remove(),1100)}}

const openingAudio=document.getElementById('opening-audio');
const lockedAudio=document.getElementById('locked-audio');
let soundOn=true;
function playClip(audio){
  [openingAudio,lockedAudio].forEach(a=>{a.pause();a.currentTime=0});
  if(!soundOn)return;
  const playback=audio.play();if(playback)playback.catch(()=>{});
}
const giftDialog=document.getElementById('gift-dialog');
const letter=giftDialog.querySelector('.letter');
let activeDay=null,revealing=false,statusTimer;
function showLocked(day){
  playClip(lockedAudio);
  const status=giftDialog.open?giftDialog.querySelector('.letter-status'):document.getElementById('locked-status');
  status.textContent=`Not yet, Chelliamma! This gift unlocks on ${unlockLabel(day)}. 🪷`;
  status.classList.add('visible');clearTimeout(statusTimer);
  statusTimer=setTimeout(()=>{status.classList.remove('visible');status.textContent=''},5500);
}
function openLetter(day,box,palette){
  if(!isUnlocked(day)){showLocked(day);return;}
  if(revealing)return;
  revealing=true;activeDay=day;
  if(!openedDays.includes(day)){openedDays.push(day);if(!reviewMode){try{localStorage.setItem('chelli-opened-boxes',JSON.stringify(openedDays))}catch{}}}
  refreshLocks();box.setAttribute('aria-expanded','true');
  const message=giftMessages[day];
  giftDialog.querySelector('.letter-day').textContent=`BOX ${String(day).padStart(2,'0')} · ${reviewMode?'REVIEW PREVIEW':'JUST FOR YOU'}`;
  giftDialog.querySelector('h2').textContent=message.title;
  giftDialog.querySelector('.letter-message').textContent=message.text;
  giftDialog.querySelector('.letter-wish').textContent=message.wish;
  const exam=giftDialog.querySelector('.letter-exam');
  exam.textContent=message.exam?'And all the besttt for your exammm chelli💪💪🔥🔥':'';exam.hidden=!message.exam;
  giftDialog.querySelector('.letter-status').textContent='';
  document.querySelectorAll('#letter-nav button').forEach(b=>b.setAttribute('aria-current',Number(b.dataset.day)===day?'true':'false'));
  playClip(openingAudio);
  const alreadyOpen=giftDialog.open;
  
  giftDialog.classList.remove('revealing');
  setTimeout(()=>{
    const r=box.getBoundingClientRect();
    if(!giftDialog.open)giftDialog.showModal();
    giftDialog.querySelector('.letter-scroll').scrollTop=0;
    document.body.classList.add('letter-visible');
    const l=letter.getBoundingClientRect();
    giftDialog.style.setProperty('--from-x',alreadyOpen?'0px':`${r.left+r.width/2-l.left-l.width/2}px`);
    giftDialog.style.setProperty('--from-y',alreadyOpen?'24px':`${r.top+r.height*.45-l.top-l.height/2}px`);
    giftDialog.classList.add('revealing');burst(letter,palette,document.getElementById('letter-confetti'));letter.focus({preventScroll:true});revealing=false;
  },matchMedia('(prefers-reduced-motion: reduce)').matches?0:alreadyOpen?30:260);
}
// Close the letter while keeping its gift unwrapped and available to reread.
function closeMessage(){
  if(!giftDialog.open||revealing)return;
  const previousDay=activeDay;
  giftDialog.close();giftDialog.classList.remove('revealing');
  document.body.classList.remove('letter-visible');
  giftDialog.querySelector('.letter-status').textContent='';
  document.getElementById('letter-confetti').replaceChildren();
  activeDay=null;
  refreshLocks();
  const box=giftButtons.get(previousDay);
  if(box){box.setAttribute('aria-expanded','false');box.focus({preventScroll:true})}
}
giftDialog.querySelector('.close-message').addEventListener('click',closeMessage);
giftDialog.addEventListener('cancel',e=>{e.preventDefault();closeMessage()});
giftDialog.addEventListener('click',e=>{if(e.target===giftDialog)closeMessage()});
const letterNav=document.getElementById('letter-nav');
for(let day=10;day>=1;day--){
  const b=document.createElement('button');b.type='button';b.dataset.day=String(day);b.textContent=`Box ${day}`;
  b.addEventListener('click',()=>openLetter(day,giftButtons.get(day),palettes[10-day]));letterNav.appendChild(b);
}
refreshLocks();
setInterval(refreshLocks,1000);
document.addEventListener('visibilitychange',refreshLocks);

if(reviewMode){
  document.getElementById('review-banner').hidden=false;
  document.querySelectorAll('.finish-review').forEach(button=>{button.hidden=false});
}
document.querySelectorAll('.finish-review').forEach(button=>button.addEventListener('click',()=>{
  try{localStorage.setItem(reviewKey,'finished')}catch{}
  const url=new URL(location.href);url.searchParams.delete('review');location.replace(url.href);
}));

const backgroundMusic=document.getElementById('background-music');
let musicOn=true;
let musicStarted=false;
backgroundMusic.volume=.22;
function startMusic(){
  if(!musicOn||musicStarted)return;
  musicStarted=true;
  const playback=backgroundMusic.play();
  if(playback)playback.catch(()=>{musicStarted=false});
}
// Begin during a real visitor gesture so mobile browsers can allow playback.
document.addEventListener('click',event=>{
  startMusic();
},true);
document.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' ')startMusic()},true);
function updateMusicVolume(){
  backgroundMusic.volume=(!openingAudio.paused&&!openingAudio.ended)||(!lockedAudio.paused&&!lockedAudio.ended)? .055:.22;
}
[openingAudio,lockedAudio].forEach(audio=>{
  ['play','playing','pause','ended','error','emptied'].forEach(event=>audio.addEventListener(event,updateMusicVolume));
});

// Try immediate audible playback; retain gesture fallback if browser blocks it.
startMusic();
