const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, "dist"), // 本地服务器所加载的页面所在的目录
    publicPath: "/",
    historyApiFallback: true, // 不跳转
    inline: true, // 实时刷新
    hot: true,  // 热加载
    host: '127.0.0.1',  // 主机地址
    port: 9000,  // 端口号
    compress: true,  // 开发服务器是否启动gzip等压缩
    proxy: {
        "/api": {
            target: 'http://127.0.0.1:9000/',
          changeOrigin: true
        }
    },
  },
});
