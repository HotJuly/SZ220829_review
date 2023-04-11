<template>
  <div id="app">
  <ul>
    <li v-for="(item,index) in arr" :key="index">
      <label>{{item}} : </label>
      <input type="text">
    </li>
  </ul>
  <button @click="handler">+6</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      arr:[1,2,3,4,5]
    }
  },
  methods:{
    handler(){
      this.arr.splice(1,0,6)
    }
  },
  components: {
    HelloWorld
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
