(function () {
  const navbar   = document.getElementById('navbar');
  const burger   = document.getElementById('navBurger');
  const drawer   = document.getElementById('navDrawer');
  const overlay  = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('drawerClose');

  // Scroll class
  function onScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Open / close drawer
  function openDrawer() {
    burger && burger.classList.add('open');
    drawer && drawer.classList.add('open');
    overlay && overlay.classList.add('show');
    overlay && (overlay.style.display = 'block');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    burger && burger.classList.remove('open');
    drawer && drawer.classList.remove('open');
    overlay && overlay.classList.remove('show');
    setTimeout(() => { if (overlay) overlay.style.display = 'none'; }, 320);
    document.body.style.overflow = '';
  }

  burger  && burger.addEventListener('click', openDrawer);
  closeBtn && closeBtn.addEventListener('click', closeDrawer);
  overlay  && overlay.addEventListener('click', closeDrawer);

  // Close drawer on any drawer link click
  document.querySelectorAll('.d-link').forEach(l => l.addEventListener('click', closeDrawer));

  // Accordion toggles
  document.querySelectorAll('.d-acc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.d-accordion');
      if (!parent) return;
      parent.classList.toggle('open');
    });
  });

  // Active nav link (scroll spy)
 // Active nav link based on current page
const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

document.querySelectorAll('.nav-link').forEach(link => {
  const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';

  link.classList.remove('active');

  if (linkPath === currentPath) {
    link.classList.add('active');
  }
});
})();