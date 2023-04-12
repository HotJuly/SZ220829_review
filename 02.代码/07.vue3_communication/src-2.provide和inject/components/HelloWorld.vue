<template>
  <div class="hello">
    <h1>hello</h1>
    <h1>hello的msg666:{{msg666}}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
import {inject} from 'vue';

const msg666 = inject("msg666");
setTimeout(()=>{
  msg666.value = "我是子组件的数据"
},2000)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
