var HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('./package.json');
var webpack = require('webpack');
var fs = require('fs');
var name = pkg.name;
var plugins = [];

if (process.env.WEBPACK_ENV !== 'dev') {
  plugins = [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {warnings: false},
    }),
    new webpack.BannerPlugin(name + ' - ' + pkg.version),
  ]
} else {
  var index = 'index.html';
  var indexDev = '_' + index;
  plugins.push(new HtmlWebpackPlugin({
    template: fs.existsSync(indexDev) ? indexDev : index
  }));
}

module.exports = {
  entry: './src',
  output: {
      filename: './dist/' + name + '.min.js',
      library: name,
      libraryTarget: 'umd',
  },
  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: /src/,
        exclude: /node_modules/
    }],
  },
  externals: {'grapesjs': 'grapesjs'},
  plugins: plugins,
};
