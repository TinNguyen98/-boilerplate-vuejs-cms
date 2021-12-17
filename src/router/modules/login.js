import { LoginGuard, ResolveGuard } from '@/router/guards'
import { page } from '@/router/routes'

export default {
  path: '/login',
  name: 'auth.login',
  component: page('auth/Login.vue'),
  meta: { layout: 'auth' },
  beforeEnter: ResolveGuard([LoginGuard])
}
