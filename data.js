/* Shared content for all four concepts. Swap src files + captions when final photos arrive. */
window.WAMZ = {
  brand: 'Shot by Wamz',
  short: 'WAMZ',
  city: 'Lagos, Nigeria',
  availability: 'December 2026 — limited dates left',
  contact: { whatsapp: '+234 000 000 0000', email: 'hello@shotbywamz.com', instagram: '@shotbywamz' }, // placeholders
  photos: [
    { id:'studio-solo',    src:'img/studio-solo.jpg',    s:'img/studio-solo-s.jpg',    cat:'Clothing', title:'Made to be seen',   alt:'Model in black crop top and pleated skirt against a pale studio wall', r:2/3 },
    { id:'stripes-duo',    src:'img/stripes-duo.jpg',    s:'img/stripes-duo-s.jpg',    cat:'Clothing', title:'Stripe, Lagos sun', alt:'Two models in striped polos on a sunlit Lagos street', r:2/3 },
    { id:'night-flash',    src:'img/night-flash.jpg',    s:'img/night-flash-s.jpg', cat:'Night',    title:'After dark',        alt:'Flash photograph of a man pointing at the camera at a night event', r:2/3 },
    { id:'mono-portrait',  src:'img/mono-portrait.jpg',  s:'img/mono-portrait-s.jpg',  cat:'Portrait', title:'Quiet fire',        alt:'Black and white portrait of a woman with braids against a wall', r:2/3 },
    { id:'studio-trio',    src:'img/studio-trio.jpg',    s:'img/studio-trio-s.jpg',    cat:'Clothing', title:'Three of a kind',   alt:'Three models in matching black tees and skirts', r:2/3 },
    { id:'chain-detail',   src:'img/chain-detail.jpg',   s:'img/chain-detail-s.jpg',   cat:'Detail',   title:'Charms',            alt:'Close detail of silver pendants against a printed shirt', r:3/2 },
    { id:'stripes-seated', src:'img/stripes-seated.jpg', s:'img/stripes-seated-s.jpg', cat:'Clothing', title:'Hard light',        alt:'Model seated against a corrugated wall in hard sunlight', r:2/3 }
  ],
  wall: { // Wamz's Wall — personal project (placeholder copy)
    title: "Wamz's Wall",
    blurb: "My own project. A running wall of the faces, nights and streets of Lagos that don't fit a client brief.",
    ids: ['night-flash','mono-portrait','chain-detail','stripes-seated','studio-solo','stripes-duo']
  },
  services: [
    { n:'01', t:'Clothing & brand campaigns', d:'Lookbooks, drops and campaign imagery for fashion labels.' },
    { n:'02', t:'Portraits & editorial',      d:'Studio or on-location, styled or straight.' },
    { n:'03', t:'Events & nightlife',         d:'December parties, launches and weekends away.' }
  ]
};
WAMZ.photo = id => WAMZ.photos.find(p => p.id === id);
