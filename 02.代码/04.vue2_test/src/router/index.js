import Vue from 'vue';
import VueRouter from 'vue-router';

// import Home from '@/components/Home.vue'
import About from '@/components/About.vue'

Vue.use(VueRouter);

// $router.options就可以找到配置对象
export default new VueRouter({
    // mode:"hash",
    mode:"history",
    // mode:"abstract",
    routes:[
        {
            path:"/home",
            component:()=>import('@/components/Home.vue')
            // component:Home
        },
        {
            path:"/about",
            component:About,
            meta:{
                isShowFooter:true
            }
        }
    ]
})