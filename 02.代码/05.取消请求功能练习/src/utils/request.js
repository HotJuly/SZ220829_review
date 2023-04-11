import axios from 'axios';
import store from '@/store';

const request = axios.create({
    baseURL:"/api",
    timeout:20000
})

const CancelToken = axios.CancelToken;

request.interceptors.request.use((config)=>{
    // console.log(config)
    // 获取到当前发送出去的请求地址
    const url = config.url;

    // 通过调用CancelToken,可以给每个请求打上唯一标识
    config.cancelToken = new CancelToken((cb)=>{
        // CancelToken的回调函数会立即执行
        // cb本身是一个函数,只要调用cb函数,那么当前请求就会取消

        store.commit('ADD_FN',{url:url,cb:cb})
    });

    return config
})

request.interceptors.response.use((response)=>{
    // console.log(response)
    // 获取到本次请求成功的url链接
    const url = response.config.url;

    store.commit('REMOVE_FN',url);
    return response.data;
})

export default request