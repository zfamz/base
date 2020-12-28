let fs = require('fs');
let files = fs.readdirSync('./src', 'utf-8');
console.log('end: ', files);
