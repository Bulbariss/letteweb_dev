window.onload = function() {
  // Screen dimentions
  const screenWidth = window.matchMedia('(min-width: 640px)');

  // Input validity
  let name = false;
  let email = false;
  let subject = false;
  let message = false;

  // Get elements in form
  const IDs = {
    nameID: document.getElementById('input-name'),
    emailID: document.getElementById('input-email'),
    subjectID: document.getElementById('input-subject'),
    messageID: document.getElementById('input-message'),
    name_P_ID: document.getElementById('input-name-p'),
    email_P_ID: document.getElementById('input-email-p'),
    subject_P_ID: document.getElementById('input-subject-p'),
    message_P_ID: document.getElementById('input-message-p')
  };

  // Regex for validating inputs
  const regexName = /^[а-яА-ЯёЁa-zA-Z0-9]+$/i;
  const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // Clear invalid form propery from passed cell
  function invalidInput(id) {
    document.getElementById(`${id}`).classList.add('border-red');
    document.getElementById(`${id}-p`).classList.add('block-imp');
  }

  // Set invalid form propery from passed cell
  function validInput(id) {
    document.getElementById(`${id}`).classList.remove('border-red');
    document.getElementById(`${id}-p`).classList.remove('block-imp');
  }

  // Clear all input from cells
  function clearForm() {
    IDs.nameID.value = null;
    IDs.emailID.value = null;
    IDs.subjectID.value = null;
    IDs.messageID.value = null;
  }

  // Clear all invalid input properties
  function clearInvalidInput() {
    IDs.nameID.classList.remove('invalid-form');
    IDs.emailID.classList.remove('invalid-form');
    IDs.subjectID.classList.remove('invalid-form');
    IDs.messageID.classList.remove('invalid-form');
    IDs.name_P_ID.classList.remove('invalid-form-text');
    IDs.email_P_ID.classList.remove('invalid-form-text');
    IDs.subject_P_ID.classList.remove('invalid-form-text');
    IDs.message_P_ID.classList.remove('invalid-form-text');
  }

  // Check if cell input is valid
  function validateName() {
    const x = document.querySelector('#input-name').value;
    if (regexName.test(x) || !x.length === 0) {
      validInput('input-name');
      name = true;
    } else {
      invalidInput('input-name');
      name = false;
    }
  }

  // Check if cell input is valid
  function validateEmail() {
    const x = document.querySelector('#input-email').value;
    if (regexEmail.test(x) || !x.length === 0) {
      validInput('input-email');
      email = true;
    } else {
      invalidInput('input-email');
      email = false;
    }
  }

  // Check if cell input is valid
  function validateSubject() {
    const x = document.querySelector('#input-subject').value;
    if (!x.length === 0 || x.trim()) {
      validInput('input-subject');
      subject = true;
    } else {
      invalidInput('input-subject');
      subject = false;
    }
  }

  // Check if cell input is valid
  function validateMessage() {
    const x = document.querySelector('#input-message').value;
    if (!x.length === 0 || x.trim()) {
      validInput('input-message');
      message = true;
    } else {
      invalidInput('input-message');
      message = false;
    }
  }

  // Show success message
  function showSuccess() {
    document
      .getElementById('contact-submit-btn-text')
      .classList.remove('hidden');
    document.getElementById('contact-submit-btn').classList.add('bg-green-500');
    document
      .getElementById('contact-submit-btn')
      .classList.remove('bg-indigo-700');
    document
      .getElementById('contact-submit-btn')
      .classList.add('pointer-events-none');
    document.getElementById('contact-submit-btn').classList.add('select-none');
    document.getElementById('contact-submit-btn').disabled = true;
    document.getElementById('form-spinner').classList.remove('block-imp');
    document.getElementById('form-spinner').classList.add('hidden');
    document.getElementById('contact-submit-btn-text').innerText =
      'Message Sent';
    setTimeout(() => {
      document.getElementById('contact-submit-btn-text').innerText = 'Submit';
      document
        .getElementById('contact-submit-btn')
        .classList.add('bg-indigo-700');
      document
        .getElementById('contact-submit-btn')
        .classList.remove('bg-green-500');
      document
        .getElementById('contact-submit-btn')
        .classList.remove('select-none');
      document
        .getElementById('contact-submit-btn')
        .classList.remove('pointer-events-none');
      document.getElementById('contact-submit-btn').disabled = false;
      clearInvalidInput();
      clearForm();
    }, 5000);
  }

  // Show error message
  function showError() {
    // show failure
    document
      .getElementById('contact-submit-btn-text')
      .classList.remove('hidden');
    document.getElementById('contact-submit-btn').classList.add('bg-red-500');
    document
      .getElementById('contact-submit-btn')
      .classList.remove('bg-indigo-700');
    document
      .getElementById('contact-submit-btn')
      .classList.add('pointer-events-none');
    document.getElementById('contact-submit-btn').classList.add('select-none');
    document.getElementById('contact-submit-btn').disabled = true;
    document.getElementById('form-spinner').classList.remove('block-imp');
    document.getElementById('form-spinner').classList.add('hidden');
    document.getElementById('contact-submit-btn-text').innerText =
      'Error, message not sent';
    setTimeout(() => {
      document.getElementById('contact-submit-btn-text').innerText = 'Submit';
      document
        .getElementById('contact-submit-btn')
        .classList.add('bg-indigo-700');
      document
        .getElementById('contact-submit-btn')
        .classList.remove('bg-red-500');
      document
        .getElementById('contact-submit-btn')
        .classList.remove('select-none');
      document
        .getElementById('contact-submit-btn')
        .classList.remove('pointer-events-none');
      document.getElementById('contact-submit-btn').disabled = false;
    }, 5000);
  }

  // Send email
  function submitEmail(event) {
    event.preventDefault();
    // Check if all inputs are valid
    validateName();
    validateEmail();
    validateSubject();
    validateMessage();

    // Send email if everything is valid
    if (name && email && subject && message) {
      // add spinner
      document
        .getElementById('contact-submit-btn-text')
        .classList.add('hidden');
      document.getElementById('form-spinner').classList.add('block-imp');

      const data = `name=${IDs.nameID.value}&email=${IDs.emailID.value}&subject=${IDs.subjectID.value}&msg=${IDs.messageID.value}`;

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'mail/send.php');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onerror = function() {
        showError();
      };
      xhr.onload = function() {
        if (xhr.status === 200 && xhr.responseText === '1') {
          showSuccess();
        } else {
          showError();
        }
      };
      xhr.send(data);
    }
  }

  function allowCookies() {
    setCookie('consent', true, 365);
    hideCookieBanner();
  }

  function rejectCookies() {
    setCookie('consent', false, 365);
    hideCookieBanner();
  }

  function initCookies() {
    const cookieConsent = getCookie('consent');
    if (cookieConsent === 'true') {
      activateCookies();
    } else if (cookieConsent === 'false') {
      deactivateCookies();
    } else {
      showCookieBanner();
    }
  }

  // Get cookie value
  function getCookie(cname) {
    // eslint-disable-next-line
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      // eslint-disable-next-line eqeqeq
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      // eslint-disable-next-line eqeqeq
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  function activateCookies() {
    window['ga-disable-UA-154158494-1'] = false;
    googleAnalytics();
  }

  function deactivateCookies() {
    window['ga-disable-UA-154158494-1'] = true;
  }

  function showCookieBanner() {
    document.getElementById('cookie-banner').classList.add('block-imp');
  }

  function hideCookieBanner() {
    document.getElementById('cookie-banner').classList.remove('block-imp');
  }

  function googleAnalytics() {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      // eslint-disable-next-line
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-154158494-1');
  }

  // Create cookie that lives 365 days
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  }

  // Validate inputs on focus out
  if (
    document.getElementById('particles-js') ||
    document.getElementById('hero')
  ) {
    IDs.nameID.addEventListener('focusout', validateName);
    IDs.emailID.addEventListener('focusout', validateEmail);
    IDs.subjectID.addEventListener('focusout', validateSubject);
    IDs.messageID.addEventListener('focusout', validateMessage);

    // Send email on submit
    document
      .getElementById('contact-form')
      .addEventListener('submit', submitEmail);
  }

  document.getElementById('btn-allow-cookies').addEventListener('click', () => {
    allowCookies();
    activateCookies();
  });

  document
    .getElementById('btn-reject-cookies')
    .addEventListener('click', () => {
      rejectCookies();
      deactivateCookies();
    });

  document.querySelectorAll('.btn-change-cookie-preferences').forEach(btn => {
    btn.addEventListener('click', showCookieBanner);
  });

  function toggleNav() {
    document.getElementById('menu').classList.toggle('active');
    document.getElementsByTagName('body')[0].classList.toggle('scroll-lock');
  }

  function disableNav() {
    if (
      screenWidth.matches &&
      document.getElementById('menu').classList.contains('active')
    ) {
      document.getElementById('checkbox').click();
      document.getElementById('menu').classList.remove('active');
      document.getElementsByTagName('body')[0].classList.remove('scroll-lock');
    }
  }

  function toggleLangList() {
    document.getElementById('lang-list').classList.toggle('invisible');
  }

  document.getElementById('checkbox').addEventListener('click', toggleNav);
  window.addEventListener('resize', disableNav);
  document
    .getElementById('toggle-lang-list')
    .addEventListener('click', toggleLangList);

  // Set height of form container
  function setHeightOfFormContainer() {
    document.querySelector('#particles-js').style.minHeight = `${
      document.getElementById('content-page-container').offsetHeight
    }px`;
  }
  // Mooving letters
  function moovingLetters() {
    const textWrapper = document.querySelector('#mooving-letters');
    let iteration = 0;
    // const finalStrings = [];
    const renderedStrings = [
      '38,40,40,15,30,14,35,32,12,27,35,34,30,37,29,4,25,1,22,22,32,40,9,29,9,27,35,10,14,18,30,7,25,24,12,14,23,27,36,2,23,26,26,31,15,12,17,13,10,16,18,5,41,34,25,2,19,24,12,20,35,36,13,37,25,35,25,11,2,8,13,24,4,17,23,15,23,30,17,3,37,5,8,1,3,1,1,2,18,2,3,41,10,28,14,7,32,24,24,6,12,7,19,40,34,28,24,15,12,16,18,18,18,37,28,30,41,31,36,28,36,27,18,8,3,8,4,37,30,22,25,30,32,22,8,14,2,2,29,29,28,18,31,19,',
      '4,18,27,33,13,39,28,13,2,10,15,30,29,35,22,34,31,39,14,20,29,6,27,8,13,5,10,26,3,17,9,21,24,12,23,4,14,13,9,27,24,19,6,16,32,29,20,8,24,2,27,27,21,11,16,1,16,25,24,21,29,7,4,22,27,13,13,35,17,7,8,13,23,24,33,2,33,27,29,41,15,30,36,26,6,32,10,9,14,9,33,11,28,25,32,36,24,5,36,7,15,12,13,20,33,40,41,36,1,30,2,41,23,37,4,2,10,17,32,8,27,6,10,30,36,35,5,4,23,8,2,20,6,33,17,31,9,4,26,24,1,24,23,8,',
      '24,10,15,17,35,23,13,9,38,40,26,32,17,14,41,8,22,8,32,12,25,27,9,16,30,36,25,3,19,5,1,30,40,11,5,5,18,21,38,9,32,29,15,41,15,13,22,21,18,15,4,19,37,5,11,20,38,6,34,39,11,19,18,10,37,19,6,23,24,32,36,2,26,26,37,40,13,9,37,40,5,39,35,10,12,29,20,11,34,32,31,20,1,9,31,14,30,12,33,3,24,27,22,25,15,22,35,38,11,11,26,38,25,34,40,34,39,8,22,4,4,19,20,41,36,21,3,3,12,4,39,16,30,22,16,4,20,13,20,9,22,18,4,25,',
      '32,41,41,20,4,39,6,30,27,30,41,15,35,14,14,28,29,1,39,2,25,31,41,17,20,15,17,30,21,39,16,31,1,18,7,5,10,20,40,17,29,26,27,30,15,13,11,41,1,5,32,35,35,32,33,3,23,23,32,32,25,33,6,31,7,38,12,9,13,24,4,19,21,1,14,1,1,9,41,1,34,34,27,32,18,5,2,3,40,35,28,6,13,10,8,36,34,8,2,22,37,30,12,24,6,30,2,21,2,11,12,39,41,36,6,20,15,28,32,14,33,21,1,25,36,31,36,31,30,15,36,11,26,17,35,14,40,17,34,33,11,16,6,22,',
      '3,16,16,5,7,30,25,4,10,3,31,20,39,5,19,15,5,38,19,30,31,38,24,38,36,17,9,1,30,20,30,31,27,7,8,23,6,4,36,2,12,37,3,16,24,17,1,9,13,3,1,14,19,30,23,19,20,36,11,34,31,35,24,16,39,18,10,16,30,13,4,35,4,5,33,17,30,6,33,12,11,14,41,40,28,14,34,28,25,38,30,13,34,37,24,10,36,28,2,25,40,35,13,14,2,20,34,5,37,7,12,40,20,3,40,35,31,24,6,26,6,1,1,36,10,10,19,15,37,31,41,22,1,38,8,32,6,1,33,39,2,20,2,25,',
      '10,10,14,23,28,23,27,39,39,25,8,5,2,5,14,23,17,20,20,27,5,35,34,32,31,17,29,27,9,14,37,12,12,41,26,23,6,17,38,29,10,17,27,30,19,36,11,14,2,35,41,34,24,19,13,13,25,29,3,1,20,17,5,9,25,32,2,26,35,41,36,30,33,35,23,34,5,15,15,30,23,41,30,13,20,35,26,8,15,18,6,29,14,12,30,11,1,10,10,7,40,20,16,6,21,31,30,33,8,9,34,39,32,34,12,22,16,39,28,19,21,1,33,37,18,34,40,18,23,16,19,31,15,32,24,6,40,15,3,8,4,29,37,37,',
      '28,5,12,37,20,30,4,36,28,8,18,32,11,29,3,18,7,28,37,39,39,25,25,19,14,9,2,18,38,4,15,10,39,9,4,27,22,9,15,35,28,8,28,25,39,14,22,1,38,35,21,23,1,3,10,10,39,39,17,16,10,4,24,6,33,39,8,29,29,18,8,19,35,28,1,36,35,38,6,21,23,36,17,36,34,25,27,2,41,37,22,3,13,1,14,35,22,28,11,1,14,11,36,8,1,29,28,17,21,2,4,39,10,13,10,1,6,12,31,26,1,3,24,30,20,36,23,19,32,7,33,7,26,9,15,11,38,16,32,4,1,39,9,28,',
      '25,18,2,29,33,8,39,3,32,7,28,36,30,22,38,28,28,29,1,16,16,12,23,35,27,25,13,1,41,4,5,19,2,38,6,41,11,4,10,18,3,27,6,39,12,12,25,34,20,1,17,16,27,11,36,3,33,23,27,10,29,37,6,40,38,1,10,11,29,19,32,18,16,16,34,28,18,30,23,38,35,20,17,10,27,28,18,30,15,35,15,23,24,20,16,14,2,37,1,9,24,34,27,23,2,31,9,16,8,1,12,36,7,39,27,36,39,14,32,41,17,30,11,27,20,26,35,29,27,10,28,9,38,28,11,24,5,7,24,11,1,3,17,11,',
      '41,22,13,3,2,3,39,28,8,32,11,39,39,6,7,13,38,21,6,30,10,1,19,36,10,41,33,33,24,35,17,15,33,2,20,27,17,18,3,17,10,37,7,37,38,15,41,24,8,12,18,32,6,18,27,22,6,16,19,14,37,13,40,2,25,7,4,19,5,41,26,19,40,38,4,31,23,24,37,18,2,3,19,9,39,22,16,28,20,30,5,28,13,5,1,5,25,5,32,11,12,32,22,32,23,10,16,27,28,23,25,11,8,3,21,2,32,22,40,37,23,1,21,29,35,5,11,40,37,33,37,32,16,18,22,7,38,30,32,27,34,5,2,19,',
      '21,34,22,36,38,41,19,37,20,26,37,18,22,3,30,6,6,30,15,23,30,41,38,38,32,26,12,23,3,26,35,8,16,17,30,34,35,39,39,17,3,35,17,17,18,33,39,17,1,12,6,28,35,10,22,9,38,12,16,30,25,33,39,9,10,36,25,36,20,31,30,26,29,31,24,29,41,7,26,16,32,12,21,18,41,14,35,20,16,28,26,20,7,40,1,37,40,34,4,17,22,25,33,3,32,4,23,11,7,15,12,24,3,15,30,22,30,15,20,4,35,39,27,16,32,9,37,16,39,15,14,31,30,1,3,23,17,36,34,25,26,32,34,13,',
      '12,25,39,31,30,28,24,7,14,7,21,16,36,27,26,38,11,36,16,41,34,26,16,18,30,29,29,26,13,1,7,41,37,28,10,36,41,21,33,8,25,1,18,30,1,16,31,2,18,33,1,7,40,25,39,4,21,17,12,21,7,40,1,18,23,20,22,30,19,10,18,3,22,38,16,18,26,14,24,22,28,8,35,26,7,25,38,16,19,35,27,4,18,6,19,28,2,5,33,34,21,27,18,34,26,17,9,40,25,7,35,21,31,18,29,2,12,22,5,2,37,36,33,10,36,25,10,2,39,29,24,30,13,15,19,27,4,29,12,18,21,21,32,26,',
      '31,15,2,25,29,14,3,10,28,18,39,10,39,6,19,9,20,40,40,17,16,15,12,18,19,28,17,33,12,9,1,36,12,16,40,37,14,21,32,20,17,11,38,11,34,9,15,36,19,29,27,35,28,27,40,2,21,30,8,21,12,40,11,39,12,22,29,34,41,9,8,8,31,35,41,13,12,20,11,30,7,2,30,1,35,24,18,11,21,21,27,2,30,14,24,23,35,15,25,9,5,36,39,37,28,12,21,8,12,26,40,16,34,20,38,25,20,39,7,32,34,3,33,29,10,28,27,4,28,33,38,22,10,6,2,24,11,17,26,22,32,41,35,35,',
      '4,37,35,4,25,3,34,16,25,35,26,34,32,19,11,14,36,13,16,30,25,14,16,39,11,39,2,35,36,32,15,14,15,1,35,7,36,33,38,40,1,35,6,10,32,8,31,38,31,34,28,32,26,27,27,2,10,13,27,16,37,33,23,6,35,30,22,28,4,38,18,26,9,6,21,13,31,40,7,34,14,40,17,9,8,27,17,28,30,5,16,11,29,6,6,8,15,15,20,18,38,26,6,6,37,8,34,3,3,26,30,35,16,33,34,36,21,2,27,16,36,5,11,33,29,40,7,39,27,29,16,24,1,28,23,39,40,34,12,12,2,21,12,18,',
      '22,10,32,3,19,2,8,38,25,19,25,40,12,9,38,10,2,28,10,19,24,7,35,17,39,6,31,7,40,11,9,7,22,34,20,30,4,18,11,2,15,6,17,41,40,35,1,28,37,39,39,1,24,8,11,12,4,10,4,8,30,36,24,2,35,7,31,9,29,4,33,31,36,1,16,38,20,1,7,17,20,16,27,16,9,9,19,28,8,38,37,12,28,2,29,9,35,31,25,27,11,35,14,23,31,30,40,10,32,1,8,8,32,5,32,9,7,35,4,5,28,25,16,34,32,41,26,35,27,40,22,8,20,33,16,17,2,35,20,20,6,36,38,41,',
      '8,34,33,32,13,20,36,32,14,40,18,2,3,25,32,19,33,35,1,33,35,12,33,11,32,27,21,19,10,38,26,10,40,29,3,20,23,39,4,7,16,1,14,8,23,39,35,39,2,6,37,20,18,40,16,30,2,29,4,30,25,22,7,34,21,39,41,6,17,35,11,19,18,18,8,15,37,18,21,33,4,10,3,40,21,25,5,39,28,5,40,23,1,20,41,9,2,32,36,26,23,41,32,27,40,20,31,29,30,31,5,6,39,13,13,22,7,21,1,37,25,39,2,30,23,11,34,37,8,21,38,11,17,23,24,24,35,11,9,17,8,23,18,10,',
      '10,17,40,27,1,3,40,1,26,8,34,11,3,38,41,19,11,41,22,2,28,37,33,7,5,15,11,27,31,38,35,41,37,35,22,35,39,4,37,13,25,21,10,35,21,16,7,10,36,21,26,30,35,9,28,30,21,30,5,6,2,23,7,34,2,10,11,6,36,39,15,22,28,17,34,2,7,5,17,8,23,24,16,23,16,8,34,33,35,1,4,1,10,40,35,22,27,30,20,24,10,4,22,15,28,4,25,38,16,41,9,18,18,26,21,28,37,25,23,21,15,6,12,23,20,37,5,15,37,24,6,14,18,17,10,28,9,28,21,5,16,36,4,29,',
      '20,39,39,33,39,16,31,12,24,36,27,15,41,36,31,9,2,34,5,23,6,31,2,1,8,9,39,5,30,40,35,34,22,26,28,26,8,3,23,25,10,21,4,41,2,21,37,16,11,36,40,10,28,41,18,9,22,3,30,28,25,18,2,9,38,33,30,7,27,8,8,23,26,5,21,23,10,34,41,36,24,37,32,41,27,28,33,10,37,27,17,3,6,34,38,32,36,10,41,9,33,5,37,33,17,14,29,11,36,23,9,34,34,11,23,37,33,34,12,34,5,25,14,10,13,11,36,28,10,9,34,33,14,26,26,5,1,19,32,34,30,36,3,7,',
      '18,19,30,6,27,39,3,2,21,5,14,37,16,5,8,2,7,15,28,39,7,29,7,6,20,24,14,32,26,2,11,15,16,38,31,22,22,4,28,25,9,35,16,7,3,13,1,38,28,5,24,16,5,33,24,27,25,13,13,26,7,32,12,37,24,12,21,12,39,2,29,7,5,6,4,5,10,12,25,12,2,5,13,20,25,20,12,37,4,31,33,17,6,5,37,1,3,2,19,33,27,10,41,19,6,4,30,23,33,16,13,30,7,19,36,1,22,14,35,14,34,33,27,35,21,8,27,30,13,8,15,9,4,14,10,11,24,39,9,25,4,24,36,21,',
      '9,26,40,32,41,30,19,1,26,26,25,37,23,27,22,29,39,4,16,4,41,33,1,13,16,0,19,36,29,24,18,8,9,2,29,28,1,3,37,37,15,19,1,39,1,17,37,39,3,10,36,27,34,17,27,16,41,6,6,20,27,6,20,9,21,2,41,19,2,25,20,26,13,6,7,41,15,2,3,25,16,0,37,13,14,21,29,14,28,23,18,30,28,24,6,25,36,38,9,14,35,3,3,22,8,12,3,0,22,40,34,24,3,12,7,7,6,27,36,3,18,12,26,12,27,17,35,36,14,30,18,26,3,4,4,39,6,5,41,8,40,13,32,26,',
      '32,15,33,30,6,6,19,37,8,29,14,23,29,7,14,20,39,11,32,17,3,15,30,24,18,0,36,12,23,18,22,0,13,16,11,25,19,18,11,15,29,24,13,11,17,18,7,40,32,0,9,31,37,9,20,5,0,3,41,14,41,37,26,14,12,9,32,15,4,23,10,41,29,16,31,9,6,3,33,10,12,0,35,29,28,14,37,13,14,39,35,10,39,33,6,26,28,15,39,38,3,20,10,6,24,10,2,0,22,11,23,28,38,39,20,35,0,5,39,25,37,12,41,6,5,14,33,21,6,13,33,16,27,13,35,7,31,20,14,39,0,35,28,37,',
      '22,33,5,18,14,19,22,7,31,26,5,0,30,40,39,8,15,0,27,26,5,11,0,22,10,0,38,19,21,39,32,0,1,23,22,29,3,26,7,23,10,41,16,9,34,21,11,16,11,0,34,14,37,21,32,36,0,18,0,10,17,21,28,25,5,23,4,3,37,0,3,21,10,15,19,37,31,38,17,32,41,0,36,32,29,41,22,19,12,13,17,20,35,30,19,39,31,0,6,8,30,0,27,0,0,28,0,0,11,32,29,8,11,16,34,33,0,0,2,30,5,33,20,35,15,5,33,24,26,29,18,19,37,39,41,36,36,20,16,22,0,40,8,9,',
      '35,17,25,35,35,0,20,34,4,10,28,0,22,17,13,8,39,0,20,32,4,18,0,27,17,0,20,0,33,39,16,0,0,39,11,0,33,6,36,5,11,2,4,6,4,13,0,19,40,0,20,29,9,18,32,5,0,37,0,0,24,9,23,32,22,34,40,7,35,0,29,0,0,4,41,0,0,13,24,41,3,0,0,15,29,8,29,31,25,33,35,4,27,40,5,28,2,0,33,8,4,0,0,0,0,6,0,0,36,11,12,39,39,0,2,21,0,0,7,22,0,31,19,0,34,32,39,40,8,29,11,16,18,0,11,13,10,36,17,0,0,38,39,12,',
      '39,29,3,0,1,0,0,25,22,6,8,0,4,18,12,4,34,0,18,0,35,6,0,0,23,0,9,0,41,35,28,0,0,33,3,0,14,28,5,17,34,3,0,40,29,37,0,23,30,0,16,9,19,10,0,0,0,0,0,0,17,14,9,24,25,14,20,15,41,0,17,0,0,23,0,0,0,29,19,26,29,0,0,18,27,31,30,39,32,19,21,23,38,0,40,39,35,0,0,0,6,0,0,0,0,0,0,0,39,3,4,1,36,0,14,5,0,0,0,37,0,28,7,0,0,7,19,41,8,3,14,23,21,0,24,13,4,28,0,0,0,3,30,29,',
      '30,17,30,0,26,0,0,14,41,41,0,0,27,10,37,0,5,0,8,0,14,0,0,0,41,0,2,0,0,34,0,0,0,22,33,0,18,3,20,28,0,15,0,20,24,30,0,0,0,0,26,20,3,19,0,0,0,0,0,0,7,5,41,23,8,10,4,0,37,0,30,0,0,17,0,0,0,29,16,38,17,0,0,37,0,1,29,38,23,25,17,11,0,0,23,11,31,0,0,0,0,0,0,0,0,0,0,0,25,21,24,13,31,0,37,39,0,0,0,26,0,6,38,0,0,0,31,34,0,18,23,27,14,0,3,25,38,39,0,0,0,4,26,0,',
      '34,0,26,0,0,0,0,27,3,20,0,0,16,31,13,0,0,0,0,0,7,0,0,0,16,0,33,0,0,32,0,0,0,41,6,0,22,17,3,0,0,0,0,4,14,10,0,0,0,0,10,13,10,21,0,0,0,0,0,0,18,0,31,6,23,0,6,0,0,0,2,0,0,0,0,0,0,36,12,0,1,0,0,6,0,25,0,32,1,23,34,37,0,0,0,34,17,0,0,0,0,0,0,0,0,0,0,0,20,0,15,7,1,0,21,2,0,0,0,9,0,0,13,0,0,0,6,26,0,18,36,39,36,0,6,20,28,33,0,0,0,7,37,0,',
      '0,0,39,0,0,0,0,24,0,0,0,0,1,34,31,0,0,0,0,0,12,0,0,0,5,0,19,0,0,0,0,0,0,0,20,0,0,0,16,0,0,0,0,8,41,0,0,0,0,0,28,0,26,31,0,0,0,0,0,0,0,0,4,35,34,0,16,0,0,0,19,0,0,0,0,0,0,13,11,0,18,0,0,2,0,13,0,11,39,1,10,22,0,0,0,13,31,0,0,0,0,0,0,0,0,0,0,0,15,0,12,34,0,0,14,0,0,0,0,17,0,0,2,0,0,0,31,13,0,0,6,0,1,0,0,29,1,4,0,0,0,4,16,0,',
      '0,0,21,0,0,0,0,24,0,0,0,0,36,27,18,0,0,0,0,0,0,0,0,0,25,0,1,0,0,0,0,0,0,0,0,0,0,0,33,0,0,0,0,2,22,0,0,0,0,0,0,0,19,41,0,0,0,0,0,0,0,0,40,14,8,0,18,0,0,0,39,0,0,0,0,0,0,1,0,0,0,0,0,37,0,39,0,25,41,0,11,40,0,0,0,3,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,0,0,37,0,0,0,0,29,0,0,36,0,0,0,0,33,0,0,23,0,0,0,0,38,40,11,0,0,0,34,38,0,',
      '0,0,16,0,0,0,0,21,0,0,0,0,11,26,11,0,0,0,0,0,0,0,0,0,30,0,15,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,7,38,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,14,24,0,0,4,0,0,0,34,0,0,0,0,0,0,30,0,0,0,0,0,24,0,40,0,7,39,0,39,10,0,0,0,36,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,0,0,30,0,0,0,0,0,0,0,0,0,0,0,0,34,0,0,15,0,0,0,0,18,19,0,0,0,0,0,41,0,',
      '0,0,41,0,0,0,0,0,0,0,0,0,6,21,0,0,0,0,0,0,0,0,0,0,40,0,37,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,29,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,12,0,0,22,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,15,18,0,29,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,28,22,0,0,0,0,0,32,0,',
      '0,0,18,0,0,0,0,0,0,0,0,0,2,28,0,0,0,0,0,0,0,0,0,0,6,0,38,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,41,0,0,39,0,0,0,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,29,0,41,9,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,37,0,0,0,0,0,0,0,',
      '0,0,3,0,0,0,0,0,0,0,0,0,0,36,0,0,0,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,16,0,0,0,0,0,0,38,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,27,0,41,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,19,0,0,0,0,0,0,0,',
      '0,0,31,0,0,0,0,0,0,0,0,0,0,32,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,17,0,0,0,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,26,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,38,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,28,0,0,0,0,0,0,0,0,0,0,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,37,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,',
      '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'
    ];
    // let glitchesString = '';
    // const numberOfIterations = [];
    let nume = -1;
    // const letters = textWrapper.innerText.replace(/\s/g, '');

    // function getNumOfIterations() {
    //   for (let i = 0; i < letters.length; i++) {
    //     glitchesString = '';
    //     for (let j = 0; j < Math.floor((Math.random() * 4 + 2) * 9); j++) {
    //       glitchesString += `${Math.floor(Math.random() * 41 + 1)},`;
    //     }
    //     numberOfIterations[i] = glitchesString;
    //     while (numberOfIterations[i].split(',').length < 55) {
    //       numberOfIterations[i] += '0,';
    //     }
    //     numberOfIterations[i] += '0';
    //   }
    // }

    // function getFinalStrings() {
    //   for (let i = 0; i < 55; i++) {
    //     let testString = '';
    //     for (let j = 0; j < letters.length; j++) {
    //       testString += `${numberOfIterations[j].split(',')[i]},`;
    //     }
    //     finalStrings[i] = testString;
    //   }
    //   textWrapper.innerHTML = textWrapper.innerHTML.replace(
    //     /class="char"/g,
    //     'class="char sym-43"'
    //   );
    //   textWrapper.innerHTML = textWrapper.innerHTML.replace(
    //     /sym-\d?\d/g,
    //     replaceFinal
    //   );
    // }

    function prepareToIterate() {
      textWrapper.innerHTML = textWrapper.innerHTML.replace(
        /class="char"/g,
        'class="char sym-43"'
      );
      textWrapper.innerHTML = textWrapper.innerHTML.replace(
        /sym-\d?\d/g,
        replaceFinal
      );
    }

    function replaceFinal() {
      nume += 1;
      return renderedStrings[iteration]
        .split(',')
        [nume].replace(/\d?\d/g, 'sym-$&');
    }

    function swapText() {
      nume = -1;
      if (iteration < renderedStrings.length) {
        textWrapper.innerHTML = textWrapper.innerHTML.replace(
          /sym-\d?\d/g,
          replaceFinal
        );
        iteration += 1;
      }
    }

    // if (finalStrings === renderedStrings) {
    //   console.log('!!!');
    // }
    // console.log(finalStrings);
    // console.log(renderedStrings);

    // getNumOfIterations();
    // getFinalStrings();
    prepareToIterate();

    setTimeout(() => {
      setInterval(swapText, 60);
    }, 100);

    // function testq() {
    //    setInterval(swapText, 60);
    // }
    // window.requestAnimationFrame(testq);
  }

  // Mooving letters

  // Load images after page was fully loaded
  function loadImagesAfterPageLoad() {
    let lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    const lazyBackgrounds = [].slice.call(document.querySelectorAll('.lazyBg'));

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackground.classList.add('loaded');
    });

    lazyImages.forEach(function(lazyImage) {
      // eslint-disable-next-line
      lazyImage.src = lazyImage.dataset.src;
      // eslint-disable-next-line
      lazyImage.srcset = lazyImage.dataset.srcset;
      lazyImage.classList.remove('lazy');

      lazyImages = lazyImages.filter(function(image) {
        return image !== lazyImage;
      });
    });
  }

  (function() {
    loadImagesAfterPageLoad();
    // eslint-disable-next-line no-undef
    ScrollOut({
      once: false,
      targets: '.word'
    });
    // eslint-disable-next-line no-undef
    ScrollOut({
      once: true,
      threshold: 0.2,
      targets: '.animated',
      onShown: function(el) {
        el.classList.add('anim');
      }
    });

    // eslint-disable-next-line no-undef
    ScrollOut({
      once: true,
      targets: '#mooving-letters',
      onShown: function() {
        moovingLetters();
      }
    });

    initCookies();
    if (document.getElementById('particles-js')) {
      // eslint-disable-next-line no-undef
      particlesJS.load('particles-js', 'particlesjs-config.json', function() {
        // console.log('callback - particles.js config loaded');
      });
      setHeightOfFormContainer();
      window.addEventListener('resize', setHeightOfFormContainer);
    }

    if (document.getElementById('studio-hero')) {
      // eslint-disable-next-line no-undef
      Splitting({
        by: 'chars',
        whitespace: true
      });
    }
  })();
};
