// hello wold
function sayHello(person: Array<string | boolean | number>) {
  return 'hello,' + person;
}
let user = [0, 1, 2];
console.log(sayHello(user));

// base type
let creatBoolean: Boolean = new Boolean(1); // there is Object Boolean
let boon: boolean = Boolean(1); // primitive type

let decLiteral: number = 5;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;

let str1: string = 'string';
let str2: string = `this is ${str1}`;

function alertName(): void {
  alert('My name is Tom ');
}

let unusable: void = undefined; // void only can be 'undefined' or 'null'
let under: undefined = undefined;
let nullWrod: null = null;

let anyWrod; // is not defind the type , it is be any
let anyWrod1: any = 'my name'; // any is any

let strWrod = 'string'; // strWord is defind to the string
// strWord = 7; //error , strWord is type string

let twoTypeWord: string | number | boolean; // use '|' to define more type
twoTypeWord = 'name';
twoTypeWord = 21;

// object

function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length;
  }
  return something.toString().length;
}

interface IPerson {
  readonly id: number;
  readonly ids?: number;
  name: string;
  age: number;
  choose?: string; // when there is propName, this 'string' must in 'any'
  [propName: string]: any;
}

let tom: IPerson = {
  id: 123,
  name: 'cz',
  age: 12
};

// tom.id = 123;   // error because it's readonly

let arr1: number[] = [1, 1, 23, 4]; // only can be number item
// arr1.push('aaa'); // error , the 'aaa' is string

let arr2: Array<number> = [11, 2, 4];

let arrAny: any[] = [false, 1, 'string', { obj: 1 }];
interface NumberArray {
  [index: number]: number;
}

function sum() {
  // let args: number[] = arguments;
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}

// this is already in system
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}

let mySum = function(x: number, y: number): number {
  return x + y;
};
let mySum_b: (x: number, y: number) => number = function(x: number, y: number): number {
  return x + y;
};

interface SumFunc {
  (source: string, subString: string): boolean;
}
let mySumFunc: SumFunc = function(x: string, y: string) {
  return x.search(y) !== -1;
};

function Func(x: number = 2, y?: string): void {} // cant be   y?:string = 'str'

function myPush(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item);
  });
}

function rever(x: number): number;
function rever(x: string): string;
function rever(x: number | string): string | number {
  if (typeof x === 'number') {
    return Number(
      x
        .toString()
        .split('')
        .reverse()
        .join('')
    );
  } else if (typeof x === 'string') {
    return x
      .split('')
      .reverse()
      .join('');
  }
}

// 断言
// <string>str, str as string
// when it is jsx, plaese use as

// declare.  make it in a .d.ts file
/*
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和 type 声明全局类型
*/

// declare var jQuery: (selector: string) => any; // just mix the grammar, it will be delete when complice
declare function jQuery(selector: string): any; // just mix the grammar, it will be delete when complice
declare function jQuery(domReadyCallback: () => any): any;

declare class Animal {
  name: string;
  constructor(name: string);
  sayHi(): string;
}

declare enum Directions {
  Up,
  Down,
  Left,
  Right
}

declare namespace jQuery {
  function ajax(url: string, setting?: any): void;
  const version: number;
  class Event {
    blur(eventType: EventType): void;
  }
  enum EventType {
    CustomClick
  }
}

declare namespace namesp1 {
  function say(num: number): number;
  namespace namesp1_1 {
    const attr: string;
  }
}

declare namespace namesp1.namesp1_1 {
  const attr1: string;
}

declare namespace jQuery {
  interface AjaxSetting {
    method?: 'GET' | 'POST';
    data?: any;
  }
}
let setting: jQuery.AjaxSetting = {
  method: 'POST',
  data: {
    name: 'foo'
  }
};
