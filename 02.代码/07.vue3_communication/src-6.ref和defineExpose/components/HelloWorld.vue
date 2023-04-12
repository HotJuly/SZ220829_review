<template>
  <div class="hello">
    <h1>hello</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
import {ref, defineExpose} from 'vue';
const msg = ref("我是子组件的数据");
const msg2 = ref("我是子组件的数据222222");
defineExpose({
  msg:msg
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
