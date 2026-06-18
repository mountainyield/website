/* Mountain Side Growers — shared behavior */
(function(){
  // Age gate (remembers answer for the browser session, across pages)
  var gate = document.getElementById('agegate');
  if (gate){
    try { if (sessionStorage.getItem('msg_age_ok') === '1') gate.classList.add('hidden'); } catch(e){}
    var yes = document.getElementById('agYes'), no = document.getElementById('agNo');
    if (yes) yes.addEventListener('click', function(){
      try { sessionStorage.setItem('msg_age_ok','1'); } catch(e){}
      gate.classList.add('hidden');
    });
    if (no) no.addEventListener('click', function(){ gate.classList.add('denied'); });
  }

  // Sticky header background
  var header = document.getElementById('header');
  if (header){
    window.addEventListener('scroll', function(){ header.classList.toggle('scrolled', window.scrollY > 20); });
  }

  // Mobile menu
  var menuBtn = document.getElementById('menuBtn'), navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks){
    menuBtn.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
    });
  }

  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold:.14});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
