import Vue from 'vue'
import Vuex from 'vuex'
// store数据持久化(一般放session即可)
import createPersistedState from 'vuex-persistedstate'

// Vuex就是全局data
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  // 定义数据
  state: {
    token: '',
    menu: []
  },
  // 给数据定义set方法
  mutations: {
    SET_TOKEN(state,token){
      state.token = token
    },
    SET_MENU(state,menu){
      state.menu = menu
    }
  },
  getters:{
    GET_TOKEN(state){
      return state.token
    },
    GET_MENU(state){
      return state.menu
    }
  }
})
