const path = require("path");

module.exports = {
  devtool: "source-map",
  mode: "production",
  entry: ["./src/index.ts"],
  output: {
    library: "jsx-pixi-components",
    libraryTarget: "amd",
    filename: "index.js",
  },
  externals: {
    "pixi.js": "pixi.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
      { test: /\.tsx?$/, exclude: /(node_modules)/, loader: "ts-loader" },
    ],
  },
};
