export default (editor, dc, traits, config = {}) => {
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

    const traitManager = editor.TraitManager;
    traitManager.addType('select-options', {
        events:{
            'keyup': 'onChange',
        },

        onValueChange: function () {
            const optionsStr = this.model.get('value').trim();
            const options = optionsStr.split('\n');
            const optComps = [];

            for (let i = 0; i < options.length; i++) {
                const optionStr = options[i];
                const option = optionStr.split(config.optionsStringSeparator);
                const opt = {
                    tagName: 'option',
                    attributes: {}
                };
                if(option[1]) {
                    opt.content = option[1];
                    opt.attributes.value = option[0];
                } else {
                    opt.content = option[0];
                    opt.attributes.value = option[0];
                }
                optComps.push(opt);
            }

            const comps = this.target.get('components');
            comps.reset(optComps);
            this.target.view.render();
        },

        getInputEl: function() {
            if (!this.$input) {
                const target = this.target;
                let optionsStr = '';
                const options = target.get('components');

                for (let i = 0; i < options.length; i++) {
                    const option = options.models[i];
                    const optAttr = option.get('attributes');
                    const optValue = optAttr.value || '';
                    optionsStr += `${optValue}${config.optionsStringSeparator}${option.get('content')}\n`;
                }

                this.$input = document.createElement('textarea');
                this.$input.value = optionsStr;
            }
            return this.$input;
        },
    });
}
