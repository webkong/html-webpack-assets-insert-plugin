// If your plugin is direct dependent to the html webpack plugin:
const HtmlWebpackPlugin = require("html-webpack-plugin");

class HtmlWebpackAssetsInsertPlugin {
  constructor(options) {
    this.options = options;
    this.jsPrepend = options.js.prepend || true;
    this.jsPath = options.js.path || [];
  }

  apply(compiler) {
    const paths = this.options.paths;
    compiler.hooks.compilation.tap("AssetsInsertPlugin", (compilation) => {
      console.log("The compiler is starting a new compilation...");

      // Static Plugin interface |compilation |HOOK NAME | register listener
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tap(
        "HtmlWebpackAssetsInsertPlugin", // <-- Set a meaningful name here for stacktraces
        (htmlPluginData) => {
          console.log("insert");
          for (let i = this.jsPath.length - 1; i >= 0; i--) {
            htmlPluginData.assets.js.unshift(this.jsPath[i]);
          }
            // cb(null, htmlPluginData)
        }
      );
    });
  }
}

module.exports = HtmlWebpackAssetsInsertPlugin;
