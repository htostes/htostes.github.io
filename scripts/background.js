import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.151.0/build/three.module.js";

// Initial setup (no changes needed here)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// --- Initial Renderer and Canvas Styling ---
function setupRenderer() {
    renderer.setSize(window.innerWidth, window.innerHeight); // Set initial size correctly
    renderer.domElement.style.position = "fixed"; // Use fixed to cover the viewport
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "-1";
    renderer.domElement.style.pointerEvents = "none";
    document.body.prepend(renderer.domElement);
}

setupRenderer();

const PARTICLE_COUNT = 100;
const positions = [];
const velocities = [];
const particles = [];

const geometry = new THREE.BufferGeometry();
const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 20;
    positions.push(x, y, z);
    velocities.push(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
    );
    particles.push(new THREE.Vector3(x, y, z));
}

geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
);
const pointCloud = new THREE.Points(geometry, material);
scene.add(pointCloud);

const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x888888,
    transparent: true,
    opacity: 0.3,
});
const lineGeometry = new THREE.BufferGeometry();
const linePositions = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 3);
lineGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(linePositions, 3)
);
const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
scene.add(lines);

function animate() {
    requestAnimationFrame(animate);

    // Particle animation (no changes needed here)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const v = velocities.slice(i * 3, i * 3 + 3);
        particles[i].x += v[0];
        particles[i].y += v[1];
        particles[i].z += v[2];

        ["x", "y", "z"].forEach((axis) => {
            if (particles[i][axis] > 10 || particles[i][axis] < -10) {
                velocities[i * 3 + ["x", "y", "z"].indexOf(axis)] *= -1;
            }
        });

        geometry.attributes.position.array[i * 3 + 0] = particles[i].x;
        geometry.attributes.position.array[i * 3 + 1] = particles[i].y;
        geometry.attributes.position.array[i * 3 + 2] = particles[i].z;
    }

    geometry.attributes.position.needsUpdate = true;

    // Line drawing (no changes needed here)
    let lineIndex = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dz = particles[i].z - particles[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 2.5) {
                linePositions[lineIndex++] = particles[i].x;
                linePositions[lineIndex++] = particles[i].y;
                linePositions[lineIndex++] = particles[i].z;
                linePositions[lineIndex++] = particles[j].x;
                linePositions[lineIndex++] = particles[j].y;
                linePositions[lineIndex++] = particles[j].z;
            }
        }
    }

    lines.geometry.setDrawRange(0, lineIndex / 3);
    lines.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();

// --- Corrected Resize Handler ---
window.addEventListener("resize", () => {
    // Use the browser's inner window dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update the renderer's size
    renderer.setSize(width, height);

    // Update the camera's aspect ratio
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
