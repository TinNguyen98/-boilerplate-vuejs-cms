import { ApiService } from '../index'

export const UploadService = {
  async upload (form) {
    return ApiService.post('/upload', form)
  },
}
