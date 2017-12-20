# GrapesJS Plugin Boilerplate

<!--<span><a href="https://david-dm.org/artf/grapesjs-plugin-boilerplate#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/artf/grapesjs-plugin-boilerplate.svg" alt="Dev Dependency Status" /></a></span>

<a rel="nofollow" href="https://app.codesponsor.io/link/nb9nPYf2XqCE1PbgcQj6gf4D/artf/grapesjs-plugin-boilerplate">
  <img alt="Sponsor" width="888" height="68" src="https://app.codesponsor.io/embed/nb9nPYf2XqCE1PbgcQj6gf4D/artf/grapesjs-plugin-boilerplate.svg"/>
</a>-->

## Summary

* Plugin name: `grapesjs-blocks-bootstrap4`
* Components
  * `header`
* Blocks
  * `text`
  * `header`





## Options

|Option|Description|Default|
|-|-|-
|`option1`|Description option|`default value`|





## Download

* CDN
  * `https://unpkg.com/grapesjs-blocks-bootstrap4`
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
          // options
        }
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
