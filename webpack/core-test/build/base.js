const fs = require('fs');
const path = require('path');
const Config = require('webpack-chain');
const config = new Config();
let basePath = 'core-test/config'; 
const resolve = (...src) => {
  return path.join(process.cwd(), ...src);
};
const files = fs.readdirSync(resolve(basePath));

module.exports = () => {
  files.map((file) => {
    require(resolve(basePath, file))(config, resolve)();
  });
  return config;
};
