export default (dc, traits, config = {}) => {
    const defaultType = dc.getType('default');
    const defaultModel = defaultType.model;
    const inputType = dc.getType('input');
    const inputModel = inputType.model;

    const preventDefaultClick = () => {
        return defaultType.view.extend({
            events: {
                'mousedown': 'handleClick',
            },

            handleClick(e) {
                e.preventDefault();
            },
        });
    };

    // SELECT
    dc.addType('select', {
        model: defaultModel.extend({
            defaults: {
                ...inputModel.prototype.defaults,
                'custom-name': config.labels.select,
                tagName: 'select',
                traits: [
                    traits.name, {
                        label: config.labels.trait_options,
                        type: 'select-options'
                    },
                    traits.required
                ],
            },
        }, {
            isComponent(el) {
                if(el.tagName === 'SELECT'){
                    return {type: 'select'};
                }
            },
        }),
        view: preventDefaultClick(),
    });
}
