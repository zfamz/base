'use strict'

var fs = require('fs');
// fs.readFile('nextTick.js', 'utf-8', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         log(data);
//     }
// })

fs.writeFile('data.txt', 'hello node.js twice', function (err) {
    if (err) {
        log("wirte error");
    } else {
        log("this is good");
    }
})

function log(data) {
    console.log(data);
}