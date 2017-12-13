import grapesjs from 'grapesjs';
import loadComponents from './components';
import loadBlocks from './blocks';

export default grapesjs.plugins.add('YOUR-PLUGIN-NAME', (editor, opts = {}) => {
  const options = { ...{
    // default options
  },  ...opts };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // TODO Remove
  editor.on('load', () => editor.addComponents(`<div style="margin:0 100px; padding:25px;">Content loaded from the plugin</div>`))
});
