// import * as THREE from "./node_modules/three/build/three.module.js"
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import GUI from 'lil-gui'; 
// import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
// import { BrowserWindow } from './node_modules/electron';

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
      // titleName = file.name;
      // console.log('title', titleName)
      location.href='canvas.html';
      document.addEventListener('DOMContentLoaded', e => {
        const h2 = document.querySelector("h2")
  
        h2.innerText = "Correct Text"
      })

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
    location.href='canvas.html';
    document.addEventListener('DOMContentLoaded', e => {
      const h2 = document.querySelector("h2")

      h2.innerText = "Correct Text"
    })
  }
}