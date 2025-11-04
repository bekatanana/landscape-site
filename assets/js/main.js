// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Simple auto slider
(function(){
  const slides = document.querySelectorAll("#heroSlider .slide");
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove("active");
    i = (i + 1) % slides.length;
    slides[i].classList.add("active");
  }, 4000); // 4 წმ-ში გადადის მომდევნო ფოტოზე
})();

// Demo submit (სერვერის გარეშე)
document.getElementById("contactForm")?.addEventListener("submit", function(e){
  e.preventDefault();
  const data = new FormData(this);
  const full = `${data.get('fname')} ${data.get('lname')}`.trim();
  alert(`დემო გაგზავნა წარმატებით!\n\nსახელი: ${full}\nEmail: ${data.get('email')}\nტელ: ${data.get('phone')}`);
  this.reset();
});

// Smooth scroll for on-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  })
});


// ----- Lightbox for works -----
(function(){
  const images = Array.from(document.querySelectorAll('.gallery-item img'));
  if (!images.length) return;

  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImage');
  const btnClose = document.getElementById('lbClose');
  const btnPrev = document.getElementById('lbPrev');
  const btnNext = document.getElementById('lbNext');

  let current = 0;

  function open(index){
    current = index;
    lbImg.src = images[current].src;
    lbImg.alt = images[current].alt || '';
    lb.classList.add('show');
    lb.setAttribute('aria-hidden','false');
  }
  function close(){
    lb.classList.remove('show');
    lb.setAttribute('aria-hidden','true');
  }
  function prev(){ current = (current - 1 + images.length) % images.length; open(current); }
  function next(){ current = (current + 1) % images.length; open(current); }

  images.forEach(img=>{
    img.addEventListener('click', ()=> open(parseInt(img.dataset.index,10) || images.indexOf(img)));
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  // დახურვა ფონზე დაკლიკებით
  lb.addEventListener('click', (e)=>{ if(e.target === lb) close(); });

  // ისრები კლავიატურით
  window.addEventListener('keydown', (e)=>{
    if(!lb.classList.contains('show')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') prev();
    if(e.key === 'ArrowRight') next();
  });
})();


// Blog search filter
(function(){
  const search = document.getElementById('blogSearch');
  const grid = document.getElementById('blogGrid');
  if(!search || !grid) return;

  const items = Array.from(grid.querySelectorAll('.blog-card'));
  search.addEventListener('input', ()=>{
    const q = search.value.trim().toLowerCase();
    items.forEach(card=>{
      const t = (card.dataset.title || '').toLowerCase();
      const tags = (card.dataset.tags || '').toLowerCase();
      card.style.display = (!q || t.includes(q) || tags.includes(q)) ? '' : 'none';
    });
  });
})();


// Active menu highlight
(function(){
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(a=>{
    const target = a.getAttribute('href');
    // treat anchors on home as index.html
    const normalized = target.startsWith('#') ? 'index.html' : target;
    if (normalized === here) a.classList.add('active');
  });
})();


// Mobile burger toggle
(function(){
  const btn = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if(!btn || !menu) return;

  btn.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close on link click (mobile)
  menu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> menu.classList.remove('open'));
  });
})();

