/* ============================================================
   SimpleLife Digital — Main JavaScript
   Sections:
   1.  Custom Cursor
   2.  Navigation Scroll Behaviour
   3.  Mobile Menu Toggle
   4.  Scroll Reveal (IntersectionObserver)
   5.  FAQ Accordion
   6.  Email Signup Handler
   7.  Buy Button Feedback
   ============================================================ */


/* ── 1. Custom Cursor ── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

/* Smooth-follow ring animation */
(function animateRing() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

/* Expand cursor on interactive elements */
document.querySelectorAll('a, button, .product-card, .faq-q, .social-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('expanded');
    cursorRing.classList.add('expanded');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('expanded');
    cursorRing.classList.remove('expanded');
  });
});


/* ── 2. Navigation Scroll Behaviour ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});


/* ── 3. Mobile Menu Toggle ── */
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* Close menu when any nav link is clicked */
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});


/* ── 4. Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


/* ── 5. FAQ Accordion ── */
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  /* Close all open items first */
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

  /* Open clicked item (unless it was already open) */
  if (!isOpen) item.classList.add('open');
}


/* ── 6. Email Signup Handler ── */
function handleSignup() {
  const input = document.getElementById('emailInput');
  const note  = document.getElementById('ctaNote');

  if (!input.value || !input.value.includes('@')) {
    input.style.borderColor = 'rgba(255, 100, 100, 0.6)';
    setTimeout(() => input.style.borderColor = '', 1500);
    return;
  }

  note.textContent  = '🎉 You\'re in! Check your inbox in a moment.';
  note.style.color  = 'rgba(255, 255, 255, 0.95)';
  input.value       = '';
  input.placeholder = 'Thanks! Check your email ✓';
}


/* ── 7. Buy Button Feedback ── */
document.querySelectorAll('.btn-buy').forEach(btn => {
  btn.addEventListener('click', function () {
    const original = this.innerHTML;

    this.textContent       = '✓ Added!';
    this.style.background  = '#2ecc8a';

    setTimeout(() => {
      this.innerHTML        = original;
      this.style.background = '';
    }, 1800);
  });
});
