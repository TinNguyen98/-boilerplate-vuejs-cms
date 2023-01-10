import axiosInstance from '@/plugins/axios'

export const ApiService = {
  get(url, params = {}) {
    return axiosInstance.get(`${url}`, { params })
  },

  post(url, body, config = {}) {
    return axiosInstance.post(`${url}`, body, config)
  },

  put(url, body, params = {}) {
    return axiosInstance.put(`${url}`, body, { params })
  },

  delete(url, params = {}) {
    return axiosInstance.delete(url, params)
  },
}
