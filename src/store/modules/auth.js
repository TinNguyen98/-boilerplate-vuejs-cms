import store from '../index'
import * as types from '../mutation-types'
import { AuthService } from '@/api/services/auth.service'
import { ACCOUNT } from '@/enum/account.enum'

const actions = {
  /**
   * Login
   */
  async login ({ commit }, data) {
    try {
      // LOGIN DUMMY
      const accountInfo = ACCOUNT.find(user =>
        user.email === data.login_id && user.password === data.password)
      if (!accountInfo) return false

      store.commit(types.SET_TOKEN, { token: accountInfo.access_token })
      store.commit(types.SET_ROLE, accountInfo.role)
      store.commit(types.SET_PROFILE, { profile: accountInfo })
      // return await AuthService.login(data).then(resp => {
      //   return resp.data.data
      // })

      return true
    } catch (e) {
      throw (e)
    }
  },

  /**
   * Refresh token
   */
  async refreshToken ({ commit }) {
    try {
      return await AuthService.refreshToken().then(resp => {
        return resp.data.data
      })
    } catch (e) {
      throw (e)
    }
  },

  /**
   * Logout
   */
  async logout () {
    try {
      store.commit(types.LOG_OUT)

      // return await AuthService.logout().then(_ => {
      //   store.commit(types.LOG_OUT)
      // })
    } catch (e) {
      throw (e)
    }
  },

  /**
   * Get profile
   */
  async me () {
    try {
      return await AuthService.me().then(resp => {
        return resp.data.data
      })
    } catch (e) {
      throw (e)
    }
  }
}

export default {
  namespaced: true,
  actions
}
