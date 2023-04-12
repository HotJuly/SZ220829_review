<template>
  <HelloWorld @abc="handler"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'

const handler = (data)=>{
  console.log('App',data)
}
</script>

<style>
</style>
