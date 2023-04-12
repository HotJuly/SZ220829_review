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
/*
  Vue3会将defineProps和defineEmits作为编程宏注册
  编程宏,就是说当前函数会自动注册在全局环境下
*/
const props = defineProps(["modelValue","msg"]);
const emits = defineEmits(["update:modelValue","update:msg"]);

setTimeout(()=>{
  // console.log(props)
  // emits("update:modelValue","我是子组件的数据")
  emits("update:msg","我是子组件的数据")
},3000)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
