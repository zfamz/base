let a: string = 'hello world';
console.log(a);
enum MyType {
  up,
  down,
  left,
  right
}

function fun1(age: number): string {
  return 'return the age : ' + age;
}

var age: number = 19;
var ret: string = fun1(age);
console.log(ret);

let add = function(a: number, b: number): number {
  return a + b;
};
let add1 = (a: number, b: number): number => {
  return a + b;
};
console.log('function add return : ', add(1, 2));
console.log('function add1 return : ', add1(5, 2));

let d: Date = new Date();
console.log('Date time: ', d);

class C1 {
  public sex: string;
  public readonly color: string = 'red';
  protected name: string;
  private age: number;
  public constructor(sex: string, name: string, age: number) {
    this.sex = sex;
    this.name = name;
    this.age = age;
  }
  sayHi(): void {
    // this.color = 'blue';
    console.log('hi: ', this.color);
  }
}

class C2 extends C1 {
  public habbit: string = 'basketball';
  public color: string = 'gray';
}
let c1: C1 = new C1('man', 'cz', 12);
c1.sayHi();
console.log('c1: ', c1);
let c2: C2 = new C2('woman', 'haosi', 22);
c2.sayHi();
console.log('c2: ', c2);
