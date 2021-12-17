import { AuthGuard, ResolveGuard } from '@/router/guards'

/* Route module */
import LoginRoute from './routes/login'
import ErrorsRoutes from './routes/errors'

export function page (path) {
  return () => import(/* webpackChunkName: "[request]" */ `@/pages/${path}`)
}

export const routes = [
  // Dashboard
  {
    path: '/',
    name: 'dashboard',
    component: page('Dashboard.vue'),
    meta: {},
    beforeEnter: ResolveGuard([AuthGuard])
  },
  ...LoginRoute,
  ...ErrorsRoutes
]
