const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJSPlugin()
    ]
  }
});
