import radioIcon from "raw-loader!../icons/dot-circle-regular.svg";

export const RadioBlock = (bm, label) => {
    bm.add('radio', {
        label: `
            ${radioIcon}
            <div>${label}</div>
        `,
        category: 'Forms',
        content: `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
          <label class="form-check-label" for="exampleRadios1">
            Default radio
          </label>
        </div>
      `,
    });
};

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
