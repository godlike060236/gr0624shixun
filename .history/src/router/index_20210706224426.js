import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
                component: () => import('../views/user')
            },
            {
                path: '/brand',
                name: 'BrandList',
                component: () => import('../views/brand')
            },
            {
                path: '/role',
                name: 'RoleList',
                component: () => import('../views/role')
            },
            {
                path: '/roleusers',
                name: 'RoleList',
                component: () => import('../views/role/users')
            },
            {
              path: '/roleresources',
              name: 'RoleResources',
              component: () => import('../views/role/resource')
            },
            {
              path: '/resource',
              name: 'ResourceList',
              component: () => import('../views/resource')
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
