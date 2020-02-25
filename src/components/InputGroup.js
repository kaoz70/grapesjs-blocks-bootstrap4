export default (dc, traits, config = {}) => {
    const defaultType = dc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    dc.addType('input_group', {
        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                'custom-name': config.labels.input_group,
                tagName: 'div',
                traits: [],
            },
        }, {
            isComponent(el) {
                if(el && el.classList && el.classList.contains('form_group_input')) {
                    return {type: 'form_group_input'};
                }
            },
        }),
        view: defaultView,
    });
}
