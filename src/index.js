import grapesjs from 'grapesjs';
import loadComponents from './components';
import loadBlocks from './blocks';

export default grapesjs.plugins.add('grapesjs-blocks-bootstrap4', (editor, opts = {}) => {

  window.editor = editor;

  const opts_blocks = opts.blocks || {};
  const opts_labels = opts.labels || {};
  delete opts['blocks'];
  delete opts['labels'];

  const default_blocks = {
    text: true,
    container: true,
    row: true,
    column: true,
    header: true
  }

  const default_labels = {
    text: 'Text',
    container: 'Container',
    row: 'Row',
    column: 'Column',
    header: 'Header'
  }

  let options = { ...{
    blocks: Object.assign(default_blocks, opts_blocks),
    labels: Object.assign(default_labels, opts_labels)
  },  ...opts };

 editor.addComponents(`
    <style>
      .gjs-dashed .container, .gjs-dashed .container-fluid,
      .gjs-dashed .row,
      .gjs-dashed .col, .gjs-dashed [class^="col-"] {
        min-height: 1rem !important;
      }
    </style>
  `);

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // TODO Remove
  //editor.on('load', () => editor.addComponents(`<div style="margin:0 100px; padding:25px;">Content loaded from the plugin</div>`))
});
