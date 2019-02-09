import constants from './constants';

export default (dc, config = {}) => {
    const defaultType = dc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;
    const {
        navigationName,
        tabPanesName,
        tabName,
        tabPaneName,

        navigationSelector,
        tabPanesSelector,

    } = constants;

    dc.addType('tabs', {
        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,

                name: 'Tabs',

                droppable: `${navigationSelector}, ${tabPanesSelector}`,

                draggable: true,

                'script-deps': config.script,
                'style-deps': config.style,
                'class-navigation': config.classNavigation,
                'class-tab-panes': config.classTabPanes,
                'class-tab': config.classTab,
                'class-tab-pane': config.classTabPane,

                script() {
                    $('[role="tablist"] a').on('click', function () {
                        $(this).tab('show');
                    })
                },
                ...config.tabsProps
            },
        }, {
            isComponent(el) {
                //
            },
        }),
        view: defaultView.extend({
            init() {
                const comps = this.model.components();

                // Add a basic template if it's not yet initialized
                if (!comps.length) {
                    comps.add(`
                        <ul data-gjs-type="${navigationName}" class="nav nav-tabs" role="tablist">
                          <li data-gjs-type="${tabName}" class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Tab 1</a>
                          </li>
                          <li data-gjs-type="${tabName}" class="nav-item">
                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Tab 2</a>
                          </li>
                          <li data-gjs-type="${tabName}" class="nav-item">
                            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Tab 3</a>
                          </li>
                        </ul>
                        <div data-gjs-type="${tabPanesName}" class="tab-content">
                          <div data-gjs-type="${tabPaneName}" class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"></div>
                          <div data-gjs-type="${tabPaneName}" class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"></div>
                          <div data-gjs-type="${tabPaneName}" class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"></div>
                        </div>
                    `);
                }
            },
        }),
    });
}
