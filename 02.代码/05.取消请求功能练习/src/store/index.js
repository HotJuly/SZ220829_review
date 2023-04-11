import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        fns:{}
    },
    mutations:{
        ADD_FN(state,{url,cb}){
            // console.log('ADD_FN',url,cb)

            // 取消重复请求
            // if(state.fns[url]){
            //     state.fns[url]();
            // }
            
            state.fns[url] = cb;
        },
        REMOVE_FN(state,url){
            delete state.fns[url];
        },
        CLEAR_FNS(state){
            // console.log(state)
            // 通过Object.values获取到所有取消请求的方法,然后遍历调用
            Object.values(state.fns).forEach((cb)=>{
                cb();
            })
        }
    },
    actions:{

    },
    getters:{},
    modules:{}
})