import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// js文件,并不能使用this.$store.getters得到store中的数据,需要先引用
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/user',
        name: 'userList',
        component: () => import('../views/user'),
      },
      {
        path: '/brand',
        name: 'BrandList',
        component: () => import('../views/brand'),
      },
      {
        path: '/role',
        name: 'RoleList',
        component: () => import('../views/role'),
      },
      {
        path: '/roleusers',
        name: 'RoleUsers',
        component: () => import('../views/role/users'),
      },
      {
        path: '/roleresources',
        name: 'RoleResources',
        component: () => import('../views/role/resource'),
      },
      {
        path: '/resource',
        name: 'ResourceList',
        component: () => import('../views/resource'),
      },
      {
        path: '/category',
        name: 'CategoryList',
        component: () => import('../views/category'),
      },
      {
        path: '/spu',
        name: 'SpuList',
        component: () => import('@/views/spu'),
      },
      {
        path: '/sku',
        name: 'SkuList',
        component: () => import('@/views/sku'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
// 调用路由过滤器
// 确定跳转地址之后，调用next进行跳转，否则页面会停在
// next调用之前，显示白页
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    // 跳出beforeEach方法
    return
  }
  if (store.getters.GET_TOKEN) {
    next()
    return
  }
  next('/login')
})
export default router
