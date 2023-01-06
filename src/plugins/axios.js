import store from '@/shared/store'
import router from '@/router'
import axios from 'axios'
import i18n from '@/plugins/i18n'
import Cookie from 'js-cookie'
import { COOKIES_KEY } from '@/enums/cookie.enum'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 30000 // request timeout
})

axios.defaults.showLoader = true
// Request interceptor
instance.interceptors.request.use(
  config => {
    const token = Cookie.get(COOKIES_KEY.token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    store.dispatch('loader/pending')
    return config
  },
  error => {
    store.dispatch('loader/done')
    return Promise.reject(error)
  }
)

// Response interceptor
instance.interceptors.response.use(
  response => {
    store.dispatch('loader/done')
    return response
  },
  error => {
    // Catch err CORS with case type script inside (input, textarea)
    if (error.toString().includes('Network Error')) {
      alert(i18n.t('type_tag_script_err_mess'))
    }
    // Do something with response error
    let { status } = error.response
    let isLoginPage = router.currentRoute.name === 'auth.login'

    if (status === 401 && !isLoginPage) {
      store.commit('auth/SET_LOGOUT')
      router.push({ name: 'auth.login' }).catch(() => {})
    }
    if (status === 404) router.push({ name: 'not_found' })
    if (status === 500) router.push({ name: 'server_error' })

    store.dispatch('loader/done')
    return Promise.reject(error)
  }
)

export default instance
