import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Danmu from '@/components/Danmu/Danmu'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      component: Hello
    },
    {
      path: '/danmu',
      component: Danmu
    }
  ]
})
