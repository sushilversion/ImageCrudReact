const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require('path');
module.exports = {
  // entry: './src/index.js',

  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'main.js',
  //   publicPath: '/'
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "http://localhost:4000"
    })
  }
};
