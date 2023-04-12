<template>
  <HelloWorld ref="hello"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {ref,onMounted} from 'vue';
import HelloWorld from '@/components/HelloWorld'

const hello = ref();

// 不要在setup中,直接打印ref值,组件还没有挂载成功,是看不到子组件实例对象的
onMounted(()=>{
  console.log('msg',hello.value.msg)
  console.log('msg2',hello.value.msg2)
})
</script>

<style>
</style>
