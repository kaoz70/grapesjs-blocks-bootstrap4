import grapesjs from 'grapesjs';
import loadComponents from './components';
import loadBlocks from './blocks';

export default grapesjs.plugins.add('grapesjs-blocks-bootstrap4', (editor, opts = {}) => {

  let options = { ...{
    blocks: [
      'header'
    ],
    labels: {
      header: 'Header'
    },
    stylePrefix: ''
  },  ...opts };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // TODO Remove
  //editor.on('load', () => editor.addComponents(`<div style="margin:0 100px; padding:25px;">Content loaded from the plugin</div>`))
});
