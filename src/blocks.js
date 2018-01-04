export default (editor, config = {}) => {
  const c = config;
  let bm = editor.BlockManager;
  let blocks = c.blocks;
  let cats = c.blockCategories;

  // LAYOUT

  if (cats.layout) {

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

    if (blocks.column_break) {
      bm.add('column_break').set({
        label: c.labels.column_break,
        category: 'Layout',
        attributes: {class:'fa fa-columns'},
        content: {
          type: 'column_break'
        }
      });
    }

    if (blocks.media_object) {
      bm.add('media_object').set({
        label: c.labels.media_object,
        category: 'Layout',
        attributes: {class:'fa fa-columns'},
        content: `<div class="media">
                 <img class="mr-3" src="">
                 <div class="media-body">
                 <h5>Media heading</h5>
                 <div>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</div>
                 </div>
                 </div>`
      });
    }

  }

  // COMPONENTS

  if (cats.components) {

    if (blocks.alert) {
      bm.add('alert', {
        label: c.labels.alert,
        category: 'Components',
        attributes: {class:'fa fa-exclamation-triangle'},
        content: {
          type: 'alert',
          content: 'This is an alert—check it out!'
        }
      });
    }

    if (blocks.badge) {
      bm.add('badge', {
        label: c.labels.badge,
        category: 'Components',
        attributes: {class:'fa fa-certificate'},
        content: {
          type: 'badge',
          content: 'New!'
        }
      });
    }

    if (blocks.button) {
      bm.add('button', {
        label: c.labels.button,
        category: 'Components',
        attributes: {class:'fa fa-link'},
        content: {
          type: 'button',
          content: 'Click me!'
        }
      });
    }

    if (blocks.button_group) {
      bm.add('button_group', {
        label: c.labels.button_group,
        category: 'Components',
        attributes: {class:'fa fa-link'},
        content: {
          type: 'button_group'
        }
      });
    }

    if (blocks.button_toolbar) {
      bm.add('button_toolbar', {
        label: c.labels.button_toolbar,
        category: 'Components',
        attributes: {class:'fa fa-link'},
        content: {
          type: 'button_toolbar'
        }
      });
    }

    if (blocks.card) {
      bm.add('card', {
        label: c.labels.card,
        category: 'Components',
        attributes: {class:'fa fa-credit-card'},
        content: {
          type: 'card'
        }
      });
      bm.add('card_container', {
        label: c.labels.card_container,
        category: 'Components',
        attributes: {class:'fa fa-credit-card'},
        content: {
          type: 'card_container'
        }
      });
    }

    if (blocks.collapse) {
      bm.add('collapse', {
        label: c.labels.collapse,
        category: 'Components',
        attributes: {class:'fa fa-compress'},
        content: {
          type: 'collapse'
        }
      });
    }

    if (blocks.dropdown) {
      bm.add('dropdown', {
        label: c.labels.dropdown,
        category: 'Components',
        attributes: {class:'fa fa-caret-down'},
        content: {
          type: 'dropdown'
        }
      });
      /*bm.add('dropdown_menu', {
        label: c.labels.dropdown_menu,
        category: 'Components',
        attributes: {class:'fa fa-caret-down'},
        content: {
          type: 'dropdown_menu'
        }
      });
      bm.add('dropdown_item', {
        label: c.labels.dropdown_item,
        category: 'Components',
        attributes: {class:'fa fa-link'},
        content: {
          type: 'dropdown_item'
        }
      });*/
    }

  }

  // TYPOGRAPHY

  if (cats.typography) {

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

    if (blocks.paragraph) {
      bm.add('paragraph', {
        label: c.labels.paragraph,
        category: 'Typography',
        attributes: {class:'fa fa-paragraph'},
        content: {
          type: 'paragraph',
          content: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.'
        }
      });
    }

  }

  // BASIC

  if (cats.basic) {

    if (blocks.link) {
      bm.add('link', {
        label: c.labels.link,
        category: 'Basic',
        attributes: {class:'fa fa-link'},
        content: {
          type: 'link',
          content: 'Link text'
        }
      });
    }

    if (blocks.image) {
      // example of how we might include encoded image as default src. i like the idea but it mucks up the settings src field
      //let default_src = 'data:image/png;base64,iVB\ORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEU\AAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8\yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAEl\FTkSuQmCC'
      bm.add('image', {
        label: c.labels.image,
        category: 'Basic',
        attributes: {class:'fa fa-picture-o'},
        content: {
          type: 'image'
        }
      });
    }

    /*if (blocks.list) {
      bm.add('list', {
        label: c.labels.list,
        category: 'Basic',
        attributes: {class:'fa fa-list'},
        content: {
          type: 'list'
        }
      });
    }*/

  }

}
