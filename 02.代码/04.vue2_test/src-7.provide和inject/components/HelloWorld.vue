<template>
  <div class="hello">
    <h1>hello的ddd:{{ ddd }}</h1>
    <h1>hello的user.name:{{ user.name }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  // inject接受的是属性值
  inject:["ddd","user"],
  mounted(){
    setTimeout(()=>{
      this.user.name="老王"
    },3000)
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
