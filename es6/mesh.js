import THREE from 'three';
const ThreeBSP = require('three-js-csg')(THREE);

const sphere = {};
const coneList = [];
const objs = {};

// Generic math-mapping function
const map = (val, l1, h1, l2, h2) => l2 + (h2 - l2) * (val - l1) / (h1 - l1);

const noOfCones = 42;

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
  sphere.material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  sphere.mesh = new THREE.Mesh(sphere.geometry, sphere.material);
  sphere.mesh.position.set(...s.pos);

  for (let i = 0; i < noOfCones; i ++) {
    coneList.push(addCone());
  }

  // Over-arching sphere BSP to subtract from
  const sphereBSP = new ThreeBSP(sphere.mesh);
  const coneSpacing = Math.PI * 2 / noOfCones;

  let swtch = true;

  // Create a sphere-diffed mesh for each cone
  const coneListBSP = coneList.map((cone, ind) => {
    const spherePivot = new THREE.Mesh();
    const tempCone = new ThreeBSP(cone);

    const sbt = tempCone.subtract(sphereBSP);
    const mesh = sbt.toMesh();
    mesh.material = new THREE.MeshNormalMaterial();

    spherePivot.add(mesh);

    switch (ind % 3) {
      case 0:
        spherePivot.rotation.x = coneSpacing * (ind + 1);
        break;
      case 1:
        spherePivot.rotation.z = coneSpacing * (ind + 1);
        break;
      case 2:
        (swtch) ? spherePivot.rotation.z = Math.PI / 4 : spherePivot.rotation.z = Math.PI * 2 - Math.PI / 4;
        swtch =! swtch;
        spherePivot.rotation.x = coneSpacing * (ind + 1);
      default:
        break;
    }

    return spherePivot;
  });

  Object.assign(objs, coneListBSP);

  return objs;
};

export const meshUpdate = () => {
  Object.keys(objs).forEach(obj => {
    objs[obj].rotation.x += 0.01;
  });
};

