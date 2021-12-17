import axios from 'axios'
import store from '@/store'
import router from '@/router'
import i18n from '@/plugins/i18n'
import Cookie from 'js-cookie'
import { COOKIES_KEY } from '@/enum/cookie.enum'

const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Frame-Options': 'SAMEORIGIN'
  },
  timeout: 30000 // request timeout
})

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    if (Cookie.get(COOKIES_KEY.token)) {
      config.headers['Authorization'] = `Bearer ${Cookie.get(COOKIES_KEY.token)}`
    }
    return config
  }
)

// Response interceptor
instance.interceptors.response.use(response => response,
  async (error) => {
    // Catch err CORS with case type script inside (input, textarea)
    if (error.toString().includes('Network Error')) {
      alert(i18n.t('type_tag_script_err_mess'))
    }
    // Do something with response error
    let { status } = error.response

    if (status === 401) {
      await store.dispatch('auth/logout')
      if (store.state.layout !== 'auth') await router.push({ name: 'auth.login' })
    }

    if (status === 404) await router.push({ name: 'not_found' })

    if (status === 500) await router.push({ name: 'server_error' })

    return Promise.reject(error)
  }
)

export default instance
