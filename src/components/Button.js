import _s from "underscore.string";
import contexts from '../bootstrap-contexts';
import sizes from '../bootstrap-btn-sizes';
import buttonIcon from "raw-loader!../icons/button.svg";

export const ButtonBlock = (bm, label) => {
    bm.add('button', {
        label: `${buttonIcon}<div>${label}</div>`,
        category: 'Forms',
        content: '<button class="btn btn-primary">Send</button>',
    });
};

export default (dc) => {
    const defaultType = dc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    dc.addType('button', {
        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                'custom-name': 'Button',
                droppable: false,
                attributes: {
                    role: 'button'
                },
                classes: ['btn'],
                traits: [
                    {
                        type: 'content',
                        label: 'Text',
                    },
                    {
                        label: 'Type',
                        type: 'select',
                        name: 'type',
                        options: [
                            {value: 'submit', name: 'Submit'},
                            {value: 'reset', name: 'Reset'},
                            {value: 'button', name: 'Button'},
                        ]
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'None'},
                            ... contexts.map((v) => { return {value: `btn-${v}`, name: _s.capitalize(v)} }),
                            ... contexts.map((v) => { return {value: `btn-outline-${v}`, name: _s.capitalize(v) + ' (Outline)'} })
                        ],
                        label: 'Context'
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            ... Object.keys(sizes).map((k) => { return {value: `btn-${k}`, name: sizes[k]} })
                        ],
                        label: 'Size'
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Inline'},
                            {value: 'btn-block', name: 'Block'}
                        ],
                        label: 'Width'
                    }
                ].concat(defaultModel.prototype.defaults.traits)
            },
            afterChange(e) {
                if (this.attributes.type === 'button') {
                    if (this.attributes.classes.filter((klass) => { return klass.id === 'btn' }).length === 0) {
                        this.changeType('link');
                    }
                }
            }
        }, {
            isComponent(el) {
                if(el && el.classList && el.classList.contains('btn')) {
                    return {type: 'button'};
                }
            }
        }),
        view: defaultView.extend({
            events: {
                'click': 'handleClick'
            },

            init() {
                this.listenTo(this.model, 'change:content', this.updateContent);
            },

            updateContent() {
                this.el.innerHTML = this.model.get('content')
            },

            handleClick(e) {
                e.preventDefault();
            },
        }),
    });
}
