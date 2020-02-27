import formIcon from "raw-loader!../icons/form.svg";

export const FormBlock = (bm, label) => {
    bm.add('form', {
        label: `
      ${formIcon}
      <div>${label}</div>`,
        category: 'Forms',
        content: `
        <form>
          <div class="form-group">
            <label>Name</label>
            <input name="name" placeholder="Type here your name" class="form-control"/>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="Type here your email" class="form-control"/>
          </div>
          <div class="form-check">
            <input name="sex" type="checkbox" class="form-check-input" value="M">
            <label class="form-check-label">M</label>
          </div>
          <div class="form-check">
            <input name="sex" type="checkbox" class="form-check-input" value="F">
            <label class="form-check-label">F</label>
          </div>
          <div class="form-group">
            <label>Message</label>
            <textarea name="message" class="form-control"></textarea>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Send</button>
          </div>
        </form>
      `,
    });
};

export default (dc, traits, config = {}) => {
    const defaultType = dc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;
    let actionTrait;

    // If the formPredefinedActions is set in the config you can add a dropdown menu to the actions trait
    if(config.formPredefinedActions && config.formPredefinedActions.length) {
        actionTrait = {
            type: 'select',
            label: config.labels.trait_action,
            name: 'action',
            options: [],
        };
        config.formPredefinedActions.forEach((action) => {
            actionTrait.options.push({value: action.value, name: action.name})
        });
    } else {
        actionTrait = {
            label: config.labels.trait_action,
            name: 'action',
        }
    }

    dc.addType('form', {
        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                droppable: ':not(form)',
                draggable: ':not(form)',
                traits: [
                    {
                        type: 'select',
                        label: config.labels.trait_enctype,
                        name: 'enctype',
                        options: [
                            {value: 'application/x-www-form-urlencoded', name: 'application/x-www-form-urlencoded (default)'},
                            {value: 'multipart/form-data', name: 'multipart/form-data'},
                            {value: 'text/plain', name: 'text/plain'},
                        ]
                    },
                    {
                        type: 'select',
                        label: config.labels.trait_method,
                        name: 'method',
                        options: [
                            {value: 'post', name: 'POST'},
                            {value: 'get', name: 'GET'},
                        ]
                    },
                    actionTrait
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
