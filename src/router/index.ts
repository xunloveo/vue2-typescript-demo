import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Layout from '@/layout/index.vue'
Vue.use(VueRouter)

// const routes: Array<RouteConfig> = [
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login
//   }
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/login',
      component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue'),
      meta: { hidden: true }
    },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import(/*webpackChunkName 'dashboard'*/ '@/views/dashboard/index.vue'),
          meta: {
            title: 'Dashboard',
            icon: 'dashboard'
          }
        }
      ]
    },
    {
      path: '/nested',
      component: Layout,
      redirect: '/nested/menu1',
      meta: {
        title: 'Nested',
        icon: 'nested'
      },
      children: [
        {
          path: 'menu1',
          component: () => import(/* webpackChunkName 'menu1*/ '@/views/nested/menu1/index.vue'),
          redirect: '/nested/menu1/menu1-1',
          meta: { title: 'Menu1' },
          children: [
            {
              path: 'menu1-1',
              component: () => import(/* webpackChunkName 'menu1-1*/ '@/views/nested/menu1/menu1-1/index.vue'),
              meta: { title: 'Menu1-1' }
            },
            {
              path: 'menu1-2',
              component: () => import(/* webpackChunkName 'menu1-2*/ '@/views/nested/menu1/menu1-2/index.vue'),
              redirect: '/nested/menu1/menu1-2/menu1-2-1',
              meta: { title: 'Menu1-2' },
              children: [
                {
                  path: 'menu1-2-1',
                  component: () => import(/* webpackChunkName 'menu1-2-1*/ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                  meta: { title: 'Menu1-2-1' }
                },
                {
                  path: 'menu1-2-2',
                  component: () => import(/* webpackChunkName 'menu1-2-1*/ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                  meta: { title: 'Menu1-2-2' }
                }
              ]
            },
            {
              path: 'menu1-3',
              component: () => import(/* webpackChunkName 'menu1-3*/ '@/views/nested/menu1/menu1-3/index.vue'),
              meta: { title: 'Menu1-3' }
            }
          ]
        },
        {
          path: 'menu2',
          component: () => import(/* webpackChunkName 'menu2' */ '@/views/nested/menu2/index.vue'),
          meta: { title: 'Menu2' }
        }
      ]
    }
  ]
})
