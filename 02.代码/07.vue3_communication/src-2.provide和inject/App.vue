<template>
  <h1>APP的msg:{{msg}}</h1>
  <HelloWorld/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {ref,provide} from "vue";
import HelloWorld from '@/components/HelloWorld'

const msg = ref('我是父组件的数据');
console.log(msg)

provide("msg666",msg);
</script>

<style>
</style>
