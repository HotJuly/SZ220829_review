<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
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
      msg:123
    }
  },
  // computed:{
  //   doubleCount(){
      
  //   }
  // },
  beforeCreate(){
    // console.log('------App beforeCreate------',this,this.$data,this.msg,this.$el)
  },
  created(){
    // console.log('------App created------',this,this.$data,this.msg,this.$el)
  },
  beforeMount(){
    // console.log('------App beforeMount------',this,this.$data,this.msg,this.$el)
    console.log('------App beforeMount------',this.$vnode,this._vnode)
  },
  mounted(){
    console.log('------App mounted------',this.$vnode,this._vnode)
    // console.log('------App mounted------',this,this.$data,this.msg,this.$el)
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
