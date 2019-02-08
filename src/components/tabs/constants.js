const prefix = 'tabs-';
const containerName = `${prefix}container`;
const navigationName = `${prefix}navigation`;
const tabPanesName = `${prefix}panes`;
const tabName = `${prefix}tab`;
const tabPaneName = `${prefix}tab-pane`;

export default {
  navigationName,
  tabPanesName,
  tabName,
  tabPaneName,

  // Selectors
  navigationSelector: `[data-gjs-type="${navigationName}"]`,
  tabPanesSelector: `[data-gjs-type="${tabPanesName}"]`,
  tabSelector: `[data-gjs-type="${tabName}"]`,
  tabPaneSelector: `[data-gjs-type="${tabPaneName}"]`,

  // IDs
  containerId: `data-${containerName}`,
  navigationId: `data-${navigationName}`,
  tabPanesId: `data-${tabPanesName}`,
  tabId: `data-${tabName}`,
  tabPaneId: `data-${tabPaneName}`,
}
