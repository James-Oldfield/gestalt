import THREE from 'three';

const sphere = {};
const coneList = [];

const s = {
  geom: [300, 32, 16],
  material: {
    color: 0xffffff,
    wireframe: true,
  },
  pos: [0, 0, 0],
};

const c = {
  geom: [5, 50, 100, 32],
  material: {
    color: 0x000000,
    wireframe: true,
  },
  pos: [0, 300, 0],
};

let objs = {};

export const addCone = (o) => {
  const cone = {};

  cone.geometry = new THREE.CylinderGeometry(...o.geom);
  cone.material = new THREE.MeshBasicMaterial(o.material);
  cone.mesh = new THREE.Mesh(cone.geometry, cone.material);
  cone.mesh.position.set(...o.pos);

  return cone.mesh;
};

export const meshFactory = () => {
  // Create the 3D objects
  sphere.geometry = new THREE.SphereGeometry(...s.geom);
  sphere.material = new THREE.MeshBasicMaterial(s.material);
  sphere.mesh = new THREE.Mesh(sphere.geometry, sphere.material);
  sphere.mesh.position.set(...s.pos);

  coneList.push(addCone(c));

  objs = Object.assign({}, { sphere: sphere.mesh }, coneList);

  return objs;
};

export const meshUpdate = () => {
  Object.keys(objs).forEach(obj => {
    objs[obj].rotation.x += 0.01;
  });
};
