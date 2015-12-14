import THREE from 'three';

let sphere;
let sp;

export const meshFactory = () => {
  // Create the 3D objects
  const geometry = new THREE.SphereGeometry(300, 32, 16);
  sphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x113111, wireframe: true }));
  sphere.position.set(0, 40, 0);

  const geom = new THREE.SphereGeometry(100, 10, 10);
  sp = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: 0x111122, wireframe: true }));
  sp.position.set(0, 40, 0);

  return Object.assign({}, { sphere, sp });
};

export const meshUpdate = () => {
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
};
