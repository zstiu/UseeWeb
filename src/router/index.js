import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Danmu from '@/components/Danmu/Danmu'
import Canvas2D from '@/components/Canvas2D/Canvas2D'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/canvas2D'
    },
    {
      path: '/hello',
      component: Hello
    },
    {
      path: '/danmu',
      component: Danmu
    },
    {
      path: '/canvas2D',
      component: Canvas2D
    }
  ]
})
