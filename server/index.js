const { resolve } = require("path");
const express = require("express");
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config");

const app = express();
const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV !== "production") {
  webpackConfig.entry.unshift("webpack-hot-middleware/client");
  app.use(middleware(compiler));
  app.use(hotMiddleware(compiler));
} else {
  app.use(express.static(resolve(__dirname, "../public")));
}

app.use("/assets", express.static(resolve(__dirname, "../assets")));

// eslint-disable-next-line no-console
app.listen(process.env.PORT || 3000, () => console.log("express app running"));
