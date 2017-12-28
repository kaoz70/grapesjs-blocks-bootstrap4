import _ from 'underscore';
import _s from 'underscore.string';
import loadCollapse from './components/collapse';
import loadDropdown from './components/dropdown';

export default (editor, config = {}) => {

  const img_src_default = 'https://dummyimage.com/450x250/999/222';

  const contexts = [
    'primary', 'secondary',
    'success', 'info',
    'warning', 'danger',
    'light', 'dark'
  ];

  const contexts_w_white = contexts.concat(['white']);

  const sizes = {
    'lg': 'Large',
    'sm': 'Small'
  };

  const c = config;
  let domc = editor.DomComponents;
  let blocks = c.blocks;
  let cats = c.blockCategories;

  var defaultType = domc.getType('default');
  var defaultModel = defaultType.model;
  var defaultView = defaultType.view;

  var textType = domc.getType('text');
  var textModel = textType.model;
  var textView = textType.view;

  var linkType = domc.getType('link');
  var linkModel = linkType.model;
  var linkView = linkType.view;

  var imageType = domc.getType('image');
  var imageModel = imageType.model;
  var imageView = imageType.view;

  // Rebuild the default component and add utility settings to it (border, bg, color, etc)
  if (cats.basic) {
    if (blocks.default) {
      domc.addType('default', {
        model: defaultModel.extend({
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            tagName: 'div',
            traits: [
              {
                type: 'class_select',
                options: [
                  {value: '', name: 'Default'},
                  ... contexts_w_white.map(function(v) { return {value: 'text-'+v, name: _s.capitalize(v)} })
                ],
                label: 'Text color'
              },
              {
                type: 'class_select',
                options: [
                  {value: '', name: 'Default'},
                  ... contexts_w_white.map(function(v) { return {value: 'bg-'+v, name: _s.capitalize(v)} })
                ],
                label: 'Background color'
              },
              {
                type: 'class_select',
                options: [
                  {value: '', name: 'Default'},
                  {value: 'border', name: 'Full'},
                  {value: 'border-top-0', name: 'No top'},
                  {value: 'border-right-0', name: 'No right'},
                  {value: 'border-bottom-0', name: 'No bottom'},
                  {value: 'border-left-0', name: 'No left'},
                  {value: 'border-0', name: 'None'}
                ],
                label: 'Border width'
              },
              {
                type: 'class_select',
                options: [
                  {value: '', name: 'Default'},
                  ... contexts_w_white.map(function(v) { return {value: 'border border-'+v, name: _s.capitalize(v)} })
                ],
                label: 'Border color'
              },
              {
                type: 'class_select',
                options: [
                  {value: '', name: 'Default'},
                  {value: 'rounded', name: 'Rounded'},
                  {value: 'rounded-top', name: 'Rounded top'},
                  {value: 'rounded-right', name: 'Rounded right'},
                  {value: 'rounded-bottom', name: 'Rounded bottom'},
                  {value: 'rounded-left', name: 'Rounded left'},
                  {value: 'rounded-circle', name: 'Circle'},
                  {value: 'rounded-0', name: 'Square'},
                ],
                label: 'Border radius'
              },
              {
                type: 'text',
                label: 'ID',
                name: 'id',
                placeholder: 'my_element'
              },
              {
                type: 'text',
                label: 'Title',
                name: 'title',
                placeholder: 'My Element'
              }
            ] //.concat(defaultModel.prototype.defaults.traits)
          }),
          init() {
            const classes = this.get('classes');
            classes.bind('add', this.classesChanged.bind(this));
            classes.bind('change', this.classesChanged.bind(this));
            classes.bind('remove', this.classesChanged.bind(this));
            this.init2();
          },
          /* BS comps use init2, not init */
          init2() {},
          /* method where we can check if we should changeType */
          classesChanged() {},
          /* replace the comp with a copy of a different type */
          changeType(new_type) {
            const coll = this.collection;
            const at = coll.indexOf(this);
            const button_opts = {
              type: new_type,
              style: this.getStyle(),
              attributes: this.getAttributes(),
              content: this.view.el.innerHTML
            }
            coll.remove(this);
            coll.add(button_opts, { at });
            this.destroy();
          }
        }),
        view: defaultView
      });
      defaultType = domc.getType('default');
      defaultModel = defaultType.model;
      defaultView = defaultType.view;
    }

    // Rebuild the text component and add display utility setting
    if (blocks.text) {
      domc.addType('text', {
        model: defaultModel.extend({
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            'custom-name': 'Text',
            tagName: 'div',
            droppable: true,
            editable: true
          })
        }, {
          /*isComponent(el) {
            if(el && el.dataset && el.dataset.bsText) {
              return {type: 'text'};
            }
          }*/
        }),
        view: textView
      });
      textType = domc.getType('text');
      textModel = textType.model;
      textView = textType.view;
    }

    // Rebuild the link component with settings for collapse-control
    if (blocks.link) {
      domc.addType('link', {
        model: textModel.extend({
          defaults: Object.assign({}, textModel.prototype.defaults, {
            'custom-name': 'Link',
            tagName: 'a',
            droppable: true,
            editable: true,
            traits: [
              {
                type: 'text',
                label: 'Href',
                name: 'href',
                placeholder: 'https://www.grapesjs.com'
              },
              {
                type: 'select',
                options: [
                  {value: '', name: 'This window'},
                  {value: '_blank', name: 'New window'}
                ],
                label: 'Target',
                name: 'target',
              },
              {
                type: 'select',
                options: [
                  {value: '', name: 'None'},
                  {value: 'button', name: 'Self'},
                  {value: 'collapse', name: 'Collapse'},
                  {value: 'dropdown', name: 'Dropdown'}
                ],
                label: 'Toggles',
                name: 'data-toggle',
                changeProp: 1
              }
            ].concat(textModel.prototype.defaults.traits)
          }),
          init2() {
            //textModel.prototype.init.call(this);
            this.listenTo(this, 'change:data-toggle', this.setupToggle);
            this.listenTo(this, 'change:attributes', this.setupToggle); // for when href changes
          },
          setupToggle(a, b, options = {}) { // this should be in the dropdown comp and not the link comp
            if(options.ignore === true && options.force !== true) {
              return;
            }
            console.log('setup toggle');
            const attrs = this.getAttributes();
            const href = attrs.href;
            // old attributes are not removed from DOM even if deleted...
            delete attrs['data-toggle'];
            delete attrs['aria-expanded'];
            delete attrs['aria-controls'];
            delete attrs['aria-haspopup'];
            if(href && href.length > 0 && href.match(/^#/)) {
              console.log('link has href');
              // find the el where id == link href
              const els = this.em.get('Editor').DomComponents.getWrapper().find(href);
              if(els.length > 0) {
                console.log('referenced el found');
                var el = els[0]; // should only be one el with this ID
                const el_attrs = el.getAttributes();
                //delete el_attrs['aria-labelledby'];
                const el_classes = el_attrs.class;
                if(el_classes) {
                  console.log('el has classes');
                  const el_classes_list = el_classes.split(' ');
                  const intersection = _.intersection(['collapse','dropdown-menu'], el_classes_list);
                  if(intersection.length) {
                    console.log('link data-toggle matches el class');
                    switch(intersection[0]) {
                      case 'collapse':
                        attrs['data-toggle'] = 'collapse';
                        break;
                    }
                    attrs['aria-expanded'] = el_classes_list.includes('show');
                    if(intersection[0] == 'collapse') {
                      attrs['aria-controls'] = href.substring(1);
                    }
                  }
                }
              }
            }
            this.set('attributes', attrs, {ignore: true});
          },
          classesChanged(e) {
            console.log('classes changed');
            if(this.attributes.type == 'link') {
              if (this.attributes.classes.filter(function(klass) { return klass.id=='btn' }).length > 0) {
                this.changeType('button');
              }
            }
          }
        }, {
          isComponent(el) {
            if(el && el.tagName && el.tagName == 'A') {
              return {type: 'link'};
            }
          }
        }),
        view: linkView
      });
      linkType = domc.getType('link');
      linkModel = linkType.model;
      linkView = linkType.view;
    }

    if (blocks.image) {
      domc.addType('image', {
        model: defaultModel.extend({
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            'custom-name': 'Image',
            tagName: 'img',
            resizable: 1,
            attributes: {
              src: img_src_default
            },
            traits: [
              {
                type: 'text',
                label: 'Source (URL)',
                name: 'src'
              },
              {
                type: 'text',
                label: 'Alternate text',
                name: 'alt'
              }
            ].concat(defaultModel.prototype.defaults.traits)
          })
        }, {
          isComponent: function(el) {
            if(el && el.tagName == 'IMG') {
              return {type: 'image'};
            }
          }
        }),
        view: defaultView
      });
      imageType = domc.getType('image');
      imageModel = imageType.model;
      imageView = imageType.view;
    }


    // Basic

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

  // LAYOUT

  if (cats.layout) {

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
            ].concat(defaultModel.prototype.defaults.traits)
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

  }

  // Bootstrap COMPONENTS

  if (cats.components) {

    // Alert

    if (blocks.alert) {
      domc.addType('alert', {
        model: textModel.extend({
          defaults: Object.assign({}, textModel.prototype.defaults, {
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
            ].concat(textModel.prototype.defaults.traits)
          })
        }, {
          isComponent(el) {
            if(el && el.classList && el.classList.contains('alert')) {
              return {type: 'alert'};
            }
          }
        }),
        view: textView
      });
    }

    // Badge

    if (blocks.badge) {
      domc.addType('badge', {
        model: textModel.extend({
          defaults: Object.assign({}, textModel.prototype.defaults, {
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
            ].concat(textModel.prototype.defaults.traits)
          })
        }, {
          isComponent(el) {
            if(el && el.classList && el.classList.contains('badge')) {
              return {type: 'badge'};
            }
          }
        }),
        view: textView
      });
    }

    // Button

    if (blocks.button) {
      domc.addType('button', {
        model: linkModel.extend({
          defaults: Object.assign({}, linkModel.prototype.defaults, {
            'custom-name': 'Button',
            attributes: {
              role: 'button'
            },
            classes: ['btn'],
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
          }),
          /*init2() {
            linkModel.prototype.init2.call(this); // call parent init in this context.
          },*/
          afterChange(e) {
            if(this.attributes.type == 'button') {
              if (this.attributes.classes.filter(function(klass) { return klass.id=='btn' }).length == 0) {
                this.changeType('link');
              }
            }
          }
        }, {
          isComponent(el) {
            if(el && el.classList && el.classList.contains('btn')) {
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

    // Button toolbar

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

    // Card

    if (blocks.card) {
      domc.addType('card', {
        model: defaultModel.extend({
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            'custom-name': 'Card',
            classes: ['card'],
            traits: [
              {
                type: 'checkbox',
                label: 'Image Top',
                name: 'card-img-top',
                changeProp: 1
              },
              {
                type: 'checkbox',
                label: 'Header',
                name: 'card-header',
                changeProp: 1
              },
              {
                type: 'checkbox',
                label: 'Image',
                name: 'card-img',
                changeProp: 1
              },
              {
                type: 'checkbox',
                label: 'Image Overlay',
                name: 'card-img-overlay',
                changeProp: 1
              },
              {
                type: 'checkbox',
                label: 'Body',
                name: 'card-body',
                changeProp: 1
              },
              {
                type: 'checkbox',
                label: 'Footer',
                name: 'card-footer',
                changeProp: 1
              },
              {
                type: 'checkbox',
                label: 'Image Bottom',
                name: 'card-img-bottom',
                changeProp: 1
              }
            ].concat(defaultModel.prototype.defaults.traits)
          }),
          init2() {
            this.listenTo(this, 'change:card-img-top', this.cardImageTop);
            this.listenTo(this, 'change:card-header', this.cardHeader);
            this.listenTo(this, 'change:card-img', this.cardImage);
            this.listenTo(this, 'change:card-img-overlay', this.cardImageOverlay);
            this.listenTo(this, 'change:card-body', this.cardBody);
            this.listenTo(this, 'change:card-footer', this.cardFooter);
            this.listenTo(this, 'change:card-img-bottom', this.cardImageBottom);
            this.components().comparator = 'card-order';
            this.set('card-img-top', true);
            this.set('card-body', true);
          },
          cardImageTop() { this.createCardComponent('card-img-top'); },
          cardHeader() { this.createCardComponent('card-header'); },
          cardImage() { this.createCardComponent('card-img'); },
          cardImageOverlay() { this.createCardComponent('card-img-overlay'); },
          cardBody() { this.createCardComponent('card-body'); },
          cardFooter() { this.createCardComponent('card-footer'); },
          cardImageBottom() { this.createCardComponent('card-img-bottom'); },
          createCardComponent(prop) {
            const state = this.get(prop);
            const type = prop.replace(/-/g,'_').replace(/img/g,'image')
            let children = this.components();
            let existing = children.filter(function(comp) {
              return comp.attributes.type == type;
            })[0]; // should only be one of each.

            if(state && !existing) {
              var comp = children.add({
                type: type
              });
              let comp_children = comp.components();
              if(prop=='card-header') {
                comp_children.add({
                  type: 'header',
                  tagName: 'h4',
                  style: { 'margin-bottom': '0px' },
                  content: 'Card Header'
                });
              }
              if(prop=='card-img-overlay') {
                comp_children.add({
                  type: 'header',
                  tagName: 'h4',
                  classes: ['card-title'],
                  content: 'Card title'
                });
                comp_children.add({
                  type: 'text',
                  tagName: 'p',
                  classes: ['card-text'],
                  content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                });
              }
              if(prop=='card-body') {
                comp_children.add({
                  type: 'header',
                  tagName: 'h4',
                  classes: ['card-title'],
                  content: 'Card title'
                });
                comp_children.add({
                  type: 'header',
                  tagName: 'h6',
                  classes: ['card-subtitle', 'text-muted', 'mb-2'],
                  content: 'Card subtitle'
                });
                comp_children.add({
                  type: 'text',
                  tagName: 'p',
                  classes: ['card-text'],
                  content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                });
                comp_children.add({
                  type: 'link',
                  classes: ['card-link'],
                  href: '#',
                  content: 'Card link'
                });
                comp_children.add({
                  type: 'link',
                  classes: ['card-link'],
                  href: '#',
                  content: 'Another link'
                });
              }
              this.order();
            } else if (!state) {
              existing.destroy();
            }
          },
          order() {
            
          }
        }, {
          isComponent(el) {
            if(el && el.classList && el.classList.contains('card')) {
              return {type: 'card'};
            }
          }
        }),
        view: defaultView
      });

      domc.addType('card_image_top', {
        model: imageModel.extend({
          defaults: Object.assign({}, imageModel.prototype.defaults, {
            'custom-name': 'Card Image Top',
            classes: ['card-img-top'],
            'card-order': 1
          })
        }, {
          isComponent(el) {
            if(el && el.classList && el.classList.contains('card-img-top')) {
              return {type: 'card_image_top'};
            }
          }
        }),
        view: imageView
      });

      domc.addType('card_header', {
        model: defaultModel.extend({
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            'custom-name': 'Card Header',
            classes: ['card-header'],
            'card-order': 2
          })
        }, {
          isComponent(el) {
            if(el && el.classList && el.classList.contains('card-header')) {
              return {type: 'card_header'};
            }
          }
        }),
        view: defaultView
      });

      domc.addType('card_image', {
        model: imageModel.extend({
          defaults: Object.assign({}, imageModel.prototype.defaults, {
            'custom-name': 'Card Image',
            classes: ['card-img'],
            'card-order': 3
          })
        }, {
          isComponent(el) {
            if(el && el.classList && el.classList.contains('card-img')) {
              return {type: 'card_image'};
            }
          }
        }),
        view: imageView
      });

      domc.addType('card_image_overlay', {
        model: defaultModel.extend({
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            'custom-name': 'Card Image Overlay',
            classes: ['card-img-overlay'],
            'card-order': 4
          })
        }, {
          isComponent(el) {
            if(el && el.classList && el.classList.contains('card-img-overlay')) {
              return {type: 'card_image_overlay'};
            }
          }
        }),
        view: defaultView
      });

      domc.addType('card_body', {
        model: defaultModel.extend({
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            'custom-name': 'Card Body',
            classes: ['card-body'],
            'card-order': 5
          })
        }, {
          isComponent(el) {
            if(el && el.classList && el.classList.contains('card-body')) {
              return {type: 'card_body'};
            }
          }
        }),
        view: defaultView
      });

      domc.addType('card_footer', {
        model: defaultModel.extend({
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            'custom-name': 'Card Footer',
            classes: ['card-footer'],
            'card-order': 6
          })
        }, {
          isComponent(el) {
            if(el && el.classList && el.classList.contains('card-footer')) {
              return {type: 'card_footer'};
            }
          }
        }),
        view: defaultView
      });

      domc.addType('card_image_bottom', {
        model: imageModel.extend({
          defaults: Object.assign({}, imageModel.prototype.defaults, {
            'custom-name': 'Card Image Bottom',
            classes: ['card-img-bottom'],
            'card-order': 7
          })
        }, {
          isComponent(el) {
            if(el && el.classList && el.classList.contains('card-img-bottom')) {
              return {type: 'card_image_bottom'};
            }
          }
        }),
        view: imageView
      });

      domc.addType('card_container', {
        model: defaultModel.extend({
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            'custom-name': 'Card Container',
            classes: ['card-group'],
            droppable: '.card',
            traits: [
              {
                type: 'class_select',
                options: [
                  {value: 'card-group', name: 'Group'},
                  {value: 'card-deck', name: 'Deck'},
                  {value: 'card-columns', name: 'Columns'},
                ],
                label: 'Layout',
              }
            ].concat(defaultModel.prototype.defaults.traits)
          })
        }, {
          isComponent(el) {
            if(el && el.classList && _.intersection(el.classList, ['card-group','card-deck','card-columns']).length) {
              return {type: 'card_container'};
            }
          }
        }),
        view: defaultView
      });

    }

    // Collapse

    if (blocks.collapse) {
      loadCollapse(editor, config);
    }

    // Dropdown

    if (blocks.dropdown) {
      loadDropdown(editor, config);
    }

  }

  // TYPOGRAPHY

  if (cats.typography) {

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
              },
              {
                type: 'class_select',
                options: [
                  {value: '', name: 'None'},
                  {value: 'display-1', name: 'One (largest)'},
                  {value: 'display-2', name: 'Two '},
                  {value: 'display-3', name: 'Three '},
                  {value: 'display-4', name: 'Four (smallest)'}
                ],
                label: 'Display Heading'
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

    if (blocks.paragraph) {
      domc.addType('paragraph', {
        model: textModel.extend({
          defaults: Object.assign({}, textModel.prototype.defaults, {
            'custom-name': 'Paragraph',
            tagName: 'p',
            traits: [
              {
                type: 'class_select',
                options: [
                  {value: '', name: 'No'},
                  {value: 'lead', name: 'Yes'}
                ],
                label: 'Lead?'
              }
            ].concat(textModel.prototype.defaults.traits)
          })
        }, {
          isComponent(el) {
            if(el && el.tagName && el.tagName == 'P') {
              return {type: 'paragraph'};
            }
          }
        }),
        view: textView
      });
    }

  }

}
