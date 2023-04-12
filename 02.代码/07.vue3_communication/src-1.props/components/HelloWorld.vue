<template>
  <div class="hello">
    <h1>hello</h1>
    <h1>hello的msg:{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
const props = defineProps(["msg","sendData"])

setTimeout(()=>{
  // console.log(props.msg)
  props.sendData("我是来自hello的数据")
},3000)
// interface IProps{
//   msg:String
// }
// defineProps<IProps>();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
