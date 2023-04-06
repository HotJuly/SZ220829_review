<template>
  <div id="app">
    app的数据:<input type="text" :value="msg">
    <HelloWorld :msg="msg" :fn1="$options.fn1" :fn2="fn2"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      msg:"我是APP的数据"
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
