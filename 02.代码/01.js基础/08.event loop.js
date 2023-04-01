// setTimeout(()=>{
//     console.log(1)
// },1000)

// setTimeout(()=>{
//     console.log(2)
// },0)

//------------------------------
/*
    超时定时器(setTimeout)
        可以将一个函数延迟一段时间执行
        第一个实参:需要延迟执行的回调函数
        第二个实参:延迟多久
            这里最小值为1,即便写了0,也等于1

    node轮询机制(宏任务部分):
        1.node由于没有那么多的分线程帮忙,所以绝大多数事情都要他自己去做
            所以node轮询机制一共分为6个阶段,每个阶段都是一个宏任务队列
            相当于node将宏任务分成了6种身份,区分了优先级

            node这边,查看打印结果,先考虑阶段,再考虑开启的先后

        2.node事件轮训,起点是1号阶段(timer),休息区是4号阶段(I/O)
            事件轮询一定是从1到6,再回到1,再开始新的循环,再1到6
                不会出现跳阶段的可能性
*/

// setTimeout(()=>{
//     console.log(1)
// },0)

// setImmediate(()=>{
//     console.log(2)
// })

// setTimeout(()=>{
//     console.log(3)
// },0)

// for (let index = 0; index < 100000; index++) {
// }

//-------------------------------------------
// const fs = require('fs');

// setTimeout(()=>{
//     console.log(1)
// },0)

// // 想要成功读取文件,需要先开启读取文件的I/O通道,开启通道需要花费100ms
// fs.readFile('./01.原型相关.html',()=>{
//     console.log(2)

//     setTimeout(()=>{
//         console.log(3)
//     },0)

//     setImmediate(()=>{
//         console.log(4)
//     })
// })

// setImmediate(()=>{
//     console.log(5)
// })

// for (let index = 0; index < 100000; index++) {
// }

//-----------------------------------------
/*
    node事件轮询机制(微任务)
        1.node具有两种微任务
            .then开启的
            nextTick开启的

            本来.then微任务对比宏任务来说,就是VIP,那么nextTick就是SVIP

        2.node具有两个微任务队列
            一个是nextTick专用
            一个是.then专用

            如果两个队列都有东西,那么优先执行nextTick队列

            注意:如果已经身在某个微任务队列中,那就必须清空该微任务队列之后,才能调到其他队列去


*/
// Promise.resolve().then(()=>{
//     console.log(1)

//     process.nextTick(()=>{
//         console.log(2)
//     })
    
//     Promise.resolve().then(()=>{
//         console.log(3)
//     })
    
//     process.nextTick(()=>{
//         console.log(4)
//     })
// })

// Promise.resolve().then(()=>{
//     console.log(2)
// })

//-------------------------------

process.nextTick(()=>{
    console.log(1)

    Promise.resolve().then(()=>{
        console.log(2)
    })
    
    process.nextTick(()=>{
        console.log(3)
    })
    
    Promise.resolve().then(()=>{
        console.log(4)
    })
})