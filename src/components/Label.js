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
