var WIDTH = window.innerWidth - 30,
    HEIGHT = window.innerHeight - 500;
 
var angle = 45,
    aspect = WIDTH / HEIGHT,
    near = 0.1,
    far = 3000;

var container = document.getElementById('planets');

var camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
camera.position.set(0, 0, 0);
var scene = new THREE.Scene();

var light = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI / 2, 1);
light.position.set(4000, 4000, 1500);
light.target.position.set (1000, 3800, 1000);

scene.add(light);

var saturnGeo = new THREE.SphereGeometry (30, 40, 400), 
    saturnMat = new THREE.MeshPhongMaterial(); 

//map
saturnMat.map = THREE.ImageUtils.loadTexture('images/2k_saturn.jpg')

//sun vendoj ringsat e saturnit
// saturnMat.bumpMap = THREE.ImageUtils.loadTexture('images/2k_saturn_ring_alpha.png');
// saturnMat.bumpScale = 8;

// saturnMat.ringMap = THREE.ImageUtils.loadTexture('images/2k_saturn_ring_alpha.png');

var saturnMesh = new THREE.Mesh(saturnGeo, saturnMat);
saturnMesh.position.set(-100, 0, 0); 
saturnMesh.rotation.y=5;

// var geometry = new THREE.RingGeometry( 1, 5, 32 );
// var material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
// var mesh = new THREE.Mesh( geometry, material );


scene.add(saturnMesh);
// scene.add( mesh );

camera.lookAt( saturnMesh.position );

//renderer
var renderer = new THREE.WebGLRenderer({antialiasing : true});
renderer.setSize(WIDTH, HEIGHT);
renderer.domElement.style.position = 'absolute';

container.appendChild(renderer.domElement);
renderer.autoClear = false;
renderer.shadowMapEnabled = true;

function animate() {
   requestAnimationFrame(animate);
   render(); 
}

function render() {
   var clock = new THREE.Clock();
   var delta = clock.getDelta(); 

   saturnMesh.rotation.y += 0.2 * delta;
   renderer.render(scene, camera);
}

animate();
