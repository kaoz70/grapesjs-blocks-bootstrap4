import _ from 'underscore';
import _s from 'underscore.string';

export default (editor, config = {}) => {
  const comps = editor.DomComponents;
  const defaultType = comps.getType('bs4_default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;


  comps.addType('dropdown', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Dropdown',
        classes: ['dropdown'],
        droppable: 'a, button, .dropdown-menu'
      }),
      init2() {
        const toggle = {
          type: 'button',
          content: 'Click to toggle',
          classes: ['btn', 'dropdown-toggle']
        }
        this.append(toggle);
        const menu = {
          type: 'dropdown_menu'
        }
        this.append(menu);
      },
      setup() {
        const toggle = this.find('.dropdown-toggle');
        // raise error if toggle not found
        const menu = this.find('.dropdown-menu');
        // raise error if menu not found
        // toggle needs ID, get it or set if empty
        var toggle_attrs = toggle.getAttributes();
        var menu_attrs = menu.getAttributes();
      }
    }, {
      isComponent(el) {
        if(el && el.classList && el.classList.contains('dropdown')) {
          return {type: 'dropdown'};
        }
      }
    }),
    view: defaultView
  });

  // need aria-labelledby to equal dropdown-toggle id
  // need to insert dropdown-item class on links when added
  comps.addType('dropdown_menu', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'Dropdown Menu',
        classes: ['dropdown-menu'],
        draggable: '.dropdown',
        droppable: true
      }),
      init2() {
        const header = {
          type: 'header',
          tagName: 'h6',
          classes: ['dropdown-header'],
          content: 'Dropdown header'
        }
        const link = {
          type: 'link',
          classes: ['dropdown-item'],
          content: 'Dropdown item'
        }
        const divider = {
          type: 'default',
          classes: ['dropdown-divider']
        }
        this.append(header);
        this.append(link);
        this.append(divider);
        this.append(link);
      }
    }, {
      isComponent(el) {
        if(el && el.classList && el.classList.contains('dropdown-menu')) {
          return {type: 'dropdown_menu'};
        }
      }
    }),
    view: defaultView
  });

}
