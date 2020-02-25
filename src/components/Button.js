import _s from "underscore.string";

export default (dc, traits, contexts, sizes, config = {}) => {

    const linkType = dc.getType('link');
    const linkModel = linkType.model;
    const linkView = linkType.view;

    dc.addType('button', {
        model: linkModel.extend({
            defaults: Object.assign({}, linkModel.prototype.defaults, {
                'custom-name': 'Button',
                droppable: false,
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
