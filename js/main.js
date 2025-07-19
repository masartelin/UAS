// Smooth scroll untuk anchor link
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


  // Animasi fade-in saat section masuk viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('section, .price-card, .grooming-card, .hotel-card, .inap-card, .surgery-card').forEach(el => {
    observer.observe(el);
  });

  // Validasi form kontak
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();
      let valid = true;
      let msg = '';
      if (!name) { valid = false; msg = 'Nama wajib diisi!'; }
      else if (!/^\S+@\S+\.\S+$/.test(email)) { valid = false; msg = 'Email tidak valid!'; }
      else if (!/^([\d\s\-\+\(\)]+)$/.test(phone)) { valid = false; msg = 'Nomor telepon tidak valid!'; }
      else if (!message) { valid = false; msg = 'Pesan wajib diisi!'; }
      if (!valid) {
        e.preventDefault();
        alert(msg);
      }
    });
  }

  // Efek sticky header saat scroll
  const header = document.querySelector('.header');
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (header) {
      if (st > lastScroll && st > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
    }
    lastScroll = st <= 0 ? 0 : st;
  });
});

// CSS untuk animasi fade-in (tambahkan ke style.css):
// .fade-in { animation: fadeInUp 0.7s ease forwards; opacity: 1 !important; } 