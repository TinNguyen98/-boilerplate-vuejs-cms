import { EventService } from '@/api/services/event.service'
import { EVENT_DATA } from '@/enums/dummy-data.enum'

const initialState = {
  list: null,
  detail: null,
  pagination: null
}

const state = { ...initialState }

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
  getEventList ({ commit }, params = {}) {
    commit('SET_LIST', EVENT_DATA)
    commit('SET_PAGINATION', {
      total: EVENT_DATA.length,
      current_page: 1
    })

    return EVENT_DATA
    // return EventService.getList(params).then(res => {
    //   commit('SET_LIST', res.data)
    //   commit('SET_PAGINATION', res.pagination)
    //   return res
    // }).catch(err => {
    //   return err.response.data
    // })
  },

  createEvent ({ commit }, params = {}) {
    return EventService.create(params).then(res => {
      return res
    }).catch(err => {
      return err.response.data
    })
  },

  updateEvent ({ commit }, params = {}) {
    return EventService.edit(params).then(res => {
      return res
    }).catch(err => {
      return err.response.data
    })
  },

  removeEvent ({ commit }, id) {
    return EventService.remove(id).then(_ => {
      return true
    }).catch(_ => {
      return false
    })
  },

  getDetail ({ commit }, payload = {}) {
    const { id, params } = payload

    const result = EVENT_DATA.find(i => i.id === id)
    commit('SET_DETAIL', result)
    return true

    // return EventService.show(id, params).then((res) => {
    //   commit('SET_DETAIL', res.data)
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
