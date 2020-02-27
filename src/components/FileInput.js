import {elHasClass} from "../utils";
import fileInputIcon from "raw-loader!../icons/file-input.svg";

export const FileInputBlock = (bm, label) => {
    bm.add('file-input', {
        label: `
            ${fileInputIcon}
            <div>${label}</div>
        `,
        category: 'Forms',
        content: `<input type="file" name="file" class="form-control-file" id="exampleFormControlFile1">`
    });
};

export default (dc, traits, config = {}) => {
    const defaultType = dc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;
    const type = 'file-input';

    dc.addType(type, {
        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                'custom-name': config.labels.input,
                tagName: 'input',
                draggable: 'form .form-group',
                droppable: false,
                traits: [
                    traits.name,
                    traits.required,
                    {
                        type: 'checkbox',
                        label: config.labels.trait_multiple,
                        name: 'multiple',
                    },
                ],
            },
        }, {
            isComponent(el) {
                if(el.tagName === 'INPUT' && elHasClass(el, 'form-control-file')) {
                    return {type};
                }
            },
        }),
        view: defaultView,
    });
}
