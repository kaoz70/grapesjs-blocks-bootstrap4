import equalsIcon from "raw-loader!../icons/equals-solid.svg";

export const ColumnBreakBlock = (bm, label) => {
    bm.add('column_break').set({
        label: `
            ${equalsIcon}
            <div>${label}</div>
        `,
        category: 'Layout',
        content: {
            type: 'column_break'
        }
    });
};

export default (domc) => {
    const defaultType = domc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    domc.addType('column_break', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                'custom-name': 'Column Break',
                tagName: 'div',
                classes: ['w-100']
            })
        }, {
            isComponent(el) {
                if(el && el.classList && el.classList.contains('w-100')) { // also check if parent is `.row`
                    return {type: 'column_break'};
                }
            }
        }),
        view: defaultView
    });
}
