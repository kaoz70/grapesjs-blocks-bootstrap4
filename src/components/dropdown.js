import _ from 'underscore';
import _s from 'underscore.string';

export default (editor, config = {}) => {
  const comps = editor.DomComponents;
  const defaultType = comps.getType('default');
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
        window.asdf = this;
        const toggle = {
          type: 'button',
          content: 'Click to toggle',
          classes: ['btn', 'dropdown-toggle']
        }
        const toggle_comp = this.append(toggle)[0];
        const menu = {
          type: 'dropdown_menu'
        }
        const menu_comp = this.append(menu);
        this.setupToggle(null, null, {force: true});
        this.listenTo(toggle_comp, 'change:attributes', this.setupToggle); // for when id changes, can event name be more specific?
        // also setup toggle on menu changed
        // also setup toggle on children changed
      },
      setupToggle(a, b, options) {
        const toggle = this.components().filter(c => c.getAttributes().class.split(' ').includes('dropdown-toggle'))[0];
        // raise error if toggle not found
        const menu = this.components().filter(c => c.getAttributes().class.split(' ').includes('dropdown-menu'))[0];
        // raise error if menu not found

        /*var toggle_id_changed = false;
        if(a && b) {
          toggle_id_changed = a.previous('attributes').id != b.id;
        }*/
        //if(options.force !== true && (options.ignore === true || !toggle_id_changed)) {

        if(options.force !== true && options.ignore === true) {
          return;
        }

        if(toggle && menu) {
          // setup toggle
          var toggle_attrs = toggle.getAttributes();
          toggle_attrs['role'] = 'button'; // if A
          var menu_attrs = menu.getAttributes();
          if(toggle_attrs.hasOwnProperty('data-toggle')) {
            toggle_attrs['data-toggle'] = 'dropdown';
          }
          if(!toggle_attrs.hasOwnProperty('data-toggle')) {
            toggle_attrs['data-toggle'] = 'dropdown';
          }
          if(!toggle_attrs.hasOwnProperty('aria-haspopup')) {
            toggle_attrs['aria-haspopup'] = true;
          }
          const menu_classes = menu_attrs.class.split(' ');
          toggle_attrs['aria-expanded'] = menu_classes.includes('show');
          toggle.set('attributes', toggle_attrs, {ignore: true});
          // setup menu
          // toggle needs ID for aria-labelled on the menu, could alert here
          if(toggle_attrs.hasOwnProperty('id')) {
            menu_attrs['aria-labelledby'] = toggle_attrs.id;
          } else {
            delete menu_attrs['aria-labelledby'];
          }
          menu.setAttributes(menu_attrs);
        }
      }
    }, {
      isComponent(el) {
        if(el && el.classList && el.classList.contains('dropdown')) {
          return {type: 'dropdown'};
        }
      }
    }),
    view: defaultView.extend({
      /*init() {
        this.model.setupToggle
      }*/
    })
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
