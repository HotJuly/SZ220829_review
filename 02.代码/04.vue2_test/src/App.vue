<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- <A v-if="isShow"/>
    <B v-else/> -->

    <!-- <component :is="showComponent"></component>
    <button @click="change">切换组件</button> -->

    <!-- <KeepAlive></KeepAlive> -->
    <keep-alive exclude="A" max="10">
      <A v-if="isShow"/>
      <B v-else/>
    </keep-alive>
    <button @click="isShow=!isShow">切换组件</button>

    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import A from './components/A.vue'
import B from './components/B.vue'

export default {
  name: 'App',
  data(){
    return{
      isShow:0,
      showComponent:A
    }
  },
  methods:{
    change(){
      this.showComponent = this.showComponent===A?B:A;
    }
  },
  components: {
    HelloWorld,
    A,
    B
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
