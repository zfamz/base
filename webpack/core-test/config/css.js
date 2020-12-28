module.exports = (config) => {
  return () => {
    config.module
      .rule('css')
      .test(/\.css$/)
      .use('css')
      .loader('css-loader');
  };
};
