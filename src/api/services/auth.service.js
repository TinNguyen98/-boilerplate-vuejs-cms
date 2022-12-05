import { ApiService } from '../index'

export const AuthService = {
  async login (data) {
    return ApiService.post('/user/login', data)
  },

  async logout () {
    return ApiService.post('/user/logout')
  },

  async me () {
    return ApiService.get('/user/my_page')
  },

  async resetPassword (data) {
    return ApiService.post('/user/reset-password', data)
  }
}
