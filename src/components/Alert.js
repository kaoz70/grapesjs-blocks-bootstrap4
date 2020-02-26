import _s from "underscore.string";
import contexts from '../bootstrap-contexts';

export default (domc) => {
    const textType = domc.getType('text');
    const textModel = textType.model;
    const textView = textType.view;

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
