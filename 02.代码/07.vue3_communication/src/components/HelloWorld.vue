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
import {useAttrs} from 'vue';
const props = defineProps(["a"]);
const attrs = useAttrs();

setTimeout(()=>{
  console.log('props',props)
  console.log('attrs',attrs)
},3000)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
