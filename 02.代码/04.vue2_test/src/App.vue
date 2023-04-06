<template>
  <div id="app">
    <!-- <h1>msg:{{ msg }}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <input ref="input999" type="text" v-if="isEdit" />
    <button v-else @click="handler">添加</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: 123,
      isEdit: false
    }
  },
  methods: {
    handler() {
      this.isEdit = true;

      this.$nextTick(() => {
        this.$refs.input999.focus();
      })
    }
  },
  mounted() {
    /*
      面试题:请问Vue更新数据是同步更新还是异步更新?
      回答:同步更新数据,
          所以我们可以放心使用数据,每次使用都一定是当前最新

      面试题:请问Vue更新DOM是同步更新还是异步更新?
      回答:异步更新DOM

      nextTick相关
      1.nextTick是什么?
        他是Vue提供的一个函数

      2.nextTick的作用
        nextTick可以接收一个回调函数
        该回调函数,会被延迟到DOM更新之后才会执行
          换种说法:在这个回调函数中,可以获取到最新的DOM节点

          this.$nextTick(回调函数)

      3.使用场景
        比如说SPU模块的添加属性功能的编辑模式切换可以使用

      4.nextTick原理
        nextTick内部肯定有异步任务
          通过代码的观察,可以知道它内部一定是微任务
          Vue中的nextTick其实用的是.then实现的


        流程总结:
          1.如果开发者调用nextTick
            那么nextTick会使用callbacks数组,收集开发者传入的所有的回调函数

          2.如果是第一次调用nextTick,就会开启一个nextTick专用的微任务(其实就是.then)
            后续调用nextTick不会在开启新的微任务

            扩展:也就是说,只有在本次nextTick的回调函数全部执行结束之后,才有可能开启新的微任务

          3.在nextTick专用的微任务中,Vue会遍历callbacks数组,取出内部所有的回调函数,依次执行


    */

    // setTimeout(()=>{
    //   this.msg = 666;
    //   console.log(this.msg);
    // },3000)

    //------------------------------

    // Promise.resolve().then(() => {
    //   console.log(1)
    // })

    // setTimeout(() => {
    //   console.log(2)
    // }, 0)

    // this.$nextTick(() => {
    //   console.log(3)
    // })

    //-------------------------------
    

    Promise.resolve().then(() => {
      console.log(1)
    })

    this.$nextTick(() => {
      console.log(2)
    })
    
    Promise.resolve().then(() => {
      console.log(3)
    })

    this.$nextTick(() => {
      console.log(4)
    })

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
