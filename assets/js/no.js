// JavaScript for interactive 3D rendering and animations
const canvas = document.getElementById('symbol');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the "No" symbol
const outerTorusGeometry = new THREE.TorusGeometry(1, 0.1, 16, 100);
const barGeometry = new THREE.BoxGeometry(1.4, 0.15, 0.15);

const material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.2 });

const outerTorus = new THREE.Mesh(outerTorusGeometry, material);
const bar = new THREE.Mesh(barGeometry, material);

// Rotate the bar to create the "No" symbol
bar.rotation.z = Math.PI / 4;

scene.add(outerTorus);
scene.add(bar);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

const animate = () => {
    requestAnimationFrame(animate);

    outerTorus.rotation.x += 0.01;
    outerTorus.rotation.y += 0.01;
    bar.rotation.x += 0.01;
    bar.rotation.y += 0.01;

    renderer.render(scene, camera);
};

// Mouse interaction
window.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    outerTorus.rotation.x = y * Math.PI;
    outerTorus.rotation.y = x * Math.PI;
    bar.rotation.x = y * Math.PI;
    bar.rotation.y = x * Math.PI;
});

// Resize handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Center canvas content
const resizeCanvasToCenter = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.set(0, 0, 5);
};

window.addEventListener('resize', resizeCanvasToCenter);

animate();