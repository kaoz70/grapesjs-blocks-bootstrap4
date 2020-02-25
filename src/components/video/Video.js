export default (domComponent) => {
    const videoType = domComponent.getType('video');
    const model = videoType.model;
    const view = videoType.view;
    const type = 'bs-embed-responsive';

    domComponent.addType(type, {
        model: model.extend({
            defaults: Object.assign({}, model.prototype.defaults, {
                'custom-name': 'Video',
                resizable: false,
                droppable: false,
                draggable: false,
                copyable: false,
                classes: ['embed-responsive-item'],
            })
        }, {
            isComponent: function(el) {
                if(el && el.className === 'embed-responsive-item') {
                    return {type: type};
                }
            }
        }),
        view: view
    });
}
