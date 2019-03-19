const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 引入clean-webpack-plugin插件，作用是清除 dist 文件及下的内容，因为每次编译完成后都会有一个 dist 文件夹存放静态文件，所以需要清除上次的 dist 文件
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./config/config');
const paths = require('./config/paths');

const { USE_DLL } = config;
const IS_ANALYSIS = process.argv.includes('--analysis');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    new CleanWebpackPlugin([paths.appDist], {
      root: paths.appRoot, // 绝对路径，就是要根据这个 root 去找要删除的文件夹，默认是这个 webpack 配置文件所在额
      verbose: true, // 控制台打印日志
      dry: false, // 为 false 是删除文件夹的
      watch: true, // 在编译的时候删除打包文件就是在 npm start 或者 npm run dev，等跑本地服务的时候，删除之前的打包文件
      exclude: USE_DLL ? ['dll'] : [], // 排除不删除的目录，主要用于避免删除公用的文件
    }),
    IS_ANALYSIS && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  optimization: { // webpack4 去掉了 CommonsChunkPlugin，取而代之为 optimization.splitChunks 和 optimization.runtimeChunk 这两个配置。
    // 只在 production 模式下开启，否则禁用的相关配置：
    sideEffects: false, // 通过减少生成代码在性能上有积极的影响；优点：bundle 体积优化，更少生成代码；缺点：算法消耗；
    runtimeChunk: true,
    minimize: true, // 使用最小化工具来压缩输出的资源包，比如（optimization.minimizer 默认使用的uglify-js）；优点：减小 bundle 体积；缺点：编译速度降低；
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true, // improvement: multiple-process
        sourceMap: true,
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          mangle: true, // 混淆命名
          ie8: false, // 支持ie8?
          safari10: true, // fix 10 11 bugs
        },
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: "cssnano",
        cssProcessorPluginOptions: {
          preset: [
            "advanced",
            {
              discardComments: { removeAll: true },
              autoprefixer: true,
            },
          ],
        },
      }),
    ], // optimization.minimizer 屬性是用來放入各種壓縮 js 程式碼套件，如 TerserWebpackPlugin。而 optimization.minimize 屬性就像是 optimization.minimizer 的開關。
    // 总是开启的相关配置：
    splitChunks: { // 查找在 chunks 之间哪些 module 被共享，同时将他们拆分到独立的 chunks 中，目的是减少重复或者从 application modules 中分离 vendor modules。优点：更少生成代码，更好的缓存，更少的下载请求；缺点：算法消耗，额外的请求；
      automaticNameDelimiter: '~', // 抽取出来的文件的自动生成名字的分割符，默认为 ~；
      chunks: 'all', // 匹配的块的类型：initial(初始块)、async(按需加载的异步块)、all(所有块)
      minSize: 40000, // 分离前的最小文件大小，单位-字节
      cacheGroups: { // 缓存组，存放分离代码块的规则对象。可以继承/覆盖上面 splitChunks 中所有的参数值
        vender: {  // 把所有 node_modules 的模块被不同的 chunk 引入超过 1 次的抽取为 common
          test: /[\\/]node_modules[\\/]/,
          name: 'vender',
          chunks: 'initial',
          priority: 10, // 优先级。当需要优先匹配缓存组的规则时为正数，当需要优先匹配默认设置时为负数
          enforce: true,
          // minChunks: 2,
        },
      },
    }
  }
});
