import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

var router = new Router({
  routes: [

    {
      path: '/',
      name: 'chatbase',
      redirect: '/chatview',
      component: () => import('@/views/baseview/ChatBase'),
      children: [
        {
          path: 'chatview',
          name: 'chatview',
          component: () => import('@/views/baseview/chatview'),
        },
        {
          path: 'friendsview',
          name: 'friendsview',
          component: () => import('@/views/baseview/friendsview'),
        },
        {
          path: 'userinfoview',
          name: 'userinfoview',
          component: () => import('@/views/baseview/userinfoview'),
        },
      ]
    }
  ]
})

export default router
