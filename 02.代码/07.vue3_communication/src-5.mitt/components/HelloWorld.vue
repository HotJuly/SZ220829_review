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
import myBus from '@/myBus';
// console.log('Hello')
myBus.emit("aaa","!!!!!!!!!!!!!!")
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
