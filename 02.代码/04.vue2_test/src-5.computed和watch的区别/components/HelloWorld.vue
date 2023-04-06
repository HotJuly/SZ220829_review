<template>
  <div class="hello">
    <h1 @click="handler">hello组件:{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props:{
  //   msg:String
  // }
  props:["msg","fn1","fn2"],
  // data(){
  //   return{
  //     msg:123
  //   }
  // },
  methods:{
    handler(){
      // this.fn1('我是hello的数据')
      this.fn2('我是hello的数据')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
