<template>
  <div id="app">
    <h1>app的user.name:{{ user.name }}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      ddd: 777,
      user: {
        name: "xiaoming"
      }
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    // 生命周期钩子函数中,this是当前组件实例对象
    console.log(this.ddd)
  },
  // provide:{
  //   aaa:666,
  //   // 此处获取失败的两个原因
  //   // 1.当前没有出现函数作用域,那么此处的this就会是undefined
  //   // 2.provide对象会随着配置对象创建,而data函数,只有在挂载了实例对象之后才会执行
  //   //    所以provide对象出现的时间,一定早于data对象的出现
  //   // 总结:如果provide以对象写法书写,那么绝对没有可能使用data中的数据
  //   ddd:this.ddd
  // },
  provide() {
    // provide函数的执行时机,是在data函数执行之后
    // provide函数中的this是当前组件实例对象
    return {
      ddd: this.ddd,
      user: this.user
    }
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
