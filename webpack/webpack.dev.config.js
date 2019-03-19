const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const paths = require('./config/paths');
const proxyConfig = require('./config/proxy');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map', // 选择一种 source map 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。
  devServer: {
    compress: true,  // 开发服务器是否启动gzip等压缩
    clientLogLevel: "none",
    contentBase: paths.appDist, // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, // 404 的页面会自动跳转到/页面
    publicPath: paths.PUBLIC_PATH, // 此路径下的打包文件可在浏览器中访问。
    overlay: { // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。
      warnings: true,
      errors: true
    },
    useLocalIp: true, // 允许浏览器使用本地 IP 打开
    port: 9000,  // 端口号
    host: '0.0.0.0',  // 主机地址
    inline: true, // 实时刷新
    hot: true,  // 热加载
    disableHostCheck: false, // 设置为 true 时，此选项绕过主机检查。不建议这样做，因为不检查主机的应用程序容易受到 DNS 重新连接攻击。
    proxy: { ...proxyConfig },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
  ],
  optimization: {
    runtimeChunk: true,
  },
})
