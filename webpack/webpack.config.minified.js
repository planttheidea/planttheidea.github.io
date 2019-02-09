'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const webpack = require('webpack');
const OptimizeJsPlugin = require('optimize-js-plugin');
const path = require('path');

const defaultConfig = require('./webpack.config');

module.exports = Object.assign({}, defaultConfig, {
  devtool: undefined,

  mode: 'production',

  plugins: defaultConfig.plugins.concat([
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: 'index.html',
      template: 'template.html',
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, '..'),
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),
    new OptimizeJsPlugin({
      sourceMap: false,
    }),
  ]),
});
