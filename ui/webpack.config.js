module.exports = {
  entry: ['babel-polyfill', './public/components/novellist.js'],
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
  }
};