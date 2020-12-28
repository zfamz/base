const fs = require('fs');
const path = require('path');
const Config = require('webpack-chain');
const config = new Config();
const resolve = (src) => {
  return path.join(process.cwd(), src);
};
const files = fs.readdirSync(resolve('config'));

module.exports = () => {
  let loaders = [];
  files.map((file) => {
    path.basename(file, '.js');
  });
  return config;
};
