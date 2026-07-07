/* ==========================================================================
   Loussine Azizian — Violinist | Concert Schedule (Google Sheets API)
   ========================================================================== */

const EVENTS_API_URL = "https://script.google.com/macros/s/AKfycbzH4CdckvnhngU9tI_seukoFT6vxdpuIB8mjkroulJuA9Kfx9ikfQ-FxRRHqq81NB49/exec";

(function () {
  var container = document.getElementById('concert-schedule');
  if (!container) return;

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function safeLink(value) {
    return typeof value === 'string' && /^https?:\/\//i.test(value.trim())
      ? encodeURI(value.trim())
      : null;
  }

  function renderConcertCard(concert) {
    var programItems = Array.isArray(concert.program)
      ? concert.program.filter(function (line) { return line && String(line).trim(); })
      : [];

    var programHtml = programItems.length
      ? '<p class="program-label">Programme:</p><ul class="program-list">' +
      programItems.map(function (line) { return '<li>' + escapeHtml(line) + '</li>'; }).join('') +
      '</ul>'
      : '';

    var subtitleHtml = concert.subtitle
      ? '<p class="concert-subtitle">' + escapeHtml(concert.subtitle) + '</p>'
      : '';

    var ticketUrl = safeLink(concert.link);
    var linkHtml = ticketUrl
      ? '<a href="' + ticketUrl + '" class="link-arrow" target="_blank" rel="noopener">Tickets <i class="fas fa-arrow-right"></i></a>'
      : '';

    var dateLine = escapeHtml(concert.date) + (concert.location ? ' &middot; ' + escapeHtml(concert.location) : '');

    return (
      '<article class="agenda-card">' +
      '<div class="agenda-card-media">' +
      '<img src="images/agenda-card.png" alt="' + escapeHtml(concert.title) + '">' +
      '</div>' +
      '<div class="agenda-card-body">' +
      '<p class="agenda-date">' + dateLine + '</p>' +
      '<h3 class="concert-title">' + escapeHtml(concert.title) + '</h3>' +
      subtitleHtml +
      programHtml +
      linkHtml +
      '</div>' +
      '</article>'
    );
  }

  async function loadConcertSchedule() {
    try {
      var response = await fetch(EVENTS_API_URL);
      if (!response.ok) throw new Error('Request failed with status ' + response.status);

      var concerts = await response.json();
      if (!Array.isArray(concerts)) throw new Error('Unexpected response shape');

      var cardsHtml = '';

      for (var i = 0; i < concerts.length; i++) {
        var concert = concerts[i];
        if (!concert || !concert.title || !concert.date) continue;
        cardsHtml += renderConcertCard(concert);
      }

      container.innerHTML = cardsHtml || '<p class="agenda-empty">No upcoming performances scheduled.</p>';
    } catch (error) {
      container.innerHTML = '<p class="agenda-error">We couldn’t load the concert schedule right now. Please check back soon.</p>';
    }
  }

  loadConcertSchedule();
})();
