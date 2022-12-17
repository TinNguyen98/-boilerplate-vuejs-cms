// import { AuthService } from '@/api/services/auth.service'
import Cookie from 'js-cookie'
import { COOKIES_KEY } from '@/enum/cookie.enum'
import { ACCOUNT } from '@/enum/account.enum'

const initialState = {
  bearerToken: null,
  userProfile: {}
}

export const state = {
  ...initialState,
  bearerToken: Cookie.get(COOKIES_KEY.token)
}

const getters = {}

const mutations = {
  SET_TOKEN (state, payload) {
    const { token, expires } = payload
    state.bearerToken = token
    Cookie.set(COOKIES_KEY.token, token, { expires })
  },
  SET_LOGOUT (state) {
    state.bearerToken = initialState.bearerToken
    state.userProfile = initialState.userProfile
    Cookie.remove(COOKIES_KEY.token)
  },
  SET_USER (state, payload) {
    state.userProfile = payload
  }
}

const actions = {
  userLogin ({ commit }, params = {}) {
    // LOGIN DUMMY
    const accountInfo = ACCOUNT.find(user =>
      user.username === params.username && user.password === params.password)
    if (!accountInfo) return false

    commit('SET_TOKEN', {
      token: accountInfo.bearer_token,
      expires: accountInfo.expires_at
        ? new Date(accountInfo.expires_at)
        : COOKIES_KEY.expires
    })
    return true

    // return AuthService.login(params).then((res) => {
    //   commit('SET_TOKEN', res.data.bearer_token)
    //
    //   return true
    // }).catch(_ => {
    //   return false
    // })
  },

  userLogout ({ commit }) {
    commit('SET_LOGOUT')
    return true
    // return AuthService.logout().then((res) => {
    //   commit('SET_LOGOUT')
    //
    //   return true
    // }).catch(_ => {
    //   return false
    // })
  },

  userProfile ({ state, commit }) {
    if (!state.bearerToken) return false

    // PROFILE DUMMY
    commit('SET_USER', {
      id: '86dc5a6b-9530-4562-a3c5-68a57a604a27',
      role: 'admin',
      name: 'Admin nè',
      avatar: 'https://img.freepik.com/premium-vector/cute-white-cat-cartoon-vector-illustration_42750-808.jpg?w=2000',
      created_at: '2022-06-30 19:19:03'
    })
    return true
    // return AuthService.profile().then((res) => {
    //   commit('SET_USER', res.data)
    //
    //   return true
    // }).catch(_ => {
    //   return false
    // })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
