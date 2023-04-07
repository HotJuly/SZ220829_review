<template>
    <div id="big">
        <img :src="url" alt="" srcset="">
        <el-image v-show="false" ref="image" style="width: 100px; height: 100px" :src="url" :preview-src-list="srcList">
        </el-image>
        <button @click="handler">点我放大</button>
    </div>
</template>
  
<script>

export default {
    name: 'BigImage',
    data() {
        return {
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ]
        }
    },
    methods: {
        handler() {
            // console.log(this.$refs.image)
            this.$refs.image.clickHandler();
        }
    }
}
</script>
  
<style></style>
  