<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
// 每个.vue文件暴露出去的不是Vue组件的实例对象,只是一个配置对象
// 配置对象也是对象,但是对象的属性名有严格要求
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  a:6,
  mounted(){
    // console.log(this.$options.a)
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
