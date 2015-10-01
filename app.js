(function(funcName, baseObj) {
  // var stats = initStats();
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xEEEEEE, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.Enabled = true;
  var axes = new THREE.AxisHelper(20);
  scene.add(axes);
  var planeGeometry = new THREE.PlaneGeometry( 5, 20, 32, 1 );
  var planeMaterial = new THREE.MeshBasicMaterial( { color: 0xbdc3c7 } );
  var plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.receiveShadow = true;
  plane.position.x = 5;
  scene.add(plane);
  var cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
  var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x34495e } );
  var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
  cube.position.x = 15;
  cube.position.y = 5;
  cube.position.z = -10;
  cube.castShadow = true;
  scene.add( cube );
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);
  scene.add(camera);

  document.getElementById("wrapper").appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    controls.update();
  }

  render();

  function onWindowResize() {
    var WIDTH = window.innerWidth,
      HEiGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH/HEIGHT;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', onWindowResize);
})("docReady", window);