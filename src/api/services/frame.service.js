import { ApiService } from '../index'

const BaseUrl = 'frame'

export const FrameService = {
  async getList(params = {}) {
    return ApiService.get(`${BaseUrl}`, params).then((resp) => resp.data)
  },

  async show(id, params = {}) {
    return ApiService.get(`${BaseUrl}/${id}`, params).then((resp) => resp.data)
  },

  async create(params = {}) {
    return ApiService.post(`${BaseUrl}`, params).then((resp) => resp.data)
  },

  async edit(params = {}) {
    return ApiService.put(`${BaseUrl}/${params.id}`, params).then(
      (resp) => resp
    )
  },

  async remove(id, params = {}) {
    return ApiService.delete(`${BaseUrl}/${id}`, params).then((resp) => resp)
  },
}
