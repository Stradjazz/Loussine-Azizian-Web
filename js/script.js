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

  /* ---- Play button embeds the video in-place (responsive YouTube iframe) ---- */
  var getYouTubeId = function (url) {
    var match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    return match ? match[1] : null;
  };

  var playVideo = function (frame) {
    if (frame.classList.contains('is-playing')) return;
    var url = frame.getAttribute('data-video-url');
    var videoId = url && getYouTubeId(url);

    if (!videoId) {
      if (url) window.open(url, '_blank', 'noopener');
      return;
    }

    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
    iframe.title = frame.getAttribute('aria-label') || 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    frame.classList.add('is-playing');
    frame.innerHTML = '';
    frame.appendChild(iframe);
  };

  document.querySelectorAll('.video-frame').forEach(function (frame) {
    frame.addEventListener('click', function () { playVideo(frame); });
    frame.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playVideo(frame);
      }
    });
  });

});
