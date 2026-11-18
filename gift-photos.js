(() => {
  'use strict';
  const setup = () => {
    const dialog = document.getElementById('gift-dialog');
    const dayLabel = dialog?.querySelector('.letter-day');
    const message = dialog?.querySelector('.letter-message');
    if (!dayLabel || !message || dialog.querySelector('.gift-photo')) return;
    const photo = document.createElement('img');
    photo.className = 'gift-photo';
    photo.hidden = true;
    photo.decoding = 'async';
    message.before(photo);
    let currentDay = null;
    function update() {
      const day = Number(dayLabel.textContent.match(/BOX\s+(\d+)/i)?.[1]);
      if (day === currentDay) return;
      currentDay = day;
      photo.hidden = true;
      photo.removeAttribute('src');
      if (!Number.isInteger(day) || day < 1 || day > 10) return;
      photo.alt = `A treasured photo for gift ${day}`;
      photo.src = `gift-photos/box-${day}.jpeg`;
    }
    photo.addEventListener('load', () => { photo.hidden = false; });
    photo.addEventListener('error', () => { photo.hidden = true; });
    new MutationObserver(update).observe(dayLabel, {childList:true,subtree:true,characterData:true});
    update();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, {once:true});
  else setup();
})();
