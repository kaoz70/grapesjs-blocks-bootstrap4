export default (editor, config = {}) => {
  const c = config;
  let bm = editor.BlockManager;
  let blocks = c.blocks;
  let stylePrefix = c.stylePrefix;

  if (blocks.indexOf('headers') >= 0) {
    bm.add('header', {
      label: c.labels.header,
      category: 'Typography',
      attributes: {class:'gjs-fonts gjs-f-b1'},
      content: `<div class="${stylePrefix}row" data-gjs-droppable=".${stylePrefix}cell" data-gjs-custom-name="Row">
          <div class="${stylePrefix}cell" data-gjs-draggable=".${stylePrefix}row" data-gjs-custom-name="Cell"></div>
        </div>`
    });
  }

}
