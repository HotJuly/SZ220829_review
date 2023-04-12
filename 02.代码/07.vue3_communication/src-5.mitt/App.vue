<template>
  <HelloWorld/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import myBus from '@/myBus';
import HelloWorld from '@/components/HelloWorld'

// console.log('App')
myBus.on("aaa",(data)=>{
  console.log("aaa",data)
})
</script>

<style>
</style>
