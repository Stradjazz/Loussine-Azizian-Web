/* ==========================================================================
   Loussine Azizian — Violinist | Site Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Sticky header on scroll ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var toggleSolid = function () {
      if (window.scrollY > 60) {
        header.classList.add('is-solid');
      } else {
        header.classList.remove('is-solid');
      }
    };
    toggleSolid();
    window.addEventListener('scroll', toggleSolid);
  }

  /* ---- Mobile nav toggle ---- */
  var navToggle = document.querySelector('.nav-toggle');
  if (navToggle && header) {
    navToggle.addEventListener('click', function () {
      header.classList.toggle('nav-open');
    });
  }

  /* ---- Play button opens video (placeholder link) ---- */
  var videoFrame = document.querySelector('.video-frame');
  if (videoFrame) {
    videoFrame.addEventListener('click', function () {
      var url = videoFrame.getAttribute('data-video-url');
      if (url) {
        window.open(url, '_blank', 'noopener');
      }
    });
  }

  /* ---- Contact form (static site placeholder handling) ---- */
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = contactForm.querySelector('.form-status');
      if (status) {
        status.textContent = 'Thank you — your message has been noted. (Connect this form to Formspree / Cloudflare Pages Forms to actually receive submissions.)';
        status.style.color = '#8c5a34';
      }
      contactForm.reset();
    });
  }

});
