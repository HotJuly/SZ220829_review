<template>
  <div id="app">
    <!-- 以下两行代码的效果相同,用于分析v-model的原理 -->
    <input type="text" v-model="msg">
    <!-- <input type="text" :value="msg" @input="msg=$event.target.value"> -->
    
    <!-- 以下两行带的效果相同,用于分析v-model的原理 -->
    <HelloWorld v-model="msg"/>
    <!-- <HelloWorld :value="msg" @input="(data)=>msg=data"/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return {
      msg:"我是APP的初始数据"
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
