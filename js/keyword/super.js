class Father {
  static num = 1;
  static get() {
    console.log('static-', this.num);
  }
  get() {
    console.log('normal-', this.num);
  }
}
// Father.prototype.num = 'a';

class Children extends Father {
  constructor() {
    super();
    this.num = 2;
    super.num = 3; // 当直接赋值时，super===this
    console.log('super num : ', super.num); // 访问时， 去访问父类的原型
    console.log('this num : ', this.num);
  }
  static get() {
    super.get();
  }
  get() {
    super.get();
  }
}

Children.get();
let c1 = new Children();
c1.get();

/**
  https://blog.csdn.net/qq_41709082/article/details/86573720
  console.log(super.xxx) 等于 console.log(父类.prototype.xxx);
  console.log(super.xxx()) 等于 console.log(父类.prototype.xxx());
  super.xxx=xxx 等于 this.xxx=xxx;
 */
