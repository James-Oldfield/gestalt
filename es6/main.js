// import domify from 'domify';
import THREE from 'three';
import domready from 'domready';

import { renderer } from './canvas';
import { meshFactory, meshUpdate } from './mesh';
import { lightsFactory } from './lights';

domready(() => {
  const app = renderer();
  const mesh = meshFactory();
  const lights = lightsFactory();

  // Add the objects to the scene
  Object.keys(mesh).forEach(m => app.scene.add(mesh[m]));
  Object.keys(lights).forEach(light => app.scene.add(lights[light]));
  const axes = new THREE.AxisHelper(100);
	app.scene.add(axes);

  document.body.appendChild(app.rend.domElement);

  const render = () => {
    requestAnimationFrame(render);
    meshUpdate();
    app.rend.render(app.scene, app.cam);
  };

  render(app);
});
