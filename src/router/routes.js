import Resource from '@/components/Resource'
import i18n from '@/plugins/i18n'
import { LoginGuard, AuthGuard, ResolveGuard } from '@/router/guards'

export function page (path) {
  return () => import(/* webpackChunkName: "[request]" */ `@/pages/${path}`)
}

export const routes = [
  // Login
  {
    path: '/login',
    name: 'auth.login',
    component: page('auth/Login.vue'),
    meta: { layout: 'auth' },
    beforeEnter: ResolveGuard([LoginGuard])
  },

  // Dashboard
  {
    path: '/',
    name: 'dashboard',
    component: page('Dashboard.vue'),
    meta: {},
    beforeEnter: ResolveGuard([AuthGuard])
  },

  // Server Error
  {
    path: '/server-error',
    name: 'server_error',
    component: page('error/ServerError.vue')
  },

  // Not authenticated
  {
    path: '/not-authenticated',
    name: 'not_authenticated',
    component: page('error/NotAuthenticated.vue')
  },

  // Not found
  {
    path: '*',
    name: 'not_found',
    component: page('error/NotFound.vue')
  }
]
