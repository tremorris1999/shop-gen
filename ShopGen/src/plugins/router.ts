import routes from '@/routes'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import useUser from '@/composables/user'

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
})

const user = useUser()
router.beforeEach(to => {
  const route = routes.find(r => r.path == to.path)
  if (to.path !== '/login' && route?.loggedIn && !user.getCurrentUser()) {
    return { path: '/login' }
  }
})

export default router
