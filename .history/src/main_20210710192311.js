import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui'
// 全局注册组件
import uploadone from './components/upload/uploadone'
import uploadmore from './components/upload/uploadmore'
// 引入富文本编辑器
import Editor from '@/components/editor'
Vue.component('uploadone', uploadone)
Vue.component('uploadmore', uploadmore)
Vue.component('Editor', Editor)

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.img = (path) => {
  return 'http://192.168.119.22:9000/images/' + path
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
