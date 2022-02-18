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


const geoTorus = new THREE.TorusGeometry(15, 0.87, 21, 52);
const material = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
const torus = new THREE.Mesh(geoTorus, material);

const geoBox = new THREE.BoxGeometry(5, 29, 2, 10, 10, 10);
const box = new THREE.Mesh(geoBox, material);

const ban = new THREE.Group();
ban.add(torus);
ban.add(box);

const pLight = new THREE.PointLight(0xffffff);
//const aLight = new THREE.AmbientLight(0x00FFFF);
pLight.position.set(1, 2, 30);

scene.add(ban);
scene.add(pLight); //scene.add(pLight, aLight);
//scene.add(torus);
//scene.add(box);

function animate() {
  requestAnimationFrame(animate);
  ban.rotation.x += 0.01; //Math.random();
  ban.rotation.y += 0.01; //Math.random();
  ban.rotation.z += 0.01; //Math.random();
  renderer.render(scene, camera);
}

animate();