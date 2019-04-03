export default (editor, config = {}) => {
  const c = config;
  let bm = editor.BlockManager;
  let blocks = c.blocks;
  let cats = c.blockCategories;

  // LAYOUT

  if (cats.layout) {

    if (blocks.container) {
      bm.add('container').set({
        label: `
            <svg aria-hidden="true" width="24" height="50" focusable="false" data-prefix="far" data-icon="window-maximize" class="svg-inline--fa fa-window-maximize fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V192h416v234z"></path></svg>
            <div class="gjs-block-label">${c.labels.container}</div>
        `,
        category: 'Layout',
        content: {
          type: 'container',
          classes: ['container']
        }
      });
    }

    if (blocks.row) {
      bm.add('row').set({
        label: `
            <svg aria-hidden="true" width="24" height="50" focusable="false" data-prefix="fas" data-icon="window-maximize" class="svg-inline--fa fa-window-maximize fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-16 160H64v-84c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12v84z"></path></svg>
            <div class="gjs-block-label">${c.labels.row}</div>
        `,
        category: 'Layout',
        content: {
          type: 'row',
          classes: ['row']
        }
      });
    }

    if (blocks.column) {
      bm.add('column').set({
        label: `
            <svg aria-hidden="true" width="24" height="50" focusable="false" data-prefix="fas" data-icon="columns" class="svg-inline--fa fa-columns fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64V160h160v256zm224 0H288V160h160v256z"></path></svg>
            <div class="gjs-block-label">${c.labels.column}</div>
        `,
        category: 'Layout',
        content: {
          type: 'column',
          classes: ['col']
        }
      });
    }

    if (blocks.column_break) {
      bm.add('column_break').set({
        label: `
            <svg aria-hidden="true" width="24" height="50" focusable="false" data-prefix="fas" data-icon="equals" class="svg-inline--fa fa-equals fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 304H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32zm0-192H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
            <div class="gjs-block-label">${c.labels.column_break}</div>
        `,
        category: 'Layout',
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

    if (blocks.tabs) {
      bm.add('tabs', {
        label: `
            <svg aria-hidden="true" width="24" height="50" focusable="false" data-prefix="fas" data-icon="ellipsis-h" class="svg-inline--fa fa-ellipsis-h fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path></svg>
            <div class="gjs-block-label">${c.labels.tabs}</div>
        `,
        category: 'Components',
        content: `
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Tab 1</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Tab 2</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Tab 3</a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"></div>
              <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"></div>
              <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"></div>
            </div>
        `
      });
      bm.add('tabs-tab', {
        label: `
            <svg aria-hidden="true" width="24" height="50" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="-256 0 1024 1024"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
            <div class="gjs-block-label">${c.labels.tab}</div>
        `,
        category: 'Components',
        content: {
          type: 'tabs-tab',
        }
      });
      bm.add('tabs-tab-pane', {
        label: `
            <svg aria-hidden="true" width="24" height="50" focusable="false" data-prefix="far" data-icon="window-maximize" class="svg-inline--fa fa-window-maximize fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V192h416v234z"></path></svg>
            <div class="gjs-block-label">${c.labels.tabPane}</div>
        `,
        category: 'Components',
        content: {
          type: 'tabs-tab-pane',
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

  // FORMS

  if (blocks.form) {
    bm.add('form', {
      label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,5.5 C22,5.2 21.5,5 20.75,5 L3.25,5 C2.5,5 2,5.2 2,5.5 L2,8.5 C2,8.8 2.5,9 3.25,9 L20.75,9 C21.5,9 22,8.8 22,8.5 L22,5.5 Z M21,8 L3,8 L3,6 L21,6 L21,8 Z" fill-rule="nonzero"></path>
        <path class="gjs-block-svg-path" d="M22,10.5 C22,10.2 21.5,10 20.75,10 L3.25,10 C2.5,10 2,10.2 2,10.5 L2,13.5 C2,13.8 2.5,14 3.25,14 L20.75,14 C21.5,14 22,13.8 22,13.5 L22,10.5 Z M21,13 L3,13 L3,11 L21,11 L21,13 Z" fill-rule="nonzero"></path>
        <rect class="gjs-block-svg-path" x="2" y="15" width="10" height="3" rx="0.5"></rect>
      </svg>
      <div class="gjs-block-label">${c.labels.form}</div>`,
      category: 'Forms',
      content: `
        <form>
          <div class="form-group">
            <label>Name</label>
            <input placeholder="Type here your name" class="form-control"/>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" placeholder="Type here your email" class="form-control"/>
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" value="M">
            <label class="form-check-label">M</label>
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" value="F">
            <label class="form-check-label">F</label>
          </div>
          <div class="form-group">
            <label>Message</label>
            <textarea class="form-control"></textarea>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Send</button>
          </div>
        </form>
      `,
    });
  }

  if (blocks.input) {
    bm.add('input', {
      label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
        <polygon class="gjs-block-svg-path" points="4 10 5 10 5 14 4 14"></polygon>
      </svg>
      <div class="gjs-block-label">${c.labels.input}</div>`,
      category: 'Forms',
      content: '<input class="form-control"/>',
    });
    bm.add('file-input', {
      label: `
            <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
              <polygon class="gjs-block-svg-path" points="4 10 5 10 5 14 4 14"></polygon>
            </svg>
            <div class="gjs-block-label">${c.labels.file_input}</div>
        `,
      category: 'Forms',
      content: `<input type="file" class="form-control-file" id="exampleFormControlFile1">`
    });
  }

  if (blocks.form_group_input) {
    bm.add('form_group_input', {
      label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
        <polygon class="gjs-block-svg-path" points="4 10 5 10 5 14 4 14"></polygon>
      </svg>
      <div class="gjs-block-label">${c.labels.form_group_input}</div>`,
      category: 'Forms',
      content: `
      <div class="form-group">
        <label>Name</label>
        <input placeholder="Type here your name" class="form-control"/>
      </div>
      `,
    });
  }

  if (blocks.input_group) {
    bm.add('input_group', {
      label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
        <polygon class="gjs-block-svg-path" points="4 10 5 10 5 14 4 14"></polygon>
      </svg>
      <div class="gjs-block-label">${c.labels.input_group}</div>`,
      category: 'Forms',
      content: `
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">$</span>
        </div>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
          <span class="input-group-text">.00</span>
        </div>
      </div>
      `,
    });
  }

  if (blocks.textarea) {
    bm.add('textarea', {
      label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,7.5 C22,6.6 21.5,6 20.75,6 L3.25,6 C2.5,6 2,6.6 2,7.5 L2,16.5 C2,17.4 2.5,18 3.25,18 L20.75,18 C21.5,18 22,17.4 22,16.5 L22,7.5 Z M21,17 L3,17 L3,7 L21,7 L21,17 Z"></path>
        <polygon class="gjs-block-svg-path" points="4 8 5 8 5 12 4 12"></polygon>
        <polygon class="gjs-block-svg-path" points="19 7 20 7 20 17 19 17"></polygon>
        <polygon class="gjs-block-svg-path" points="20 8 21 8 21 9 20 9"></polygon>
        <polygon class="gjs-block-svg-path" points="20 15 21 15 21 16 20 16"></polygon>
      </svg>
      <div class="gjs-block-label">${c.labels.textarea}</div>`,
      category: 'Forms',
      content: '<textarea class="form-control"></textarea>',
    });
  }

  if (blocks.select) {
    bm.add('select', {
      label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
        <polygon class="gjs-block-svg-path" transform="translate(18.500000, 12.000000) scale(1, -1) translate(-18.500000, -12.000000) " points="18.5 11 20 13 17 13"></polygon>
        <rect class="gjs-block-svg-path" x="4" y="11.5" width="11" height="1"></rect>
      </svg>
      <div class="gjs-block-label">${c.labels.select}</div>`,
      category: 'Forms',
      content: `<select class="form-control">
        ${c.labels.select_option ? `<option value="">${c.labels.select_option}</option>` : ''}
        <option value="1">${c.labels.option} 1</option>
        </select>`,
    });
  }

  if (blocks.button) {
    bm.add('button', {
      label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
        <rect class="gjs-block-svg-path" x="4" y="11.5" width="16" height="1"></rect>
      </svg>
      <div class="gjs-block-label">${c.labels.button}</div>`,
      category: 'Forms',
      content: '<button class="btn btn-primary">Send</button>',
    });
  }

  if (blocks.button_group) {
    bm.add('button_group', {
      label: c.labels.button_group,
      category: 'Forms',
      attributes: {class:'fa fa-link'},
      content: {
        type: 'button_group'
      }
    });
  }

  if (blocks.button_toolbar) {
    bm.add('button_toolbar', {
      label: c.labels.button_toolbar,
      category: 'Forms',
      attributes: {class:'fa fa-link'},
      content: {
        type: 'button_toolbar'
      }
    });
  }

  if (blocks.label) {
    bm.add('label', {
      label: `
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,11.875 C22,11.35 21.5,11 20.75,11 L3.25,11 C2.5,11 2,11.35 2,11.875 L2,17.125 C2,17.65 2.5,18 3.25,18 L20.75,18 C21.5,18 22,17.65 22,17.125 L22,11.875 Z M21,17 L3,17 L3,12 L21,12 L21,17 Z" fill-rule="nonzero"></path>
        <rect class="gjs-block-svg-path" x="2" y="5" width="14" height="5" rx="0.5"></rect>
        <polygon class="gjs-block-svg-path" fill-rule="nonzero" points="4 13 5 13 5 16 4 16"></polygon>
      </svg>
      <div class="gjs-block-label">${c.labels.label}</div>`,
      category: 'Forms',
      content: '<label>Label</label>',
    });
  }

  if (blocks.checkbox) {
    bm.add('checkbox', {
      label: c.labels.checkbox,
      attributes: {class:'fa fa-check-square'},
      category: 'Forms',
      content: `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck1">
            Default checkbox
          </label>
        </div>
      `,
    });
  }

  if (blocks.radio) {
    bm.add('radio', {
      label: c.labels.radio,
      attributes: {class:'fa fa-dot-circle-o'},
      category: 'Forms',
      content: `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
          <label class="form-check-label" for="exampleRadios1">
            Default radio
          </label>
        </div>
      `,
    });
  }

}
