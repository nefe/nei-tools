const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    popup: path.join(__dirname, "src/popup/index.tsx"),
    options: path.join(__dirname, "src/options/index.tsx"),
    contentScripts: path.join(__dirname, "src/content_scripts/index.ts"),
    inject: path.join(__dirname, "src/content_scripts/inject.ts")
  },
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "multi-env-switch/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // Creates style nodes from JS strings
          },
          {
            loader: "css-loader" // Translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // Compiles Sass to CSS
          }
        ]
      }
    ]
  },
  performance: {
    hints: false
  },  
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
