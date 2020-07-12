const path = require("path");

module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: ["./src/index.ts"],
  output: {
    library: "jsx-pixi",
    libraryTarget: "umd",
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
};
