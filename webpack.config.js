const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/app/browser.js')
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  output: {
    path: path.resolve(__dirname, 'dist/app'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'}
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'conversee',
      template: path.resolve(__dirname, 'src/app/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}