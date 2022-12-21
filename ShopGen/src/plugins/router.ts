import routes from '@/routes'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[]
})
