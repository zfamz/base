let fn: (a: string, b: string) => boolean;
fn = function(a: string) {
  return true
}
enum Direction {
  Up = 2,
  Down,
  Left = 3.3,
  Right
}
console.log(JSON.stringify(Direction))

interface Bird {
  fly(): void;
}
interface Dog {
  run(): void;
}
class Animal {
  constructor(public name:string) {}
  fly() {}
  run() {}
}
let animal: Bird & Dog = new Animal('BD')
console.log('animal: ', Animal, ' : ', JSON.stringify(animal));
function getDog(): Dog {
  return new Animal('maybe a dog')
}
let Ad = getDog();
(Ad as Animal).fly();

interface Person {
  name: string;
  age: number;
}
let keyWord: keyof Person;
keyWord = 'name' 
// function 
interface MyFunc {
  (name: string, age: number): string
}
// let fn1: (name: string, age: number) => string
let fn1: MyFunc
fn1 = function() { return 'ab' }

// Array
interface MyArray {
  [index:number]: string
}
// arr: { [index: number]: stiing }
// arr: string[]sh
let arr: MyArray

// Object
interface MyObject {
  [x: number]: string;
  [index: string]: string;
}

interface WithLength {
  length: number;
} 
function getLength<T extends WithLength>(arg: T): number {
  return arg.length;
}
interface MyType<T = string> {
  value: T
}
let ta: MyType<number> = {
  value: 123
}
let tb: MyType = {
  value: '123'
}

function identify<T>(n: T): T {
  let m: T = n;
  return m 
}
let m1: string = identify<string>('123')
let m = identify<number>(12)
class Identity<T1, T2> {
  attr1: T1;
  attr2: T2;
  show(m: T1, n: T2): T2 {
    return n;
  }
}
let c: Identity<number, boolean>
c = new Identity<number, boolean>()
c.attr1 = 12
c.attr2 = true

// namespace
namespace ns {
  export let a = 'hello world';
  let b = 1;
  function show(){
    console.log(b);
  }
  namespace A {
    export namespace B {
      export let name: string = 'name -B';
    }
  }
}
let a1 = ns.a;

// ---------------------------------------
let something: any
;(function(something){something.foo = 123;})(something || (something = {}))
console.log("something: ", something)
// ;(function(obj){obj.bar = 'abc')()
