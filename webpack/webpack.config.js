'use strict';

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve(__dirname, '..');

const pkg = require('../package.json');

module.exports = {
  devtool: '#source-map',

  entry: path.join(ROOT, 'src/index.js'),

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  mode: 'development',

  module: {
    rules: [
      {
        enforce: 'pre',
        include: [path.resolve(ROOT, 'src')],
        loader: 'eslint-loader',
        options: {
          emitError: true,
          failOnError: true,
          failOnWarning: true,
          formatter: require('eslint-friendly-formatter'),
        },
        test: /\.js$/,
      },
      {
        include: [path.resolve(ROOT, 'src'), /DEV_ONLY/],
        loader: 'babel-loader',
        test: /\.js$/,
      },
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: '[hash].[ext]',
        },
        test: /.woff(2)?(?:\?.*|)$/,
      },
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: '[hash].[ext]',
        },
        test: /\.ttf(?:\?.*|)?$/,
      },
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: '[hash].[ext]',
        },
        test: /\.svg(?:\?.*|)?$/,
      },
      {
        loader: 'file-loader',
        options: {
          name: '[hash].[ext]',
        },
        test: /\.eot(?:\?.*|)?$/,
      },
    ],
  },

  output: {
    filename: `github-io.min.js?version=${pkg.version}`,
    publicPath: 'dist',
  },

  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV']), new LodashModuleReplacementPlugin()],

  resolve: {
    modules: [path.resolve(ROOT, 'src'), 'node_modules'],
  },
};
