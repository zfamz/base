const config = require('./base.js')()

const webpack = require('webpack')
const chalk = require('chalk')

const WebpackDevServer = require('webpack-dev-server')
const port = 7100
const publicPath = '/core-test/'

config.devServer
  .quiet(true)
  .hot(true)
  .port(port)
  .https(false)
  .disableHostCheck(true)
  // .publicPath(publicPath)
  // .open(true)

const compiler = webpack(config.toConfig())
const chainDevServer = compiler.options.devServer
const server = new WebpackDevServer(compiler, Object.assign(chainDevServer,{}))

;['SININT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    server.close(() => {
      process.exit(0)
    })
  })
})

server.listen(port)

console.log('config: ', JSON.stringify(config.toConfig(), null, 2))

new Promise(() => {
  compiler.hooks.done.tap('dev', stats => {
    const empty = '    '
    const common = `App running at: 
    - Local: http://my:${port}\n`
    console.log(chalk.cyan('\n', empty, common))
  })
})
