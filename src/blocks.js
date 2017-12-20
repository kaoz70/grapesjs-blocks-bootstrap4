export default (editor, config = {}) => {
  const c = config;
  let bm = editor.BlockManager;
  let blocks = c.blocks;


  if (blocks.text) {
    bm.add('text', {
      label: c.labels.text,
      category: 'Typography',
      attributes: {class:'fa fa-font'},
      content: {
        type:'text',
        content: 'Insert your text here'
      }
    });
  }

  if (blocks.header) {
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
