const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { resolve } = require("path");

const app = require("../app.json");

module.exports = {
  entry: [resolve(__dirname, "../src/index.js")],
  mode: process.env.NODE_ENV || "development",
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      appMountId: app.mountNode,
      title: app.title,
      template: resolve(__dirname, "../src/index.html")
    })
  ],
  output: {
    path: resolve(__dirname, "../public"),
    publicPath: "/",
    filename: "bundle.[hash].js"
  },
  resolve: {
    alias: {
      "react-native$": "react-native-web"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          env: {
            development: {
              plugins: ["react-hot-loader/babel"]
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    port: process.env.PORT || 3000,
    hot: true
  }
};
