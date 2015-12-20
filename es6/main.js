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

  document.body.appendChild(app.rend.domElement);
  document.getElementsByClassName('loading')[0].style.display = 'none';
  document.getElementsByClassName('help')[0].style.display = 'inherit';

  const render = () => {
    requestAnimationFrame(render);
    meshUpdate();
    app.rend.render(app.scene, app.cam);
  };

  render(app);
});
