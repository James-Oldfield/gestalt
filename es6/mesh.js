import THREE from 'three';
const ThreeBSP = require('three-js-csg')(THREE);

const sphere = {};
const coneList = [];
const objs = {};

const noOfCones = 30;

// Sphere options
const s = {
  geom: [300, 32, 25],
  material: {
    color: 0xffffff,
    wireframe: true,
  },
  pos: [0, 0, 0],
};

export const addCone = () => {
  const cone = {};

  const c = {
    geom: [1, 50, 150, 50],
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
  sphere.material = new THREE.MeshBasicMaterial({ color: 0xC24B36, wireframe: true });
  sphere.mesh = new THREE.Mesh(sphere.geometry, sphere.material);
  sphere.mesh.position.set(...s.pos);
  sphere.mesh.name = 'sphere';
  sphere.material.visible = false;

  for (let i = 0; i < noOfCones; i ++) {
    coneList.push(addCone());
  }

  // Over-arching sphere BSP to subtract from
  const sphereBSP = new ThreeBSP(sphere.mesh);
  const coneSpacing = Math.PI * 2 / noOfCones;
false
  let swtch = true;

  // Create a sphere-diffed mesh for each cone
  const coneListBSP = coneList.map((cone, ind) => {
    const spherePivot = new THREE.Mesh();
    const tempCone = new ThreeBSP(cone);

    const sbt = tempCone.subtract(sphereBSP);
    const mesh = sbt.toMesh();
    mesh.material = new THREE.MeshLambertMaterial({ color: 0x0FFA493 });

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
        swtch = ! swtch;
        spherePivot.rotation.x = coneSpacing * (ind + 1);
        break;
      default:
        break;
    }

    return spherePivot;
  });

  Object.assign(objs, coneListBSP, { sphere: sphere.mesh });

  return objs;
};

export const meshUpdate = (rotation = 0.02) => {
  Object.keys(objs).forEach(obj => {
    objs[obj].rotation.x += rotation;
  });
};
