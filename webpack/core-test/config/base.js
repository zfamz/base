module.exports = (config, resolve) => {
  return () => {
    config
      .entry('app')
      .add(resolve('core-test/app.js'))
      .end()
      .set('mode', process.env.NODE_ENV)
      .output
      .path(resolve('core-test/dist'))
      .filename('[name].bundle.js')
  }
}
