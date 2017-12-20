export default (editor, config = {}) => {
  const c = config;
  let bm = editor.BlockManager;
  let blocks = c.blocks;
  let stylePrefix = c.stylePrefix;

  if (blocks.indexOf('header') >= 0) {
    bm.add('header', {
      label: c.labels.header,
      category: 'Typography',
      attributes: {class:'fa fa-header'},
      content: {
        type: 'header',
        content: 'Bootstrap heading'
      }
    });
  }

}
