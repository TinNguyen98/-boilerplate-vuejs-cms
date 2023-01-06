import * as moment from 'moment-timezone'
import router from '@/router'
import { forEach, includes } from 'lodash-es'
import i18n from "@/plugins/i18n"
import { notification } from 'ant-design-vue'

/**
 * @param date
 * @param format{string}
 * @returns {string}
 */
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

export const formatNumberDecimal = (number, format = ',') => {
  // Don't execute if it's negative number
  if (
    includes(['0', '-', '.'], number.toString().charAt(0)) ||
    includes(number.toString(), '.')
  ) { return number }

  number = number.toString().trim().replaceAll(format, '')
  // REGEX: detect number decimal and add dot every 3 digits
  return number.toString().trim().replace(/\B(?=(\d{3})+(?!\d))/g, format)
}

export const generateId = () => {
  const head = Date.now().toString(36)
  const tail = Math.random().toString(36).substr(2)
  return head + tail
}

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

export const verifyArgument = (arrRule, cb) => {
  if (!arrRule.includes(cb)) {
    return console.error(`The parameter's path is wrong or not found. Expected [${arrRule.join(', ')}], please check again parameter.`)
  }
}

export const capitalizeFirstLetter = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : string
}

export const checkImageSizeByMb = (file, limitSize = 5) => {
  const sizeMb = +((file.size / (1024 * 1024)).toFixed(2))
  if (sizeMb > +(limitSize)) {
    alert(i18n.t('limit_size', { size: limitSize }))
    return true
  }
  return false
}

export const handleErrorNotAllow = async (errStatus) => {
  if ([403, 405].includes(errStatus)) {
    await router.push({ name: 'not_authenticated' })
    return true
  }
  return false
}

export const scrollToErrorPlace = (form, scrollScope = null) => {
  if (!form) return
  // Scroll into error field
  setTimeout(() => {
    const errors = Object.entries(form.errors)
      .map(([key, value]) => ({ key, value }))
      .filter(error => error['value'].length)
    const elementPosition = form.refs[errors[0]['key']].$el.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - (window.innerHeight / 2)
    const scope = scrollScope ? scrollScope : window

    scope.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }, 100)
}

/**
 * Strip html tags except some tags inside exceptTags parameter
 * Explain character: open tag(<) = "&lt;" close tag(>) = "&gt;"
 *
 * @param text{string}
 * @param exceptTags{Array}
 * @returns {string}
 */
export const stripHtmlExceptTags = (text, exceptTags = []) => {
  if (!(typeof text === 'string') && !(text instanceof String)) return ''
  if (!(typeof exceptTags === 'object') && !(exceptTags instanceof Array)) {
    console.warn(i18n.t('strip_parameter_wrong'))
    return ''
  }

  const detectHtmlRegex = /<(\/?)(\w+)[^>]*\/?>/g
  return text.replace(detectHtmlRegex, (txt, endMark, tag) => {
    if (exceptTags.includes(tag)) {
      return !endMark ? txt : '<' + endMark + tag + '>'
    } else {
      return '&lt;' + endMark + tag + '&gt;'
    }
  })
}

export const handleInputProtection = (form) => {
  const cloneForm = { ...form }

  for (const property in cloneForm) {
    if (typeof cloneForm[property] !== 'string') break
    cloneForm[property] = stripHtmlExceptTags(cloneForm[property])
  }
  return cloneForm
}

export const handleRequestErrorMessage = (response, fallback = 'action_fail') => {
  const { status, message } = response

  // Validate error
  if (status === 422) {
    let contentError = ''
    if (typeof message === 'object') {
      Object.keys(message).forEach(field => {
        contentError += Array.isArray(message[field])
          ? message[field].join('\n') : message[field]
      })
    }

    return notification.error({
      message: i18n.t('fail'),
      description: contentError || message
    })
  }

  return notification.error({
    message: i18n.t('fail'),
    description: i18n.t(fallback)
  })
}

export default {
  formatDate,
  formatNumberDecimal,
  generateId,
  toBase64,
  verifyArgument,
  capitalizeFirstLetter,
  checkImageSizeByMb,
  handleErrorNotAllow,
  scrollToErrorPlace,
  stripHtmlExceptTags,
  handleInputProtection,
  handleRequestErrorMessage,
}
