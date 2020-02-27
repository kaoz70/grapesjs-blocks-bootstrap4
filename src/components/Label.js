import labelIcon from "raw-loader!../icons/label.svg";

export const LabelBlock = (bm, label) => {
    bm.add('label', {
        label: `
      ${labelIcon}
      <div>${label}</div>`,
        category: 'Forms',
        content: '<label>Label</label>',
    });
};

export default (dc, traits, config = {}) => {

    const textType = dc.getType('text');
    const textModel = textType.model;
    const textView = textType.view;

    dc.addType('label', {
        model: textModel.extend({
            defaults: {
                ...textModel.prototype.defaults,
                'custom-name': config.labels.label,
                tagName: 'label',
                traits: [traits.for],
            },
        }, {
            isComponent(el) {
                if(el.tagName == 'LABEL'){
                    return {type: 'label'};
                }
            },
        }),
        view: textView,
    });
}
