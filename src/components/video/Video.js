import videoIcon from "raw-loader!../../icons/youtube-brands.svg";

export const VideoBlock = (bm, label) => {
    bm.add('bs-video', {
        label: `
            ${videoIcon}
            <div>${label}</div>
        `,
        category: 'Media',
        content: {
            type: 'bs-video'
        }
    });
};

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
