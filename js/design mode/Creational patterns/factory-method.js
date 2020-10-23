/**工厂方法模式 */
/**
 * 最好返回的对象有统一的属性，接口
 *
 */
function Factory(type, name, age) {
  switch (type) {
    case 'cat':
      return new Cat(name, age);
      break;
    case 'dog':
      return new Dog(name, age);
      break;

    default:
      return {
        name: 'name',
        age: 'age',
        say: () => {
          console.log('I am nothing');
        }
      };
      break;
  }
}
function Animal(name, age) {
  this.name = name;
  this.age = age;
}
Animal.prototype.say = function name(params) {
  console.log(`my name is ${this.name} and I'm ${this.age} years old`);
};
function Dog(name, age) {
  Animal.call(this, name, age);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
function Cat(name, age) {
  Animal.call(this, name, age);
  this.say = () => {
    console.log('I am cat, MIAO MIAO MIAO ^ _ ^ ');
  };
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

let f1 = Factory('cat', 'cat', 3);
let f2 = Factory('dog', 'dog', 1);
let f3 = Factory();

f1.say();
f2.say();
f3.say();

// module.exports = {
//   Factory
// };
exports.Factory = Factory;
