window.onload = function () {
    const screenWidth = window.matchMedia("(min-width: 640px)");
    const screenHeight = window.matchMedia("(min-height: 640px)");

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
            console.log('1')
        } else if (cookieConsent === 'false') {
            deactivateCookies();
            console.log('2')
        } else {
            showCookieBanner();
            console.log('3')
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