import store from '@/shared/store'

export const LoginGuard = (to, from, next) => {
  if (store.state.auth.bearerToken) {
    return next({ name: 'home' })
  }
  next()
}
