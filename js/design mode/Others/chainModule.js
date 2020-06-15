/* step1
var A = function() {};
A.prototype = {
  length: 1,
  size: function(){
    return this.length;
  } 
}

// size是绑定在prototype(函数原形)上，而不是__proto__(对象原形)上。(函数也是对象)
console.log(A.size()); 
// 函数A执行的返回是undefined，没有sizes属性
console.log(A().size());
*/


var A = function(){
  return B;
}

var B = A.prototype = {
  length: 2,
  size: function(){
    return this.length;
  }
}

// console.log(A().size());  // 2

// 减少属性B的创建

A = function(selector){
  return new A.fn.init(selector);
}
A.fn = A.prototype = {
  init: function(selector){
    this[0] = document.getElementById(selector);
    this.length = 1;
    return this;
  },
  length: 3,
  size: function(){
    return this.length;
  }
}

A.fn.init.prototype = A.fn;

console.log(A('init'));  // 2
