import grapesjs from 'grapesjs';
import loadComponents from './components';
import loadBlocks from './blocks';

export default grapesjs.plugins.add('grapesjs-blocks-bootstrap4', (editor, opts = {}) => {

  window.editor = editor;

  const opts_blocks = opts.blocks || {};
  const opts_labels = opts.labels || {};
  delete opts['blocks'];
  delete opts['labels'];

  let options = { ...{
    blocks: Object.assign({
      text: true,
      header: true
    }, opts_blocks),
    labels: Object.assign({
      text: 'Text',
      header: 'Header'
    }, opts_labels)
  },  ...opts };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // TODO Remove
  //editor.on('load', () => editor.addComponents(`<div style="margin:0 100px; padding:25px;">Content loaded from the plugin</div>`))
});
