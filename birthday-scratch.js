(() => {
  'use strict';
  window.installBirthdayScratch = function(card, number) {
    const body = document.createElement('div'); body.className = 'scratch-content';
    while (card.firstChild) body.append(card.firstChild);
    card.append(body); body.inert = true; body.setAttribute('aria-hidden','true');
    const cover = document.createElement('div'); cover.className = 'scratch-cover';
    const canvas = document.createElement('canvas');
    canvas.tabIndex = 0; canvas.setAttribute('role','button');
    canvas.setAttribute('aria-label',`Scratch 45 percent of surprise ${number} to reveal its name, photo and wish. Press Enter or Space to reveal.`);
    cover.append(canvas); card.append(cover);
    const context = canvas.getContext('2d');
    let revealed = false, drawing = false, last = null, width = 0, height = 0;
    const strokes = [], cells = new Set();
    const columns = 30, rows = 40;
    function reveal() {
      if (revealed) return;
      revealed = true; drawing = false;
      body.inert = false; body.removeAttribute('aria-hidden');
      const hadFocus = document.activeElement === canvas;
      card.classList.add('scratch-revealed');
      if (hadFocus) { body.tabIndex = -1; body.focus({preventScroll:true}); }
      canvas.tabIndex = -1; canvas.setAttribute('aria-hidden','true');
      observer.disconnect();
      setTimeout(()=>cover.remove(),450);
    }
    function erase(a,b) {
      const radius = Math.max(23, Math.min(width*.09,40));
      context.save(); context.globalCompositeOperation = 'destination-out';
      context.lineWidth = radius*2; context.lineCap = 'round'; context.lineJoin = 'round';
      context.beginPath();context.moveTo(a.x*width,a.y*height);context.lineTo(b.x*width,b.y*height);context.stroke();
      context.beginPath();context.arc(b.x*width,b.y*height,radius,0,Math.PI*2);context.fill();context.restore();
    }
    function draw() {
      if (revealed || !context) return;
      const w = card.clientWidth, h = card.clientHeight;
      if (!w || !h || (w===width && h===height)) return;
      width=w;height=h;
      const scale = Math.min(devicePixelRatio||1,2);
      canvas.width=Math.round(w*scale);canvas.height=Math.round(h*scale);
      context.setTransform(scale,0,0,scale,0,0);
      const foil=context.createLinearGradient(0,0,w,h);
      [[0,'#987025'],[.18,'#ebcd80'],[.38,'#f9e6ad'],[.52,'#c49a48'],[.72,'#efd695'],[1,'#a47b2e']].forEach(([stop,color])=>foil.addColorStop(stop,color));
      context.fillStyle=foil;context.fillRect(0,0,w,h);
      context.strokeStyle='#fff6d76b';context.lineWidth=1;context.strokeRect(12,12,w-24,h-24);
      context.fillStyle='#fff5cd70';
      for(let i=0;i<65;i++){const x=(i*97.3)%w,y=(i*143.7)%h;context.fillRect(x,y,1.4,1.4);}
      const center = h/2;
      context.textAlign='center';context.textBaseline='middle';context.fillStyle='#74501c';
      context.font='normal 32px "Times New Roman", serif';context.fillText('Scratch here',w/2,center);
      cover.classList.add('scratch-ready');
      for(const [a,b] of strokes) erase(a,b);
    }
    function point(event){const r=canvas.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(event.clientX-r.left)/r.width)),y:Math.max(0,Math.min(1,(event.clientY-r.top)/r.height))};}
    function mark(a,b){
      const radius=Math.max(23,Math.min(width*.09,40));
      const distance=Math.hypot((b.x-a.x)*width,(b.y-a.y)*height);
      const steps=Math.max(1,Math.ceil(distance/(radius*.6)));
      for(let step=0;step<=steps;step++){
        const x=a.x+(b.x-a.x)*step/steps,y=a.y+(b.y-a.y)*step/steps;
        for(let row=Math.max(0,Math.floor((y-radius/height)*rows));row<Math.min(rows,Math.ceil((y+radius/height)*rows));row++)
          for(let col=Math.max(0,Math.floor((x-radius/width)*columns));col<Math.min(columns,Math.ceil((x+radius/width)*columns));col++)
            if(Math.hypot(((col+.5)/columns-x)*width,((row+.5)/rows-y)*height)<radius) cells.add(row*columns+col);
      }
      if(cells.size/(columns*rows)>=.45) reveal();
    }
    canvas.addEventListener('pointerdown',event=>{
      if(revealed || !context || event.button>0 || !event.isPrimary)return;
      draw();drawing=true;last=point(event);event.preventDefault();
      canvas.setPointerCapture(event.pointerId);
      strokes.push([last,last]);erase(last,last);mark(last,last);
    });
    canvas.addEventListener('pointermove',event=>{
      if(revealed || !drawing)return;
      event.preventDefault();const next=point(event);
      strokes.push([last,next]);erase(last,next);mark(last,next);last=next;
    });
    for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,()=>{drawing=false;last=null;});
    canvas.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();reveal();}});
    const observer=new ResizeObserver(draw);observer.observe(card);
    if (!context) {canvas.addEventListener('click',reveal);return;}
    draw();
  };
})();
