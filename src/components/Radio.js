export default (dc, traits, config = {}) => {
    const checkType = dc.getType('checkbox');

    // RADIO
    dc.addType('radio', {
        model: checkType.model.extend({
            defaults: {
                ...checkType.model.prototype.defaults,
                'custom-name': config.labels.radio,
                attributes: {type: 'radio'},
            },
        }, {
            isComponent(el) {
                if(el.tagName === 'INPUT' && el.type === 'radio'){
                    return {type: 'radio'};
                }
            },
        }),
        view: checkType.view,
    });
}
