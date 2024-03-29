const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

let apiURL = null
if (process.env.NANO_API_HOST) {
  apiURL = `https://${process.env.NANO_API_HOST}.onrender.com/backend`
} else if (process.env.NANO_API_URL) {
  apiURL = process.env.NANO_API_URL
}

module.exports = {
  entry: "./frontend/javascript/index.js",
  devtool: "source-map",
  // Set some or all of these to true if you want more verbose logging:
  stats: {
    modules: false,
    builtAt: false,
    timings: false,
    children: false,
  },
  output: {
    path: path.resolve(__dirname, "output", "_bridgetown", "static", "js"),
    filename: "all.[contenthash].js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      path.resolve(__dirname, 'frontend', 'javascript'),
      path.resolve(__dirname, 'frontend', 'styles'),
      path.resolve('./node_modules')
    ],
    alias: {
      bridgetownComponents: path.resolve(__dirname, "src", "_components")
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      NANO_API_URL: JSON.stringify(apiURL || "/backend")
    }),
    new MiniCssExtractPlugin({
      filename: "../css/all.[contenthash].css",
    }),
    new ManifestPlugin({
      fileName: path.resolve(__dirname, ".bridgetown-webpack", "manifest.json"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              [
                "@babel/plugin-transform-runtime",
                {
                  helpers: false,
                },
              ],
            ],
          },
        },
      },
      
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: url => !url.startsWith('/')
            }
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, "src/_components")
                ],
              },
            },
          },
        ],
      },
      
      {
        test: /\.woff2?$|\.ttf$|\.eot$/,
        loader: "file-loader",
        options: {
          name: "[name]-[contenthash].[ext]",
          outputPath: "../fonts",
          publicPath: "../fonts",
        },
      },
      {
        test: /\.png?$|\.gif$|\.jpg$|\.svg$/,
        loader: "file-loader",
        options: {
          name: "[name]-[contenthash].[ext]",
          outputPath: "../images",
          publicPath: "../images",
        },
      },
    ],
  },
};
