'use strict';

var fs = require('fs');

/**
 * 存在的疑惑：
 * 1.每一个writeStream 单独写的时候都会把整个文件清空掉，再写入。
 *      这样ws,ws1,ws2直接这样写，没有清空，直接从第一行开始写，而且最后一个还没有写完
 * 注：there is binary data1. wNED. stream... （第一行）
 * 猜想：
 * 1.执行顺序
 * 2.writeStream在end之后没有关闭完（内部可能对资源占用有冲突，并不是按代码顺序执行，可能异步）
 * 3.for循环有影响
 * 测试：
 * 1.改变执行顺序
 *  1-1.ws在最后面一定会是逻辑结果
 *  1-2.相同代码执行结果会改变
 *
 * 解决：
 */

/*
var ws = fs.createWriteStream('./stream.txt', 'utf-8');

for (let i = 0; i < 10; i++) {
  ws.write(i + '. write stream... \n');
}
ws.write('END.');
ws.end();

var ws3 = fs.createWriteStream('./stream.txt');
ws3.write('I am only wirte from the first char not cover the all aticle');
ws3.end();

var ws2 = fs.createWriteStream('./stream.txt');
ws2.write(new Buffer('there is binary data.. \n', 'utf-8'));
ws2.write(new Buffer('NED.', 'utf-8'));
ws2.end();
*/

var rs = fs.createReadStream('./stream.txt', 'utf-8');
rs.on('data', chunk => {
  console.log('Data:', chunk);
});
rs.on('end', () => {
  console.log('end');
});
rs.on('error', err => {
  console.log('error:', err);
});

var ws3 = fs.createWriteStream('./streamTemp.txt', 'utf-8');
rs.pipe(ws3);
