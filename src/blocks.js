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

  if (blocks.container) {
    bm.add('container').set({
      label: c.labels.container,
      category: 'Layout',
      attributes: {class:'fa fa-columns'},
      content: {
        type: 'container',
        classes: ['container']
      }
    });
  }

  if (blocks.row) {
    bm.add('row').set({
      label: c.labels.row,
      category: 'Layout',
      attributes: {class:'fa fa-columns'},
      content: {
        type: 'row',
        classes: ['row']
      }
    });
  }

  if (blocks.column) {
    bm.add('column').set({
      label: c.labels.column,
      category: 'Layout',
      attributes: {class:'fa fa-columns'},
      content: {
        type: 'column',
        classes: ['col']
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
