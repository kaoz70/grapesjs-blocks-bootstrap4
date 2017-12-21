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

  // Select trait that maps a class list to the select options.
  // The default select option is set if the input has a class, and class list is modified when select value changes.
  editor.TraitManager.addType('class_select', {
    events:{
      'change': 'onChange',  // trigger parent onChange method on keyup
    },

    getInputEl: function() {
      if (!this.inputEl) {
        var md = this.model;
        var opts = md.get('options') || [];
        var input = document.createElement('select');
        var target = this.target;
        var target_view_el = this.target.view.el;
        for(let i = 0; i < opts.length; i++) {
          let name = opts[i].name;
          let value = opts[i].value;
          let option = document.createElement('option');
          option.text = name;
          option.value = value;
          if(target_view_el.classList.contains(value)) {
            option.setAttribute('selected', 'selected');
          }
          input.append(option);
        }
        this.inputEl = input;
      }
      return this.inputEl;
    },

    onValueChange: function () {
      var classes = this.model.get('options').map(opt => opt.value);
      for(let i = 0; i < classes.length; i++) {
        this.target.removeClass(classes[i]);
      }
      const value = this.model.get('value');
      if(value.length) {
        this.target.addClass(value);
      }
      this.target.em.trigger('change:selectedComponent');
    }
  });

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

  if (blocks.row) {
    domc.addType('row', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Row',
          tagName: 'div',
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

  if (blocks.column) {
    domc.addType('column', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          'custom-name': 'Column',
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
          if(el && el.classList && el.classList.contains('w-100')) {
            return {type: 'column_break'};
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


}
