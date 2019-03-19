const proxyConfig = {
  proxy: {
    "/api": {
      target: "http://localhost:9000",
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
      secure: false,
    },
  },
};

module.exports = proxyConfig;

// proxy: [
//   {
//     context: ['/api'],
//     target: '127.0.0.1:9000',
//     changeOrigin: true, // 本地就会虚拟一个服务器接收你的请求并代你发送该请求
//     secure: false, // 默认情况下，即 true，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。
//   },
// ],
