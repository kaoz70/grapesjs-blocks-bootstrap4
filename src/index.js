//import grapesjs from 'grapesjs';
import loadCommands from './commands';
import loadTraits from './traits';
import loadComponents from './components';
import loadDevices from './devices';

const loadCss = editor => {
  editor.Config.canvasCss += `
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
  `
};

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
    tabs: true,
    badge: true,
    button: true,
    button_group: true,
    button_toolbar: true,
    card: true,
    card_container: true,
    collapse: true,
    dropdown: true,
    video: true,
    // TYPOGRAPHY
    header: true,
    paragraph: true,
    // BASIC
    list: true,
    // FORMS
    form: true,
    input: true,
    form_group_input: true,
    input_group: true,
    textarea: true,
    select: true,
    label: true,
    checkbox: true,
    radio: true,
  };

  const default_labels = {
    // LAYOUT
    container: 'Container',
    row: 'Row',
    column: 'Column',
    column_break: 'Column Break',
    media_object: 'Media Object',

    // COMPONENTS
    alert: 'Alert',
    tabs: 'Tabs',
    tab: 'Tab',
    tabPane: 'Tab Pane',
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

    // MEDIA
    image: 'Image',
    video: 'Video',

    // TYPOGRAPHY
    text: 'Text',

    // BASIC
    header: 'Header',
    paragraph: 'Paragraph',
    link: 'Link',
    list: 'Simple List',

    // FORMS
    form: 'Form',
    input: 'Input',
    file_input: 'File',
    form_group_input: 'Form Group',
    input_group: 'Input group',
    textarea: 'Textarea',
    select: 'Select',
    select_option: '- Select option -',
    option: 'Option',
    label: 'Label',
    checkbox: 'Checkbox',
    radio: 'Radio',
    trait_method: 'Method',
    trait_enctype: 'Encoding Type',
    trait_multiple: 'Multiple',
    trait_action: 'Action',
    trait_state: 'State',
    trait_id: 'ID',
    trait_for: 'For',
    trait_name: 'Name',
    trait_placeholder: 'Placeholder',
    trait_value: 'Value',
    trait_required: 'Required',
    trait_type: 'Type',
    trait_options: 'Options',
    trait_checked: 'Checked',
    type_text: 'Text',
    type_email: 'Email',
    type_password: 'Password',
    type_number: 'Number',
    type_date: 'Date',
    type_hidden: 'Hidden',
    type_submit: 'Submit',
    type_reset: 'Reset',
    type_button: 'Button',
  };

  const default_categories = {
    'layout': true,
    'media': true,
    'components': true,
    'typography': true,
    'basic': true,
    'forms': true,
  };

  let options = { ...{
    blocks: Object.assign(default_blocks, opts_blocks),
    labels: Object.assign(default_labels, opts_labels),
    blockCategories: Object.assign(default_categories, opts_categories),
    optionsStringSeparator: '::',
    gridDevices: true,
    gridDevicesPanel: false,
    classNavigation: 'nav',
    classTabPanes: 'tab-content',
    classTabPane: 'tab-pane',
    classTab: 'nav-item',
  },  ...opts };

  // Add components
  loadCommands(editor, options);
  loadTraits(editor, options);
  loadComponents(editor, options);
  loadDevices(editor, options);
  loadCss(editor, options);
});
