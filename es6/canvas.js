import THREE from 'three';

export const renderer = () => {
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1 / 10000);

  const rend = new THREE.WebGLRenderer();
  rend.setSize(window.innerWidth, window.innerHeight);
  rend.setClearColor(0xff6347);
  cam.position.z = 1000;

  const app = Object.assign({}, {
    scene,
    cam,
    rend,
  });


  return app;
};
