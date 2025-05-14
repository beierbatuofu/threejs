const path = require("path");
const CopyWebpckPlugin = require("copy-webpack-plugin");

const webpackConfig = {
  entry: path.resolve(__dirname, "./src/index.js"),
  mode: "none",
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "./lib"),
    filename: "index.js",
    library: "huyong3d",
    libraryTarget: "umd",
    libraryExport: "default",
  },

  externals: {
    suncalc: "suncalc",
    three: "three",
    "three-csg-ts": "three-csg-ts",
  },
  plugins: [
    new CopyWebpckPlugin({
      patterns: [
        {
          from: "./public",
        },
      ],
    }),
  ],

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
