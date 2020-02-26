export default (domc) => {
    const defaultType = domc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    domc.addType('media_object', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                'custom-name': 'Media Object',
                tagName: 'div',
                classes: ['media']
            })
        }, {
            isComponent(el) {
                if(el && el.classList && el.classList.contains('media')) {
                    return {type: 'media'};
                }
            }
        }),
        view: defaultView
    });

    domc.addType('media_body', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                'custom-name': 'Media Body',
                tagName: 'div',
                classes: ['media-body']
            })
        }, {
            isComponent(el) {
                if(el && el.classList && el.classList.contains('media-body')) {
                    return {type: 'media_body'};
                }
            }
        }),
        view: defaultView
    });
}
