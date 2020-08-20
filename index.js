let HtmlWebpackAssetsInsertPlugin = function (options) {
  options = options || {};
  this.options = options;
  const {
    js: { prepend : jsPrepend = true, path: jsPath } = { prepend: true, path: [] },
    css: { prepend: cssPrepend = false, path: cssPath } = { prepend: false, path: [] },
  } = options;
  this.jsPrepend = jsPrepend;
  this.jsPath = jsPath || [];
  this.cssPrepend = cssPrepend;
  this.cssPath = cssPath || [];
};

HtmlWebpackAssetsInsertPlugin.prototype.injectAssets = function (
  htmlData,
  callback
) {
  if (this.jsPath.length > 0) {
    if (this.jsPrepend) {
      for (let i = this.jsPath.length - 1; i >= 0; i--) {
        htmlData.assets.js.unshift(this.jsPath[i]);
      }
    } else {
      for (let i = 0; i < this.jsPath.length; i++) {
        htmlData.assets.js.push(this.jsPath[i]);
      }
    }
  }
  if (this.cssPath.length > 0) {
    if (this.cssPrepend) {
      for (let i = this.cssPath.length - 1; i >= 0; i--) {
        htmlData.assets.css.unshift(this.cssPath[i]);
      }
    } else {
      for (let i = 0; i < this.cssPath.length; i++) {
        htmlData.assets.css.push(this.cssPath[i]);
      }
    }
    if (callback) {
      callback(null, htmlData);
    }
  }
};
HtmlWebpackAssetsInsertPlugin.prototype.apply = function (compiler) {
  if (compiler.hooks) {
    // webpack 4 support
    compiler.hooks.compilation.tap(
      "HtmlWebpackAssetsInsertPlugin",
      (compilation) => {
        if (compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing) {
          // HtmlWebPackPlugin 3.x
          compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(
            "HtmlWebpackAssetsInsertPlugin",
            (htmlData) => {
              this.injectAssets(htmlData);
            }
          );
        } else {
          // HtmlWebPackPlugin 4.x
          const HtmlWebpackPlugin = require("html-webpack-plugin");
          HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tap(
            "HtmlWebpackAssetsInsertPlugin",
            (htmlData) => {
              this.injectAssets(htmlData);
            }
          );
        }
      }
    );
  } else {
    // webpack 3 support
    compiler.plugin("compilation", (compilation) => {
      compilation.plugin(
        "html-webpack-plugin-before-html-processing",
        (htmlData, callback) => {
          this.injectAssets(compilation, htmlData, callback);
        }
      );
    });
  }
};

module.exports = HtmlWebpackAssetsInsertPlugin;
