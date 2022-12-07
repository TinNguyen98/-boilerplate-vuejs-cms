import * as moment from 'moment-timezone'
import router from '@/router'
import { forEach } from 'lodash-es'
import i18n from "@/plugins/i18n"

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

export const handleErrorNotAllow = async (errStatus) => {
  if ([403, 405].includes(errStatus)) {
    await router.push({ name: 'not_authenticated' })
    return true
  }
  return false
}

export const encodeMessage = (content) => {
  // Includes two-step use the remove character script or tag html before send api:
  // Step 1: encodeURI() convert structure HTML to character
  // Step 2: btoa() convert all character to base64
  return content ? window.btoa(encodeURI(content)) : ''
}

export const decodeMessage = (content) => {
  if (!content) return ''
  // Cuz old record only encodeURI so have to distinguish base64 vs base64url
  // Reference link: https://stackoverflow.com/questions/55389211/string-based-data-encoding-base64-vs-base64url
  let formatText = content
  if (!content.includes('%')) {
    try {
      formatText = window.atob(content)
    } catch (e) { throw e }
  }

  try {
    formatText = decodeURI(formatText)
  } catch (e) { throw e }

  return formatText
}

export const detectShiftEnter = (event) => {
  // enter keycode = 13
  return Object.keys(event).length &&
    event.keyCode === 13 && event.shiftKey
}

export const scrollToErrorPlace = (form) => {
  if (!form) return
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

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default {
  formatDate,
  handleErrorNotAllow,
  encodeMessage,
  decodeMessage,
  detectShiftEnter,
  scrollToErrorPlace,
  stripHtmlExceptTags,
  handleInputProtection,
  capitalizeFirstLetter
}
