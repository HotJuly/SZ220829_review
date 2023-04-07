<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" a="1" b="2" @abc="()=>{}" @ddd="()=>{}"/> -->

      <HintButton size="big" type="danger" @click="handler1"/>
      <HintButton size="small" type="primary" @click="handler2"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HintButton from './components/HintButton.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    HintButton
  },
  methods:{
    handler1(){
      console.log('点击了删除')
    },
    handler2(){
      console.log('点击了添加')
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
