export default (domComponent) => {
    const src_default = 'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4';
    const defaultType = domComponent.getType('default');
    const model = defaultType.model;
    const view = defaultType.view;
    const type = 'bs-video';

    domComponent.addType(type, {
        model: model.extend({
            defaults: Object.assign({}, model.prototype.defaults, {
                'custom-name': 'Embed',
                tagName: 'div',
                resizable: false,
                droppable: false,
                classes: ['embed-responsive', 'embed-responsive-16by9'],
                traits: [
                    {
                        type: 'class_select',
                        options: [
                            {value: 'embed-responsive-21by9', name: '21:9'},
                            {value: 'embed-responsive-16by9', name: '16:9'},
                            {value: 'embed-responsive-4by3', name: '4:3'},
                            {value: 'embed-responsive-1by1', name: '1:1'},
                        ],
                        label: 'Aspect Ratio',
                    },
                ].concat(model.prototype.defaults.traits)
            })
        }, {
            isComponent: function(el) {
                if(el && el.className === 'embed-responsive') {
                    return {type: type};
                }
            }
        }),
        view: view.extend({
            init() {
                const props = [
                    'Aspect Ratio',
                ];
                const reactTo = props.map(prop => `change:${prop}`).join(' ');
                this.listenTo(this.model, reactTo, this.render);
                const comps = this.model.components();
                // Add a basic template if it's not yet initialized
                if (!comps.length) {
                    comps.add(`<iframe class="embed-responsive-item" src="${src_default}"></iframe>`);
                }
            },
        }),
    });
}
