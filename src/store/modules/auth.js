import store from '../index'
import * as types from '../mutation-types'
import { AuthService } from '@/api/services/auth.service'

const actions = {
  /**
   * Login
   */
  async login({commit}, data) {
    try {
      return await AuthService.login(data).then(resp => {
        return resp.data.data
      })
    } catch (e) {
      throw (e)
    }
  },

  /**
   * Refresh token
   */
  async refreshToken({commit}) {
    try {
      return await AuthService.refreshToken().then(resp => {
        return resp.data.data
      })
    } catch (e) {
      throw (e)
    }
  },

  /**
   * logout
   */
  async logout() {
    try {
      return await AuthService.logout().then(_ => {
        store.commit(types.LOG_OUT)
      })
    } catch (e) {
      throw (e)
    }
  },

  /**
   * Get profile
   */
  async me() {
    try {
      return await AuthService.me().then(resp => {
        return resp.data.data
      })
    } catch (e) {
      throw (e)
    }
  },
}

export default {
  namespaced: true,
  actions
}
