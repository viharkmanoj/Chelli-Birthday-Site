(() => {
  'use strict';
  const wishes = [
  {
    "name": "Moahith",
    "image": "birthday-people/moahith.jpeg",
    "message": "Hey bangaram, happy birthday baby. You always put others before u, sacrifice yourself for others happiness even when it's hurting you. I want you to from now on to the best of your abilities put yourself first cuz u deserve it, it includes me too im no exception. Ik we don't spend much time together il try my best to get on discord with you , and I love u , u mean the world to meee byee"
  },
  {
    "name": "Jayani",
    "image": "birthday-people/jayani.jpeg",
    "message": ""
  },
  {
    "name": "Vichu",
    "image": "birthday-people/vichu.jpeg",
    "message": ""
  },
  {
    "name": "Pragna",
    "image": "birthday-people/pragna.jpeg",
    "message": ""
  },
  {
    "name": "Shuvetha",
    "image": "birthday-people/shuvetha.jpeg",
    "message": "I hope shan gets everything and more than she gives⭐️ and god bless her with all 3B👅💗. I hope everyone is shan to you and are surrounded by many more shanvie because that’s how amazing you are 😁.i hope all ur dreams come true the once we have discussed and the one we have not💋.i hope u heal from everything and be shaaanaaaviii 💗✨.i secretly wish i will sing at ur wedding and we stay frnds till then 😁✨."
  },
  {
    "name": "Harshita",
    "image": "birthday-people/harshita.jpeg",
    "message": "wish you a life full of happiness, unexpected blessings, beautiful memories, genuine people and zero fake friends. \nyou’ve always deserve  the success you’ve worked for and the money to fund all our nonsense plans 💋🎊 when are we planning our trip tho\nNo matter how old we get or where life takes us, I hope we always remain this stupid together. Love youuu"
  },
  {
    "name": "Reema",
    "image": "birthday-people/reema.jpeg",
    "message": "May you get everything you’ve ever wished for, even the things you’ve never told anyone about. I hope life brings you endless happiness, love and success. And most importantly, may you never lose the little spark that makes you who you are. I hope you always have a reason to smile and know how much you deserve all the good things in life."
  },
  {
    "name": "ANNAIYA",
    "image": "",
    "message": ""
  }
];
  const unlock = Date.parse('2026-12-04T00:00:00+05:30');
  const key = 'chelli-birthday-gift-opened-2026';
  const preview = typeof reviewMode !== 'undefined' && reviewMode;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let opened = false, busy = false, birthdayStatusTimer;
  try { opened = localStorage.getItem(key) === 'true'; } catch {}
  const section = document.createElement('section');
  section.className = 'birthday-finale';
  section.setAttribute('aria-label','Birthday gift');
  section.innerHTML = `<button class="birthday-present" type="button" aria-haspopup="dialog" aria-expanded="false"><span class="birthday-grid-day">BIRTHDAY · 04 DEC</span><span class="birthday-aura" aria-hidden="true"></span><span class="birthday-sparkles" aria-hidden="true">✦ <i>✧</i> ✦</span><span class="birthday-artwork" aria-hidden="true"><span class="lotus-halo"></span><span class="lotus-light"></span><span class="lotus-inside"></span><span class="lotus-keepsake-card"><img src="lotus.svg" alt=""></span><img class="lotus-layer lotus-body" src="birthday-lotus-gift.png" alt=""><img class="lotus-layer lotus-lid" src="birthday-lotus-gift.png" alt=""></span><span class="birthday-present-title">For the birthday girl</span><span class="birthday-present-status">Locked</span></button>`;
  const gifts = document.getElementById('gifts');
  if (!gifts) return;
  gifts.append(section);
  const button = section.querySelector('button');
  const status = document.getElementById('locked-status');
  document.addEventListener('click', event => {
    if (event.target.closest('.gift')) {
      clearTimeout(birthdayStatusTimer);
      status.classList.remove('birthday-blue-status');
    }
  }, true);
  const dialog = document.createElement('dialog');
  dialog.id = 'birthday-wishes-dialog';
  dialog.setAttribute('aria-labelledby','birthday-wishes-title');
  dialog.innerHTML = `<article class="birthday-wishes-panel" tabindex="-1"><div class="birthday-panel-toolbar"><span>A BIRTHDAY KEEPSAKE</span><button type="button" class="birthday-close" aria-label="Close birthday gift">Close ×</button></div><div class="birthday-panel-scroll"><h2 id="birthday-wishes-title"><img class="birthday-heading-art" src="birthday-heading.png" alt="Happy Birthday Chelliamma"></h2><p class="birthday-wishes-intro">Here are some wishes for you from your favorite people❤️❤️</p><div class="album-dedication"><span></span><img src="lotus.svg" alt=""><span></span><p>Eight people. So much love.</p></div><div id="birthday-wishes-content"></div><p class="birthday-panel-signature">With love, <strong>ANNAIYA</strong></p></div></article><div class="confetti birthday-confetti" aria-hidden="true"></div>`;
  document.body.append(dialog);
  const content = dialog.querySelector('#birthday-wishes-content');
  for (const wish of wishes) {
    const card = document.createElement('section');
    card.className = 'person-wish';
    const name = document.createElement('h3'); name.textContent = wish.name; card.append(name);
    const corner = document.createElement('img'); corner.src = 'lotus.svg'; corner.alt = ''; corner.className = 'album-corner'; card.append(corner);
    if (wish.image) {
      const photo = document.createElement('img'); photo.src = wish.image; photo.alt = wish.name + ' with Chelliamma'; photo.className = 'album-photo'; photo.loading = 'lazy'; photo.decoding = 'async'; card.append(photo);
    } else {
      const blank = document.createElement('div'); blank.className = 'wish-photo-blank'; blank.setAttribute('aria-label', 'Photo space reserved for ANNAIYA'); card.append(blank);
    }
    const message = document.createElement('p'); message.className = 'person-message'; message.textContent = wish.message;
    if (!wish.message) { message.classList.add('wish-message-blank'); message.setAttribute('aria-label', 'Message space reserved for ' + wish.name); }
    card.append(message); content.append(card);
    if (typeof window.installBirthdayScratch === 'function') window.installBirthdayScratch(card, content.children.length);
  }
  const art = button.querySelector('.birthday-artwork');
  for (let i=0;i<32;i++) {
    const spark = document.createElement('span'); spark.className = 'lotus-spark';
    spark.style.setProperty('--sx', ((i*137.5%360)-180)+'px');
    spark.style.setProperty('--sy', (-80-(i*37%230))+'px');
    spark.style.setProperty('--delay', (.65+(i%8)*.055)+'s'); art.append(spark);
  }
  function celebrate() {
    if (reduced()) return;
    const field = dialog.querySelector('.birthday-confetti');
    field.replaceChildren();
    for (let i=0;i<160;i++) {
      const piece = document.createElement('span'); piece.className = 'grand-confetti';
      piece.style.left = (Math.random()*100)+'%';
      piece.style.setProperty('--drift', (Math.random()*320-160)+'px');
      piece.style.setProperty('--spin', (Math.random()*1440-720)+'deg');
      piece.style.setProperty('--foil', ['#e7b449','#e7b449','#619bf2','#d996bc','#e7b449'][i%5]);
      if (i%7===0) piece.classList.add('foil-star');
      piece.style.width = (7+Math.random()*9)+'px'; piece.style.height = (10+Math.random()*14)+'px';
      piece.style.animationDelay = (Math.random()*1.5)+'s';
      piece.style.animationDuration = (3.5+Math.random()*2)+'s';
      field.append(piece);
    }
    setTimeout(()=>field.replaceChildren(),7200);
  }
  const panel = dialog.querySelector('article');
  let revealAnimation = null;
  const ready = () => preview || Date.now() >= unlock;
  function refresh() {
    if (!busy) button.classList.toggle('is-opened',ready() && opened);
    button.querySelector('.birthday-present-status').textContent = !ready() ? 'Locked' : opened ? 'Opened · Read again' : 'Open your birthday gift';
    button.setAttribute('aria-label',!ready() ? 'Birthday gift: Locked' : opened ? 'Read your birthday gift again' : 'Open your birthday gift');
  }
  function close() {
    if (!dialog.open) return;
    if (revealAnimation) { revealAnimation.cancel(); revealAnimation = null; }
    panel.style.willChange = '';
    dialog.close();
    document.body.classList.remove('letter-visible');
    button.setAttribute('aria-expanded','false');
    dialog.querySelector('.birthday-confetti').replaceChildren();
    button.focus({preventScroll:true});
  }
  button.addEventListener('click', () => {
    if (busy) return;
    if (!ready()) {
      if (typeof playClip === 'function') playClip(lockedAudio);
      status.textContent = 'Not yet, Chelliamma! This one is for your birthday. 💙';
      clearTimeout(birthdayStatusTimer);
      if (typeof statusTimer !== 'undefined') clearTimeout(statusTimer);
      status.classList.add('visible', 'birthday-blue-status');
      birthdayStatusTimer = setTimeout(() => { status.classList.remove('visible', 'birthday-blue-status'); status.textContent = ''; }, 5500);
      return;
    }
    busy = true;
    clearTimeout(birthdayStatusTimer);
    status.classList.remove('visible', 'birthday-blue-status');
    status.textContent = '';
    button.classList.remove('unwrapping', 'is-opened');
    void button.offsetWidth;
    button.classList.add('unwrapping');
    if (typeof playClip === 'function') playClip(openingAudio);
    setTimeout(() => {
      const origin = art.querySelector('.lotus-keepsake-card').getBoundingClientRect();
      dialog.classList.remove('birthday-reveal');
      dialog.showModal();
      const bounds = panel.getBoundingClientRect();
      const dx = origin.left + origin.width/2 - bounds.left - bounds.width/2;
      const dy = origin.top + origin.height/2 - bounds.top - bounds.height/2;
      if (!reduced()) {
        panel.style.willChange = 'transform, opacity';
        revealAnimation = panel.animate([
          { opacity: .85, transform: `translate3d(${dx}px,${dy}px,0) scale(${origin.width/bounds.width},${origin.height/bounds.height})` },
          { opacity: 1, transform: 'translate3d(0,0,0) scale(1,1)' }
        ], { duration: 800, easing: 'cubic-bezier(.22,1,.36,1)' });
        revealAnimation.finished.then(() => {
          revealAnimation = null; panel.style.willChange = '';
          if (dialog.open) celebrate();
        }).catch(() => {});
      }
      document.body.classList.add('letter-visible');
      dialog.querySelector('.birthday-panel-scroll').scrollTop = 0;
      opened = true;
      if (!preview) { try { localStorage.setItem(key,'true'); } catch {} }
      refresh();
      button.setAttribute('aria-expanded','true');
      panel.focus({preventScroll:true});
      button.classList.remove('unwrapping');
      busy = false;
      refresh();
    }, reduced() ? 0 : 950);
  });
  dialog.querySelector('.birthday-close').addEventListener('click',close);
  dialog.addEventListener('cancel',event => { event.preventDefault();close(); });
  dialog.addEventListener('click',event => { if (event.target === dialog) close(); });
  refresh();
  setInterval(refresh,1000);
  document.addEventListener('visibilitychange',refresh);
})();
