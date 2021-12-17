import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import Cookie from 'js-cookie'
import { COOKIES_KEY } from '@/enum/cookie.enum'

/* Modules */
import auth from './modules/auth'

Vue.use(Vuex)

const modules = {
  auth
}

const loading = document.getElementById('loading')
const store = new Vuex.Store({
  modules,
  state () {
    return {
      loadingOverlay: false,
      profile: null,
      role: null,
      layout: null,
      token: Cookie.get(COOKIES_KEY.token)
    }
  },
  getters: {
    profile: state => state.profile,
    role: state => state.role,
    layout: state => state.layout,
    hasToken: state => state.token
  },
  mutations: {
    [types.START_LOADING] (state) {
      state.loadingOverlay = true
      if (loading) {
        loading.style.display = 'block'
      }
    },
    [types.END_LOADING] (state) {
      state.loadingOverlay = false
      if (loading) {
        loading.style.display = 'none'
      }
    },
    [types.SET_LAYOUT] (state, payload) {
      state.layout = payload
    },
    [types.SET_ROLE] (state, payload) {
      state.role = payload
    },
    [types.SET_PROFILE] (state, { profile }) {
      state.profile = profile
    },
    [types.SET_TOKEN] (state, { token }) {
      state.token = token
      Cookie.set(COOKIES_KEY.token, token)
    },
    [types.LOG_OUT] (state) {
      state.token = null
      state.profile = null
      Cookie.remove(COOKIES_KEY.token)
    }
  }
})

export default store
