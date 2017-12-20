export default (editor, config = {}) => {
  const c = config;
  let bm = editor.BlockManager;
  let blocks = c.blocks;


  if (blocks.indexOf('text') >= 0) {
    bm.add('text', {
      label: 'Text',
      category: 'Typography',
      attributes: {class:'fa fa-font'},
      content: {
        type:'text',
        content: 'Insert your text here'
      }
    });
  }

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
