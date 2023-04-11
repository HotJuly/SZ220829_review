<template>
  <div id="app">
    <router-view/>
    <router-link to="/home">toHome</router-link>
    <!-- <router-link to="/about" tag="h1">toAbout</router-link> -->
    <button @click="toAbout">toAbout</button>
    <!-- <div v-if="$route.meta.isShowFooter">
      我是Footer
    </div> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  methods:{
    toAbout(){
      // console.log(this.$router,this.$route)
      // this.$router.push('/about');
      this.$router.replace('/about');
    }
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
