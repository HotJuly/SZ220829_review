<template>
  <div class="hello">
    <!-- <h1 @click="handler">hello的value:{{ value }}</h1> -->
    <h1 @click="handler">hello的msg:{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    value:String
  },
  model:{
    prop:"msg",
    event:"change7890"
  },
  methods:{
    handler(){
      // this.value = "我是hello修改之后的数据"
      // this.$emit('input',"我是hello修改之后的数据")
      this.$emit('change7890',"我是hello修改之后的数据")
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
