// @ts-nocheck
const express = require("express");
const multer = require("multer");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("./webpack/webpack.config.prod.js");
const multipart = multer();
const app = express();
const devServerEnabled = true;
const cors = require("cors");

server_data = {
  hostchoice: "localhost",
  serverport: "80",
};

if (devServerEnabled) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

app.use(cors());

app.all("*", function (req, res, next) {
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(express.static("./build"));

app.listen(server_data.serverport, () => {
  console.log(
    `Server started on port: http://www.${server_data.hostchoice}:${server_data.serverport}`
  );
});
