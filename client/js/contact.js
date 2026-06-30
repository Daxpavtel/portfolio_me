(function () {
  function initContact() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', handleSubmit);

    var inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function (input) {
      input.addEventListener('blur', function () {
        validateField(input);
      });
      input.addEventListener('input', function () {
        validateField(input);
      });
    });
  }

  function validateField(input) {
    var group = input.closest('.form-group');
    if (!group) return true;

    var value = input.value.trim();
    var isValid = true;

    if (input.hasAttribute('required') && !value) {
      isValid = false;
    }

    if (value && (input.id === 'contactEmail' || input.name === 'email')) {
      var hasAt = value.indexOf('@') > -1;
      var hasDot = value.lastIndexOf('.') > value.indexOf('@') + 1;
      if (!hasAt || !hasDot) isValid = false;
    }

    if (input.maxLength > 0 && value.length > parseInt(input.maxLength, 10)) {
      isValid = false;
    }

    if (isValid) {
      group.classList.remove('error');
    } else {
      group.classList.add('error');
    }

    return isValid;
  }

  function validateForm(form) {
    var inputs = form.querySelectorAll('input, textarea');
    var valid = true;

    inputs.forEach(function (input) {
      if (!validateField(input)) valid = false;
    });

    return valid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    var form = e.target;

    if (!validateForm(form)) return;

    var submitBtn = document.getElementById('submitBtn');
    var originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    var data = {
      name: document.getElementById('contactName').value.trim(),
      email: document.getElementById('contactEmail').value.trim(),
      subject: document.getElementById('contactSubject').value.trim(),
      message: document.getElementById('contactMessage').value.trim(),
    };

    try {
      await api.post('/contact', data);
      showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
      var groups = form.querySelectorAll('.form-group');
      groups.forEach(function (g) { g.classList.remove('error'); });
    } catch (err) {
      showToast(err.message || 'Failed to send message. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  function showToast(message, type) {
    var toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'toast ' + type + ' show';

    setTimeout(function () {
      toast.classList.remove('show');
    }, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContact);
  } else {
    initContact();
  }
})();
