// we are using window onload event here but this is not mandatory

window.onload = function () {
    const screenWidth = window.matchMedia("(min-width: 640px)");
    const screenHeight = window.matchMedia("(min-height: 640px)");

    function curtainsJS() {
        // track the mouse positions to send it to the shaders
        let mousePosition = {
            x: 0,
            y: 0,
        };

        // could be useful to get pixel ratio
        let pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1.0;

        // pass the id of the div that will wrap the canvas to set up our WebGL context and append the canvas to our wrapper
        let webGLCurtain = new Curtains({
            container: "canvas",
            watchScroll: false
        });

        // get our plane element
        let planeElement = document.getElementsByClassName("plane")[0];

        // set our initial parameters (basic uniforms)
        let params = {
            vertexShaderID: "plane-vs", // our vertex shader ID
            fragmentShaderID: "plane-fs", // our framgent shader ID
            widthSegments: 20,
            heightSegments: 20, // we now have 20*20*6 = 2400 vertices !
            uniforms: {
                resolution: { // resolution of our plane
                    name: "uResolution",
                    type: "2f", // notice this is an length 2 array of floats
                    value: [pixelRatio * planeElement.clientWidth, pixelRatio * planeElement.clientHeight],
                },
                time: {
                    name: "uTime", // uniform name that will be passed to our shaders
                    type: "1f", // this means our uniform is a float
                    value: 0,
                },
                mousePosition: { // our mouse position
                    name: "uMousePosition",
                    type: "2f", // notice this is a length 2 array of floats
                    value: [mousePosition.x, mousePosition.y],
                },
                mouseStrength: { // the strength of the effect (we will attenuate it if the mouse stops moving)
                    name: "uMouseStrength", // uniform name that will be passed to our shaders
                    type: "1f", // this means our uniform is a float
                    value: 0,
                },
            }
        }

        // create our plane mesh
        let plane = webGLCurtain.addPlane(planeElement, params);

        // if our plane has been successfully created we could start listening to mouse/touch events and update its uniforms
        plane && plane.onReady(function () {
            // set a field of view of 35 to exagerate perspective
            // we could have done  it directly in the initial params
            plane.setPerspective(35);

            // listen our mouse/touch events on the whole document
            // we will pass the plane as second argument of our function
            // we could be handling multiple planes that way
            // document.body.addEventListener("mousemove", function (e) {
            //     handleMovement(e, plane);
            // });
            document.querySelector(".plane").addEventListener("mousemove", function (e) {
                if (screenHeight.matches && screenWidth.matches) {
                    handleMovement(e, plane);
                }
            });
            // document.body.addEventListener("touchmove", function (e) {
            //     handleMovement(e, plane);
            // });

        }).onRender(function () {
            // update our time uniform value
            plane.uniforms.time.value++;

            // continually decrease mouse strength
            plane.uniforms.mouseStrength.value = Math.max(0, plane.uniforms.mouseStrength.value - 0.0075);
        }).onAfterResize(function () {
            let planeBoundingRect = plane.getBoundingRect();
            plane.uniforms.resolution.value = [planeBoundingRect.width, planeBoundingRect.height];
        });


        // handle the mouse move event
        function handleMovement(e, plane) {

            // // touch event
            // if (e.targetTouches) {
            //     mousePosition.x = e.targetTouches[0].clientX;
            //     mousePosition.y = e.targetTouches[0].clientY;
            // }
            // // mouse event
            // else {
            // mousePosition.x = e.clientX;
            // mousePosition.y = e.clientY;
            // }

            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;

            // convert our mouse/touch position to coordinates relative to the vertices of the plane
            let mouseCoords = plane.mouseToPlaneCoords(mousePosition.x, mousePosition.y);
            // let mouseCoords = 0;
            // update our mouse position uniform
            plane.uniforms.mousePosition.value = [mouseCoords.x, mouseCoords.y];

            // reassign mouse strength
            plane.uniforms.mouseStrength.value = 0.7;
        }
    };

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
        curtainsJS();
        Splitting();
        ScrollOut({
            once: false,
            targets: '.word',
        });
        Splitting({
            by: 'chars',
            whitespace: true
        });
    })();
}