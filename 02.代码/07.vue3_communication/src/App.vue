<template>
  <h1>pageX:{{ pageX }}</h1>
  <h1>pageY:{{ pageY }}</h1>
  <!-- <HelloWorld/> -->
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import moveHook from './hooks/moveHook';

const {pageX,pageY} = moveHook();
</script>

<style></style>
