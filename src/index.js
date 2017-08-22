import loadComponents from './components';
import loadBlocks from './blocks';

export default grapesjs.plugins.add('YOUR-PLUGIN-NAME', (editor, opts = {}) => {
  let config = opts;

  let defaults = {
    // default options
  };

  // Load defaults
  for (let name in defaults) {
    if (!(name in config))
      config[name] = defaults[name];
  }

  // Add components
  loadComponents(editor, config);

  // Add blocks
  loadBlocks(editor, config);

});
