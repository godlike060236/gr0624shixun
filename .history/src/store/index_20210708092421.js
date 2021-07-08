import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-per'

// Vuex就是全局data
Vue.use(Vuex)

export default new Vuex.Store({
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
