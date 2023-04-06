import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/*
  需求:在所有组件挂载结束之后,打印他们的name属性值
  解决方案:
    可以使用混合/混入来解决这个需求
    混合分为两种:全局混合,局部混合

      全局混合中写的内容,可以注入到每个组件实例上
      局部混合需要在组件的配置对象上添加mixins属性,然后传入局部混合内容
        这样该混合的内容,就会只作用于当前这个组件

      如果全局/局部混合还有组件都写了同一个生命周期,
        他们三者的回调函数会共存,执行顺序:全局混合>局部混合>组件内置

      如果全局/局部混合还有组件中的data,props,computed,watch,methods等出现冲突
        那么优先级:组件内置>局部混合>全局混合
*/

// Vue.mixin({
//   mounted(){
//     console.log('全局混合',this.$options.name)
//   }
// })

new Vue({
  name:"Root",
  render: h => h(App),
}).$mount('#app')
