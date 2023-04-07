<template>
  <div id="app">
    <!-- <BigImage :url="url" :srcList="srcList"/> -->
    <!-- <BigImage v-bind="$data">
      <template v-slot="listeners">
        <h1 v-on="listeners">放大</h1>
      </template> -->
    <!-- </BigImage> -->
    <BigImage :url="url" :srcList="srcList">
      <template v-slot="scope">
        <el-button type="primary" v-on="scope">点击</el-button>
      </template>
    </BigImage>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BigImage from './components/BigImage.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BigImage
  },
  data() {
      return {
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          srcList: [
              'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
              'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
          ]
      }
  },
  mounted(){
    // console.log(this.$data)
    // console.log(this.$children[0].msg1)
    // console.log(this.$refs.world)
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
