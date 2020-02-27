import sizes from '../bootstrap-btn-sizes';
import buttonIcon from "raw-loader!../icons/button.svg";

export const ButtonGroupBlock = (bm, label) => {
    bm.add('button_group', {
        label: `
            ${buttonIcon}
            <div>${label}</div>
        `,
        category: 'Forms',
        content: {
            type: 'button_group'
        }
    });
};

export default (dc) => {

    const defaultType = dc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    dc.addType('button_group', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                'custom-name': 'Button Group',
                tagName: 'div',
                classes: ['btn-group'],
                droppable: '.btn',
                attributes: {
                    role: 'group'
                },
                traits: [
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            ... Object.keys(sizes).map(function(k) { return {value: 'btn-group-'+k, name: sizes[k]} })
                        ],
                        label: 'Size'
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Horizontal'},
                            {value: 'btn-group-vertical', name: 'Vertical'},
                        ],
                        label: 'Size'
                    },
                    {
                        type: 'Text',
                        label: 'ARIA Label',
                        name: 'aria-label',
                        placeholder: 'A group of buttons'
                    }
                ].concat(defaultModel.prototype.defaults.traits)
            })
        }, {
            isComponent(el) {
                if(el && el.classList && el.classList.contains('btn-group')) {
                    return {type: 'button_group'};
                }
            }
        }),
        view: defaultView
    });
}
