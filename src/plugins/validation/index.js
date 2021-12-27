import Vue from 'vue'
import * as rules from 'vee-validate/dist/rules'
import i18n from '@/plugins/i18n'
import moment from 'moment'
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
import { formatDate } from '@/utils/helper'

// with typescript
for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  })
}

// Check Start Date and End Date based on range
extend('limit_startend_date', {
  validate (value, params) {
    if (value.start.date !== '' && value.end.date !== '') {
      let startDate = value.start.date
      let endDate = value.end.date
      let limitEnd = moment(startDate).clone().add(+(params[0]), 'years')
      let limitStart = moment(endDate).clone().subtract(+(params[0]), 'years')
      return formatDate(endDate, 'YYYY-MM-DD') < formatDate(limitEnd, 'YYYY-MM-DD') ||
        formatDate(startDate, 'YYYY-MM-DD') > formatDate(limitStart, 'YYYY-MM-DD')
    }
    return false
  }
})

// Check Start Date < End Date and Required
extend('real_startend_date', {
  validate (value) {
    const startDate = value.start.date
    const endDate = value.end.date
    if (startDate && endDate) {
      return formatDate(startDate, 'YYYY-MM-DD') <= formatDate(endDate, 'YYYY-MM-DD')
    }
    return false
  }
})

extend('valid_url', {
  validate (value) {
    // REGEX: check url
    const urlRegex = new RegExp('[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', 'i')
    return urlRegex.test(value)
  }
})

extend('not_emoji', {
  validate (value) {
    let regexEmoji = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    return !regexEmoji.test(value)
  }
})

extend('required_editor', {
  ...rules.required,
  validate (value) {
    // REGEX: remove all tag html except (img, iframe)
    return !!value.replaceAll(/<(?![img iframe])[^>]*>/g, '').trim()
  }
})

extend('max_editor', {
  validate (value, params) {
    // REGEX: remove all tag html
    return value.replaceAll(/<[^>]*>/g, '').trim().length <= +(params[0])
  }
})

extend('contain_lower_latin', {
  validate (value) {
    return value.match(/[a-z]/g) !== null
  }
})

extend('contain_upper_latin', {
  validate (value) {
    return value.match(/[A-Z]/g) !== null
  }
})

extend('contain_numeric', {
  validate (value) {
    return value.match(/[0-9]/g) !== null
  }
})

extend('contain_special_char', {
  validate (value) {
    const format = /[`~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
    return format.test(value)
  }
})

extend('required_image', {
  ...rules.required
})

extend('required_choose', {
  ...rules.required
})

extend('required_only_enter', {
  ...rules.required
})

extend('required_only_choose', {
  ...rules.required
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

configure({
  defaultMessage: (field, values) => {
    const text = field.toLowerCase()
    // override the field name.
    values._field_ = i18n.t(`${text}`)

    return i18n.t(`validation.${values._rule_}`, values)
  }
})
