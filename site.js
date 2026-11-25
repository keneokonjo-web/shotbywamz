/* Shared behaviour: header, menu, footer, lightbox, reveal, booking form (UI only), clock */
(function(){
  const W = window.WAMZ;
  const P = Object.fromEntries(W.photos.map(p => [p.id, p]));
  window.P = P;
  window.src = id => `img/${id}.jpg`;
  window.thumb = id => `img/${id}-s.jpg`;
  window.alt = id => 'Photograph by Wamz';
  /* photo figure; ratio kept natural unless a fixed aspect is passed */
  window.fig = (id, o = {}) => {
    const p = P[id], a = o.aspect || `${p.w}/${p.h}`;
    return `<figure class="ph ${o.cls || ''}" style="aspect-ratio:${a}" data-lb="${id}" tabindex="0"><img src="${o.small ? thumb(id) : src(id)}" alt="${alt(id)}" width="${p.w}" height="${p.h}" loading="lazy"></figure>`;
  };

  const page = document.body.dataset.page || '';
  const links = [['index.html','Home'],['wall.html',"Wamz's Wall"],['clothing.html','Clothing Brands'],['events.html','Events'],['book.html','Book']];

  document.body.insertAdjacentHTML('afterbegin', `
  <header class="hd">
    <button class="side" id="menuBtn" aria-expanded="false" aria-controls="menu"><i></i><span>Galleries</span></button>
    <button class="burger" id="burger" aria-label="Menu" aria-expanded="false" aria-controls="menu"><b></b><b></b></button>
    <nav class="mid" aria-label="Main"><a href="wall.html">Wall</a> / <a href="clothing.html">Clothing</a> / <a href="events.html">Events</a></nav>
    <a class="side" href="book.html"><span>Book</span><i></i></a>
  </header>
  <div class="menu" id="menu" aria-label="Menu">
    ${links.map(l => `<a href="${l[0]}">${l[1]}</a>`).join('')}
    <small class="mono">Shot by Wamz · Lagos</small>
  </div>`);

  document.body.insertAdjacentHTML('beforeend', `
  <footer class="ft">
    <a class="chip" href="book.html">● Booking December 2026 — limited dates <span aria-hidden="true">→</span></a>
    <div class="cols mono">
      <div><h4>Lagos</h4><span id="clock">—</span></div>
      <div><h4>Galleries</h4><ul><li><a href="wall.html">Wamz's Wall</a></li><li><a href="clothing.html">Clothing Brands</a></li><li><a href="events.html">Events</a></li></ul></div>
      <div><h4>Contact</h4><ul><li>hello@shotbywamz.com</li><li>+234 000 000 0000</li></ul></div>
      <div><h4>Follow</h4><ul><li>@shotbywamz</li></ul></div>
    </div>
    <div class="giant" aria-hidden="true">WAMZ</div>
  </footer>
  <p class="fine mono">© <span id="yr"></span> Shot by Wamz · Lagos, Nigeria · placeholder contact details</p>
  <div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Photo viewer">
    <div class="lb-top mono"><span id="lbCap"></span><button id="lbClose" class="mono">Close ✕</button></div>
    <div class="lb-img"><img id="lbImg" alt=""></div>
    <div class="lb-bot mono"><button id="lbPrev">← Prev</button><span id="lbCount"></span><button id="lbNext">Next →</button></div>
  </div>`);

  document.getElementById('yr').textContent = new Date().getFullYear();
  const clock = () => { const t = new Date().toLocaleTimeString('en-GB',{timeZone:'Africa/Lagos',hour:'2-digit',minute:'2-digit'}); document.getElementById('clock').textContent = t + ' [LOCAL]'; };
  clock(); setInterval(clock, 15000);

  /* menu */
  const btn = document.getElementById('menuBtn'), menu = document.getElementById('menu'), burger = document.getElementById('burger');
  const tog = o => { menu.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); burger.setAttribute('aria-expanded', o); btn.querySelector('span').textContent = o ? 'Close' : 'Galleries'; };
  btn.onclick = burger.onclick = () => tog(!menu.classList.contains('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => tog(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') tog(false); });

  /* lightbox */
  const lb = document.getElementById('lb'), lbImg = document.getElementById('lbImg');
  let set = [], idx = 0;
  const showLb = () => { const id = set[idx]; lbImg.src = src(id); lbImg.alt = alt(id);
    document.getElementById('lbCap').textContent = 'Shot by Wamz';
    document.getElementById('lbCount').textContent = String(idx + 1).padStart(2,'0') + ' / ' + String(set.length).padStart(2,'0'); };
  const openLb = el => { const root = el.closest('[data-set]') || document;
    set = [...root.querySelectorAll('[data-lb]')].map(e => e.dataset.lb); idx = Math.max(0, set.indexOf(el.dataset.lb));
    showLb(); lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  const step = d => { idx = (idx + d + set.length) % set.length; showLb(); };
  document.addEventListener('click', e => { const el = e.target.closest('[data-lb]'); if (el) openLb(el); });
  document.addEventListener('keydown', e => { if (e.key === 'Enter' && document.activeElement?.dataset?.lb) openLb(document.activeElement);
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
  document.getElementById('lbClose').onclick = closeLb;
  document.getElementById('lbNext').onclick = () => step(1);
  document.getElementById('lbPrev').onclick = () => step(-1);
  let sx = 0; lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, {passive:true});
  lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); });

  /* reveal on scroll (call window.revealAll() after injecting content) */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold: .1});
  window.revealAll = () => document.querySelectorAll('[data-reveal]:not(.in)').forEach(el => io.observe(el));

  /* booking form — UI only, nothing is sent yet */
  window.mountBooking = el => {
    el.innerHTML = `<form class="bk" novalidate>
      <div class="bk-row"><label><span>Your name</span><input name="name" autocomplete="name" placeholder="Full name"></label>
        <label><span>WhatsApp / phone</span><input name="phone" type="tel" autocomplete="tel" placeholder="+234"></label></div>
      <div class="bk-row"><label><span>Email</span><input name="email" type="email" autocomplete="email" placeholder="you@email.com"></label>
        <label><span>Type of shoot</span><select name="type"><option>Clothing / brand campaign</option><option>Event</option><option>Portrait / personal</option><option>Something else</option></select></label></div>
      <div class="bk-row"><label><span>Preferred date</span><input name="date" type="date"></label>
        <label><span>Location</span><select name="loc"><option>Lagos — Island</option><option>Lagos — Mainland</option><option>Elsewhere in Nigeria</option><option>Outside Nigeria</option></select></label></div>
      <label><span>Tell me about the shoot</span><textarea name="msg" placeholder="Brand, vibe, number of looks, references…"></textarea></label>
      <button class="bk-submit" type="submit">Request a booking <span aria-hidden="true">→</span></button>
      <p class="bk-note">December fills fast — send your date and I'll confirm availability. (Demo form: nothing is sent yet.)</p>
      <p class="bk-done" role="status">Thank you — this is a demo form, so nothing was sent. On the live site this goes straight to Wamz.</p></form>`;
    el.querySelector('form').addEventListener('submit', e => { e.preventDefault(); e.target.classList.add('sent'); });
  };
  window.addEventListener('DOMContentLoaded', () => window.revealAll());
})();
