import Vue from 'vue'
import * as rules from 'vee-validate/dist/rules'
import i18n from '@/plugins/i18n'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
} from 'vee-validate'

// with typescript
for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
  })
}

extend('valid_url', {
  validate(value) {
    // REGEX: check url
    const urlRegex = new RegExp(
      '[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
      'i'
    )
    return urlRegex.test(value)
  },
})

extend('not_emoji', {
  validate(value) {
    let regexEmoji =
      /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu
    return !regexEmoji.test(value)
  },
})

extend('required_editor', {
  ...rules.required,
  validate(value) {
    // REGEX: remove all tag html except (img, iframe)
    return !!value.replaceAll(/<(?![img iframe])[^>]*>/g, '').trim()
  },
})

extend('half_width', {
  validate(value) {
    return /^[a-zA-Z0-9!-'*-.^-`~:?@=]+$/.test(value)
  },
})

extend('full_width', {
  validate(value) {
    return /^[ａ-ｚＡ-Ｚ一-龠々-〇ぁ-んァ-ヶ０-９ー・]+$/.test(value)
  },
})

extend('min_multi', {
  ...rules.min,
  validate(value, params) {
    if (!Array.isArray(value)) {
      console.error('ERROR: The input value must be an array!')
      return true
    }
    return !(value.length < params.length)
  },
})

extend('max_multi', {
  ...rules.max,
  validate(value, params) {
    if (!Array.isArray(value)) {
      console.error('ERROR: The input value must be an array!')
      return true
    }
    return !(value.length > params.length)
  },
})

extend('required_file', {
  ...rules.required,
})

extend('required_image', {
  ...rules.required,
})

extend('required_choose', {
  ...rules.required,
})

extend('required_multi_choose', {
  ...rules.required,
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

configure({
  defaultMessage: (field, values) => {
    const text = field.toLowerCase()
    // override the field name.
    values._field_ = i18n.t(`${text}`)

    return i18n.t(`validation.${values._rule_}`, values)
  },
})
