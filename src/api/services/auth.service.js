import { ApiService } from '../index'

export const AuthService = {
  async login(data) {
    return ApiService.post('/auth/login', data)
  },

  async refreshToken() {
    return ApiService.post('/auth/refresh')
  },

  async logout() {
    return ApiService.post('/auth/logout')
  },

  async me() {
    return ApiService.get('/auth/me')
  },
}
