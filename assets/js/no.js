// JavaScript for interactive 3D rendering and animations
const canvas = document.getElementById('symbol');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Lighting
const light = new THREE.PointLight(0xffffff, 1.5, 150, 5);
light.position.set(5, 5, 5);
light.castShadow = true;
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft ambient light
scene.add(ambientLight);

// Materials with updated colors
const redMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, metalness: 0.5, roughness: 0.2 });
const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

// Create the "No" symbol
const outerTorusGeometry = new THREE.TorusGeometry(1, 0.1, 16, 100);
const barGeometry = new THREE.BoxGeometry(1.4, 0.15, 0.15);

const outerTorus = new THREE.Mesh(outerTorusGeometry, redMaterial);
outerTorus.castShadow = true;
outerTorus.receiveShadow = true;

const bar = new THREE.Mesh(barGeometry, redMaterial);
bar.castShadow = true;
bar.receiveShadow = true;

// Rotate the bar to create the "No" symbol
bar.rotation.z = Math.PI / 4;

scene.add(outerTorus);
scene.add(bar);

// Add text to the bar and torus
const fontLoader = new THREE.FontLoader();

fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    // Text on the bar
    const barTextGeometry = new THREE.TextGeometry('the403', {
        font: font,
        size: 0.12,
        height: 0.05,
    });
    const barText = new THREE.Mesh(barTextGeometry, whiteMaterial);
    barText.rotation.z = Math.PI / 3600;
    barText.position.set(-0.6, -0.05, 0.1); // Adjusted position for alignment
    barText.castShadow = true;
    bar.add(barText); // Attach to the bar

    // Create curved text for the torus
    const torusTextGeometry = new THREE.TextGeometry('By Zeeshan Badr', {
        font: font,
        size: 0.05,
        height: 0.05,
        curveSegments: 32,
    });
    const torusText = new THREE.Mesh(torusTextGeometry, whiteMaterial);
    torusText.geometry.center();
    torusText.position.set(0, -1, 0.1); // Adjusted position for alignment
    torusText.rotation.x = Math.PI / 90;
    outerTorus.add(torusText); // Attach to the torus
});

const animate = () => {
    requestAnimationFrame(animate);

    outerTorus.rotation.x += 0.01;
    outerTorus.rotation.y += 0.01;
    bar.rotation.x += 0.01;
    bar.rotation.y += 0.01;

    renderer.render(scene, camera);
};

// Mouse interaction for light position
window.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;

    light.position.set(x * 10, y * 10, 10);
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