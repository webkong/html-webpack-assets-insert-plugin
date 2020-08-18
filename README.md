# Assets Extension for HTML Webpack Plugin

[![npm version](https://badge.fury.io/js/html-webpack-assets-insert-plugin.svg)](http://badge.fury.io/js/html-webpack-assets-insert-plugin) [![Dependency Status](https://david-dm.org/web/html-webpack-assets-insert-plugin.svg)](https://david-dm.org/web/html-webpack-assets-insert-plugin) [![Build status](https://travis-ci.org/web/html-webpack-assets-insert-plugin.svg)](https://travis-ci.org/web/html-webpack-assets-insert-plugin) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

[![NPM](https://nodei.co/npm/html-webpack-assets-insert-plugin.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/html-webpack-assets-insert-plugin/)

Enhances [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
functionality with different deployment options for your html.

This is an extension plugin for the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) - a plugin that simplifies the creation of HTML files to serve your webpack bundles.

The raw [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) incorporates all webpack-generated javascipt as `<script>` elements and css as `<link>` elements in the generated html. This plugin allows you to:

- add script tags to html file;
- add style tags to html file;

## Installation

You must be running webpack (3.x, 4.x) on node 6+.
Install the plugin with npm:

```shell
$ npm install html-webpack-assets-insert-plugin -D
```

Not that you will need v3.0.6+ or v4.x of [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

You may see an `UNMET PEER DEPENDENCY` warnings for webpack and various plugins.

## Basic Usage

Add the plugin to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackAssetsInsertPlugin({
    js: {
      prepend: true,
      path: [""],
    },
    css: {
      prepend: false,
      path: [""],
    },
  }),
];
```

The order is important - the plugin must come **after** HtmlWebpackPlugin.

## Options

| Options | Type   | Other |
| ------- | ------ | ----- |
| js      | Object |       |
| css     | Object |       |

### Options(js)

| Options | Type          | Other |
| ------- | ------------- | ----- |
| prepend | boolean       |       |
| path    | Array<string> |       |

### Options(css)

| Options | Type          | Other |
| ------- | ------------- | ----- |
| prepend | boolean       |       |
| path    | Array<string> |       |

## release

v1.0.1
- initial release

v0.0.1
- initial release
