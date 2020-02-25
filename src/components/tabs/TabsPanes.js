import constants from './constants';
import { elHasClass } from '../../utils';

export default (dc, config = {}) => {
    const defaultType = dc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;
    const { tabPanesName, tabPaneSelector } = constants;
    const classId = config.classTabPanes;
    const type = tabPanesName;

    dc.addType(type, {

        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                name: 'Tabs Panes',
                copyable: 0,
                draggable: true,
                droppable: tabPaneSelector,
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
                const comps = this.model.components();

                // Add a basic template if it's not yet initialized
                if (!comps.length) {
                    comps.add(`
                        <div class="tab-content" id="myTabContent">
                          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">Tab pane 1</div>
                          <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Tab pane 2</div>
                          <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">Tab pane 3</div>
                        </div>
                    `);
                }
            },
        }),
    });
}
