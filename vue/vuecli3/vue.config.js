const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: config => {
    // "analyzer": "use_analyzer=true vue-cli-service serve"
    // if (process.env.use_analyzer) {
    //   config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    // }
    // config.resolve.alias.set('@', resolve('src'));
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .test(/\.(svg)(\?.*)?$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' });
  },

  devServer: {
    port: 9333,
    proxy: {
      '/api': {
        target: 'http://10.130.36.176:7473',
        // target: 'http://172.16.42.24:7473',
        // target: 'http://172.16.42.25:7473', //wxs
        pathRewrite: { '^/api': '/' },
        changeOrigin: true
      }
    }
  },

  lintOnSave: true
};
