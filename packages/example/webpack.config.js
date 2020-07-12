const path = require("path");

module.exports = {
  devtool: "source-map",
  entry: ["./src/index.tsx"],
  mode: "development",
  output: {
    filename: "index.js",
  },
  externals: {
    core: "jsx-pixi",
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
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "/dist"),
    compress: true,
    port: 9800,
    watchContentBase: true,
    progress: true,
  },
};
