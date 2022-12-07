import { UploadService } from '@/api/services/upload.service'

export const state = {}

const getters = {}

const mutations = {}

const actions = {
  postFile ({ commit }, params = {}) {
    return UploadService.upload(params).then(res => {
      return res
    }).catch(err => {
      return err.response.data
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
