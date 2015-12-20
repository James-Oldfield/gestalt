import THREE from 'three';

export const lightsFactory = () => {
  const ambientLight = new THREE.AmbientLight(0xffffff);
  const pointLights = {};

  pointLights.pl = new THREE.PointLight(0xFFC0B1);
  pointLights.pl.position.y = 500;

  pointLights.pl2 = new THREE.PointLight(0x2958B2);
  pointLights.pl2.position.y = 500;

  return Object.assign({}, { ambient: ambientLight }, pointLights);
};
