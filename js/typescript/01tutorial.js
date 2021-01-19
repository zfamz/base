var fn;
fn = function (a) {
    return true;
};
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 2] = "Up";
    Direction[Direction["Down"] = 3] = "Down";
    Direction[Direction["Left"] = 3.3] = "Left";
    Direction[Direction["Right"] = 4.3] = "Right";
})(Direction || (Direction = {}));
console.log(JSON.stringify(Direction));
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.fly = function () { };
    Animal.prototype.run = function () { };
    return Animal;
}());
var animal = new Animal('BD');
console.log('animal: ', Animal, ' : ', JSON.stringify(animal));
function getDog() {
    return new Animal('maybe a dog');
}
var Ad = getDog();
Ad.fly();
var keyWord;
keyWord = 'name';
// let fn1: (name: string, age: number) => string
var fn1;
fn1 = function () { return 'ab'; };
// arr: { [index: number]: stiing }
// arr: string[]sh
var arr;
function getLength(arg) {
    return arg.length;
}
var ta = {
    value: 123
};
var tb = {
    value: '123'
};
function identify(n) {
    var m = n;
    return m;
}
var m1 = identify('123');
var m = identify(12);
var Identity = /** @class */ (function () {
    function Identity() {
    }
    Identity.prototype.show = function (m, n) {
        return n;
    };
    return Identity;
}());
var c;
c = new Identity();
c.attr1 = 12;
c.attr2 = true;
// namespace
var ns;
(function (ns) {
    ns.a = 'hello world';
    var b = 1;
    function show() {
        console.log(b);
    }
    var A;
    (function (A) {
        var B;
        (function (B) {
            B.name = 'name -B';
        })(B = A.B || (A.B = {}));
    })(A || (A = {}));
})(ns || (ns = {}));
var a1 = ns.a;
// ---------------------------------------
var something;
(function (something) { something.foo = 123; })(something || (something = {}));
console.log("something: ", something);
// ;(function(obj){obj.bar = 'abc')()

class Ca {
  name = 'CA';
  say() {
    console.log(this.name)
  }
}
let ca = new Ca;
ca.say()
