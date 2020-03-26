// hello wold
function sayHello(person) {
    return 'hello,' + person;
}
var user1 = [0, 1, 2];
console.log(sayHello(user1));
// base type
var creatBoolean = new Boolean(1); // there is Object Boolean
var boon = Boolean(1); // primitive type
var decLiteral = 5;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var str1 = 'string';
var str2 = "this is " + str1;
function alertName() {
    alert('My name is Tom ');
}
var unusable = undefined; // void only can be 'undefined' or 'null'
var under = undefined;
var nullWrod = null;
var anyWrod; // is not defind the type , it is be any
var anyWrod1 = 'my name'; // any is any
var strWrod = 'string'; // strWord is defind to the string
// strWord = 7; //error , strWord is type string
var twoTypeWord; // use '|' to define more type
twoTypeWord = 'name';
twoTypeWord = 21;
// object
function getLength(something) {
    if (something.length) {
        return something.length;
    }
    return something.toString().length;
}
var tom = {
    id: 123,
    name: 'cz',
    age: 12
};
// tom.id = 123;   // error because it's readonly
var arr1 = [1, 1, 23, 4]; // only can be number item
// arr1.push('aaa'); // error , the 'aaa' is string
var arr2 = [11, 2, 4];
var arrAny = [false, 1, 'string', { obj: 1 }];
function sum() {
    // let args: number[] = arguments;
    var args = arguments;
}
var mySum = function (x, y) {
    return x + y;
};
var mySum_b = function (x, y) {
    return x + y;
};
var mySumFunc = function (x, y) {
    return x.search(y) !== -1;
};
function Func(x, y) {
    if (x === void 0) { x = 2; }
} // cant be   y?:string = 'str'
function myPush(array) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (item) {
        array.push(item);
    });
}
function rever(x) {
    if (typeof x === 'number') {
        return Number(x
            .toString()
            .split('')
            .reverse()
            .join(''));
    }
    else if (typeof x === 'string') {
        return x
            .split('')
            .reverse()
            .join('');
    }
}
var a1 = {
    name: 'cz',
    sayHi: function () {
        console.log('hi');
    }
};
var setting = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
