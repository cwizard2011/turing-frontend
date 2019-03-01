const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config.js');

const webpackDevConfig = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ]
});

module.exports = webpackDevConfig;
