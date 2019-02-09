'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const defaultConfig = require('./webpack.config');

const pkg = require('../package.json');

module.exports = Object.assign({}, defaultConfig, {
  devServer: {
    contentBase: './dist',
    inline: true,
    port: 3000,
    stats: {
      assets: false,
      chunkModules: false,
      chunks: true,
      colors: true,
      hash: false,
      timings: true,
      version: false,
    },
  },

  module: Object.assign({}, defaultConfig.module, {
    rules: defaultConfig.module.rules.map((rule) => {
      if (rule.loader === 'eslint-loader') {
        return Object.assign({}, rule, {
          options: Object.assign({}, rule.options, {
            emitError: undefined,
            failOnWarning: false,
          }),
        });
      }

      return rule;
    }),
  }),

  plugins: [
    ...defaultConfig.plugins,
    new HtmlWebpackPlugin({
      template: 'template.html',
      version: pkg.version,
    }),
  ],
});
