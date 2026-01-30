const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  devtool: "source-map",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@view": path.resolve(__dirname, "src/view"),
      "@model": path.resolve(__dirname, "src/model"),
      "@presenter": path.resolve(__dirname, "src/presenter"),
      "@framework": path.resolve(__dirname, "src/framework"),
      "@service": path.resolve(__dirname, "src/service"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@mock": path.resolve(__dirname, "src/mock"),
    },
  },
  plugins: [
    new HtmlPlugin({
      template: 'public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html"],
          }
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
    ]
  }
}
