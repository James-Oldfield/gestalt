// import domify from 'domify';
import domready from 'domready';

import { renderer } from './canvas';
import { meshFactory, meshUpdate } from './mesh';
import { lightsFactory } from './lights';

domready(() => {
  const app = renderer();
  const mesh = meshFactory();

  // Add the objects to the scene
  Object.keys(mesh).forEach(m => app.scene.add(mesh[m]));
  Object.keys(lightsFactory).forEach(light => app.scene.add(lightsFactory[light]));

  document.body.appendChild(app.rend.domElement);

  const render = () => {
    requestAnimationFrame(render);
    app.rend.render(app.scene, app.cam);
  };

  render(app);
});
