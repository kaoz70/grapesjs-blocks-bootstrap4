import windowIcon from "raw-loader!../icons/window-maximize-solid.svg";

export const RowBlock = (bm, label) => {
    bm.add('row').set({
        label: `
            ${windowIcon}
            <div>${label}</div>
        `,
        category: 'Layout',
        content: {
            type: 'row',
            classes: ['row']
        }
    });
};

export default (domc) => {
    const defaultType = domc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    domc.addType('row', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                'custom-name': 'Row',
                tagName: 'div',
                draggable: '.container, .container-fluid',
                droppable: true,
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
