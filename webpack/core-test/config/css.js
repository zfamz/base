module.exports = (config) => {
return () => {
    const baseRule = config.module.rule('css').test(/\.css$/);
    const normalRule = baseRule.oneOf('normal');
    applyLoaders(normalRule)
    function applyLoaders(rule) {
      rule
        .use('extract-css-loader')
        .loader(require("mini-css-extract-plugin").loader)
        .options({
          publicPath: './'
        })
      rule
        .use('css-loader')
        .loader('css-loader')
        .options({})
    }
  }
}
