import paragraphIcon from "raw-loader!../icons/paragraph-solid.svg";

export const ParagraphBlock = (bm, label) => {
    bm.add('paragraph', {
        label: `
            ${paragraphIcon}
            <div>${label}</div>
        `,
        category: 'Typography',
        content: {
            type: 'paragraph',
            content: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.'
        }
    });
};

export default (domc) => {
    const textType = domc.getType('text');
    const textModel = textType.model;
    const textView = textType.view;

    domc.addType('paragraph', {
        model: textModel.extend({
            defaults: Object.assign({}, textModel.prototype.defaults, {
                'custom-name': 'Paragraph',
                tagName: 'p',
                traits: [
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'No'},
                            {value: 'lead', name: 'Yes'}
                        ],
                        label: 'Lead?'
                    }
                ].concat(textModel.prototype.defaults.traits)
            })
        }, {
            isComponent(el) {
                if(el && el.tagName && el.tagName === 'P') {
                    return {type: 'paragraph'};
                }
            }
        }),
        view: textView
    });
}
