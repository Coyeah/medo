const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // webpack 编译时显示加载条
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin'); // lodash 按需加载插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入 html-webpack-plugin 插件,作用是添加模板到编译完成后的 dist 的文件里面，用于生成 html。
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin'); // 用于添加js或css文件路径（例如那些被copy-webpack-plugin插件编译的文件）
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 用于直接复制公共的文件
const paths = require('./config/paths');
const getStyleLoader = require('./tools/getStyleLoader');
const getDllReferPlugins = require('./tools/getDllReferPlugins');
const config = require('./config/config');
const modifyVars = require('./config/theme');
const dllConfig = require('./webpack.dll.config');

const OPEN_SOURCE_MAP = true;
const isProd = process.env.NODE_ENV === 'production';
const { USE_DLL } = config;

const REGEXP_SCRIPT = /\.(js|jsx)$/;
const REGEXP_TYPESCRIPT = /\.(ts|tsx)$/;
const REGEXP_IMAGE = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

module.exports = {
  context: paths.appRoot,
  entry: [paths.appIndex],
  output: {
    publicPath: paths.PUBLIC_PATH,
    path: paths.appDist,
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
  },
  resolve: {
    alias: {
      "@": path.resolve(paths.appSrc),
    },
    // 删除不必要的后缀自动补全，少了文件后缀的自动匹配，即减少了文件路径查询的工作
    // 其他文件可以在编码时指定后缀，如 import('./index.scss')
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    // 避免新增默认文件，编码时使用详细的文件路径，代码会更容易解读，也有益于提高构建速度
  },
  module: {
    strictExportPresence: true,
    rules: [{
      test: REGEXP_SCRIPT,
      enforce: "pre",
      include: paths.appSrc,
      use: {
        loader: 'eslint-loader',
        options: { cache: true, quiet: true }
      },
    }, {
      oneOf: [
        {
          test: REGEXP_IMAGE,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'images/[name]-[hash:5].[ext]'
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
            }
          ]
        }, {
          test: REGEXP_SCRIPT,
          exclude: /node_modules/,
          use: ['babel-loader'],
        }, {
          test: REGEXP_TYPESCRIPT,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoader({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: false,
              modifyVars,
            }),
            sideEffects: true,
          },
          {
            test: cssModuleRegex,
            exclude: paths.appNodeModules,
            use: getStyleLoader({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: true,
              modifyVars,
            }),
            sideEffects: true,
          },
          {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: getStyleLoader({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: false,
              useLess: true,
              modifyVars,
            }),
            sideEffects: true,
          },
          {
            test: lessModuleRegex,
            exclude: paths.appNodeModules,
            use: getStyleLoader({
              isProd,
              sourceMap: OPEN_SOURCE_MAP,
              modules: true,
              useLess: true,
              modifyVars,
            }),
            sideEffects: true,
          },
        {
          exclude: [/\.(js|jsx)$/, /\.(html|ejs)$/, /\.(css|less)$/, /\.json$/],
          include: paths.appSrc,
          use: [{
            loader: 'file-loader',
            options: {
              name: 'other/[name].[hash:8].[ext]',
            },
          }], // 其他文件
        }
      ],
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'oops', // 配置生成的 html 的 title，不会主动替换，需要通过模板引擎语法获取来配置
      filename: 'index.html',
      inject: true,
      template:  paths.appEjs, // 本地模板文件的位置，支持加载器（如 handlebars、ejs、undersore、html 等）
      minify: {  // 用于压缩 html 的配置
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyURLs: true,
        minifyCss: true, // 压缩 html 中出现的 css 代码
        minifyJs: true, // 压缩 html 中出现的 js 代码
      },
    }),
    USE_DLL &&
      new HtmlWebpackIncludeAssetsPlugin({
        assets: [
          'react.dll.js',
          'reactDOM.dll.js',
        ],
        append: false,
      }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),  // IgnorePlugin 防止在 import 或 require 调用时，生成以下正则表达式匹配的模块
    new ProgressBarPlugin(),
    new LodashModuleReplacementPlugin({
      paths: true,
    }),
    new webpack.DefinePlugin({
      'ENV_MOCK': process.env.MOCK !== 'none'
    }),
    new CopyWebpackPlugin([
      {
        from: paths.appPublic,
      },
      USE_DLL &&
        {
          from: paths.appDll,
        },
    ].filter(Boolean)),
    ...getDllReferPlugins(dllConfig.entry),
  ].filter(Boolean),
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
  stats: {
    children: true,
    modules: true,
    performance: true,
  },
  // webpack v4 相关新特性，中文学习链接：https://beanlee.github.io/posts/blog-translate-webpack-4-mode-and-optimization/
};
