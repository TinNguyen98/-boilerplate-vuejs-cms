import Vue from 'vue'
import * as moment from 'moment-timezone'
import {
  formatDate,
  formatNumberDecimal,
  capitalizeFirstLetter,
  stripHtmlExceptTags
} from '@/shared/helpers'

Vue.filter('filterFormatDate', function (value, format = '') {
  let date = moment(value)
  if (!date.isValid()) return ''
  return formatDate(date, format)
})

Vue.filter('filterEmptyField', function (value, character = '/') {
  if (!value) return ''
  const arrField = value.split(character)
  return arrField.filter(v => !['null', 'undefined'].includes(v.toString().trim())).join(character)
})

Vue.filter('filterFormatNumberDecimal', function (value, format) {
  if (!value) return ''
  return formatNumberDecimal(value, format)
})

Vue.filter('filterCapitalizeFirstLetter', function (text) {
  return capitalizeFirstLetter(text)
})

Vue.filter('filterStripHtmlExceptTags', function (value, exceptTags) {
  return stripHtmlExceptTags(value, exceptTags)
})
