const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。

const getStyleLoader = ({
  isProd,
  sourceMap = true,
  modules = false,
  useLess = false,
  modifyVars = {},
}) => {
  return [
    isProd
      ? MiniCssExtractPlugin.loader
      : {
          loader: 'style-loader',
          options: { sourceMap }
        },
    {
      loader: 'css-loader',
      options: {
        modules,
        sourceMap,
        localIdentName: "[path][name]__[local]--[hash:base64:5]",  // Configure the generated ident
        importLoaders: useLess ? 2 : 1,  // Number of loaders applied before CSS loader
      },
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap },
    },
    useLess && {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
        sourceMap,
        modifyVars,
      }
    }
  ].filter(Boolean);
};

module.exports = getStyleLoader;
