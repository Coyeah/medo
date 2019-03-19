const webpack = require('webpack');
const path = require('path');
const config = require('../config/config');
const paths = require('../config/paths');

const getDllReferPlugins = entries => {
  const names = Object.keys(entries);
  const { USE_DLL } = config;
  if (!USE_DLL) {
    return [];
  }
  return names.map(name =>
    new webpack.DllReferencePlugin({
      manifest: path.resolve(paths.appDll, `${name}.manifest.json`),
    })
  )
};

module.exports = getDllReferPlugins;
