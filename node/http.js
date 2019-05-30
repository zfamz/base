'use strict'

var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');

// console.log(url.parse('http://user:get@me.com:8080/path/file?id=13&name=cz'));
// var workPath = path.resolve('.');
// console.log(path.join(workPath, 'module', 'page'));


var server = http.createServer((request, response) => {
    if (request.url === '/favicon.ico') {
        response.end();
    }
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.writeHead(200);
    console.log('request:', request.url, request.method);
    // let pathName = url.parse(request.url).pathname;
    // pathName = './' + pathName;
    // let rs = fs.createReadStream(pathName, 'utf-8');
    // rs.pipe(response)
    response.write('<p>cool.. </p>');
    // response.end('the function is so ..');
    // response.end('<h1 style="color: #0094ff;">hello node.js</h1>')
    response.end()
})

server.listen('3000');
console.log('Server is running..');