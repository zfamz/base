/**
 * https://www.ibm.com/developerworks/cn/web/wa-es6-generator/index.html
 * 运行环境： node , chrome console. (注：在输出中查看结果，直接运行看不到)
 *定义G函数（generator）：在函数名前加 "*" 号
 */
function* sample() {
  yield 1;
  yield 2;
  yield 3;
}
let func = sample();
undefined;
func.next();
// >>> { value: 1, done: false }
func.next();
// >>> { value: 2, done: false }
func.next();
// >>> { value: 3, done: false }
func.next();
// >>> { value: undefined, done: true }
//===================================================
function* doMath() {
  let x = yield 1;
  let y = yield x + 10;
  let z = yield y * 10;
}
let funa = doMath();
funa.next();
// >>> { value: 1, done: false }
funa.next();
// >>> { value: NaN, done: false }
funa.next();
// >>> { value: NaN, done: false }
funa.next();
// >>> { value: undefined, done: true }
//-------------------------------------------------------
let a = doMath();
a.next();
// >>> { value: 1, done: false }
a.next(1);
// >>> { value: 11, done: false }
a.next(2);
// >>> { value: 20, done: false }
a.next(3);
// >>> { value: undefined, done: true }
//===================================================

/**
 * return 相当于一个yield,只不过还会加一步操作，把done置为true
 */
function* withReturn() {
  let x = yield 1;
  return x + 2;
}

func = withReturn();
func.next();
// -> {value: 1, done: false}
func.next(1);
// -> {value: 3, done: true}
func.next();
// -> {value: undefined, done: true}

//===================================================
for (let value of sample()) {
  console.log(value);
}
// -> 输出 1，2 和 3
['a', ...sample(), 'b'];
// -> [ 'a', 1, 2, 3, 'b' ]

let set = new Set(sample());
set.size;
// -> 3
set;
// >>> Set { 1, 2, 3 }

//===================================================
/**
 * 默认直接输出value的值，done属性隐藏
 */
function* seq(start = 0, number = 10) {
  while (number-- > 0) {
    yield start++;
  }
}
undefined;
a = seq();
[...a];
// >>> [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
[...a];
// >>> []
[...seq(3, 1)];
// >>> [ 3 ]
[...sample()];
// >>> [ 1, 2, 3 ]

//===================================================
/**
 * throw 的用法好像有点不对，直接相当于return，结束了(调用的地方不对)
 * 并不是直接执行的要catch到后面
 * 官方：在调用 func.throw(new Error('boom!')) 时，上一个 yield 表达式 yield 2 被替换成了 throw new Error('boom!')。
 */
function* sample1() {
  yield 1;
  try {
    yield 2;
  } catch (e) {
    console.error(e);
  }
  yield 3;
  yield 4;
}

func = sample1();
func.next();
// -> {value: 1, done: false}
func.next();
// -> {value: 2, done: false}
func.throw(new Error('boom!'));
console.log('KO.'); // 报错后继续执行了（真的只是打印错误）
// -> Error: boom!
// -> {value: 3, done: false}
console.log(func.next());
// -> {value: 4, done: false}

//===================================================
/**
 * 注意：内部yield语句加了 * 号
 */
function* multipleYieldStars() {
  yield* [1, 2, 3];
  yield 'x';
  yield* 'hello';
}
[...multipleYieldStars()];
// >>> (9) [1, 2, 3, "x", "h", "e", "l", "l", "o"]
a = multipleYieldStars();
a.next();
// >>> {value: 1, done: false}
a.next();
// >>> {value: 2, done: false}
a.next();
// >>> {value: 3, done: false}
a.next();
// >>> {value: "x", done: false}
a.next();
// >>> {value: "h", done: false}
a.next();
// >>> {value: "e", done: false}
a.next();
// >>> {value: "l", done: false}
a.next();
// >>> {value: "l", done: false}
a.next();
// >>> {value: "o", done: false}
a.next();
// >>> {value: undefined, done: true}

//===================================================
/**
 *较高级应用
 */
function* numbers() {
  for (let i = 0; i < 20; i++) {
    if (i < 5) {
      yield i;
    } else if (i < 10 && i % 2 === 0) {
      yield i * 2;
    } else if (i < 15 && i % 3 === 0) {
      yield i * 3;
    } else if (i % 7 === 0) {
      yield i * 7;
    }
  }
}
[...numbers()];
// >>> (11) [0, 1, 2, 3, 4, 12, 49, 16, 27, 36, 98]
//===================================================
/**
 * yield 套用
 */
function* manyYields() {
  yield yield yield 1;
}
[...manyYields()];
// >>> (3) [1, undefined, undefined]

//===================================================
/**
 * async await 转 promise 转 generator
 */
async function foo() {
  await bar();
}
foo = (() => {
  var _ref = _asyncToGenerator(function*() {
    yield bar();
  });

  return function foo() {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            }
          );
        }
      }
      return;
      step('next');
    });
  };
}
