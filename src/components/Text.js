export default (domc) => {
    const defaultType = domc.getType('default');
    const defaultModel = defaultType.model;
    const textType = domc.getType('text');
    const textView = textType.view;

    domc.addType('text', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                'custom-name': 'Text',
                tagName: 'div',
                droppable: true,
                editable: true
            })
        }, {
            /*isComponent(el) {
              if(el && el.dataset && el.dataset.bsText) {
                return {type: 'text'};
              }
            }*/
        }),
        view: textView
    });
}
