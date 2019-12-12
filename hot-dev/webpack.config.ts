const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: path.join(__dirname, "./src/index.ts"),
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "main.js"
  },
  resolve: {
    extensions: [".ts", "tsx", ".js"]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
      filename: "index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    open: true,
    port: 3000,
    contentBase: "src",
    hot: true
  }
};
