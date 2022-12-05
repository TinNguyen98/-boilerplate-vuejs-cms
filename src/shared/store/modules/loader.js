const initialState = {
  loading: false,
  requestsPending: 0
}

export const state = { ...initialState }

const mutations = {
  show (state) {
    state.loading = true
  },
  hide (state) {
    state.loading = false
  },
  pending (state) {
    if (state.requestsPending === 0) {
      this.commit('loader/show')
    }

    state.requestsPending++
  },
  done (state) {
    if (state.requestsPending >= 1) {
      state.requestsPending--
    }

    if (state.requestsPending <= 0) {
      this.commit('loader/hide')
    }
  }
}

const actions = {
  show ({ commit }) {
    commit('show')
  },
  hide ({ commit }) {
    commit('hide')
  },
  pending ({ commit }) {
    commit('pending')
  },
  done ({ commit }) {
    commit('done')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
