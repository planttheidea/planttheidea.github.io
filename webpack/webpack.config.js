'use strict';

const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve(__dirname, '..');

module.exports = {
  devtool: '#source-map',

  entry: path.join(ROOT, 'src/index.js'),

  module: {
    rules: [
      {
        enforce: 'pre',
        include: [path.resolve(ROOT, 'src')],
        options: {
          emitError: true,
          failOnError: true,
          failOnWarning: true,
          formatter: require('eslint-friendly-formatter')
        },
        loader: 'eslint-loader',
        test: /\.js$/
      },
      {
        include: [path.resolve(ROOT, 'src'), /DEV_ONLY/],
        loader: 'babel-loader',
        test: /\.js$/
      }
    ]
  },

  output: {
    filename: 'github.io.js',
    path: path.resolve(ROOT, 'dist')
  },

  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])],

  resolve: {
    modules: [path.resolve(ROOT, 'src'), 'node_modules']
  }
};
