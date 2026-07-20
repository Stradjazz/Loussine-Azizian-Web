/* ==========================================================================
   Loussine Azizian — Violinist | Site Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Header solidifies continuously, reaching full solidity by 90px of scroll ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var navTicking = false;
    var updateNavProgress = function () {
      navTicking = false;
      var navProgress = Math.max(0, Math.min(1, window.scrollY / 90));
      header.style.setProperty('--nav-progress', navProgress);
    };
    var queueNavUpdate = function () {
      if (!navTicking) {
        navTicking = true;
        requestAnimationFrame(updateNavProgress);
      }
    };
    updateNavProgress();
    window.addEventListener('scroll', queueNavUpdate, { passive: true });
    window.addEventListener('resize', queueNavUpdate, { passive: true });
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
