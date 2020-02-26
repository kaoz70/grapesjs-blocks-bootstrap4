/*
known issues:
- BS dropdown JS isn't attached if you remove the existing toggle and add a new one
*/

import caretIcon from "raw-loader!../icons/caret-square-down-regular.svg";

export const DropDownBlock = (bm, label) => {
    bm.add('dropdown', {
        label: `
            ${caretIcon}
            <div>${label}</div>
        `,
        category: 'Components',
        content: {
            type: 'dropdown'
        }
    });
    /*bm.add('dropdown_menu', {
      label: c.labels.dropdown_menu,
      category: 'Components',
      attributes: {class:'fa fa-caret-down'},
      content: {
        type: 'dropdown_menu'
      }
    });
    bm.add('dropdown_item', {
      label: c.labels.dropdown_item,
      category: 'Components',
      attributes: {class:'fa fa-link'},
      content: {
        type: 'dropdown_item'
      }
    });*/
};

export default (editor) => {
    const comps = editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    function hasEvent(comp) {
        let eca = comp._events['change:attributes'];
        if (!eca) return false;
        return eca.filter(e => e.callback.name === 'setupToggle').length !== 0;
    }

    comps.addType('dropdown', {
        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                'custom-name': 'Dropdown',
                classes: ['dropdown'],
                droppable: 'a, button, .dropdown-menu',
                traits: [
                    {
                        type: 'select',
                        label: 'Initial state',
                        name: 'initial_state',
                        options: [
                            {value: '', name: 'Closed'},
                            {value: 'show', name: 'Open'}
                        ],
                    }
                ].concat(defaultModel.prototype.defaults.traits),
            },

            init2() {
                const toggle = {
                    type: 'button',
                    content: 'Click to toggle',
                    classes: ['btn', 'dropdown-toggle']
                };
                const toggle_comp = this.append(toggle)[0];
                const menu = {
                    type: 'dropdown_menu'
                };
                const menu_comp = this.append(menu)[0];
                this.setupToggle(null, null, {force: true});
                const comps = this.components();
                comps.bind('add', this.setupToggle.bind(this));
                comps.bind('remove', this.setupToggle.bind(this));
                const classes = this.get('classes');
                classes.bind('add', this.setupToggle.bind(this));
                classes.bind('change', this.setupToggle.bind(this));
                classes.bind('remove', this.setupToggle.bind(this));
            },

            setupToggle(a, b, options = {}) {
                const toggle = this.components().filter(c => c.getAttributes().class.split(' ').includes('dropdown-toggle'))[0];
                const menu = this.components().filter(c => c.getAttributes().class.split(' ').includes('dropdown-menu'))[0];

                if (options.force !== true && options.ignore === true) {
                    return;
                }

                if (toggle && menu) {

                    // setup event listeners if they aren't set
                    if (!hasEvent(toggle)) {
                        this.listenTo(toggle, 'change:attributes', this.setupToggle);
                    }
                    if (!hasEvent(menu)) {
                        this.listenTo(menu, 'change:attributes', this.setupToggle);
                    }

                    // setup toggle
                    const toggle_attrs = toggle.getAttributes();
                    toggle_attrs['role'] = 'button';
                    const menu_attrs = menu.getAttributes();
                    if (!toggle_attrs.hasOwnProperty('data-toggle')) {
                        toggle_attrs['data-toggle'] = 'dropdown';
                    }
                    if (!toggle_attrs.hasOwnProperty('aria-haspopup')) {
                        toggle_attrs['aria-haspopup'] = true;
                    }

                    toggle.set('attributes', toggle_attrs, {ignore: true});

                    // setup menu
                    // toggle needs ID for aria-labelled on the menu, could alert here
                    if (toggle_attrs.hasOwnProperty('id')) {
                        menu_attrs['aria-labelledby'] = toggle_attrs.id;
                    } else {
                        delete menu_attrs['aria-labelledby'];
                    }
                    menu.set('attributes', menu_attrs, {ignore: true});
                }
            },

            updated(property, value) {
                if(value.hasOwnProperty('initial_state')) {
                    const menu = this.components().filter(c => c.getAttributes().class.split(' ').includes('dropdown-menu'))[0];
                    const attrs = menu.getAttributes();
                    const classes = attrs.class.split(' ');

                    if(classes.includes('show')) {
                        // Close the menu
                        attrs['aria-expanded'] = false;
                        menu.removeClass('show');
                    } else {
                        // Open the menu
                        attrs['aria-expanded'] = true;
                        menu.addClass('show');
                    }
                }
            },

        }, {
            isComponent(el) {
                if (el && el.classList && el.classList.contains('dropdown')) {
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
                };
                const link = {
                    type: 'link',
                    classes: ['dropdown-item'],
                    content: 'Dropdown item'
                };
                const divider = {
                    type: 'default',
                    classes: ['dropdown-divider']
                };
                this.append(header);
                this.append(link);
                this.append(divider);
                this.append(link);
            }
        }, {
            isComponent(el) {
                if (el && el.classList && el.classList.contains('dropdown-menu')) {
                    return {type: 'dropdown_menu'};
                }
            }
        }),
        view: defaultView,
    });

}
