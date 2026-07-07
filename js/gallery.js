/* ==========================================================================
   Loussine Azizian — Violinist | Gallery: 3D image carousel + lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var track = document.querySelector('.gallery-track');
  var dotsWrap = document.querySelector('.gallery-dots');
  var prevBtn = document.querySelector('.gallery-arrow-prev');
  var nextBtn = document.querySelector('.gallery-arrow-next');
  var lightbox = document.getElementById('galleryLightbox');
  var lightboxImg = document.getElementById('galleryLightboxImg');
  var closeBtn = document.querySelector('.gallery-lightbox-close');

  if (!track || !dotsWrap || !prevBtn || !nextBtn || !lightbox || !lightboxImg) return;

  var slides = Array.prototype.slice.call(track.querySelectorAll('.gallery-slide'));
  if (!slides.length) return;

  var current = Math.floor(slides.length / 2);

  var dots = slides.map(function (_, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'gallery-dot';
    dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function render() {
    slides.forEach(function (slide, i) {
      var offset = i - current;
      var abs = Math.abs(offset);

      if (abs > 3) {
        slide.style.opacity = '0';
        slide.style.pointerEvents = 'none';
        slide.style.transform = 'translateX(' + (offset > 0 ? 1 : -1) * 600 + 'px) scale(0.5)';
        slide.style.zIndex = '0';
        return;
      }

      var tx = offset * 190;
      var tz = -abs * 140;
      var rot = offset * -28;
      var scale = 1 - abs * 0.14;

      slide.style.transform = 'translateX(' + tx + 'px) translateZ(' + tz + 'px) rotateY(' + rot + 'deg) scale(' + scale + ')';
      slide.style.opacity = String(1 - abs * 0.28);
      slide.style.zIndex = String(10 - abs);
      slide.style.pointerEvents = 'auto';
    });

    dots.forEach(function (dot, i) { dot.classList.toggle('is-active', i === current); });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
  }

  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });

  slides.forEach(function (slide) {
    slide.addEventListener('click', function () {
      var img = slide.querySelector('img');
      lightboxImg.src = slide.getAttribute('data-full') || img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  render();
});
