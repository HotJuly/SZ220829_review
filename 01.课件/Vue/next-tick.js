/*
  ES6模块化语法特点:
    无论多少个文件引入该文件,该文件的代码只会执行一次
*/

// 创建一个项目中,独一无二的callbacks数组
const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false

  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// 此处在检查当前环境是否支持Promise,如果支持,后续的nextTick就使用.then实现
// 如果不支持Promise,那么就检查是否支持mutationObserver
// 如果不支持mutationObserver,那么就检查setTimeout
if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}


export function nextTick (cb,vm) {
  // 此处在使用callbacks数组,收集传入的所有的回调函数
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })

  if (!pending) {
    // 无论调用多少次nextTick,也只能进入这个判断一次
    // 因为第一次进入之后,就会立马把pending改为true,防止别人进来

    // 问题:调用10次nextTick,一共会开启多少个微任务.then
    // 回答:无论调用多少次nextTick,都只会开启一个微任务

    pending = true
    timerFunc()
  }
}
