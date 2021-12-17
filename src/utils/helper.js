import * as moment from 'moment-timezone'
import router from '@/router'
import i18n from '@/plugins/i18n'
import { forEach, keys } from 'lodash-es'

export const formatDate = (date, format = '') => {
  let convertDate = date
  if (!moment(convertDate, 'YYYY-MM-DD HH:mm:ss').isValid()) return ''

  // Convert obj moment to string date
  if (convertDate instanceof Object) {
    const d = new Date(date)
    let objDate = {
      year: d.getFullYear(),
      month: (d.getMonth() + 1),
      day: d.getDate(),
      hour: d.getHours(),
      minute: d.getMinutes(),
      second: d.getSeconds()
    }

    forEach(objDate, (value, index) => {
      if (value.toString().length < 2) { objDate[index] = '0' + value }
    })

    const time = [objDate.hour, objDate.minute, objDate.second].join(':')
    convertDate = [objDate.year, objDate.month, objDate.day].join('-') + ' ' + time
  }
  return moment(convertDate.toString(), 'YYYY-MM-DD HH:mm:ss').format(format)
}

export const checkImageSizeByMb = (file, limitSize = 5) => {
  const sizeMb = +((file.size / (1024 * 1024)).toFixed(2))
  if (sizeMb > limitSize) { alert(i18n.t('limit_size')); return true }
  return false
}

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

export const convertIntoParamsUrl = (data) => {
  if (data) {
    return keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&')
  }
  return ''
}

export const encodeFieldEditor = (data) => {
  // Includes two step use the remove character script or tag html before send api:
  // Step 1: encodeURI() convert structure HTML to character
  // Step 2: btoa() convert all character to base64
  return data ? window.btoa(encodeURI(data)) : ''
}

export const decodeFieldEditor = (data, type = '') => {
  if (!data) return ''
  // Because the project that take field title didn't use editor
  if (type === 'project') return data
  // Cuz old record only encodeURI so have to distinguish base64 vs base64url
  // Reference link: https://stackoverflow.com/questions/55389211/string-based-data-encoding-base64-vs-base64url
  let formatText = data
  if (!data.includes('%')) {
    try {
      formatText = window.atob(data)
    } catch (e) {}
  }

  try {
    formatText = decodeURI(formatText)
  } catch (e) {}

  return formatText
}

export const getDaysArrayByMonth = (year, month) => {
  const monthIndex = month - 1
  const date = new Date(year, monthIndex, 1)
  const result = []

  while (date.getMonth() === monthIndex) {
    result.push(date.getDate())
    date.setDate(date.getDate() + 1)
  }

  return result
}

export const handleErrorNotAllow = async (errStatus) => {
  if ([403, 405].includes(errStatus)) {
    await router.push({ name: 'not_authenticated' })
    return true
  }
  return false
}

export const scrollToErrorPlace = (form) => {
  // Scroll into error field
  setTimeout(() => {
    const errors = Object.entries(form.errors)
      .map(([key, value]) => ({ key, value }))
      .filter(error => error['value'].length)
    let elementPosition = form.refs[errors[0]['key']].$el.getBoundingClientRect().top
    let offsetPosition = elementPosition + window.pageYOffset - (window.innerHeight / 2)

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }, 100)
}

export const goBack = async () => {
  window.history.length > 1
    ? await router.go(-1) : await router.push('/')
}

export const beforeLeavePage = ($event) => {
  $event.returnValue = 'beforeunload'
  return $event.returnValue
}

export default {
  formatDate,
  checkImageSizeByMb,
  toBase64,
  convertIntoParamsUrl,
  getDaysArrayByMonth,
  handleErrorNotAllow,
  encodeFieldEditor,
  decodeFieldEditor,
  scrollToErrorPlace,
  goBack,
  beforeLeavePage
}
