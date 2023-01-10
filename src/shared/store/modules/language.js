import i18n from '@/plugins/i18n'
import { LOCALE, LOCAL_STORAGE } from '@/enums/locale.enum'

const localLanguage = localStorage.getItem(LOCAL_STORAGE.language)

const state = {
  locale: Object.values(LOCALE).includes(localLanguage) ? localLanguage : null,
}

const mutations = {
  SET_LANGUAGE(state, payload) {
    state.locale = payload
  },
}

const actions = {
  setLanguage({ commit }, lang) {
    i18n.locale = lang
    localStorage.setItem(LOCAL_STORAGE.language, lang)
    commit('SET_LANGUAGE', lang)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
