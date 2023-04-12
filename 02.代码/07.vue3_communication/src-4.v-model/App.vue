<template>
  <input v-model="msg" type="text">
  <HelloWorld v-model:msg="msg"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {ref} from 'vue';
import HelloWorld from '@/components/HelloWorld'

const msg=ref('我是父组件的数据');
</script>

<style>
</style>
