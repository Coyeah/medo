// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),  // 本地服务器所加载的页面所在的目录
    publicPath: '/',
    historyApiFallback: true,  // 不跳转
    inline: true,  // 实时刷新
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },{
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },{
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },{
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            query: {
              limit: 20000,
              name: 'img/[name]-[hash:5].[ext]'
            }
          }, {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html',
			filename: 'index.html'
    }),
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  // externals: {
  //   'react': 'window.React'
  // }
}
