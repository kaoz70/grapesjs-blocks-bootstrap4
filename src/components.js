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
          traits: [
            {
              type: 'select',
              options: [
                {value: '0', name: 'None'},
                {value: '1', name: 'One (largest)'},
                {value: '2', name: 'Two '},
                {value: '3', name: 'Three '},
                {value: '4', name: 'Four (smallest)'}
              ],
              label: 'Display Heading',
              name: 'display-heading-size',
              changeProp: 1
            }
          ].concat(textModel.prototype.defaults.traits)
        }),
        init() {
          this.listenTo(this, 'change:display-heading-size', this.changeDisplayHeadingClass);
        },
        changeDisplayHeadingClass() {
          const size = this.get('display-heading-size');
          this.removeClass(['display-1', 'display-2', 'display-3', 'display-4']);
          if(['1','2','3','4'].includes(size)) {
            this.addClass(`display-${size}`);
          }
          this.em.trigger('change:selectedComponent');
        },
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
          traits: [
            {
              type: 'select',
              options: [
                {value: 'fixed', name: 'Fixed'},
                {value: 'fluid', name: 'Fluid'}
              ],
              label: 'Width',
              name: 'container-width',
              changeProp: 1
            }
          ].concat(defaultModel.prototype.defaults.traits)
        }),
        init() {
          this.listenTo(this, 'change:container-width', this.changeContainerWidthClass);
        },
        changeContainerWidthClass() {
          this.removeClass(['container', 'container-fluid']);
          const width = this.get('container-width');
          if(width=='fixed') this.addClass('container');
          if(width=='fluid') this.addClass('container-fluid');
        }
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

  if (blocks.row) {
    domc.addType('row', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Row',
          tagName: 'div'
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

  if (blocks.column) {
    domc.addType('column', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Column',
          traits: [
            {
              type: 'select',
              options: [
                {value: 'col', name: 'Equal'},
                {value: 'col-auto', name: 'Variable'},
                {value: 'col-1', name: '1/12'}, {value: 'col-2', name: '2/12'}, {value: 'col-3', name: '3/12'},
                {value: 'col-4', name: '4/12'}, {value: 'col-5', name: '5/12'}, {value: 'col-6', name: '6/12'},
                {value: 'col-7', name: '7/12'}, {value: 'col-8', name: '8/12'}, {value: 'col-9', name: '9/12'},
                {value: 'col-10', name: '10/12'}, {value: 'col-11', name: '11/12'}, {value: 'col-12', name: '12/12'}
              ],
              label: 'XS Width',
              name: 'xs-class',
              changeProp: 1
            },
            {
              type: 'select',
              options: [
                {value: '', name: 'None'},
                {value: 'col-sm', name: 'Equal'},
                {value: 'col-sm-auto', name: 'Variable'},
                {value: 'col-sm-1', name: '1/12'}, {value: 'col-sm-2', name: '2/12'}, {value: 'col-sm-3', name: '3/12'},
                {value: 'col-sm-4', name: '4/12'}, {value: 'col-sm-5', name: '5/12'}, {value: 'col-sm-6', name: '6/12'},
                {value: 'col-sm-7', name: '7/12'}, {value: 'col-sm-8', name: '8/12'}, {value: 'col-sm-9', name: '9/12'},
                {value: 'col-sm-10', name: '10/12'}, {value: 'col-sm-11', name: '11/12'}, {value: 'col-sm-12', name: '12/12'}
              ],
              label: 'SM Width',
              name: 'sm-class',
              changeProp: 1
            },
            {
              type: 'select',
              options: [
                {value: '', name: 'None'},
                {value: 'col-md', name: 'Equal'},
                {value: 'col-md-auto', name: 'Variable'},
                {value: 'col-md-1', name: '1/12'}, {value: 'col-md-2', name: '2/12'}, {value: 'col-md-3', name: '3/12'},
                {value: 'col-md-4', name: '4/12'}, {value: 'col-md-5', name: '5/12'}, {value: 'col-md-6', name: '6/12'},
                {value: 'col-md-7', name: '7/12'}, {value: 'col-md-8', name: '8/12'}, {value: 'col-md-9', name: '9/12'},
                {value: 'col-md-10', name: '10/12'}, {value: 'col-md-11', name: '11/12'}, {value: 'col-md-12', name: '12/12'}
              ],
              label: 'MD Width',
              name: 'md-class',
              changeProp: 1
            },
            {
              type: 'select',
              options: [
                {value: '', name: 'None'},
                {value: 'col-lg', name: 'Equal'},
                {value: 'col-lg-auto', name: 'Variable'},
                {value: 'col-lg-1', name: '1/12'}, {value: 'col-lg-2', name: '2/12'}, {value: 'col-lg-3', name: '3/12'},
                {value: 'col-lg-4', name: '4/12'}, {value: 'col-lg-5', name: '5/12'}, {value: 'col-lg-6', name: '6/12'},
                {value: 'col-lg-7', name: '7/12'}, {value: 'col-lg-8', name: '8/12'}, {value: 'col-lg-9', name: '9/12'},
                {value: 'col-lg-10', name: '10/12'}, {value: 'col-lg-11', name: '11/12'}, {value: 'col-lg-12', name: '12/12'}
              ],
              label: 'LG Width',
              name: 'lg-class',
              changeProp: 1
            },
            {
              type: 'select',
              options: [
                {value: '', name: 'None'},
                {value: 'col-xl', name: 'Equal'},
                {value: 'col-xl-auto', name: 'Variable'},
                {value: 'col-xl-1', name: '1/12'}, {value: 'col-xl-2', name: '2/12'}, {value: 'col-xl-3', name: '3/12'},
                {value: 'col-xl-4', name: '4/12'}, {value: 'col-xl-5', name: '5/12'}, {value: 'col-xl-6', name: '6/12'},
                {value: 'col-xl-7', name: '7/12'}, {value: 'col-xl-8', name: '8/12'}, {value: 'col-xl-9', name: '9/12'},
                {value: 'col-xl-10', name: '10/12'}, {value: 'col-xl-11', name: '11/12'}, {value: 'col-xl-12', name: '12/12'}
              ],
              label: 'XL Width',
              name: 'xl-class',
              changeProp: 1
            },
          ]
        }),
        init: function() {
          this.listenTo(this, 'change:xs-class', this.changeXsClass);
          this.listenTo(this, 'change:sm-class', this.changeSmClass);
          this.listenTo(this, 'change:md-class', this.changeMdClass);
          this.listenTo(this, 'change:lg-class', this.changeLgClass);
          this.listenTo(this, 'change:xl-class', this.changeXlClass);
        },

        changeXsClass: function() {
          var class_to_add = this.get('xs-class');
          var class_pattern_to_remove = /^col(-auto|-\d{1,2})?$/;
          this.changeColClass(class_to_add, class_pattern_to_remove);
        },
      
        changeSmClass: function() {
          var class_to_add = this.get('sm-class');
          var class_pattern_to_remove = /^col-sm(-auto|-\d{1,2})?$/;
          this.changeColClass(class_to_add, class_pattern_to_remove);
        },
      
        changeMdClass: function() {
          var class_to_add = this.get('md-class');
          var class_pattern_to_remove = /^col-md(-auto|-\d{1,2})?$/;
          this.changeColClass(class_to_add, class_pattern_to_remove);
        },
      
        changeLgClass: function() {
          var class_to_add = this.get('lg-class');
          var class_pattern_to_remove = /^col-lg(-auto|-\d{1,2})?$/;
          this.changeColClass(class_to_add, class_pattern_to_remove);
        },
      
        changeXlClass: function() {
          var class_to_add = this.get('xl-class');
          var class_pattern_to_remove = /^col-xl(-auto|-\d{1,2})?$/;
          this.changeColClass(class_to_add, class_pattern_to_remove);
        },
      
        changeColClass: function(class_to_add, class_pattern_to_remove) {
          var classes = this.get('classes');

          classes.forEach(function(element) {
            if(element && element.id.match(class_pattern_to_remove)) {
              classes.remove(element);
            }
          });

          var sm = this.sm.get('SelectorManager');

          if(class_to_add.length) {
            var class_obj = sm.add(class_to_add)
            classes.add(class_obj);
          }

          this.em.trigger('change:selectedComponent');
        }
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


}
