import constants from './constants';
import { elHasClass } from '../../utils';

export default (dc, config = {}) => {
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const { tabPaneName, tabPanesSelector } = constants;
  const classId = config.classTabPane;
  const type = tabPaneName;

  dc.addType(type, {

    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        name: 'Tab Pane',
        copyable: true,
        draggable: tabPanesSelector,

        traits: [
          'id',
          {
            type: 'class_select',
            options: [
              {value: 'fade', name: 'Fade'},
              {value: '', name: 'None'},
            ],
            label: 'Animation',
          },
          {
            type: 'class_select',
            options: [
              {value: '', name: 'Inactive'},
              {value: 'active', name: 'Active'},
            ],
            label: 'Is Active',
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

    view: defaultView,
  });
}
