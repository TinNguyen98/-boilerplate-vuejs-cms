import store from '@/store'
import * as types from '@/store/mutation-types'

export const AuthGuard = async (to, from, next) => {
  if (!store.getters.hasToken) {
    next({ name: 'auth.login' })
  }
  try {
    // Refresh token
    const data = await store.dispatch('auth/refreshToken')
    store.commit(types.SET_TOKEN, { ...data })

    // Get profile
    if (!store.getters.profile) {
      const data = await store.dispatch('auth/me')
      store.commit(types.SET_PROFILE, { profile: data })
    }
    next()
  } catch (e) {
    await store.dispatch('auth/logout')
    next({ name: 'auth.login' })
    throw e
  }
}
