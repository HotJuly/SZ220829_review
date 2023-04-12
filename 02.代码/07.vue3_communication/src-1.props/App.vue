<template>
  <h1>APP的msg:{{msg}}</h1>
  <HelloWorld :msg="msg" :sendData="sendData"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {ref} from 'vue';
import HelloWorld from '@/components/HelloWorld'

const msg = ref("我是APP的数据");

const sendData = (data)=>{
  msg.value = data;
}
</script>

<style>
</style>
