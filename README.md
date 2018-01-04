# GrapesJS Bootstrap v4 Blocks Plugin

[![npm](https://img.shields.io/npm/v/grapesjs-blocks-bootstrap4.svg)](https://www.npmjs.com/package/grapesjs-blocks-bootstrap4)

<!--<span><a href="https://david-dm.org/z1lk/grapesjs-plugin-boilerplate#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/artf/grapesjs-plugin-boilerplate.svg" alt="Dev Dependency Status" /></a></span>-->

<!--<a rel="nofollow" href="https://app.codesponsor.io/link/nb9nPYf2XqCE1PbgcQj6gf4D/artf/grapesjs-plugin-boilerplate">
  <img alt="Sponsor" width="888" height="68" src="https://app.codesponsor.io/embed/nb9nPYf2XqCE1PbgcQj6gf4D/artf/grapesjs-plugin-boilerplate.svg"/>
</a>-->

## Summary

* Plugin name: `grapesjs-blocks-bootstrap4`
* Components (see Options for list of Blocks)
  * Layout
    * `container`
    * `row`
    * `column`
    * `column_break`
    * `media_object`
  * Components
    * `alert`
    * `badge`
    * `button`
    * `button_group`
    * `button_toolbar`
    * `card`
    * `card_container`
    * `collapse`
    * `dropdown`
    * `dropdown_menu`
  * Typography
    * `text`
    * `header`
    * `paragraph`
  * Basic
    * `image`
<!--* Blocks
  * `container`
  * `row`
  * `column`
  * `column_break`
  * `text`
  * `header`-->





## Options

```js
{
  blocks: {
    ...
  }
  blockCategories: {
    ...
  }
  labels: {
    ...
  }
  ...
}
```

### Blocks

|Option|Description|Default|
|-|-|-
|`default`|Rebuild default component with utility settings|true|
|`text`|Rebuild text component to re-inherit from default|true|
|`link`|Rebuild link component to re-inherit from default and give toggle setting|true|
|`image`|Rebuild image component to re-inherit from default|true|
|`container`|Container (fixed/fluid)|true|
|`row`|Row|true|
|`column`|Columns of all sizes|true|
|`column_break`|Column-break (`div.w-100`)|true|
|`media_object`||true|
|`media_body`|Media object body|true|
|`alert`||true|
|`badge`||true|
|`button`||true|
|`button_group`||true|
|`button_toolbar`||true|
|`card`|Card with settings for images, image overlay, header, body, & footer components|true|
|`card_container`|Layouts: group, deck, columns|true|
|`collapse`|Collapse component that can be toggled via link component|true|
|`dropdown`|Dropdown|true|
|`header`|H1-H6|true|
|`paragraph`|P tag with "lead" setting|true|

### Block Categories

These are the different categories of blocks as they are grouped in the Blocks sidebar panel. Set a value to false exclude entire groups of blocks (as well as the associated components).

|Option|Description|Default|
|-|-|-
|`layout`|Container, row, col, col-break, media object|true|
|`components`|_Bootstrap_'s Components--alert, button, card, etc.|true|
|`typography`|Text, header, paragraph, etc.|true|
|`basic`|Link, image, etc.|true|


### Labels

Same keys as Blocks, but value is the label for the block.

|Option|Description|Default|
|-|-|-
|`text`||'Text'|
|`header`||'Header'|

etc.

### Other

|Option|Description|Default|
|-|-|-
|`gridDevices`|Add devices based on BS grid breakpoints|true|
|`gridDevicesPanel`|Build a panel in the top-left corner with device buttons (use with editor `showDevices`=`false`)|false|

## Download

<!--* CDN
  * `https://unpkg.com/grapesjs-blocks-bootstrap4` -->
* NPM
  * `npm i grapesjs-blocks-bootstrap4`
* GIT
  * `git clone https://github.com/z1lk/grapesjs-blocks-bootstrap4.git`





## Usage

```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-blocks-bootstrap4.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      ...
      plugins: ['grapesjs-blocks-bootstrap4'],
      pluginsOpts: {
        'grapesjs-blocks-bootstrap4': {
          blocks: {
            // ...
          },
          blockCategories: {
            // ...
          },
          labels: {
            // ...
          },
          // ...
        }
      },
      canvas: {
        styles: [
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css'
        ],
        scripts: [
          'https://code.jquery.com/jquery-3.2.1.slim.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js',
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js'
        ],
      }
  });
</script>
```





## Development

Clone the repository

```sh
$ git clone https://github.com/z1lk/grapesjs-blocks-bootstrap4.git
$ cd grapesjs-blocks-bootstrap4
```

Install dependencies

```sh
$ npm i
```

The plugin relies on GrapesJS via `peerDependencies` so you have to install it manually (without adding it to package.json)

```sh
$ npm i grapesjs --no-save
```

Start the dev server

```sh
$ npm start
```





## License

BSD 3-Clause
