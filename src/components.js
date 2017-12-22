import _ from 'underscore';
import _s from 'underscore.string';
export default (editor, config = {}) => {

  const c = config;
  let domc = editor.DomComponents;
  let blocks = c.blocks;

  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  var textType = domc.getType('text');
  var textModel = textType.model;
  var textView = textType.view;

  const linkType = domc.getType('link');
  const linkModel = linkType.model;
  const linkView = linkType.view;

  const imageType = domc.getType('image');
  const imageModel = imageType.model;
  const imageView = imageType.view;

  // Rebuild the text component and add some "utility" traits to it
  if (blocks.text) {
    domc.addType('text', {
      model: textModel.extend({
        defaults: Object.assign({}, textModel.prototype.defaults, {
          'custom-name': 'Text',
          tagName: 'div',
          attributes: {
            'data-bs-text': true
          },
          droppable: true,
          traits: [
            {
              type: 'class_select',
              options: [
                {value: '', name: 'None'},
                {value: 'display-1', name: 'One (largest)'},
                {value: 'display-2', name: 'Two '},
                {value: 'display-3', name: 'Three '},
                {value: 'display-4', name: 'Four (smallest)'}
              ],
              label: 'Display Heading',
              name: 'display-heading-size'
            }
          ].concat(textModel.prototype.defaults.traits)
        })
      }, {
        isComponent(el) {
          if(el && el.dataset && el.dataset.bsText) {
            return {type: 'bs_text'};
          }
        }
      }),
      view: textView
    });
    textType = domc.getType('text');
    textModel = textType.model;
    textView = textType.view;
  }

  // LAYOUT

  // Container

  if (blocks.container) {
    domc.addType('container', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Container',
          tagName: 'div',
          droppable: true,
          traits: [
            {
              type: 'class_select',
              options: [
                {value: 'container', name: 'Fixed'},
                {value: 'container-fluid', name: 'Fluid'}
              ],
              label: 'Width'
            }
          ].concat(defaultModel.prototype.defaults.traits)
        })
      }, {
        isComponent(el) {
          if(el && el.classList && (el.classList.contains('container') || el.classList.contains('container-fluid'))) {
            return {type: 'container'};
          }
        }
      }),
      view: defaultView
    });
  }

  // Row

  if (blocks.row) {
    domc.addType('row', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Row',
          tagName: 'div',
          draggable: '.container, .container-fluid',
          droppable: true,
          traits: [
            {
              type: 'class_select',
              options: [
                {value: '', name: 'Yes'},
                {value: 'no-gutters', name: 'No'}
              ],
              label: 'Gutters?'
            }
          ].concat(defaultModel.prototype.defaults.traits)
        })
      }, {
        isComponent(el) {
          if(el && el.classList && el.classList.contains('row')) {
            return {type: 'row'};
          }
        }
      }),
      view: defaultView
    });
  }

  // Column & Column Break

  if (blocks.column) {
    domc.addType('column', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Column',
          draggable: '.row',
          droppable: true,
          traits: [
            {
              type: 'class_select',
              options: [
                {value: 'col', name: 'Equal'},
                {value: 'col-auto', name: 'Variable'},
                ... [1,2,3,4,5,6,7,8,9,10,11,12].map(function(i) { return {value: 'col-'+i, name: i+'/12'} })
              ],
              label: 'XS Width',
            },
            {
              type: 'class_select',
              options: [
                {value: '', name: 'None'},
                {value: 'col-sm', name: 'Equal'},
                {value: 'col-sm-auto', name: 'Variable'},
                ... [1,2,3,4,5,6,7,8,9,10,11,12].map(function(i) { return {value: 'col-sm-'+i, name: i+'/12'} })
              ],
              label: 'SM Width',
            },
            {
              type: 'class_select',
              options: [
                {value: '', name: 'None'},
                {value: 'col-md', name: 'Equal'},
                {value: 'col-md-auto', name: 'Variable'},
                ... [1,2,3,4,5,6,7,8,9,10,11,12].map(function(i) { return {value: 'col-md-'+i, name: i+'/12'} })
              ],
              label: 'MD Width',
            },
            {
              type: 'class_select',
              options: [
                {value: '', name: 'None'},
                {value: 'col-lg', name: 'Equal'},
                {value: 'col-lg-auto', name: 'Variable'},
                ... [1,2,3,4,5,6,7,8,9,10,11,12].map(function(i) { return {value: 'col-lg-'+i, name: i+'/12'} })
              ],
              label: 'LG Width',
            },
            {
              type: 'class_select',
              options: [
                {value: '', name: 'None'},
                {value: 'col-xl', name: 'Equal'},
                {value: 'col-xl-auto', name: 'Variable'},
                ... [1,2,3,4,5,6,7,8,9,10,11,12].map(function(i) { return {value: 'col-xl-'+i, name: i+'/12'} })
              ],
              label: 'XL Width',
            },
            {
              type: 'class_select',
              options: [
                {value: '', name: 'None'},
                ... [0,1,2,3,4,5,6,7,8,9,10,11,12].map(function(i) { return {value: 'offset-'+i, name: i+'/12'} })
              ],
              label: 'XS Offset',
            },
            {
              type: 'class_select',
              options: [
                {value: '', name: 'None'},
                ... [0,1,2,3,4,5,6,7,8,9,10,11,12].map(function(i) { return {value: 'offset-sm-'+i, name: i+'/12'} })
              ],
              label: 'SM Offset',
            },
            {
              type: 'class_select',
              options: [
                {value: '', name: 'None'},
                ... [0,1,2,3,4,5,6,7,8,9,10,11,12].map(function(i) { return {value: 'offset-md-'+i, name: i+'/12'} })
              ],
              label: 'MD Offset',
            },
            {
              type: 'class_select',
              options: [
                {value: '', name: 'None'},
                ... [0,1,2,3,4,5,6,7,8,9,10,11,12].map(function(i) { return {value: 'offset-lg-'+i, name: i+'/12'} })
              ],
              label: 'LG Offset',
            },
            {
              type: 'class_select',
              options: [
                {value: '', name: 'None'},
                ... [0,1,2,3,4,5,6,7,8,9,10,11,12].map(function(i) { return {value: 'offset-xl-'+i, name: i+'/12'} })
              ],
              label: 'XL Offset',
            },
          ]
        }),
      }, {
        isComponent(el) {
          let match = false;
          if(el && el.classList) {
            el.classList.forEach(function(klass) {
              if(klass=="col" || klass.match(/^col-/)) {
                match = true;
              }
            });
          }
          if(match) return {type: 'column'};
        }
      }),
      view: defaultView
    });

    domc.addType('column_break', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Column Break',
          tagName: 'div',
          classes: ['w-100']
        })
      }, {
        isComponent(el) {
          if(el && el.classList && el.classList.contains('w-100')) { // also check if parent is `.row`
            return {type: 'column_break'};
          }
        }
      }),
      view: defaultView
    });

    // Media object

    domc.addType('media_object', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Media Object',
          tagName: 'div',
          classes: ['media']
        })
      }, {
        isComponent(el) {
          if(el && el.classList && el.classList.contains('media')) {
            return {type: 'media'};
          }
        }
      }),
      view: defaultView
    });

    domc.addType('media_body', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Media Body',
          tagName: 'div',
          classes: ['media-body']
        })
      }, {
        isComponent(el) {
          if(el && el.classList && el.classList.contains('media-body')) {
            return {type: 'media_body'};
          }
        }
      }),
      view: defaultView
    });

  }

  // Bootstrap "COMPONENTS

  const contexts = [
    'primary', 'secondary',
    'success', 'info',
    'warning', 'danger',
    'light', 'dark'
  ]

  const sizes = {
    'lg': 'Large',
    'sm': 'Small'
  }

  // Alert

  if (blocks.alert) {
    domc.addType('alert', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Alert',
          tagName: 'div',
          classes: ['alert'],
          traits: [
            {
              type: 'class_select',
              options: [
                {value: '', name: 'None'},
                ... contexts.map(function(v) { return {value: 'alert-'+v, name: _s.capitalize(v)} })
              ],
              label: 'Context'
            }
          ].concat(defaultModel.prototype.defaults.traits)
        })
      }, {
        isComponent(el) {
          if(el && el.classList && el.classList.contains('alert')) {
            return {type: 'alert'};
          }
        }
      }),
      view: defaultView
    });
  }

  // Badge

  if (blocks.badge) {
    domc.addType('badge', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Badge',
          tagName: 'span',
          classes: ['badge'],
          traits: [
            {
              type: 'class_select',
              options: [
                {value: '', name: 'None'},
                ... contexts.map(function(v) { return {value: 'badge-'+v, name: _s.capitalize(v)} })
              ],
              label: 'Context'
            },
            {
              type: 'class_select',
              options: [
                {value: '', name: 'Default'},
                {value: 'badge-pill', name: 'Pill'},
              ],
              label: 'Shape'
            }
          ].concat(defaultModel.prototype.defaults.traits)
        })
      }, {
        isComponent(el) {
          if(el && el.classList && el.classList.contains('badge')) {
            return {type: 'badge'};
          }
        }
      }),
      view: defaultView
    });
  }

  // Button

  if (blocks.button) {
    domc.addType('button', {
      model: linkModel.extend({
        defaults: Object.assign({}, linkModel.prototype.defaults, {
          'custom-name': 'Button',
          classes: ['btn'],
          attributes: {
            role: 'button'
          },
          traits: [
            {
              type: 'class_select',
              options: [
                {value: '', name: 'None'},
                ... contexts.map(function(v) { return {value: 'btn-'+v, name: _s.capitalize(v)} }),
                ... contexts.map(function(v) { return {value: 'btn-outline-'+v, name: _s.capitalize(v) + ' (Outline)'} })
              ],
              label: 'Context'
            },
            {
              type: 'class_select',
              options: [
                {value: '', name: 'Default'},
                ... Object.keys(sizes).map(function(k) { return {value: 'btn-'+k, name: sizes[k]} })
              ],
              label: 'Size'
            },
            {
              type: 'class_select',
              options: [
                {value: '', name: 'Inline'},
                {value: 'btn-block', name: 'Block'}
              ],
              label: 'Width'
            }
          ].concat(linkModel.prototype.defaults.traits)
        })
      }, {
        isComponent(el) {
          if(el && el.classList && el.classList.contains('button')) {
            return {type: 'button'};
          }
        }
      }),
      view: linkView
    });
  }

  // Button group

  if (blocks.button_group) {
    domc.addType('button_group', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Button Group',
          tagName: 'div',
          classes: ['btn-group'],
          droppable: '.btn',
          attributes: {
            role: 'group'
          },
          traits: [
            {
              type: 'class_select',
              options: [
                {value: '', name: 'Default'},
                ... Object.keys(sizes).map(function(k) { return {value: 'btn-group-'+k, name: sizes[k]} })
              ],
              label: 'Size'
            },
            {
              type: 'class_select',
              options: [
                {value: '', name: 'Horizontal'},
                {value: 'btn-group-vertical', name: 'Vertical'},
              ],
              label: 'Size'
            },
            {
              type: 'Text',
              label: 'ARIA Label',
              name: 'aria-label',
              placeholder: 'A group of buttons'
            }
          ].concat(defaultModel.prototype.defaults.traits)
        })
      }, {
        isComponent(el) {
          if(el && el.classList && el.classList.contains('btn-group')) {
            return {type: 'button_group'};
          }
        }
      }),
      view: defaultView
    });
  }

  // Button group

  if (blocks.button_toolbar) {
    domc.addType('button_toolbar', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Button Toolbar',
          tagName: 'div',
          classes: ['btn-toolbar'],
          droppable: '.btn-group',
          attributes: {
            role: 'toolbar'
          },
          traits: [
            {
              type: 'Text',
              label: 'ARIA Label',
              name: 'aria-label',
              placeholder: 'A toolbar of button groups'
            }
          ].concat(defaultModel.prototype.defaults.traits)
        })
      }, {
        isComponent(el) {
          if(el && el.classList && el.classList.contains('btn-toolbar')) {
            return {type: 'button_toolbar'};
          }
        }
      }),
      view: defaultView
    });
  }

  // TYPOGRAPHY

  // Header

  if (blocks.header) {
    domc.addType('header', {
      model: textModel.extend({
        defaults: Object.assign({}, textModel.prototype.defaults, {
          'custom-name': 'Header',
          tagName: 'h1',
          traits: [
            {
              type: 'select',
              options: [
                {value: 'h1', name: 'One (largest)'},
                {value: 'h2', name: 'Two'},
                {value: 'h3', name: 'Three'},
                {value: 'h4', name: 'Four'},
                {value: 'h5', name: 'Five'},
                {value: 'h6', name: 'Six (smallest)'},
              ],
              label: 'Size',
              name: 'tagName',
              changeProp: 1
            }
          ].concat(textModel.prototype.defaults.traits)
        }),

      }, {
        isComponent(el) {
          if(el && ['H1','H2','H3','H4','H5','H6'].includes(el.tagName)) {
            return {type: 'header'};
          }
        }
      }),
      view: textView
    });
  }

  // Basic

  if (blocks.image) {
    domc.addType('image', {
      model: imageModel.extend({
        defaults: Object.assign({}, imageModel.prototype.defaults, {
          'custom-name': 'Image',
          tagName: 'img',
          resizable: 1,
          traits: [
            {
              type: 'text',
              label: 'Source (URL)',
              name: 'src'
            }
          ].concat(imageModel.prototype.defaults.traits)
        })
      }, {
        isComponent: function(el) {
          if(el && el.tagName == 'IMG') {
            return {type: 'image'};
          }
        }
      }),
      view: imageView
    });
  }

  /*if (blocks.list) {
    domc.addType('list', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'List',
          tagName: 'ul',
          resizable: 1,
          traits: [
            {
              type: 'select',
              options: [
                {value: 'ul', name: 'No'},
                {value: 'ol', name: 'Yes'}
              ],
              label: 'Ordered?',
              name: 'tagName',
              changeProp: 1
            }
          ].concat(defaultModel.prototype.defaults.traits)
        })
      }, {
        isComponent: function(el) {
          if(el && ['UL','OL'].includes(el.tagName)) {
            return {type: 'list'};
          }
        }
      }),
      view: defaultView
    });
  }*/

  /*if (blocks.description_list) {
  }*/

}
