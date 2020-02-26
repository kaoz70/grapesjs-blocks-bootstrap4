import constants from './constants';
import { elHasClass } from '../../utils';
import ellipsisIcon from "raw-loader!../../icons/ellipsis-h-solid.svg";
import circleIcon from "raw-loader!../../icons/circle-solid.svg";
import windowIcon from "raw-loader!../../icons/window-maximize-solid.svg";

export const TabsBlock = (bm, c) => {
    bm.add('tabs', {
        label: `
            ${ellipsisIcon}
            <div>${c.labels.tabs}</div>
        `,
        category: 'Components',
        content: `
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Tab 1</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Tab 2</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Tab 3</a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"></div>
              <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"></div>
              <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"></div>
            </div>
        `
    });
    bm.add('tabs-tab', {
        label: `
            ${circleIcon}
            <div>${c.labels.tab}</div>
        `,
        category: 'Components',
        content: {
            type: 'tabs-tab',
        }
    });
    bm.add('tabs-tab-pane', {
        label: `
            ${windowIcon}
            <div>${c.labels.tabPane}</div>
        `,
        category: 'Components',
        content: {
            type: 'tabs-tab-pane',
        }
    });
};

export default (dc, config = {}) => {
    const defaultType = dc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;
    const { navigationName, tabSelector } = constants;
    const classId = config.classNavigation;
    const type = navigationName;

    dc.addType(type, {

        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                name: 'Tabs Navigation',
                copyable: 0,
                draggable: true,
                droppable: tabSelector,

                traits: [
                    {
                        type: 'class_select',
                        options: [
                            {value: 'nav-tabs', name: 'Tabs'},
                            {value: 'nav-pills', name: 'Pills'},
                        ],
                        label: 'Type',
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Left'},
                            {value: 'nav-fill', name: 'Fill'},
                            {value: 'nav-justified', name: 'Justify'},
                        ],
                        label: 'Layout',
                    },
                ],
            },

            init() {
                this.get('classes').pluck('name').indexOf(classId) < 0 && this.addClass(classId);
            }
        }, {
            isComponent(el) {
                if (elHasClass(el, classId)) return { type };
            },
        }),

        view: defaultView.extend({
            init() {
                const props = [
                    'type',
                    'layout',
                ];
                const reactTo = props.map(prop => `change:${prop}`).join(' ');
                this.listenTo(this.model, reactTo, this.render);
                const comps = this.model.components();

                // Add a basic template if it's not yet initialized
                if (!comps.length) {
                    comps.add(`
                        <ul class="nav nav-tabs" role="tablist">
                          <li class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Tab 1</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Tab 2</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Tab 3</a>
                          </li>
                        </ul>
                    `);
                }
            },
        }),
    });
}
