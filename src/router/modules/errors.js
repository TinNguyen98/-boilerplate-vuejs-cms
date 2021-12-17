import { page } from '@/router/routes'

export default [
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
