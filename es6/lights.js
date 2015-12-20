import THREE from 'three';

export const lightsFactory = () => {
  const ambientLight = new THREE.AmbientLight(0x333333);
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.y = 350;
  ambientLight.position.y = 350;

  return Object.assign({}, { ambient: ambientLight, point: pointLight });
};
