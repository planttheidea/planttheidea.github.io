'use strict';

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve(__dirname, '..');

module.exports = {
  devtool: '#source-map',

  entry: path.join(ROOT, 'src/index.js'),

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

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
          mimetype: 'application/font-woff',
          name: 'dist/[hash].[ext]'
        },
        test: /.woff(2)?(?:\?.*|)$/
      },
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: 'dist/[hash].[ext]'
        },
        test: /\.ttf(?:\?.*|)?$/
      },
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: 'dist/[hash].[ext]'
        },
        test: /\.svg(?:\?.*|)?$/
      },
      {
        loader: 'file-loader',
        options: {
          name: 'dist/[hash].[ext]'
        },
        test: /\.eot(?:\?.*|)?$/
      }
    ]
  },

  output: {
    filename: 'dist/github-io.min.js'
  },

  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV']), new LodashModuleReplacementPlugin()],

  resolve: {
    modules: [path.resolve(ROOT, 'src'), 'node_modules']
  }
};
