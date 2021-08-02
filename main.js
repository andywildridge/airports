import './style.css'
import * as THREE from 'three'

document.querySelector('#app').innerHTML = `
  <h1>Let's go!</h1>
`
const scene = new THREE.Scene();

// Create a basic perspective camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.setZ(30);

// Create a renderer with Antialiasing
const renderer = new THREE.WebGLRenderer({
  antialias:true,
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

renderer.render(scene, camera);

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshStandardMaterial({ 
  color: 0xFF6347,
  //wireframe: true 
});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(25,25,25);
scene.add(pointLight, ambientLight);

function addStar(x) {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xFFF
  });
  const star = new THREE.Mesh( geometry, material );

  //const [x, y, z] = Array(3).fill().map(() =>  THREE.MathUtils.randFloatSpread( 100 ))
  star.position.set(x, 0, 0);
  scene.add(star);
  return star;
}

const stars = [];
for( let i = 0; i <= 100; i++ ) {
  stars.push(addStar(i - 50));
  //stars[i].position.set(i-50, 10, 0);
}

console.log( stars );

let x = -100;
    // Render Loop
function animate() {
  requestAnimationFrame( animate );

  cube.position.x += 0.001;
  cube.rotation.y += 0.01;

  let time = ~~((+new Date() % 10000) / 100);  
  //stars[time].position.y = 10;
  stars[~~time].position.y = 10;

  

  // Render the scene
  renderer.render(scene, camera);
};

animate();