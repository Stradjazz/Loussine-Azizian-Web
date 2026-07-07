/* ==========================================================================
   Loussine Azizian — Violinist | Homepage Agenda Preview (Google Sheets API)
   ========================================================================== */

const AGENDA_API_URL = "https://script.google.com/macros/s/AKfycbwjRzme5cmT8q646qLwhkqRxJLsJ1I_CY4AXKO-lDNajxnB-aCoWUwTPZVMmogl41el/exec";

(function () {
  var container = document.getElementById('concert-schedule');
  if (!container) return;

  var MAX_CONCERTS = 3;

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function sanitizeUrl(value) {
    return typeof value === 'string' && /^https?:\/\//i.test(value.trim())
      ? encodeURI(value.trim())
      : null;
  }

  function renderConcertCard(concert) {
    var subtitleHtml = concert.subtitle
      ? '<p>' + escapeHtml(concert.subtitle) + '</p>'
      : '';

    var imageUrl = sanitizeUrl(concert.image);
    var mediaHtml = imageUrl
      ? '<div class="agenda-card-media"><img src="' + imageUrl + '" alt="' + escapeHtml(concert.title) + '"></div>'
      : '';

    var dateLine = escapeHtml(concert.date) + (concert.location ? ' &middot; ' + escapeHtml(concert.location) : '');

    return (
      '<article class="agenda-card">' +
      mediaHtml +
      '<div class="agenda-card-body">' +
      '<p class="agenda-date">' + dateLine + '</p>' +
      '<h3>' + escapeHtml(concert.title) + '</h3>' +
      subtitleHtml +
      '<a href="concerts.html" class="link-arrow">Read more <i class="fas fa-arrow-right"></i></a>' +
      '</div>' +
      '</article>'
    );
  }

  async function loadAgendaPreview() {
    try {
      var response = await fetch(AGENDA_API_URL);
      if (!response.ok) throw new Error('Request failed with status ' + response.status);

      var concerts = await response.json();
      if (!Array.isArray(concerts)) throw new Error('Unexpected response shape');

      var cardsHtml = '';
      var count = 0;

      for (var i = 0; i < concerts.length && count < MAX_CONCERTS; i++) {
        var concert = concerts[i];
        if (!concert || !concert.title || !concert.date) continue;
        cardsHtml += renderConcertCard(concert);
        count++;
      }

      container.innerHTML = cardsHtml || '<p class="agenda-empty">No upcoming performances scheduled.</p>';
    } catch (error) {
      container.innerHTML = '<p class="agenda-error">We couldn’t load the concert schedule right now. Please check back soon.</p>';
    }
  }

  loadAgendaPreview();
})();
