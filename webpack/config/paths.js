const path = require('path');
const fs = require('fs');

// process.cwd(): 当前 Node.js 进程执行时的工作目录
// __disname:当前模块的目录名
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  PUBLIC_PATH: '/',
  appRoot: resolveApp('.'),
  appSrc: resolveApp('src'),
  appIndex: resolveApp('src/index'),
  appDist: resolveApp('dist'),
  appEjs: resolveApp('src/index.ejs'),
  appPublic: resolveApp('public'),
  appDll: resolveApp('dll'),
  appAnalysis: resolveApp('analysis'),
};
