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
import {ContainerBlock} from './components/Container';

export default (editor, config = {}) => {
  const c = config;
  let bm = editor.BlockManager;
  let blocks = c.blocks;
  let cats = c.blockCategories;



  // TYPOGRAPHY

  if (cats.typography) {

    if (blocks.text) {
      bm.add('text', {
        label: `
            ${fontIcon}
            <div>${c.labels.text}</div>
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
            <div>${c.labels.header}</div>
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
            <div>${c.labels.paragraph}</div>
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
            <div>${c.labels.link}</div>
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
      <div>${c.labels.form}</div>`,
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
      <div>${c.labels.input}</div>`,
      category: 'Forms',
      content: '<input name="input1" class="form-control"/>',
    });
    bm.add('file-input', {
      label: `
            ${fileInputIcon}
            <div>${c.labels.file_input}</div>
        `,
      category: 'Forms',
      content: `<input type="file" name="file" class="form-control-file" id="exampleFormControlFile1">`
    });
  }

  if (blocks.form_group_input) {
    bm.add('form_group_input', {
      label: `
      ${formGroupIcon}
      <div>${c.labels.form_group_input}</div>`,
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
      <div>${c.labels.input_group}</div>`,
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
      <div>${c.labels.textarea}</div>`,
      category: 'Forms',
      content: '<textarea name="textarea1" class="form-control"></textarea>',
    });
  }

  if (blocks.select) {
    bm.add('select', {
      label: `
      ${selectIcon}
      <div>${c.labels.select}</div>`,
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
      <div>${c.labels.button}</div>`,
      category: 'Forms',
      content: '<button class="btn btn-primary">Send</button>',
    });
  }

  if (blocks.button_group) {
    bm.add('button_group', {
      label: `
            ${buttonIcon}
            <div>${c.labels.button_group}</div>
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
            <div>${c.labels.button_toolbar}</div>
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
      <div>${c.labels.label}</div>`,
      category: 'Forms',
      content: '<label>Label</label>',
    });
  }

  if (blocks.checkbox) {
    bm.add('checkbox', {
      label: `
            ${checkIcon}
            <div>${c.labels.checkbox}</div>
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
            <div>${c.labels.radio}</div>
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
