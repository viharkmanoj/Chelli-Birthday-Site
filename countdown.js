(() => {
  'use strict';
  const target = Date.parse('2026-12-04T00:00:00+05:30');
  const mount = () => {
    if (document.getElementById('birthday-countdown')) return;
    const anchor = document.querySelector('.intro-note') || document.querySelector('.intro h1');
    if (!anchor) return;
    const root = document.createElement('section');
    root.id = 'birthday-countdown';
    root.className = 'birthday-countdown';
    root.setAttribute('aria-label', 'Countdown to Chelliamma’s birthday');
    anchor.after(root);
    root.innerHTML = '<p class="flip-caption">UNTIL YOUR BIRTHDAY</p><div class="flip-units" aria-hidden="true"></div><p class="flip-date">4 December 2026 · 00:00 IST</p><span class="flip-accessible"></span>';
    const units = root.querySelector('.flip-units');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const groups = ['Days', 'Hours', 'Minutes', 'Seconds'].map(label => {
      const group = document.createElement('div');
      group.className = 'flip-unit';
      group.innerHTML = '<div class="flip-digits"></div><span class="flip-label">' + label + '</span>';
      units.append(group);
      return Array.from({length: 2}, () => {
        const digit = document.createElement('span');
        digit.className = 'flip-digit';
        digit.innerHTML = ['top','bottom','moving-top','moving-bottom'].map(part => '<span class="flip-half ' + part + '"><span>0</span></span>').join('');
        group.firstElementChild.append(digit);
        return {digit, value: null, timer: null};
      });
    });
    function write(item, value, animate) {
      if (item.value === value) return;
      const old = item.value ?? value;
      clearTimeout(item.timer);
      item.digit.classList.remove('flipping');
      const spans = item.digit.querySelectorAll('.flip-half > span');
      spans[0].textContent = value;
      spans[1].textContent = animate ? old : value;
      spans[2].textContent = old;
      spans[3].textContent = value;
      if (animate) {
        void item.digit.offsetWidth;
        item.digit.classList.add('flipping');
        item.timer = setTimeout(() => {
          spans[1].textContent = value;
          item.digit.classList.remove('flipping');
        }, 620);
      }
      item.value = value;
    }
    let initialized = false;
    let interval;
    function tick() {
      const remaining = Math.max(0, Math.ceil((target - Date.now()) / 1000));
      const values = [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60];
      values.forEach((value, index) => {
        const digits = String(Math.min(value, 99)).padStart(2, '0');
        groups[index].forEach((item, digit) => write(item, digits[digit], initialized && !reducedMotion.matches && !document.hidden));
      });
      root.querySelector('.flip-accessible').textContent = values.map((v,i) => v + ' ' + ['days','hours','minutes','seconds'][i]).join(', ') + ' until your birthday.';
      initialized = true;
      if (!remaining) {
        root.querySelector('.flip-caption').textContent = 'HAPPY BIRTHDAYYY, CHELLIAMMAAA!';
        root.querySelector('.flip-date').textContent = 'Today is all yours, ma 💙🪷';
        clearInterval(interval);
      }
    }
    interval = setInterval(tick, 1000);
    tick();
    document.addEventListener('visibilitychange', tick);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once: true});
  else mount();
})();
