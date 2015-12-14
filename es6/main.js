// import domify from 'domify';
import domready from 'domready';

import { renderer } from './canvas';
import { meshFactory, meshUpdate } from './mesh';
import { lightsFactory } from './lights';

domready(() => {
  const app = renderer();

  const mesh = meshFactory();
  app.scene.add(mesh.sphere);

  Object.keys(lightsFactory).forEach(light => app.scene.add(lightsFactory[light]));

  document.body.appendChild(app.rend.domElement);

  const render = () => {
    requestAnimationFrame(render);
    meshUpdate();
    app.rend.render(app.scene, app.cam);
  };

  render(app);
});
