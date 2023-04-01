onmessage = function(e){
    // console.log(e)
    // eval("console.log(22222222)")

    // eval函数可以将一段字符串作为js代码执行,内部会生成一个独立的作用域
    // 也就是说外接无法读取里面的变量
    eval(e.data);
    // postMessage(777)
}
