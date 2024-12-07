import * as THREE from "./node_modules/three/build/three.module.js"
// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.20/+esm';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js';

/**
 * LIL GUI - DEBUG
 */
const gui = new GUI({
  width: 300,
  title: 'Options',
  closeFolders: false,
});

/**
 * Models
 */
const gltfLoader = new GLTFLoader();
// gltfLoader.load(
//   '',
//   (gltf) => {
//     scene.add(gltf.scene[0])
//   }
// )

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
  width: 500,
  height: 400
}

const debugObject = {};

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
      color: '#444444',
      metalness: 0,
      roughness: 0.5
  })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

// GUI elements
const canvaTweak = gui.addFolder('Parameters');
canvaTweak
    .add(floor.position, 'y')
    .min(- 3)
    .max(3)
    .step(0.01)
    .name('elevation');
canvaTweak.add(floor,'visible').name('Visible');
// canvaTweak.add(material, 'wireframe').name('Wireframe');


debugObject.spin = () => {
    gsap.to(floor.rotation, { duration: 1, y: floor.rotation.y + Math.PI * 2 });
}
canvaTweak.add(debugObject, 'spin');

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()