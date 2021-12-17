import store from '@/store'

export const LoginGuard = (to, from, next) => {
  if (store.getters.profile || store.state.token) {
    return next({ name: 'dashboard' })
  }
  next()
}
