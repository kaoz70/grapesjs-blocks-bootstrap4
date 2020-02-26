/*
known issues:
*/

import _ from 'underscore';
import cardIcon from "raw-loader!../icons/credit-card-solid.svg";

export const CardBlock = (bm, c) => {
  bm.add('card', {
    label: `
            ${cardIcon}
            <div>${c.labels.card}</div>
        `,
    category: 'Components',
    content: {
      type: 'card'
    }
  });
  bm.add('card_container', {
    label: `
            ${cardIcon}
            <div>${c.labels.card_container}</div>
        `,
    category: 'Components',
    content: {
      type: 'card_container'
    }
  });
};

export default (domc, editor) => {
  const comps = editor.DomComponents;
  const defaultType = comps.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const imageType = domc.getType('image');
  const imageModel = imageType.model;
  const imageView = imageType.view;

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
          return comp.attributes.type === type;
        })[0]; // should only be one of each.

        if(state && !existing) {
          var comp = children.add({
            type: type
          });
          let comp_children = comp.components();
          if(prop === 'card-header') {
            comp_children.add({
              type: 'header',
              tagName: 'h4',
              style: { 'margin-bottom': '0px' },
              content: 'Card Header'
            });
          }
          if(prop === 'card-img-overlay') {
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
          if(prop === 'card-body') {
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
