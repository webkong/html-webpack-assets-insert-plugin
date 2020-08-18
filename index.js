let HtmlWebpackAssetsInsertPlugin = function (options) {
  options = options || {};
  this.options = options;
  const {
    js: { prepend: jsPrepend, path: jsPath } = { prepend: true, path: [] },
    css: { prepend: cssPrepend, path: cssPath } = { prepend: false, path: [] },
  } = options;
  this.jsPrepend = jsPrepend || true;
  this.jsPath = jsPath || [];
  this.cssPrepend = cssPrepend || false;
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
        for (let i = 0; i <this.cssPath.length; i++) {
            htmlData.assets.css.push(this.cssPath[i]);
        }
    }
  callback(null, htmlData);
};

HtmlWebpackAssetsInsertPlugin.prototype.apply = function (compiler) {
  console.log("Start insert assets...");
  if (compiler.hooks) {
    // webpack 4 support
    compiler.hooks.compilation.tap(
      "HtmlWebpackAssetsInsertPlugin",
      (compilation) => {
        if (compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing) {
          // HtmlWebPackPlugin 3.x
          compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
            "HtmlWebpackAssetsInsertPlugin",
            (htmlData, callback) => {
              this.injectAssets(htmlData, callback);
            }
          );
        } else {
          // HtmlWebPackPlugin 4.x
          const HtmlWebpackPlugin = require("html-webpack-plugin");
          HtmlWebpackPlugin.getHooks(
            compilation
          ).beforeAssetTagGeneration.tapAsync(
            "HtmlWebpackAssetsInsertPlugin",
            (htmlData, callback) => {
              this.injectAssets(htmlData, callback);
            }
          );
        }
      }
    );
  } else {
    console.log(3);
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
