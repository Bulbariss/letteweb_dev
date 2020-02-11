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
    // eslint-disable-next-line camelcase
    const from_name = document.querySelector('#input-name').value;
    // eslint-disable-next-line camelcase
    if (regexName.test(from_name) || from_name === 0) {
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
    // eslint-disable-next-line no-shadow
    const validateSubject = document.querySelector('#input-subject').value;
    if (!validateSubject.length === 0 || validateSubject.trim()) {
      validInput('input-subject');
      subject = true;
    } else {
      invalidInput('input-subject');
      subject = false;
    }
  }

  // Check if cell input is valid
  function validateMessage() {
    // eslint-disable-next-line camelcase
    const message_html = document.querySelector('#input-message').value;
    if (!message_html.length === 0 || message_html.trim()) {
      validInput('input-message');
      message = true;
    } else {
      invalidInput('input-message');
      message = false;
    }
  }

  // Show success message
  function showSuccess() {
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
    document
      .getElementById('contact-submit-btn-success')
      .classList.add('block-imp');
    setTimeout(() => {
      document
        .getElementById('contact-submit-btn-success')
        .classList.remove('block-imp');
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
        .getElementById('contact-submit-btn-text')
        .classList.remove('hidden');
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
    document
      .getElementById('contact-submit-btn-error')
      .classList.add('block-imp');
    setTimeout(() => {
      document
        .getElementById('contact-submit-btn-error')
        .classList.remove('block-imp');
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
        .getElementById('contact-submit-btn-text')
        .classList.remove('hidden');
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
      const data = {
        service_id: 'default_service',
        template_id: 'template_GUD945DV',
        user_id: 'user_6lWJz8Dg5i8zIDgfKxhsy',
        template_params: {
          // "from_name": '12',
          from_name: IDs.nameID.value,
          // "email": '12',
          email: IDs.emailID.value,
          // "subject": '12',
          subject: IDs.subjectID.value,
          found_out: '12',
          message_html: IDs.messageID.value
          // "message_html": '12'
        }
      };
      // add spinner
      document
        .getElementById('contact-submit-btn-text')
        .classList.add('hidden');
      document.getElementById('form-spinner').classList.add('block-imp');
      // eslint-disable-next-line no-undef
      emailjs
        .send(data.service_id, data.template_id, data.template_params)
        .then(
          function() {
            showSuccess();
          },
          function(error) {
            showError();
            // eslint-disable-next-line no-alert
            alert(
              `Send email failed!\r\n Response:\n ${JSON.stringify(error)}`
            );
          }
        );
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
    const finalStrings = [];
    let glitchesString = '';
    const numberOfIterations = [];
    let nume = -1;
    const letters = textWrapper.innerText.replace(/\s/g, '');
    textWrapper.innerHTML = textWrapper.innerHTML.replace(
      /<span class="char" data-char="(\S|)" style="--char-index:(\S*|);">(\S|)<\/span>/g,
      '<span class="char" data-char="$1" data-value=" " style="--char-index:$2;">$3</span>'
    );

    function getNumOfIterations() {
      for (let i = 0; i < letters.length; i++) {
        glitchesString = '';
        for (let j = 0; j < Math.floor((Math.random() * 4 + 2) * 9); j++) {
          glitchesString += `${Math.floor(Math.random() * 41 + 1)},`;
        }
        numberOfIterations[i] = glitchesString;
        while (numberOfIterations[i].split(',').length < 55) {
          numberOfIterations[i] += '0,';
        }
        numberOfIterations[i] += '0';
      }
    }

    function getFinalStrings() {
      for (let i = 0; i < 55; i++) {
        let testString = '';
        for (let j = 0; j < letters.length; j++) {
          testString += `${numberOfIterations[j].split(',')[i]},`;
        }
        finalStrings[i] = testString;
      }
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
      return finalStrings[iteration]
        .split(',')
        [nume].replace(/\d?\d/g, 'sym-$&');
    }

    function swapText() {
      nume = -1;
      if (iteration < finalStrings.length) {
        textWrapper.innerHTML = textWrapper.innerHTML.replace(
          /sym-\d?\d/g,
          replaceFinal
        );
        iteration += 1;
      }
    }

    getNumOfIterations();
    getFinalStrings();
    setTimeout(() => {
      setInterval(swapText, 60);
    }, 100);
  }

  // Mooving letters

  (function() {
    // eslint-disable-next-line no-undef
    ScrollOut({
      once: false,
      targets: '.word'
    });
    // eslint-disable-next-line no-undef
    Splitting({
      by: 'chars',
      whitespace: true
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

    // eslint-disable-next-line no-undef
    ScrollOut({
      targets: '#enable-navbar-invert',
      onShown: function() {
        document.getElementById('navbar').classList.remove('color-invert');
      },
      onHidden: function() {
        document.getElementById('navbar').classList.add('color-invert');
      }
    });
    initCookies();
    if (document.getElementById('hero')) {
      // eslint-disable-next-line no-undef
      emailjs.init('user_6lWJz8Dg5i8zIDgfKxhsy');
    }
    if (document.getElementById('particles-js')) {
      // eslint-disable-next-line no-undef
      particlesJS.load('particles-js', 'particlesjs-config.json', function() {
        // console.log('callback - particles.js config loaded');
      });
      setHeightOfFormContainer();
      window.addEventListener('resize', setHeightOfFormContainer);
      // eslint-disable-next-line no-undef
      emailjs.init('user_6lWJz8Dg5i8zIDgfKxhsy');
    }
  })();
};
