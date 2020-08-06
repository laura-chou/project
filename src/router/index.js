import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue')
  },
  {
    path: '/backstage',
    name: 'Backstage',
    component: () => import(/* webpackChunkName: "backstage" */ '../views/Backstage.vue')
  },
  {
    path: '/check',
    name: 'Check',
    component: () => import(/* webpackChunkName: "check" */ '../views/Check.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
