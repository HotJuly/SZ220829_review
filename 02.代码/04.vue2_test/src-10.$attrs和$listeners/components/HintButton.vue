<template>
    <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
      <!-- <el-button size="small" type="danger">添加</el-button> -->
      <!-- <el-button v-bind="{
        size:'small',
        type:'danger'
      }">添加</el-button> -->
      <!-- <el-button v-bind="$attrs" @click="$emit('click')">添加</el-button> -->
      <!-- <el-button v-bind="$attrs" v-on="{
        click:click
      }">添加</el-button> -->
      <el-button v-bind="$attrs" v-on="$listeners">添加</el-button>
    </el-tooltip>
</template>
  
<script>
export default {
    name: 'HintButton',
    methods:{
        click(){
            this.$emit('click')
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  