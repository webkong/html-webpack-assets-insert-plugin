import { Compiler } from "webpack";

export = HtmlWebpackAssetsInsertPlugin;

declare class HtmlWebpackAssetsInsertPlugin {
  constructor(options?: HtmlWebpackAssetsInsertPlugin.Options);

  apply(compiler: Compiler): void;
}

declare namespace HtmlWebpackAssetsInsertPlugin {
  interface Options {
    js?: ItemOptions;
    css?: ItemOptions;
  }
  interface ItemOptions {
    prepend?: boolean; // 默认为true
    path?: Array<string>;
  }
}
