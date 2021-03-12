const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (config) => {
  return () => {
    config.plugin('html')
      .use(HtmlWebpackPlugin, [{
        template: 'public/index.html'
      }])
  }
}
