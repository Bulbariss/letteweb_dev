window.onload = function () {
    const screenWidth = window.matchMedia("(min-width: 640px)");
    const screenHeight = window.matchMedia("(min-height: 640px)");
    let name = false;
    let email = false;
    let subject = false;
    let foundOut = false;
    let message = false;
    const IDs = {
        nameID: document.getElementById('input-name'),
        emailID: document.getElementById('input-email'),
        subjectID: document.getElementById('input-subject'),
        foundOutID: document.getElementById('input-foundOut'),
        messageID: document.getElementById('input-message'),
        name_P_ID: document.getElementById('input-name-p'),
        email_P_ID: document.getElementById('input-email-p'),
        subject_P_ID: document.getElementById('input-subject-p'),
        foundOut_P_ID: document.getElementById('input-foundOut-p'),
        message_P_ID: document.getElementById('input-message-p'),
        // modalID: document.getElementById('ModalCenter')
    };

    // Regex for validating inputs
    const regexName = /^[а-яА-ЯёЁa-zA-Z0-9]+$/i;
    const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Clear invalid form propery from passed cell
    function invalidInput(id) {
        document.getElementById(`${id}`).classList.add('border-red');
        document.getElementById(`${id}-p`).classList.add('visible-imp');
    }
    // Set invalid form propery from passed cell
    function validInput(id) {
        document.getElementById(`${id}`).classList.remove('border-red');
        document.getElementById(`${id}-p`).classList.remove('visible-imp');
    }
    // Clear all input from cells
    function clearForm() {
        IDs.nameID.value = null;
        IDs.emailID.value = null;
        IDs.subjectID.value = null;
        IDs.foundOutID.value = null;
        IDs.messageID.value = null;
    }
    // Close modal by clicking on close button
    // function closeModal() {
    //   document.getElementById('close-modal').click();
    // }
    // If modal is closed clear inputs and remove invalid input property
    // Clear all invalid input properties
    function clearInvalidInput() {
        IDs.nameID.classList.remove('invalid-form');
        IDs.emailID.classList.remove('invalid-form');
        IDs.subjectID.classList.remove('invalid-form');
        IDs.foundOutID.classList.remove('invalid-form');
        IDs.messageID.classList.remove('invalid-form');
        IDs.name_P_ID.classList.remove('invalid-form-text');
        IDs.email_P_ID.classList.remove('invalid-form-text');
        IDs.subject_P_ID.classList.remove('invalid-form-text');
        IDs.foundOut_P_ID.classList.remove('invalid-form-text');
        IDs.message_P_ID.classList.remove('invalid-form-text');
    }
    // // If modal on mobile is closed return navbar and body scroll
    // function closedModal() {
    //     setTimeout(() => {
    //         if (!IDs.modalID.classList.contains('show')) {
    //             clearInvalidInput();
    //             clearForm();
    //             document.getElementById('navbar').classList.remove('scrollUp');
    //         }
    //     }, 100);
    // }

    // If enter is pressed call for email submit
    function submitOnEnter(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            submitEmail(event);
        }
    }
    // Check if cell input is valid
    function validateName() {
        let from_name = document.querySelector('#input-name').value;
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
        let x = document.querySelector('#input-email').value;
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
        let validateSubject = document.querySelector('#input-subject').value;
        if (!validateSubject.length === 0 || validateSubject.trim()) {
            validInput('input-subject');
            subject = true;
        } else {
            invalidInput('input-subject');
            subject = false;
        }
    }
    // Check if cell input is valid
    function validateFoundOut() {
        let x = document.querySelector('#input-foundOut').value;
        if (x) {
            validInput('input-foundOut');
            foundOut = true;
        } else {
            invalidInput('input-foundOut');
            foundOut = false;
            console.log('!')
        }
    }
    // Check if cell input is valid
    function validateMessage() {
        let message_html = document.querySelector('#input-message').value;
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
        document.getElementById('modal-body').classList.add('visibility-hidden');
        document.getElementById('success').classList.remove('visibility-hidden');
        clearInvalidInput();
        clearForm();
        setTimeout(() => {
            // closeModal();
            document.getElementById('modal-body').classList.remove('visibility-hidden');
            document.getElementById('success').classList.add('visibility-hidden');
        }, 6000);
    }
    // Show error message
    function showError() {
        document.getElementById('failure').classList.remove('visibility-hidden');
        setTimeout(() => {
            document.getElementById('failure').classList.add('visibility-hidden');
        }, 4000);
    }

    // Send email
    function submitEmail(event) {
        event.preventDefault();
        // Check if all inputs are valid
        validateName();
        validateEmail();
        validateSubject();
        validateFoundOut();
        validateMessage();

        const data = {
            service_id: 'default_service',
            template_id: 'template_GUD945DV',
            user_id: 'user_6lWJz8Dg5i8zIDgfKxhsy',
            template_params: {
                "from_name": IDs.nameID.value,
                "email": IDs.emailID.value,
                "subject": IDs.subjectID.value,
                "found_out": IDs.foundOutID.value,
                "message_html": IDs.messageID.value
            },
        };

        // Send email if everything is valid
        if (name && email && subject && foundOut && message) {
            emailjs.send(data.service_id, data.template_id, data.template_params)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);

                }, function (error) {
                    console.log('FAILED...', error);
                });
        }
    }

    function curtainsJS() {
        let mousePosition = {
            x: 0,
            y: 0,
        };

        let pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1.0;

        let webGLCurtain = new Curtains({
            container: "canvas",
            watchScroll: false
        });

        let planeElement = document.getElementsByClassName("plane")[0];

        let params = {
            vertexShaderID: "plane-vs",
            fragmentShaderID: "plane-fs",
            widthSegments: 20,
            heightSegments: 20,
            uniforms: {
                resolution: {
                    name: "uResolution",
                    type: "2f",
                    value: [pixelRatio * planeElement.clientWidth, pixelRatio * planeElement.clientHeight],
                },
                time: {
                    name: "uTime",
                    type: "1f",
                    value: 0,
                },
                mousePosition: {
                    name: "uMousePosition",
                    type: "2f",
                    value: [mousePosition.x, mousePosition.y],
                },
                mouseStrength: {
                    name: "uMouseStrength",
                    type: "1f",
                    value: 0,
                },
            }
        }

        let plane = webGLCurtain.addPlane(planeElement, params);

        plane && plane.onReady(function () {

            plane.setPerspective(35);

            document.querySelector(".plane").addEventListener("mousemove", function (e) {
                if (screenHeight.matches && screenWidth.matches) {
                    handleMovement(e, plane);
                }
            });
        }).onRender(function () {

            plane.uniforms.time.value++;

            plane.uniforms.mouseStrength.value = Math.max(0, plane.uniforms.mouseStrength.value - 0.0075);
        }).onAfterResize(function () {
            let planeBoundingRect = plane.getBoundingRect();
            plane.uniforms.resolution.value = [planeBoundingRect.width, planeBoundingRect.height];
        });

        function handleMovement(e, plane) {

            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;

            let mouseCoords = plane.mouseToPlaneCoords(mousePosition.x, mousePosition.y);

            plane.uniforms.mousePosition.value = [mouseCoords.x, mouseCoords.y];
            plane.uniforms.mouseStrength.value = 0.7;
        }
    };

    function allowCookies() {
        setCookie('consent', true, 365);
        hideCookieBanner();
    }

    function rejectCookies() {
        setCookie('consent', false, 365);
        hideCookieBanner();
    }

    function initCookies() {
        let cookieConsent = getCookie('consent');
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
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
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
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'UA-154158494-1');
    }

    // Create cookie that lives 365 days
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // Validate inputs on focus out
    IDs.nameID.addEventListener('focusout', validateName);
    IDs.emailID.addEventListener('focusout', validateEmail);
    IDs.subjectID.addEventListener('focusout', validateSubject);
    IDs.foundOutID.addEventListener('focusout', validateFoundOut);
    IDs.messageID.addEventListener('focusout', validateMessage);
    // When modal button is pressed hide navbar on phones
    // document.getElementById('btn-trigger-modal').addEventListener('click', hideNavbar);

    // When modal closes show navbar on mobile and clear fields
    // document.getElementById('ModalCenter').addEventListener('click', closedModal);
    // Send email on submit
    document.getElementById('contact-form').addEventListener('submit', submitEmail);
    // Submit on enter press
    document.addEventListener('keyup', submitOnEnter(event));

    document.getElementById('btn-allow-cookies').addEventListener('click', () => {
        allowCookies();
        activateCookies();
    });

    document.getElementById('btn-reject-cookies').addEventListener('click', () => {
        rejectCookies();
        deactivateCookies();
    });

    document.getElementById('btn-change-cookie-preferences').addEventListener('click', showCookieBanner);

    function toggleNav() {
        document.getElementById('menu').classList.toggle('active');
        document.getElementsByTagName('body')[0].classList.toggle('scroll-lock');
    };

    function disableNav() {
        if (screenWidth.matches && document.getElementById('menu').classList.contains('active')) {
            document.getElementById('checkbox').click();
            document.getElementById('menu').classList.remove('active');
            document.getElementsByTagName('body')[0].classList.remove('scroll-lock');
        }
    };

    function toggleLangList() {
        document.getElementById('lang-list').classList.toggle('invisible');
    };

    document.getElementById('checkbox').addEventListener('click', toggleNav);
    window.addEventListener('resize', disableNav);
    document.getElementById('toggle-lang-list').addEventListener('click', toggleLangList);

    (function () {
        // curtainsJS();
        Splitting();
        ScrollOut({
            once: false,
            targets: '.word',
        });
        Splitting({
            by: 'chars',
            whitespace: true
        });
        initCookies();
    })();
}