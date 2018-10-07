const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 引入html-webpack-plugin插件,作用是添加模板到编译完成后的dist的文件里面
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 引入clean-webpack-plugin插件，作用是清除dist文件及下的内容，因为每次编译完成后都会有一个dist文件夹存放静态文件，所以需要清除上次的dist文件
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom', 'redux'],
    bundle: __dirname + '/src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    // 删除不必要的后缀自动补全，少了文件后缀的自动匹配，即减少了文件路径查询的工作
    // 其他文件可以在编码时指定后缀，如 import('./index.scss')
    extensions: ['.js', '.jsx', '.json', '.less'],
    // 避免新增默认文件，编码时使用详细的文件路径，代码会更容易解读，也有益于提高构建速度
    mainFiles: ['index'],
    alias: {},
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            minimize: true, // 使用 css 的压缩功能
          },
        },
        'less-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            minimize: true, // 使用 css 的压缩功能
          },
        },
        "postcss-loader",
      ]
    }, {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      use: [{
        loader: "url-loader",
        query: {
          limit: 8192,
          name: "images/[name]-[hash:5].[ext]"
        }
      }, {
        loader: "image-webpack-loader",
        options: {
          mozjpeg: { // 压缩 jpeg 的配置
            progressive: true,
            quality: 65
          },
          optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
            enabled: false,
          },
          pngquant: { // 使用 imagemin-pngquant 压缩 png
            quality: '65-90',
            speed: 4
          },
          gifsicle: { // 压缩 gif 的配置
            interlaced: false,
          },
          webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
            quality: 75
          },
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'index',
      filename: "index.html",
      template: "./src/index.ejs",
      minify: { // 压缩 HTML 的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true // 压缩 HTML 中出现的 JS 代码
      }
    }),
    new CopyWebpackPlugin([{
      from: __dirname + '/public',
    }])
    // new webpack.ProvidePlugin({
    //   _: 'lodash' //所有页面都会引入 _ 这个变量，不用再import引入
    // }),
  ],
  optimization: {
    sideEffects: false,
    splitChunks: {
      minSize: 40000, // 分离前的最小文件大小，单位-字节
      chunks: 'all', // 匹配的块的类型：initial(初始块)、async(按需加载的异步块)、all(所有块)
      cacheGroups: { // 缓存组，存放分离代码块的规则对象。
        vendors: {
          test: 'vendor',
          name: 'vendor',
          priority: 10, // 优先级。当需要优先匹配缓存组的规则时为正数，当需要优先匹配默认设置时为负数
          enforce: true //
        },
      }
    }
  }
}
