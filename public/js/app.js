(function(funcName, baseObj) {
	// var stats = initStats();
	// var scene = new THREE.Scene();
	// var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
	// var renderer = new THREE.WebGLRenderer({alpha: true});
	// renderer.setClearColor(0xffffff, 1);
	// renderer.setSize(window.innerWidth, window.innerHeight);
	// renderer.shadowMap.Enabled = true;
	// var axes = new THREE.AxisHelper(20);
	// scene.add(axes);
	// var planeGeometry = new THREE.PlaneGeometry( 70, 50, 1, 1 );
	// var planeMaterial = new THREE.MeshBasicMaterial( { color: 0xbdc3c7 } );
	// var plane = new THREE.Mesh( planeGeometry, planeMaterial );
	// plane.receiveShadow = true;
	// plane.position.x = 5;
	// scene.add(plane);
	// var cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
	// var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x34495e } );
	// var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	// cube.position.x = 15;
	// cube.position.y = 5;
	// cube.position.z = -10;
	// cube.castShadow = true;
	// scene.add( cube );
	// var spotLight = new THREE.SpotLight(0xffffff);
	// spotLight.position.set(-40, 60, -10);
	// spotLight.castShadow = true;
	// scene.add(spotLight);
	// // camera.position.x = -30;
	// // camera.position.y = 40;
	// // camera.position.z = 30;
	// // camera.lookAt(scene.position);
	// // scene.add(camera);

	// var viewSize = 900;
	// var aspectRatio = window.innerWidth / window.innerHeight;
	// var camera1 = new THREE.OrthographicCamera( - aspectRatio * viewSize / 2, aspectRatio * viewSize, viewSize / 2, - viewSize / - 2, -1000, 1000 );
	// camera1.position.x = 2;
	// camera1.position.y = 1;
	// camera1.position.z = 3;
	// scene.add(camera1);

	// // window.switchCamera = function() {
	// //   if (camera instanceof THREE.PerspectiveCamera) {
	// //     camera = new THREE.OrthographicCamera(
	// //     window.innerWidth / - 16, window.innerWidth / 16,window.innerHeight / 16, window.innerHeight / - 16, -200, 500 );
	// //     camera.position.x = 2;
	// //     camera.position.y = 1;
	// //     camera.position.z = 3;
	// //     camera.lookAt(scene.position);
	// //     this.perspective = "Orthographic";
	// //   } else {
	// //     camera = new THREE.PerspectiveCamera(45,
	// //     window.innerWidth / window.innerHeight, 0.1, 1000);
	// //     camera.position.x = 120;
	// //     camera.position.y = 60;
	// //     camera.position.z = 180;
	// //     camera.lookAt(scene.position);
	// //     this.perspective = "Perspective";
	// //   }
	// // };

	// // window.switchCamera();

 //  document.getElementById("wrapper").appendChild(renderer.domElement);

 //  // var controls = new THREE.OrbitControls(camera, renderer.domElement);

 //  function render() {
 //    requestAnimationFrame( render );
 //    cube.rotation.x += 0.1;
	// cube.rotation.y += 0.1;
 //    renderer.render( scene, camera1 );
 //    // controls.update();
 //  }

 //  render();

 //  function onWindowResize() {
 //    var WIDTH = window.innerWidth,
 //      HEIGHT = window.innerHeight;
 //    renderer.setSize(WIDTH, HEIGHT);
 //    camera.aspect = WIDTH/HEIGHT;
 //    camera.updateProjectionMatrix();
 //  }

 //  window.addEventListener('resize', onWindowResize);
          var stats = initStats();

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = 120;
        camera.position.y = 60;
        camera.position.z = 180;

        // create a render and set the size
        var renderer = new THREE.WebGLRenderer();

        renderer.setClearColorHex(0xEEEEEE, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);

        // create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(180,180);
        var planeMaterial =    new THREE.MeshLambertMaterial({color: 0xffffff});
        var plane = new THREE.Mesh(planeGeometry,planeMaterial);


        // rotate and position the plane
        plane.rotation.x=-0.5*Math.PI;
        plane.position.x=0
        plane.position.y=0
        plane.position.z=0

        // add the plane to the scene
        scene.add(plane);

        var cubeGeometry = new THREE.CubeGeometry(4,4,4);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ee22});
        for (var j = 0 ; j < (planeGeometry.height/5) ; j++) {
            for (var i = 0 ; i < planeGeometry.width/5 ; i++) {
                var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

                cube.position.z=-((planeGeometry.height)/2)+2+(j*5);
                cube.position.x=-((planeGeometry.width)/2)+2+(i*5);
                cube.position.y=2;

                scene.add(cube);
            }
        }

        var lookAtGeom = new THREE.SphereGeometry(2);
        var lookAtMesh = new THREE.Mesh(lookAtGeom,new THREE.MeshLambertMaterial({color: 0xff0000}));
        scene.add(lookAtMesh);


        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
        directionalLight.position.set( -20, 40, 60 );
        scene.add(directionalLight);



        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x292929);
        scene.add(ambientLight);

        // add the output of the renderer to the html element
        $("#WebGL-output").append(renderer.domElement);

        // call the render function
        var step=0;

        var controls = new function() {
            this.perspective = "Perspective";
            this.switchCamera = function() {
                if (camera instanceof THREE.PerspectiveCamera) {
                    camera = new THREE.OrthographicCamera( window.innerWidth / - 16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / - 16, -200, 500 );
                    camera.position.x = 2;
                    camera.position.y = 1;
                    camera.position.z = 3;
                    camera.lookAt(scene.position);
                    this.perspective = "Orthographic";
                } else {
                    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.x = 120;
                    camera.position.y = 60;
                    camera.position.z = 180;

                    camera.lookAt(scene.position);
                    this.perspective = "Perspective";
                }
            };
        }

        var gui = new dat.GUI();
        gui.add(controls, 'switchCamera');
        gui.add(controls, 'perspective').listen();

        // make sure that for the first time, the
        // camera is looking at the scene
     //   camera.lookAt(scene.position);
        render();


        var step=0;

        function render() {

            stats.update();
            // render using requestAnimationFrame
            step+=0.02;
            if (camera instanceof THREE.PerspectiveCamera) {
                var x = 10+( 100*(Math.sin(step)));
                camera.lookAt(new THREE.Vector3(x,10,0));
                lookAtMesh.position=new THREE.Vector3(x,10,0);
            } else {
                var x = ((Math.cos(step)));
                camera.lookAt(new THREE.Vector3(x,0,0));
                lookAtMesh.position=new THREE.Vector3(x,10,0);
            }

//        .position.x = 20+( 10*(Math.cos(step)));
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }

        function initStats() {

            var stats = new Stats();

            stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

            $("#Stats-output").append( stats.domElement );

            return stats;
        }
})("docReady", window);