import THREE from 'three';
const ThreeBSP = require('three-js-csg')(THREE);

const sphere = {};
const coneList = [];

const noOfCones = 50;

const s = {
  geom: [300, 32, 50],
  material: {
    color: 0xffffff,
    wireframe: true,
  },
  pos: [0, 0, 0],
};

export const addCone = () => {
  const cone = {};

  const c = {
    geom: [1, 100, 175, 50],
    material: {
      color: 0x000000,
      wireframe: true,
    },
    pos: [0, 360, 0],
  };

  cone.geometry = new THREE.CylinderGeometry(...c.geom);
  cone.material = new THREE.MeshBasicMaterial(c.material);
  cone.mesh = new THREE.Mesh(cone.geometry);
  cone.mesh.position.set(...c.pos);

  return cone.mesh;
};

export const meshFactory = () => {
  // Create the main sphere object
  sphere.geometry = new THREE.SphereGeometry(...s.geom);
  sphere.mesh = new THREE.Mesh(sphere.geometry);
  sphere.mesh.position.set(...s.pos);

  for (let i = 0; i < noOfCones; i ++) {
    coneList.push(addCone());
  }

  // Over-arching sphere BSP to subtract from
  const sphereBSP = new ThreeBSP(sphere.mesh);

  // Create a sphere-diffed mesh for each cone
  const coneListBSP = coneList.map(cone => {
    const spherePivot = new THREE.Mesh();
    const tempCone = new ThreeBSP(cone);

    const sbt = tempCone.subtract(sphereBSP);
    const mesh = sbt.toMesh();
    mesh.material = new THREE.MeshLambertMaterial({ color: 0x1a1a1a, emissive: 0xff0000 });

    spherePivot.add(mesh);

    spherePivot.rotation.z = Math.PI * 2 / Math.random();
    spherePivot.rotation.y = Math.PI * 2 / Math.random();
    spherePivot.rotation.x = Math.PI * 2 / Math.random();

    return spherePivot;
  });

  return Object.assign({}, coneListBSP);
};

export const meshUpdate = () => {
  Object.keys(objs).forEach(obj => {
    objs[obj].rotation.x += 0.01;
  });
};
