var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var a = 'hello world';
console.log(a);
var MyType;
(function (MyType) {
    MyType[MyType["up"] = 0] = "up";
    MyType[MyType["down"] = 1] = "down";
    MyType[MyType["left"] = 2] = "left";
    MyType[MyType["right"] = 3] = "right";
})(MyType || (MyType = {}));
function fun1(age) {
    return 'return the age : ' + age;
}
var age = 19;
var ret = fun1(age);
console.log(ret);
var add = function (a, b) {
    return a + b;
};
var add1 = function (a, b) {
    return a + b;
};
console.log('function add return : ', add(1, 2));
console.log('function add1 return : ', add1(5, 2));
var d = new Date();
console.log('Date time: ', d);
var C1 = /** @class */ (function () {
    function C1(sex, name, age) {
        this.color = 'red';
        this.sex = sex;
        this.name = name;
        this.age = age;
    }
    C1.prototype.sayHi = function () {
        // this.color = 'blue';
        console.log('hi: ', this.color);
    };
    return C1;
}());
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.habbit = 'basketball';
        _this.color = 'gray';
        return _this;
    }
    return C2;
}(C1));
var c1 = new C1('man', 'cz', 12);
c1.sayHi();
console.log('c1: ', c1);
var c2 = new C2('woman', 'haosi', 22);
c2.sayHi();
console.log('c2: ', c2);
