// import * as THREE from "./node_modules/three/build/three.module.js"
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import GUI from 'lil-gui'; 
// import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'


/**
 * LIL GUI - DEBUG
 */
// const gui = new GUI({
//   width: 300,
//   title: 'Nice Debug UI',
//   closeFolders: false,
// });

// const material = new THREE.MeshPhysicalMaterial();


// gui.add(material, 'metalness').min(0).max(1).step(0.0001);
// gui.add(material, 'roughness').min(0).max(1).step(0.0001);

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
// const scene = new THREE.Scene();

// const textureLoader = new THREE.TextureLoader();



// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;


const dropzone = document.getElementById('dropzone');

dropzone.addEventListener('dragover', (e) => {
  e.stopPropagation();
  e.preventDefault();
});

dropzone.addEventListener('drop', (e) => {
  e.stopPropagation();
  e.preventDefault();
  const files = e.dataTransfer.files;
  for (const file of files) {
    if (file.name !== undefined) {
      console.log('file', file);
      const titleName = document.getElementById("file_name");
      titleName.innerText = file.name;
      console.log('title', titleName)
      window.location="/canvas.html";
      
    }

  }
})

const fileInput = document.getElementById("fileInput");

fileInput.addEventListener('change', (event) => {
  console.log('file selected:', event);
  getFileName(event);
});

const getFileName = (event) => {
  const files = event.target.files;
  const fileName = files[0].name;
  console.log('file name: ' + fileName);
  if (fileName !== undefined) {
    window.location="/canvas.html";

  }
}