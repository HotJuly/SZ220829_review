import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true;

/*
  需求:将所有组件的配置对象,内部的a属性值全部+1
  回答:可以通过Vue的自定义合并策略,来对所有组件的配置对象进行统一修改操作
*/
// Vue.config.optionMergeStrategies.a = function (parent, child, vm) {
//   // console.log(parent, child, vm)
//   return child * 2
// }

/*
  需求:请问,你在项目开发的过程中,是如何捕获到出现的错误的?
      扩展词汇:错误边界->其实就是如何捕获报错

  回答:
    1.try...catch...
      好用,但是只能捕获一部分代码的报错

    2.Promise的catch方法
      好用,他只能捕获promise的报错

    3.生命周期errorCaptured
      一般,他只能捕获后代组件中出现的报错

    4.全局配置Vue.config.errorHandler
      很好用,可以捕获整个项目中出现的报错

  进阶需求:请问,你在项目上线之后,是如何知道出现了哪些报错的?
  回答:
    1.我们可以在项目中,使用以上四种方法来捕获出现的报错信息

    2.在回调函数中,使用ajax技术,将错误信息全部发送至公司指定的服务器/接口中

    3.最终项目组,会将BUG汇总到BUG日志平台中
      比如说,TAPD或者禅道

  面试题:请问项目上线之后,出现了BUG,你会怎么做?
  回答:
    1.如果该BUG与钱相关,那么立马回退版本,让用户使用旧版项目
      其次,再开始解决维护BUG,等BUG解决之后,再次上线

    2.如果该BUG与钱无关,那么就先解决BUG之后,在上线即可

*/

// Vue.config.errorHandler = function (err, vm, info) {
//   console.log(err, vm, info)
// }

Vue.config.ignoredElements = [
  'About',
  /^t-/
]

new Vue({
  render: h => h(App),
}).$mount('#app')
