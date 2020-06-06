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

var venusGeo = new THREE.SphereGeometry (30, 40, 400), 
    venusMat = new THREE.MeshPhongMaterial(); 

//map
venusMat.map = THREE.ImageUtils.loadTexture('images/2k_venus_surface.jpg')

var venusMesh = new THREE.Mesh(venusGeo, venusMat);
venusMesh.position.set(-100, 0, 0); 
venusMesh.rotation.y=5;

scene.add(venusMesh);

camera.lookAt( venusMesh.position );

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

   venusMesh.rotation.y += 0.2 * delta;
   renderer.render(scene, camera);
}

animate();
