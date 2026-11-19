(function(){
  // scroll reveal
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));

  // booking form (UI only — not wired to a backend yet)
  const mount=document.getElementById('booking-form');
  if(mount){
    mount.innerHTML=`
    <form class="bk" novalidate>
      <div class="bk-row">
        <label>Your name<input name="name" required autocomplete="name" placeholder="Full name"></label>
        <label>WhatsApp / phone<input name="phone" type="tel" autocomplete="tel" placeholder="+234"></label>
      </div>
      <div class="bk-row">
        <label>Email<input name="email" type="email" autocomplete="email" placeholder="you@email.com"></label>
        <label>Type of shoot
          <select name="type"><option>Clothing / brand campaign</option><option>Portrait / editorial</option><option>Event / nightlife</option><option>Something else</option></select></label>
      </div>
      <div class="bk-row">
        <label>Preferred date<input name="date" type="date"></label>
        <label>Location<select name="loc"><option>Lagos — Island</option><option>Lagos — Mainland</option><option>Elsewhere in Nigeria</option><option>Outside Nigeria</option></select></label>
      </div>
      <label>Tell me about the shoot<textarea name="msg" placeholder="Brand, vibe, number of looks, references…"></textarea></label>
      <button class="bk-submit" type="submit">Request a booking <span aria-hidden="true">→</span></button>
      <p class="bk-note">December fills fast — send your date and I'll confirm availability. (Demo form: nothing is sent yet.)</p>
      <p class="bk-done" role="status">Thank you — this is a demo form, so nothing was sent. In the live site it goes straight to Wamz.</p>
    </form>`;
    mount.querySelector('form').addEventListener('submit',e=>{e.preventDefault();e.target.classList.add('sent')});
  }
  // live year
  document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
})();
