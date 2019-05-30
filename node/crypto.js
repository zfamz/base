'use strict'

const crypto = require('crypto');

const hash = crypto.createHash('md5');

console.log(hash.update('hello'));
console.log(hash.digest('hello'));