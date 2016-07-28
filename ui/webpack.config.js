const webpack = require('webpack');

module.exports = {
  // entry: ['babel-polyfill', './public/components/novellist.js'],
  // entry: ['babel-polyfill', './public/components/chapter.js'],
  // entry: ['babel-polyfill', './public/components/chapterlist.js'],
  entry: ['babel-polyfill', './public/components/app.js'],
  output: {
    path: './public/build',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     mangle: {
  //       except: ['$super', '$', 'exports', 'require']
  //   },
  //     compress: {
  //       warnings: false,
  //     },
  //     output: {
  //       comments: false,
  //     },
  //   }),
  // ]
};