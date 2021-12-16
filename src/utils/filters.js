import Vue from 'vue'
import * as moment from 'moment-timezone'
import { formatDate, decodeFieldEditor } from '@/utils/helper'

Vue.filter('filterFormatDate', function (value, format = '') {
  let date = moment(value)
  if (!date.isValid()) return ''
  return formatDate(date, format)
})

Vue.filter('truncate', (text, suffix, num) => {
  if (text !== undefined && text.length > num) {
    return text.substring(0, num) + suffix
  } else {
    return text
  }
})

/**
 * Convert base64 back to structure HTML
 */
Vue.filter('decodeFieldEditor', (text) => {
  return decodeFieldEditor(text)
})

/**
 * remove all html tas but <br>
 */
Vue.filter('stripHtmlTags', function (text) {
  if (!(typeof text === 'string') && !(text instanceof String)) return ''

  return text.replace(/(<((?!br)[^>]+)>)/gm, '')
})
