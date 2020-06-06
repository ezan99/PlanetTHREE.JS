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

var uranusGeo = new THREE.SphereGeometry (30, 40, 400), 
    uranusMat = new THREE.MeshPhongMaterial(); 

//map
uranusMat.map = THREE.ImageUtils.loadTexture('images/2k_uranus.jpg')

var uranusMesh = new THREE.Mesh(uranusGeo, uranusMat);
uranusMesh.position.set(-100, 0, 0); 
uranusMesh.rotation.y=5;

scene.add(uranusMesh);

camera.lookAt( uranusMesh.position );

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

   uranusMesh.rotation.y += 0.2 * delta;
   renderer.render(scene, camera);
}

animate();
