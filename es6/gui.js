import dat from 'dat-gui';
import THREE from 'three';

import { lightsFactory } from './lights';

// const mesh = meshFactory();
const lights = lightsFactory();

const gui = new dat.GUI();

// Bind the app's instance to this module
export const controls = (app) => {
  // Alias to get object by name
  const gobn = (name) => app.scene.getObjectByName(name);
  const sphere = gobn('sphere');

  const removeObjects = {
    lights: () => {
      app.scene.children.forEach((obj) => {
        if (obj instanceof THREE.Light) app.scene.remove(obj);
      });
    },
  };

  const addObjects = {
    lights: () => {
      Object.keys(lights).forEach(light => app.scene.add(lights[light]));
    },
  };

  const rotation = {
    speed: 0.02,
  };

  gui.add(sphere.material, 'visible').name('Sphere\'s visibility');
  gui.add(removeObjects, 'lights').name('Less lights');
  gui.add(addObjects, 'lights').name('More lights');
  gui.add(rotation, 'speed', 0, 1).onChange(() => { app.rotationSpeed = rotation.speed; });
};
