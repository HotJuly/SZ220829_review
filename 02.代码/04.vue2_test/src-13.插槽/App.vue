<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App">
      <template>
        <h1>我是默认插槽</h1>
      </template>
      <template v-slot:header>
        <h1>我是具名插槽</h1>
      </template>
      <!-- <template #footer="scope">
        <h1>我是作用域插槽,{{ scope.aaa }}</h1>
      </template> -->
      <template #footer="{aaa}">
        <h1>我是作用域插槽,{{ aaa }}</h1>
      </template>
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
