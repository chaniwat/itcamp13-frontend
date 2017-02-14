var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public_html/assets/frontend/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [path.join(__dirname, 'src')]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap'
          ]
        }),
        include: [path.join(__dirname, 'style')]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "../css/app.css",
      allChunks: true
    })
  ]
};
