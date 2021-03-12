const rimraf = require('rimraf')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

rimraf.sync('core-test/dist')

const config = require('./base.js')()
const webpack = require('webpack')
const spinner = ora('starting build ...')

spinner.start()

webpack(config.toConfig(), (err, stats) => {
  spinner.stop()
  if(err) throw err
  process.stdout.write(stats.toString({
    colors: true, 
    modules: false,
    children: false, 
    chunks: false,
    chunkModules: false
  }) + '\n\n')
  if(stats.hasErrors()) {
    console.log(chalk.red('Build Fail \n'))
    process.exit(1)
  }
  console.log(chalk.cyan('build SUCCESS'))
})
