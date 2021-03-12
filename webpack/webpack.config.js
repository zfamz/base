const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const Config = require('webpack-chain');
const config = new Config();

const resolve = (src) => {
  return path.join(process.cwd(), src);
};

rimraf.sync('./core-test/dist');

// module.exports = {
//   entry: './core-test/loader.js',
//   mode: process.env.NODE_ENV,
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'core-test/dist')
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: ['css-loader']
//       }
//     ]
//   }
// };

config
  .entry('main')
  .add(resolve('core-test/loader.js'))
  .end()
  .set('mode', process.env.NODE_ENV)
  .output.path(resolve('core-test/dist'))
  .publicPath('./dist/')
  .filename('[name].bundle.js');

config.module
  .rule('css')
  .test(/\.css$/)
  .use('css')
  .loader('css-loader');
let temp = config.toConfig();
console.log('temp: ', JSON.stringify(temp, null, 2));

// fs.writeFileSync('./core-test/config.json', JSON.stringify(temp, null, 2));

module.exports = config.toConfig();
