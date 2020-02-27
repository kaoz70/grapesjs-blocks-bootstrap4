import textareaIcon from "raw-loader!../icons/textarea.svg";

export const TextareaBlock = (bm, label) => {
    bm.add('textarea', {
        label: `
      ${textareaIcon}
      <div>${label}</div>`,
        category: 'Forms',
        content: '<textarea name="textarea1" class="form-control"></textarea>',
    });
};

export default (dc, traits, config = {}) => {
    const defaultType = dc.getType('default');
    const defaultView = defaultType.view;
    const inputType = dc.getType('input');
    const inputModel = inputType.model;

    // TEXTAREA
    dc.addType('textarea', {
        model: inputModel.extend({
            defaults: {
                ...inputModel.prototype.defaults,
                'custom-name': config.labels.textarea,
                tagName: 'textarea',
                traits: [
                    traits.name,
                    traits.placeholder,
                    traits.required
                ]
            },
        }, {
            isComponent(el) {
                if(el.tagName === 'TEXTAREA'){
                    return {type: 'textarea'};
                }
            },
        }),
        view: defaultView,
    });
}
