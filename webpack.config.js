const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpckPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpackConfig = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  mode: "none",
  devtool: "nosources-source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "./",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      showErrors: true,
      inject: "body",
    }),
    new CopyWebpckPlugin({
      patterns: [
        {
          from: "./public",
        },
      ],
    }),
    new TerserPlugin(),
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

module.exports = (env, arg) => {
  return webpackConfig;
};
