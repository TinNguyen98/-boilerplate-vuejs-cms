import { FrameService } from '@/api/services/frame.service'

const initialState = {
  list: null,
  detail: null,
  pagination: null
}

export const state = { ...initialState }

const getters = {}

const mutations = {
  SET_DETAIL (state, payload) {
    state.detail = payload
  },
  SET_LIST (state, payload) {
    state.list = payload
  },
  SET_PAGINATION (state, payload) {
    state.pagination = payload
  }
}

const actions = {
  getFrameList ({ commit }, params = {}) {
    return FrameService.getList(params).then(res => {
      commit('SET_LIST', res.data)
      commit('SET_PAGINATION', res.pagination)
      return res
    }).catch(err => {
      return err.response.data
    })
  },

  createFrame ({ commit }, params = {}) {
    return FrameService.create(params).then(res => {
      return res
    }).catch(err => {
      return err.response.data
    })
  },

  updateFrame ({ commit }, params = {}) {
    return FrameService.edit(params).then(res => {
      return res
    }).catch(err => {
      return err.response.data
    })
  },

  removeFrame ({ commit }, id) {
    return FrameService.remove(id).then(_ => {
      return true
    }).catch(_ => {
      return false
    })
  },

  getDetail ({ commit }, payload = {}) {
    const { id, params } = payload
    return FrameService.show(id, params).then((res) => {
      commit('SET_DETAIL', res.data)

      return true
    }).catch(_ => {
      return false
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
