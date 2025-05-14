const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");

const webpackConfig = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  mode: "development",
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      showErrors: true,
      inject: "body",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
  },
  module: {
    rules: [
      { test: /\.glsl$/, use: "raw-loader", exclude: /node_modules/ },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
};

const server = new WebpackDevServer(
  {
    client: {
      logging: "info",
      reconnect: 5,
    },
    hot: "only",
    liveReload: false,
    open: true,
    host: "localhost",
    port: "3312",
  },

  webpack(webpackConfig)
);
const runServer = async () => {
  await server.start();
};

runServer();

module.exports = (env, arg) => {
  return webpackConfig;
};
