/*
known issues:
- BS dropdown JS isn't attached if you remove the existing toggle and add a new one
*/

export default (editor, config = {}) => {
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
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                'custom-name': 'Dropdown',
                classes: ['dropdown'],
                droppable: 'a, button, .dropdown-menu',
                traits: [
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Closed'},
                            {value: 'show', name: 'Open'}
                        ],
                        label: 'Initial state'
                    }
                ].concat(defaultModel.prototype.defaults.traits)
            }),
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
                //comps.bind('change', this.setupToggle.bind(this)); //FIXME commented out because it was crashing the page, why do wee need this here?
                comps.bind('remove', this.setupToggle.bind(this));
                const classes = this.get('classes');
                classes.bind('add', this.setupToggle.bind(this));
                classes.bind('change', this.setupToggle.bind(this));
                classes.bind('remove', this.setupToggle.bind(this));
            },

            setupToggle(a, b, options = {}) {
                const toggle = this.components().filter(c => c.getAttributes().class.split(' ').includes('dropdown-toggle'))[0];
                // raise error if toggle not found
                const menu = this.components().filter(c => c.getAttributes().class.split(' ').includes('dropdown-menu'))[0];
                // raise error if menu not found

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
                    var toggle_attrs = toggle.getAttributes();
                    toggle_attrs['role'] = 'button'; // if A
                    var menu_attrs = menu.getAttributes();
                    if (!toggle_attrs.hasOwnProperty('data-toggle')) {
                        toggle_attrs['data-toggle'] = 'dropdown';
                    }
                    if (!toggle_attrs.hasOwnProperty('aria-haspopup')) {
                        toggle_attrs['aria-haspopup'] = true;
                    }

                    const dropdown_classes = this.getAttributes().class.split(' ');
                    toggle_attrs['aria-expanded'] = dropdown_classes.includes('show');
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
            }
        }, {
            isComponent(el) {
                if (el && el.classList && el.classList.contains('dropdown')) {
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
        view: defaultView
    });

}
