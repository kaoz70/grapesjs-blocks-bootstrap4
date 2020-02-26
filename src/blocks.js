import imageIcon from 'raw-loader!./icons/image-solid.svg';
import videoIcon from 'raw-loader!./icons/youtube-brands.svg';
import columnsIcon from 'raw-loader!./icons/columns-solid.svg';
import exclamationIcon from 'raw-loader!./icons/exclamation-triangle-solid.svg';
import certificateIcon from 'raw-loader!./icons/certificate-solid.svg';
import cardIcon from 'raw-loader!./icons/credit-card-solid.svg';
import compressIcon from 'raw-loader!./icons/compress-solid.svg';
import caretIcon from 'raw-loader!./icons/caret-square-down-regular.svg';
import fontIcon from 'raw-loader!./icons/font-solid.svg';
import headingIcon from 'raw-loader!./icons/heading-solid.svg';
import paragraphIcon from 'raw-loader!./icons/paragraph-solid.svg';
import linkIcon from 'raw-loader!./icons/link-solid.svg';
import formIcon from 'raw-loader!./icons/form.svg';
import inputIcon from 'raw-loader!./icons/input.svg';
import fileInputIcon from 'raw-loader!./icons/file-input.svg';
import formGroupIcon from 'raw-loader!./icons/form-group.svg';
import inputGroupIcon from 'raw-loader!./icons/input-group.svg';
import textareaIcon from 'raw-loader!./icons/textarea.svg';
import selectIcon from 'raw-loader!./icons/select-input.svg';
import buttonIcon from 'raw-loader!./icons/button.svg';
import labelIcon from 'raw-loader!./icons/label.svg';
import checkIcon from 'raw-loader!./icons/check-square-solid.svg';
import radioIcon from 'raw-loader!./icons/dot-circle-regular.svg';
import windowIcon from 'raw-loader!./icons/window-maximize-solid.svg';
import circleIcon from 'raw-loader!./icons/circle-solid.svg';
import ellipsisIcon from 'raw-loader!./icons/ellipsis-h-solid.svg';
import equalsIcon from 'raw-loader!./icons/equals-solid.svg';

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
            ${windowIcon}
            <span>${c.labels.container}</span>
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
            ${windowIcon}
            <span>${c.labels.row}</span>
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
            ${columnsIcon}
            <span>${c.labels.column}</span>
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
            ${equalsIcon}
            <span>${c.labels.column_break}</span>
        `,
        category: 'Layout',
        content: {
          type: 'column_break'
        }
      });
    }

    if (blocks.media_object) {
      bm.add('media_object').set({
        label: `
            ${columnsIcon}
            <span>${c.labels.media_object}</span>
        `,
        category: 'Layout',
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

  // MEDIA
  if (cats.media) {
    if (blocks.video) {
      bm.add('bs-video', {
        label: `
            ${videoIcon}
            <span>${c.labels.video}</span>
        `,
        category: 'Media',
        content: {
          type: 'bs-video'
        }
      });
    }

    if (blocks.image) {
      bm.add('bs-image', {
        label: `
            ${imageIcon}
            <span>${c.labels.image}</span>
        `,
        category: 'Media',
        content: {
          type: 'bs-image'
        }
      });
    }
  }

  // COMPONENTS

  if (cats.components) {

    if (blocks.alert) {
      bm.add('alert', {
        label: `
            ${exclamationIcon}
            <span>${c.labels.alert}</span>
        `,
        category: 'Components',
        content: {
          type: 'alert',
          content: 'This is an alert—check it out!'
        }
      });
    }

    if (blocks.tabs) {
      bm.add('tabs', {
        label: `
            ${ellipsisIcon}
            <span>${c.labels.tabs}</span>
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
            ${circleIcon}
            <span>${c.labels.tab}</span>
        `,
        category: 'Components',
        content: {
          type: 'tabs-tab',
        }
      });
      bm.add('tabs-tab-pane', {
        label: `
            ${windowIcon}
            <span>${c.labels.tabPane}</span>
        `,
        category: 'Components',
        content: {
          type: 'tabs-tab-pane',
        }
      });
    }

    if (blocks.badge) {
      bm.add('badge', {
        label: `
            ${certificateIcon}
            <span>${c.labels.badge}</span>
        `,
        category: 'Components',
        content: {
          type: 'badge',
          content: 'New!'
        }
      });
    }

    if (blocks.card) {
      bm.add('card', {
        label: `
            ${cardIcon}
            <span>${c.labels.card}</span>
        `,
        category: 'Components',
        content: {
          type: 'card'
        }
      });
      bm.add('card_container', {
        label: `
            ${cardIcon}
            <span>${c.labels.card_container}</span>
        `,
        category: 'Components',
        content: {
          type: 'card_container'
        }
      });
    }

    if (blocks.collapse) {
      bm.add('collapse', {
        label: `
            ${compressIcon}
            <span>${c.labels.collapse}</span>
        `,
        category: 'Components',
        content: {
          type: 'collapse'
        }
      });
    }

    if (blocks.dropdown) {
      bm.add('dropdown', {
        label: `
            ${caretIcon}
            <span>${c.labels.dropdown}</span>
        `,
        category: 'Components',
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
        label: `
            ${fontIcon}
            <span>${c.labels.text}</span>
        `,
        category: 'Typography',
        content: {
          type:'text',
          content: 'Insert your text here'
        }
      });
    }

    if (blocks.header) {
      bm.add('header', {
        label: `
            ${headingIcon}
            <span>${c.labels.header}</span>
        `,
        category: 'Typography',
        content: {
          type: 'header',
          content: 'Bootstrap heading'
        }
      });
    }

    if (blocks.paragraph) {
      bm.add('paragraph', {
        label: `
            ${paragraphIcon}
            <span>${c.labels.paragraph}</span>
        `,
        category: 'Typography',
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
        label: `
            ${linkIcon}
            <span>${c.labels.link}</span>
        `,
        category: 'Basic',
        content: {
          type: 'link',
          content: 'Link text'
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
      ${formIcon}
      <span>${c.labels.form}</span>`,
      category: 'Forms',
      content: `
        <form>
          <div class="form-group">
            <label>Name</label>
            <input name="name" placeholder="Type here your name" class="form-control"/>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="Type here your email" class="form-control"/>
          </div>
          <div class="form-check">
            <input name="sex" type="checkbox" class="form-check-input" value="M">
            <label class="form-check-label">M</label>
          </div>
          <div class="form-check">
            <input name="sex" type="checkbox" class="form-check-input" value="F">
            <label class="form-check-label">F</label>
          </div>
          <div class="form-group">
            <label>Message</label>
            <textarea name="message" class="form-control"></textarea>
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
      ${inputIcon}
      <span>${c.labels.input}</span>`,
      category: 'Forms',
      content: '<input name="input1" class="form-control"/>',
    });
    bm.add('file-input', {
      label: `
            ${fileInputIcon}
            <span>${c.labels.file_input}</span>
        `,
      category: 'Forms',
      content: `<input type="file" name="file" class="form-control-file" id="exampleFormControlFile1">`
    });
  }

  if (blocks.form_group_input) {
    bm.add('form_group_input', {
      label: `
      ${formGroupIcon}
      <span>${c.labels.form_group_input}</span>`,
      category: 'Forms',
      content: `
      <div class="form-group">
        <label>Name</label>
        <input name="name" placeholder="Type here your name" class="form-control"/>
      </div>
      `,
    });
  }

  if (blocks.input_group) {
    bm.add('input_group', {
      label: `
      ${inputGroupIcon}
      <span>${c.labels.input_group}</span>`,
      category: 'Forms',
      content: `
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">$</span>
        </div>
        <input name="input1" type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
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
      ${textareaIcon}
      <span>${c.labels.textarea}</span>`,
      category: 'Forms',
      content: '<textarea name="textarea1" class="form-control"></textarea>',
    });
  }

  if (blocks.select) {
    bm.add('select', {
      label: `
      ${selectIcon}
      <span>${c.labels.select}</span>`,
      category: 'Forms',
      content: `<select class="form-control" name="select1">
        ${c.labels.select_option ? `<option value="">${c.labels.select_option}</option>` : ''}
        <option value="1">${c.labels.option} 1</option>
        </select>`,
    });
  }

  if (blocks.button) {
    bm.add('button', {
      label: `
      ${buttonIcon}
      <span>${c.labels.button}</span>`,
      category: 'Forms',
      content: '<button class="btn btn-primary">Send</button>',
    });
  }

  if (blocks.button_group) {
    bm.add('button_group', {
      label: `
            ${buttonIcon}
            <span>${c.labels.button_group}</span>
        `,
      category: 'Forms',
      content: {
        type: 'button_group'
      }
    });
  }

  if (blocks.button_toolbar) {
    bm.add('button_toolbar', {
      label: `
            ${buttonIcon}
            <span>${c.labels.button_toolbar}</span>
        `,
      category: 'Forms',
      content: {
        type: 'button_toolbar'
      }
    });
  }

  if (blocks.label) {
    bm.add('label', {
      label: `
      ${labelIcon}
      <span>${c.labels.label}</span>`,
      category: 'Forms',
      content: '<label>Label</label>',
    });
  }

  if (blocks.checkbox) {
    bm.add('checkbox', {
      label: `
            ${checkIcon}
            <span>${c.labels.checkbox}</span>
        `,
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
      label: `
            ${radioIcon}
            <span>${c.labels.radio}</span>
        `,
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
