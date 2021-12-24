import store from '@/store'
import { ACCOUNT } from '@/enum/account.enum'
import * as types from '@/store/mutation-types'

export const AuthGuard = async (to, from, next) => {
  if (!store.getters.hasToken) {
    return next({ name: 'auth.login' })
  }
  try {
    // REFRESH PROFILE DUMMY
    const accountInfo = ACCOUNT.find(user =>
      store.getters.hasToken === user.access_token)

    if (!accountInfo) next({ name: 'auth.login' })

    store.commit(types.SET_TOKEN, { token: accountInfo.access_token })
    store.commit(types.SET_ROLE, accountInfo.role)
    store.commit(types.SET_PROFILE, { profile: accountInfo })

    // // Refresh token
    // const data = await store.dispatch('auth/refreshToken')
    // store.commit(types.SET_TOKEN, { ...data })
    //
    // // Get profile
    // if (!store.getters.profile) {
    //   const data = await store.dispatch('auth/me')
    //   store.commit(types.SET_PROFILE, { profile: data })
    // }
    next()
  } catch (e) {
    await store.dispatch('auth/logout')
    next({ name: 'auth.login' })
    throw e
  }
}
