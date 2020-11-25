import contexts from '../bootstrap-contexts';
import {capitalize} from "../utils";

export default (domc) => {
    const contexts_w_white = contexts.concat(['white']);
    const defaultType = domc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    domc.addType('default', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                tagName: 'div',
                traits: [
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            ... contexts_w_white.map(function(v) { return {value: 'text-'+v, name: capitalize(v)} })
                        ],
                        label: 'Text color'
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            ... contexts_w_white.map(function(v) { return {value: 'bg-'+v, name: capitalize(v)} })
                        ],
                        label: 'Background color'
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            {value: 'border', name: 'Full'},
                            {value: 'border-top-0', name: 'No top'},
                            {value: 'border-right-0', name: 'No right'},
                            {value: 'border-bottom-0', name: 'No bottom'},
                            {value: 'border-left-0', name: 'No left'},
                            {value: 'border-0', name: 'None'}
                        ],
                        label: 'Border width'
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            ... contexts_w_white.map(function(v) { return {value: 'border border-'+v, name: capitalize(v)} })
                        ],
                        label: 'Border color'
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            {value: 'rounded', name: 'Rounded'},
                            {value: 'rounded-top', name: 'Rounded top'},
                            {value: 'rounded-right', name: 'Rounded right'},
                            {value: 'rounded-bottom', name: 'Rounded bottom'},
                            {value: 'rounded-left', name: 'Rounded left'},
                            {value: 'rounded-circle', name: 'Circle'},
                            {value: 'rounded-0', name: 'Square'},
                        ],
                        label: 'Border radius'
                    },
                    {
                        type: 'text',
                        label: 'ID',
                        name: 'id',
                        placeholder: 'my_element'
                    },
                    {
                        type: 'text',
                        label: 'Title',
                        name: 'title',
                        placeholder: 'My Element'
                    }
                ] //.concat(defaultModel.prototype.defaults.traits)
            }),
            init() {
                const classes = this.get('classes');
                classes.bind('add', this.classesChanged.bind(this));
                classes.bind('change', this.classesChanged.bind(this));
                classes.bind('remove', this.classesChanged.bind(this));
                this.init2();
            },
            /* BS comps use init2, not init */
            init2() {},
            /* method where we can check if we should changeType */
            classesChanged() {},
            /* replace the comp with a copy of a different type */
            changeType(new_type) {
                const coll = this.collection;
                const at = coll.indexOf(this);
                const button_opts = {
                    type: new_type,
                    style: this.getStyle(),
                    attributes: this.getAttributes(),
                    content: this.view.el.innerHTML
                }
                coll.remove(this);
                coll.add(button_opts, { at });
                this.destroy();
            }
        }),
        view: defaultView
    });
}
