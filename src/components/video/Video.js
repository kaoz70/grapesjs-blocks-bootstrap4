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
                provider: 'so',
                classes: ['embed-responsive-item'],
            })
        }, {
            isComponent: function(el) {
                if(el && el.className === 'embed-responsive-item') {
                    var result = {
                        provider: 'so',
                        type: type
                    };
                    var isYtProv = /youtube\.com\/embed/.test(el.src);
                    var isYtncProv = /youtube-nocookie\.com\/embed/.test(el.src);
                    var isViProv = /player\.vimeo\.com\/video/.test(el.src);
                    var isExtProv = isYtProv || isYtncProv || isViProv;
                    if (el.tagName == 'VIDEO' || (el.tagName == 'IFRAME' && isExtProv)) {
                      if (el.src) result.src = el.src;
                      if (isExtProv) {
                        if (isYtProv) result.provider = 'yt';
                        else if (isYtncProv) result.provider = 'ytnc';
                        else if (isViProv) result.provider = 'vi';
                      }
                    }
                    return result;

                }
            }
        }),
        view: view
    });
}
