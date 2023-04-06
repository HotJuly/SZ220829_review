<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <h1>pageX:{{pageX}}</h1> -->
    <h1>pageY:{{pageY}}</h1>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import testMixin from '@/mixins/test';
import moveMixin from '@/mixins/moveMixin';

export default {
  name: 'App',
  data(){
    return{
      pageX:-1
    }
  },
  components: {
    HelloWorld
  },
  // mixins:[testMixin],
  mixins:[moveMixin],
  // mounted(){
  //   // 生命周期其实就是最大的事件监听
  //   // 它可以监视用户的使用状态和当前页面的状态
  //   console.log('组件内置',this.$options.name)
  // }
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
