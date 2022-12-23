// Core
import Vue from 'vue'
import Vuex from 'vuex'
// Modules
import auth from '@/shared/store/modules/auth'
import loader from '@/shared/store/modules/loader'
import upload from '@/shared/store/modules/upload'
import event from '@/shared/store/modules/event'
import collection from '@/shared/store/modules/collection'
import frame from '@/shared/store/modules/frame'

Vue.use(Vuex)
const modules = {
  auth,
  upload,
  loader,
  event,
  collection,
  frame
}

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state () {
    return {
      layout: null
    }
  },
  getters: {
    layout: state => state.layout,
    isMobile: _ => window.innerWidth <= 767
  },
  mutations: {
    SET_LAYOUT (state, { layout }) {
      state.layout = layout
    }
  },
  modules,
  strict: debug
})

export default store



