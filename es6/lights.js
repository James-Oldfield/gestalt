import THREE from 'three';

export const lightsFactory = () => {
  const ambientLight = new THREE.AmbientLight(0x333333);
  const pointLight = new THREE.PointLight(0xffffff, 1, 4500);
  pointLight.position.set(-300, 1000, -300);

  return Object.assign({}, { ambientLight, pointLight });
};
