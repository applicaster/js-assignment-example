const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { resolve } = require("path");

const app = require("../app.json");

module.exports = {
  entry: ["babel-polyfill", resolve(__dirname, "../src/index.js")],
  mode: process.env.NODE_ENV || "development",
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV === "development"),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      UNSPLASH_ACCESS_KEY: JSON.stringify(process.env.UNSPLASH_ACCESS_KEY),
      UNSPLASH_SECRET_KEY: JSON.stringify(process.env.UNSPLASH_SECRET_KEY),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      appMountId: app.mountNode,
      title: app.title,
      template: resolve(__dirname, "../src/index.html"),
    }),
  ],
  output: {
    path: resolve(__dirname, "../public"),
    publicPath: "/",
    filename: "bundle.[hash].js",
  },
  resolve: {
    alias: {
      "react-native$": "react-native-web",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          env: {
            development: {
              plugins: ["react-hot-loader/babel"],
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    port: process.env.PORT || 3000,
    hot: true,
  },
};
