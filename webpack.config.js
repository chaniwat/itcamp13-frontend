var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// For localdev
// var rootPath = "";
// For fe13 (host)
var rootPath = "fe13/";

// Multiple ExtractTextPlugin for fonts and styles
var extractStyle = new ExtractTextPlugin({
  filename: 'css/app.css',
  allChunks: true
});

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, 'public_html/assets/frontend')
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
        use: extractStyle.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap'
          ]
        }),
        include: [path.join(__dirname, 'assets/scss')]
      },
      {
        test: /\.(woff2|ttf|eot|svg)$/,
        use: 'file-loader?name=[name].[ext]&outputPath=fonts/&publicPath=/'+rootPath+'assets/frontend/fonts/',
        include: [path.join(__dirname, 'assets/fonts')]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader?name=[name].[ext]&outputPath=images/&publicPath=/'+rootPath+'assets/frontend/images/',
        include: [path.join(__dirname, 'assets/images')]
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=index.html&outputPath=../../!extract-loader!html-loader'
      }
    ]
  },
  plugins: [
    extractStyle
  ]
};
