export default (dc, traits, config = {}) => {
    const defaultType = dc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    dc.addType('form', {
        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                droppable: ':not(form)',
                draggable: ':not(form)',
                traits: [
                    {
                        type: 'select',
                        label: config.labels.trait_method,
                        name: 'method',
                        options: [
                            {value: 'post', name: 'POST'},
                            {value: 'get', name: 'GET'},
                        ]
                    },
                    {
                        label: config.labels.trait_action,
                        name: 'action',
                    }
                ],
            },

            init() {
                this.listenTo(this, 'change:formState', this.updateFormState);
            },

            updateFormState() {
                var state = this.get('formState');
                switch (state) {
                    case 'success':
                        this.showState('success');
                        break;
                    case 'error':
                        this.showState('error');
                        break;
                    default:
                        this.showState('normal');
                }
            },

            showState(state) {
                var st = state || 'normal';
                var failVis, successVis;
                if (st === 'success') {
                    failVis = 'none';
                    successVis = 'block';
                } else if (st === 'error') {
                    failVis = 'block';
                    successVis = 'none';
                } else {
                    failVis = 'none';
                    successVis = 'none';
                }
                var successModel = this.getStateModel('success');
                var failModel = this.getStateModel('error');
                var successStyle = successModel.getStyle();
                var failStyle = failModel.getStyle();
                successStyle.display = successVis;
                failStyle.display = failVis;
                successModel.setStyle(successStyle);
                failModel.setStyle(failStyle);
            },

            getStateModel(state) {
                var st = state || 'success';
                var stateName = 'form-state-' + st;
                var stateModel;
                var comps = this.get('components');
                for (var i = 0; i < comps.length; i++) {
                    var model = comps.models[i];
                    if (model.get('form-state-type') === st) {
                        stateModel = model;
                        break;
                    }
                }
                if (!stateModel) {
                    var contentStr = formMsgSuccess;
                    if (st === 'error') {
                        contentStr = formMsgError;
                    }
                    stateModel = comps.add({
                        'form-state-type': st,
                        type: 'text',
                        removable: false,
                        copyable: false,
                        draggable: false,
                        attributes: {'data-form-state': st},
                        content: contentStr,
                    });
                }
                return stateModel;
            },
        }, {
            isComponent(el) {
                if (el.tagName === 'FORM') {
                    return {type: 'form'};
                }
            },
        }),

        view: defaultView.extend({
            events: {
                submit(e) {
                    e.preventDefault();
                }
            }
        }),
    });
}
