import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.151.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.classList.add('bg-canvas');
document.body.prepend(renderer.domElement);

// Generate circular texture
function generateCircleTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  gradient.addColorStop(0, 'white');
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}

const circleTexture = generateCircleTexture();

// Particles setup
const particleCount = 100;
const areaSize = 15;
const positions = new Float32Array(particleCount * 3);
const speeds = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * areaSize;
  positions[i * 3 + 1] = (Math.random() - 0.5) * areaSize;
  positions[i * 3 + 2] = (Math.random() - 0.5) * areaSize;

  const speedFactor = 1;
  speeds[i * 3] = (0.005 + Math.random() * 0.002) * speedFactor;
  speeds[i * 3 + 1] = - (0.007 + Math.random() * 0.003) * speedFactor;
  speeds[i * 3 + 2] = 0;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 0.08,
  map: circleTexture,
  transparent: true,
  alphaTest: 0.01,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  color: 0xffffff,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

function animate() {
  requestAnimationFrame(animate);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] += speeds[i * 3];
    positions[i * 3 + 1] += speeds[i * 3 + 1];
    positions[i * 3 + 2] += speeds[i * 3 + 2];

    if (positions[i * 3] > areaSize / 2) positions[i * 3] = -areaSize / 2;
    if (positions[i * 3 + 1] < -areaSize / 2) positions[i * 3 + 1] = areaSize / 2;
  }

  geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
