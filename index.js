let HtmlWebpackAssetsInsertPlugin = function (options) {
  options = options || {};
  this.options = options;
};

HtmlWebpackAssetsInsertPlugin.prototype.injectAssets = function (
  htmlData,
  callback
) {
  if (this.options.js) {
    let path = this.options.js.path;
    for (let i = path.length - 1; i >= 0; i--) {
      if (this.options.js.prepend) {
        htmlData.assets.js.unshift(path[i]);
      } else {
        htmlData.assets.js.push(path[i]);
      }
    }
  }
  if (this.options.css) {
    let path = this.options.css.path;
    for (let i = path.length - 1; i >= 0; i--) {
      if (this.options.css.prepend) {
        htmlData.assets.css.unshift(path[i]);
      } else {
        htmlData.assets.css.push(path[i]);
      }
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
