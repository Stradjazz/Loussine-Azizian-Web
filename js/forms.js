/* ==========================================================================
   Loussine Azizian — Violinist | Universal contact form submission
   ========================================================================== */

const CONTACT_API_URL = "https://script.google.com/macros/s/AKfycby51d0M66IBsSBRO-VVD7GW1OFjWltPEo8LG1_4R_eVeoIVHYMjEdgcmlKqFr3iKt8q/exec";

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('form.contact-form').forEach(function (form) {
    form.addEventListener('submit', handleContactFormSubmit);
  });
});

async function handleContactFormSubmit(e) {
  e.preventDefault();

  var form = e.target;
  var submitBtn = form.querySelector('button[type="submit"]');
  var status = form.querySelector('.form-status');
  var originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }

  if (status) {
    status.textContent = '';
    status.classList.remove('form-status-success', 'form-status-error');
  }

  try {
    var formData = new FormData(form);
    var params = new URLSearchParams(formData);

    var response = await fetch(CONTACT_API_URL, {
      method: 'POST',
      body: params
    });

    if (!response.ok) throw new Error('Request failed with status ' + response.status);

    form.reset();

    if (status) {
      status.textContent = 'Thank you! Your message has been sent.';
      status.classList.add('form-status-success');
    }

    if (submitBtn) {
      submitBtn.textContent = 'Message sent';
      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        if (status) {
          status.textContent = '';
          status.classList.remove('form-status-success', 'form-status-error');
        }
      }, 10000);
    }
  } catch (error) {
    if (status) {
      status.textContent = 'Something went wrong sending your message. Please try again.';
      status.classList.add('form-status-error');
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  }
}
