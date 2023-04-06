import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/*
  面试题:请问在Vue项目中,有哪些地方可以影响到页面的显示内容?
  回答:
    1.el配置选项
      他指向的元素中的结构,会被作为模版使用

    2.template配置选项
      它可以控制页面显示的模版内容

    3.render配置选项
      它可以根据某个组件的内容,生成当前组件的虚拟DOM

    优先级:render配置选项>template配置选项>el配置选项

*/

new Vue({
  el:"#app",
  data:{
    msg:"我是index.html的模版内容",
    msg2:"我是template的模版内容"
  },
  template:"<h2>{{msg2}}</h2>",
  render: h => h(App),
})
.$mount('#app')
