import constants from './constants';
import { elHasClass } from '../../utils';

export default (dc, config = {}) => {
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const { tabName, navigationSelector } = constants;
  const classId = config.classTab;
  const type = tabName;

  dc.addType(type, {


    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        name: 'Tab',
        tagName: 'li',
        copyable: true,
        draggable: navigationSelector,

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
              <a class="nav-link active" id="tab-1" data-toggle="tab" href="#tab-pane-1" role="tab" aria-controls="tab" aria-selected="true">Tab</a>
          `);
        }
      },
    }),
  });
}
