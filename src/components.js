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
                {value: 'h2', name: 'Two '},
                {value: 'h3', name: 'Three '},
                {value: 'h4', name: 'Four '},
                {value: 'h5', name: 'Five '},
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
