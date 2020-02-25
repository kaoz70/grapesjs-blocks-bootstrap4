export default (domComponent) => {
    const img_src_default = 'https://dummyimage.com/800x500/999/222';
    const imageType = domComponent.getType('image');
    const imageModel = imageType.model;
    const imageView = imageType.view;
    const type = 'bs-image';

    domComponent.addType(type, {
        model: imageModel.extend({
            defaults: Object.assign({}, imageModel.prototype.defaults, {
                'custom-name': 'Image',
                tagName: 'img',
                resizable: 1,
                attributes: {
                    src: img_src_default,
                },
                classes: ['img-fluid'],
                traits: [
                    {
                        type: 'text',
                        label: 'Source (URL)',
                        name: 'src'
                    },
                    {
                        type: 'text',
                        label: 'Alternate text',
                        name: 'alt'
                    }
                ].concat(imageModel.prototype.defaults.traits)
            })
        }, {
            isComponent: function(el) {
                if(el && el.tagName === 'IMG') {
                    return {type: type};
                }
            }
        }),
        view: imageView
    });
}
