<template>
  <div id="app">
    <h1>msg:{{ msg }}</h1>
    <h1>user.name:{{ user.name }}</h1>
    <h1>user.age:{{ user.age }}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // components中,其实就是在根据传入的配置对象,生成一个全新的构造函数
  // 在template中,每使用一次这个构造函数,就会创建一个全新的组件实例对象
  components: {
    HelloWorld: HelloWorld
  },
  data() {
    return {
      msg: 123,
      user:{
        name:"xiaoming"
      }
    }
  },
  mounted() {
    /*
      响应式相关(数据驱动)
  
      1.请问什么是响应式属性?什么是非响应式属性?
        响应式属性:当开发者修改该属性的值,会导致页面重新渲染,然后显示出最新结果
        非响应式属性:当开发者修改该属性的值,没有导致页面重新渲染,显示出依旧是上次的数据
  
      2.响应式创建时机
        1.当组件初始化的时候,data中所有的属性都会被数据劫持,变成响应式属性
          注意:只要是data中存在的属性,会全部变成响应式的

        2.如果给一个响应式属性赋值,而且属性值是一个对象数据类型,那么这个对象中所有的属性,
          都会经过数据劫持操作,全部变成响应式属性
            注意:赋值的时候,有哪些属性,这些就全是响应式属性,后续新增的都是非响应式属性

      3.如何快速分辨一个属性是否是响应式属性?
        直接打印存有该属性的对象
          如果属性值是(...),那么说明当前属性是响应式属性
          如果属性值是直接显示原值,那么说明当前属性是非响应式属性

      4.如何额外添加响应式属性?
        1.Vue.set(target,key/index,value)
        2.this.$set(target,key/index,value)
        3.Vue.observable(object)

      5.删除属性如何具有响应式效果?
        1.Vue.delete(target,key/index)
        2.this.$delete(target,key/index)
    */

    setTimeout(() => {
      // this.msg = 666;
      // this.user.name = "laowang";
      // this.user.age = 23;

      //------------------------------------
      // this.user = {
      //   ...this.user
      // }

      // // this.user.age = 26;
      // this.$set(this.user,'age',26);

      // setTimeout(()=>{
      //   this.user.age = 30;
      // },2000)

      //---------------------------------
      // delete this.user.name;
      this.$delete(this.user,'name')

      console.log(this.user)
    }, 2000)
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
