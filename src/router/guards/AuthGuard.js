import store from '@/shared/store'

export const AuthGuard = async (to, from, next) => {
  // Check not has token
  if (!store.state.auth.bearerToken) {
    return next({ name: 'auth.login' })
  }

  // Check information user is empty
  if (!Object.keys(store.state.auth.userProfile).length) {
    await store.dispatch('auth/userProfile')
  }

  next()
}
