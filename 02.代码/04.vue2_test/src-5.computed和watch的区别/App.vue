<template>
  <div id="app">
    app的数据:<input type="text" :value="msg">
    <h2>我是app的计算属性:{{newMsg}}</h2>
    <h2>我是app的计算属性:{{newMsg}}</h2>
    <h2>我是app的计算属性:{{newMsg}}</h2>
    <h2>我是app的计算属性:{{newMsg}}</h2>
    <h2>我是app的计算属性:{{newMsg}}</h2>
    <h2>我是app的计算属性:{{newMsg}}</h2>
    <h2>我是app的计算属性:{{newMsg}}</h2>
    <h2>我是app的计算属性:{{newMsg}}</h2>
    <HelloWorld :msg="msg" :fn1="$options.fn1" :fn2="fn2"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      msg:"我是APP的数据",
      user:{
        name:"xiaoming"
      }
    }
  },
  components: {
    HelloWorld
  },
  fn1(data){
    console.log(1,this)
  },
  methods:{
    fn2(data){
      // console.log(2,this)
      this.msg=data
    }
  }
  /*
    面试题:请问computed和watch的区别
    回答:
      1.相同点
        他们都可以监视某个数据的变化,如果数据变化了就执行对应的回调函数

      2.不同点
        -使用场景
          computed
            我需要一个数据,可惜我手头没有,但是我可以根据现有的数据,计算得到
              例如:购物车的总价/总数等

          watch
            如果有一个数据发生变化之后,我需要做一些事情
              例如:三级分类列表,如果用户选中了一级分类的某个选项,那么我就会使用这个选项数据请求二级列表

          总结:computed更注重于结果,watch更注重于过程
            computed的返回值是可以显示在页面上的,而watch的返回值没有任何作用

        -缓存
          computed具有缓存,如果监视的数据没有发生变化,那么computed就会复用上次的结果

        -属性名的含义不同
          computed的属性名其实就是计算属性的使用名称
          watch的属性名其实是代表他想要监视哪个数据
  
  */,
  mounted(){
    setTimeout(()=>{
      // this.user = {
      //   ...this.user
      // }

      this.user.name="xiaohong"
    },3000)
  },
  computed:{
    newMsg(){
      console.log('computed')
      return this.msg+"!!!!!"
    }
  },
  watch:{
    msg(){
      console.log('msg change')
    },
    // user(){
    //   console.log('user change')
    // },
    user:{
      handler(){
        console.log('user change')
      },
      deep:true,
      immediate:true
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
