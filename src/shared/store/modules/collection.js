import { CollectionService } from '@/api/services/collection.service'

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
  getCollectionList ({ commit }, params = {}) {
    return CollectionService.getList(params).then(res => {
      commit('SET_LIST', res.data)
      commit('SET_PAGINATION', res.pagination)
      return res
    }).catch(err => {
      return err.response.data
    })
  },

  createCollection ({ commit }, params = {}) {
    return CollectionService.create(params).then(res => {
      return res
    }).catch(err => {
      return err.response.data
    })
  },

  updateCollection ({ commit }, params = {}) {
    return CollectionService.edit(params).then(res => {
      return res
    }).catch(err => {
      return err.response.data
    })
  },

  removeCollection ({ commit }, id) {
    return CollectionService.remove(id).then(_ => {
      return true
    }).catch(_ => {
      return false
    })
  },

  getDetail ({ commit }, payload = {}) {
    const { id, params } = payload
    return CollectionService.show(id, params).then((res) => {
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
