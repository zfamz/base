process.nextTick(() => {
    console.log('this is next tick')
});
console.log('i am go first');
process.on('exit', function (code) {
    console.log('may be I will logout : ' + code);
})