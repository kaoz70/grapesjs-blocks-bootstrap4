import grapesjs from 'grapesjs';
import loadCommands from './commands';
import loadTraits from './traits';
import loadComponents from './components';
import loadBlocks from './blocks';
import loadDevices from './devices';

export default grapesjs.plugins.add('grapesjs-blocks-bootstrap4', (editor, opts = {}) => {

  window.editor = editor;

  const opts_blocks = opts.blocks || {};
  const opts_labels = opts.labels || {};
  const opts_categories = opts.blockCategories || {};
  delete opts['blocks'];
  delete opts['labels'];
  delete opts['blockCategories'];

  const default_blocks = {
    default: true,
    text: true,
    link: true,
    image: true,
    // LAYOUT
    container: true,
    row: true,
    column: true,
    column_break: true,
    media_object: true,
    // COMPONENTS
    alert: true,
    badge: true,
    button: true,
    button_group: true,
    button_toolbar: true,
    card: true,
    card_container: true,
    collapse: true,
    dropdown: true,
    // TYPOGRAPHY
    header: true,
    paragraph: true,
    // BASIC
    list: true
  }

  const default_labels = {
    // LAYOUT
    container: 'Container',
    row: 'Row',
    column: 'Column',
    column_break: 'Column Break',
    media_object: 'Media Object',
    // COMPONENTS
    alert: 'Alert',
    badge: 'Badge',
    button: 'Button',
    button_group: 'Button Group',
    button_toolbar: 'Button Toolbar',
    card: 'Card',
    card_container: 'Card Container',
    collapse: 'Collapse',
    dropdown: 'Dropdown',
    dropdown_menu: 'Dropdown Menu',
    dropdown_item: 'Dropdown Item',
    // TYPOGRAPHY
    text: 'Text',
    header: 'Header',
    paragraph: 'Paragraph',
    // BASIC
    image: 'Image',
    link: 'Link',
    list: 'Simple List'
  }

  const default_categories = {
    'layout': true,
    'components': true,
    'typography': true,
    'basic': true
  }

  let options = { ...{
    blocks: Object.assign(default_blocks, opts_blocks),
    labels: Object.assign(default_labels, opts_labels),
    blockCategories: Object.assign(default_categories, opts_categories),
    gridDevices: true,
    gridDevicesPanel: false,
  },  ...opts };

 editor.addComponents(`
    <style>

      /* Layout */

      .gjs-dashed .container, .gjs-dashed .container-fluid,
      .gjs-dashed .row,
      .gjs-dashed .col, .gjs-dashed [class^="col-"] {
        min-height: 1.5rem !important;
      }
      .gjs-dashed .w-100 {
        min-height: .25rem !important;
        background-color: rgba(0,0,0,0.1);
      }
      .gjs-dashed img {
        min-width: 25px;
        min-height: 25px;
        background-color: rgba(0,0,0,0.5);
      }

      /* Components */
      
      .gjs-dashed .btn-group,
      .gjs-dashed .btn-toolbar {
        padding-right: 1.5rem !important;
        min-height: 1.5rem !important;
      }
      .gjs-dashed .card,
      .gjs-dashed .card-group, .gjs-dashed .card-deck, .gjs-dashed .card-columns {
        min-height: 1.5rem !important;
      }
      .gjs-dashed .collapse {
        display: block !important;
        min-height: 1.5rem !important;
      }
      .gjs-dashed .dropdown {
        display: block !important;
        min-height: 1.5rem !important;
      }
      .gjs-dashed .dropdown-menu {
        min-height: 1.5rem !important;
        display: block !important;
      }

    </style>
  `);

  // Add components
  loadCommands(editor, options);
  loadTraits(editor, options);
  loadComponents(editor, options);
  loadBlocks(editor, options);
  loadDevices(editor, options);

  // TODO Remove
  //editor.on('load', () => editor.addComponents(`<div style="margin:0 100px; padding:25px;">Content loaded from the plugin</div>`))
});
