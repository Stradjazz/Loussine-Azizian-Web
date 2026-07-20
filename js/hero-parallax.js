/* ==========================================================================
   Loussine Azizian — Homepage hero, scroll-driven parallax
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var track = document.getElementById('heroParallaxTrack');
  if (!track) return;

  var bg = document.getElementById('heroParallaxBg');
  var wash = document.getElementById('heroParallaxWash');
  var dim = document.getElementById('heroParallaxDim');
  var glow = document.getElementById('heroParallaxGlow');
  var cornerTl = document.getElementById('heroParallaxCornerTl');
  var cornerTr = document.getElementById('heroParallaxCornerTr');
  var cornerBl = document.getElementById('heroParallaxCornerBl');
  var cornerBr = document.getElementById('heroParallaxCornerBr');
  var title = document.getElementById('heroParallaxTitle');
  var quote = document.getElementById('heroParallaxQuote');
  var scrollcue = document.getElementById('heroParallaxScrollcue');

  var raf = null;
  var lastP = -1;

  function clamp01(v) {
    return Math.max(0, Math.min(1, v));
  }

  function render(p) {
    var bgY = p * 30;
    var bgScale = 1 + p * 0.07;
    bg.style.transform = 'translateY(' + bgY + 'px) scale(' + bgScale + ')';

    wash.style.transform = 'translateY(' + (p * 70) + 'px)';

    dim.style.opacity = Math.min(0.42, Math.max(0, p - 0.1) * 0.55);

    glow.style.transform = 'translateY(' + (p * 130) + 'px)';

    var frameScale = 1 + p * 0.55;
    var cornerLx = -p * 130;
    var cornerRx = p * 130;
    var cornerTy = -p * 130;
    var cornerBy = p * 130;

    cornerTl.style.transform = 'scale(' + frameScale + ') rotate(-10deg) translate(' + cornerLx + 'px, ' + cornerTy + 'px)';
    cornerTr.style.transform = 'scale(' + frameScale + ') rotate(10deg) translate(' + cornerRx + 'px, ' + cornerTy + 'px)';
    cornerBl.style.transform = 'scale(' + frameScale + ') rotate(9deg) translate(' + cornerLx + 'px, ' + cornerBy + 'px)';
    cornerBr.style.transform = 'scale(' + frameScale + ') rotate(-9deg) translate(' + cornerRx + 'px, ' + cornerBy + 'px)';

    var titleOpacity = Math.max(0, 1 - p / 0.22);
    title.style.opacity = titleOpacity;
    title.style.transform = 'translate(-50%, calc(-50% + ' + (-p * 50) + 'px))';
    title.style.pointerEvents = titleOpacity > 0.05 ? 'auto' : 'none';

    var quoteIn = clamp01((p - 0.3) / 0.15);
    var quoteOut = clamp01(1 - (p - 0.82) / 0.15);
    var quoteOpacity = quoteIn * quoteOut;
    quote.style.opacity = quoteOpacity;
    quote.style.transform = 'translate(-50%, calc(-50% + ' + ((1 - quoteIn) * 30) + 'px))';
    quote.style.pointerEvents = quoteOpacity > 0.05 ? 'auto' : 'none';

    scrollcue.style.opacity = Math.max(0, 1 - p * 6);

    lastP = p;
  }

  function update() {
    raf = null;
    var rect = track.getBoundingClientRect();
    var scrollable = rect.height - window.innerHeight;
    var rawScrollY = Math.max(0, -rect.top);
    var p = clamp01(scrollable > 0 ? rawScrollY / scrollable : 0);
    if (p !== lastP) render(p);
  }

  function queueUpdate() {
    if (raf === null) raf = requestAnimationFrame(update);
  }

  // Only listen while the track is actually on screen — the sticky stage
  // stays pinned for a 220vh scroll range, so this is cheap insurance
  // against burning cycles on the rest of the page.
  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      window.addEventListener('scroll', queueUpdate, { passive: true });
      window.addEventListener('resize', queueUpdate, { passive: true });
      queueUpdate();
    } else {
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
    }
  });

  observer.observe(track);
  update();

});
