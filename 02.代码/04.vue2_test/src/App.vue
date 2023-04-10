<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>arr[1]:{{arr[1]}}</h1>
    <h1>arr[3].name:{{arr[3].name}}</h1>
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
    return{
      // arr:Object.freeze([1,2,3,{
      //   name:"xiaoming"
      // }]),
      arr:[1,2,3,{
        name:"xiaoming"
      }]
    }
  },
  mounted(){
    setTimeout(()=>{
      // this.arr[1] = 7;
      this.arr.splice(1,1,7)
      // this.arr.map(()=>{

      // })

      // this.arr[3].name="laowang"
      console.log(this.arr)

      // const arr = [1,2,3,4];
      // arr.splice(1,1,7);
      // console.log(arr)
    },2000)
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
