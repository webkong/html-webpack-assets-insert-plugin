# Assets Extension for HTML Webpack Plugin

[![npm version](https://badge.fury.io/js/html-webpack-assets-insert-plugin.svg)](http://badge.fury.io/js/html-webpack-assets-insert-plugin) [![Build status](https://travis-ci.org/webkong/html-webpack-assets-insert-plugin.svg?branch=master)](https://travis-ci.org/webkong/html-webpack-assets-insert-plugin.svg?branch=master)

[![NPM](https://nodei.co/npm/html-webpack-assets-insert-plugin.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/html-webpack-assets-insert-plugin/)

Enhances [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
functionality with different deployment options for your html.

This is an extension plugin for the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) - a plugin that simplifies the creation of HTML files to serve your webpack bundles.

The raw [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) incorporates all webpack-generated javascipt as `<script>` elements and css as `<link>` elements in the generated html. This plugin allows you to:

- add script tags to html file;
- add style tags to html file;

## Installation

You must be running webpack (3.x, 4.x) on node 8+.
Install the plugin with npm:

```shell
$ npm install html-webpack-assets-insert-plugin -D
# or
$ yarn install html-webpack-assets-insert-plugin -D
```

Not that you will need v3.x or v4.x of [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

You may see an `UNMET PEER DEPENDENCY` warnings for webpack and various plugins.

## Basic Usage

Add the plugin to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackAssetsInsertPlugin({
    js: {
      prepend: true,
      path: [
        "https://cdn.jsdelivr.net/npm/vue",
        "https://cdn.jsdelivr.net/npm/vue-router",
      ],
    },
    css: {
      prepend: false,
      path: ["http://testcss.com/test.css"],
    },
  }),
];
```

The effect of the compiled:

```html
<head>
  ....

  <link href="http://testcss.com/test.css" rel="stylesheet" />
</head>

<body>
  ...
  <!-- add by plugin -->
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue-router"></script>
  <!-- add by nuxt -->
  <script src="/_nuxt/runtime.9458cd8.js"></script>
  <script src="/_nuxt/commons/app.0872ce0.js"></script>
  <script src="/_nuxt/vendors~app.7b9299e.js"></script>
  <script src="/_nuxt/app.28d1ccd.js"></script>
</body>
```

In the vue-cli configuration file:

```javascript
configureWebpack: (config) => {
  config.plugins.push(
    new HtmlWebpackAssetsInsertPlugin({
      js: {
        prepend: true,
        path: [""],
      },
      css: {
        path: [],
      },
    })
  );
};
```

In the nuxt.js configuration file:

```javascript
build: {
    extend (config, { isClient }) {
      if (isClient) {
        config.plugins.push(new HtmlWebpackAssetsInsertPlugin({
          js: {
            prepend: true,
            path: [
              '',
              ''
            ]
          },
          css: {
            prepend: false
          }
        }))
        // externals config
        // config.externals = {
        //   vue: 'Vue',
        //   axios: 'axios',
        // }
      }
    }
  }
```

The order is important - the plugin must come **after** HtmlWebpackPlugin.

## Options

| Options | Type   | Other |
| ------- | ------ | ----- |
| js      | Object |       |
| css     | Object |       |

### Options(js)

| Options | Type          | Other                                                    |
| ------- | ------------- | -------------------------------------------------------- |
| prepend | boolean       | Set the script tags insertion position. Default is true. |
| path    | Array<string> | Insert script tags according to array index.             |

### Options(css)

| Options | Type          | Other                                                   |
| ------- | ------------- | ------------------------------------------------------- |
| prepend | boolean       | Set the link tags insertion position. Default is false. |
| path    | Array<string> | Insert link tags according to array index.              |

## release
v1.0.4
- modify readme

v1.0.1

- initial release

v0.0.1

- initial
