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
      },
      {
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ],
        test: /\.css/
      },
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        },
        test: /.woff(2)?(?:\?.*|)$/
      },
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream'
        },
        test: /\.ttf(?:\?.*|)?$/
      },
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml'
        },
        test: /\.svg(?:\?.*|)?$/
      },
      {
        loader: 'file-loader',
        test: /\.eot(?:\?.*|)?$/
      }
    ]
  },

  output: {
    filename: 'github-io.js',
    path: path.resolve(ROOT, 'dist')
  },

  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])],

  resolve: {
    modules: [path.resolve(ROOT, 'src'), 'node_modules']
  }
};
