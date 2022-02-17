import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);


const geometry = new THREE.TorusGeometry(15, 0.87, 21, 52);
const material = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01; //Math.random();
  torus.rotation.y += 0.01; //Math.random();
  torus.rotation.z += 0.01; //Math.random();
  renderer.render(scene, camera);
}

animate();