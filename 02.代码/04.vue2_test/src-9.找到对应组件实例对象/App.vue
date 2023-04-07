<template>
  <div id="app">
    <!-- <h1 ref="aaa">我是h1</h1>
    <HelloWorld ref="world" msg="Welcome to Your Vue.js App"/> -->

    <BigImage/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BigImage from './components/BigImage.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BigImage
  },
  data(){
    return{
      msg:123
    }
  },
  mounted(){
    // console.log(this.$data)
    // console.log(this.$children[0].msg1)
    console.log(this.$refs.world)
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
