import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter , constantRoutes, asyncRoutes, anyRoutes } from '@/router'
import router from '@/router';
import {cloneDeep} from 'lodash';

function filterAsyncRoutes(asyncRoutes,routeNames){
  /*
    目的:该函数用于根据权限过滤异步路由数组,生成当前账号有资格访问的异步路由组成的全新数组
    接收参数:
      2个
      asyncRoutes->当前项目所有的异步路由对象组成的数组
        数据类型:Array<RouteObj>

      routeNames->当前账号有资格访问的路由别名组成的数组
        数据类型:Array<string>

    返回值:一个全新的数组,内部存放当前账号有资格访问的异步路由
      数据类型:Array<RouteObj>
  */
  const newAsyncRoutes = asyncRoutes.filter((routeObj)=>{
    const name = routeObj.name;

    // a&&a.b&&a.b();
    //  a?.b?.()

    // if(routeObj.children&&routeObj.children.length){
    if(routeObj.children?.length){
      // 能进入这里,说明当前路由对象还有子路由,需要递归处理
      routeObj.children = filterAsyncRoutes(routeObj.children,routeNames);
    }
    return routeNames.includes(name);
  });

  return newAsyncRoutes;
}

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',

    // 用于存储按钮级别的权限信息
    buttons:[],

    // 用于存储路由级别的权限信息
    // 内部存放的是当前账号有资格访问的路由别名
    routeNames:[],

    // 用于解决左侧动态列表的显示问题
    menuList:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSION: (state, {routes,buttons}) => {
    state.buttons = buttons;
    state.routeNames = routes;

    // 这行是因为服务器原因,临时演示方案
    routes.push("Product");

    const newAsyncRoutes = filterAsyncRoutes(cloneDeep(asyncRoutes),state.routeNames);

    // console.log('newAsyncRoutes',newAsyncRoutes)
    router.addRoutes([...newAsyncRoutes,...anyRoutes]);

    state.menuList = [...constantRoutes,...newAsyncRoutes,...anyRoutes];
  }
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password })
  //     .then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const response = await login({ username: username.trim(), password: password });
      const { data } = response
      // 将请求回来的token存入Vuex的state中(相当于存储于内存中)
      commit('SET_TOKEN', data.token)
      // 将请求回来的token存入cookie中(相当于存储于硬盘中)
      // cookie相对localStorage的好处:每次发送请求会自动携带该token
      setToken(data.token)
    } catch (error) {
      console.log('error')
    }

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data
        // console.log('data',data)

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_PERMISSION', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  // 开启命名空间,相当于是对所有的state,action,mutation进行模块化管理(类似作用域)
  //  dispatch('user/login')
  namespaced: true,
  state,
  mutations,
  actions
}

