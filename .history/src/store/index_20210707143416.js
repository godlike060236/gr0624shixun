import Vue from 'vue'
import Vuex from 'vuex'

// Vuex就是全局data
Vue.use(Vuex)

export default new Vuex.Store({
  // 定义数据
  state: {
  },
  // 给数据定义set方法
  mutations: {
    SET_TOKEN(state,token)
  },
  getters:{}
})
