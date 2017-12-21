import grapesjs from 'grapesjs';
import loadComponents from './components';
import loadBlocks from './blocks';
import loadDevices from './devices';

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
    column_break: true,
    header: true
  }

  const default_labels = {
    text: 'Text',
    container: 'Container',
    row: 'Row',
    column: 'Column',
    column_break: 'Column Break',
    header: 'Header'
  }

  let options = { ...{
    blocks: Object.assign(default_blocks, opts_blocks),
    labels: Object.assign(default_labels, opts_labels),
    gridDevices: true,
    gridDevicesPanel: false,
  },  ...opts };

 editor.addComponents(`
    <style>
      .gjs-dashed .container, .gjs-dashed .container-fluid,
      .gjs-dashed .row,
      .gjs-dashed .col, .gjs-dashed [class^="col-"] {
        min-height: 1rem !important;
      }
      .gjs-dashed .w-100 {
        min-height: .25rem !important;
        background-color: rgba(0,0,0,0.1);
      }
    </style>
  `);

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // Add blocks
  loadDevices(editor, options);

  // TODO Remove
  //editor.on('load', () => editor.addComponents(`<div style="margin:0 100px; padding:25px;">Content loaded from the plugin</div>`))
});
