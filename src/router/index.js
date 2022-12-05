import Vue from 'vue'
import Router from 'vue-router'
import { routes } from '@/router/routes'
import store from '@/shared/store'
import head from 'lodash-es/head'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes
})

/**
 * Global Before Guards
 *
 * @param to
 * @param from
 * @param next
 * @returns {Promise<void>}
 */
const beforeEach = async (to, from, next) => {
  const currentRoute = head(to.matched)
  store.commit('SET_LAYOUT', { layout: currentRoute.meta.layout || 'default' })
  next()
}

/**
 * Global After Hooks
 *
 * @returns {Promise<void>}
 */
const afterEach = async () => {
  await router.app.$nextTick()
}

router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router
