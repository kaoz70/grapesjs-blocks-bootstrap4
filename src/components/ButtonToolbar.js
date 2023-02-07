import buttonIcon from "raw-loader!../icons/button.svg";

export const ButtonToolbarBlock = (bm, label) => {
    bm.add('button_toolbar', {
        label: `
            ${buttonIcon}
            <div>${label}</div>
        `,
        category: 'Forms',
        content: {
            type: 'button_toolbar'
        }
    });
};

export default (dc) => {

    const defaultType = dc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    dc.addType('button_toolbar', {
        model: {
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                'custom-name': 'Button Toolbar',
                tagName: 'div',
                classes: ['btn-toolbar'],
                droppable: '.btn-group',
                attributes: {
                    role: 'toolbar'
                },
                traits: [
                    {
                        type: 'Text',
                        label: 'ARIA Label',
                        name: 'aria-label',
                        placeholder: 'A toolbar of button groups'
                    }
                ].concat(defaultModel.prototype.defaults.traits)
            })
        },
        isComponent(el) {
            if (el && el.classList && el.classList.contains('btn-toolbar')) {
                return { type: 'button_toolbar' };
            }
        },
        view: defaultView
    });
}
