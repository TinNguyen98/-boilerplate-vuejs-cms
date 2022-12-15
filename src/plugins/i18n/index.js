import Vue from 'vue'
import VueI18n from 'vue-i18n'
import validationMessagesEnglish from 'vee-validate/dist/locale/en'
import validationMessagesVietnamese from 'vee-validate/dist/locale/vi'

// import languages
import english from '@/languages/en'
import vietnamese from '@/languages/vi'
import { LOCALE } from '@/enum/locale.enum'

Vue.use(VueI18n)

const dictionary = {
  vi: {
    required: 'Vui lòng nhập vào mục {_field_}.', // override 'required' rule.
    required_choose: 'Vui lòng nhập chọn một {_field_}.',
    required_multi_choose: 'Vui lòng nhập chọn ít nhất một {_field_}.',
    min: 'Vui lòng nhập từ {length} ký tự trở lên.',
    max: 'Vui lòng nhập trong phạm vi {length} ký tự.',
    required_file: 'Vui lòng chọn file {_field_}.',
    required_editor: 'Vui lòng nhập vào mục {_field_}.',
    required_image: 'Vui lòng tải ảnh.',
    not_emoji: 'Vui lòng không nhập các ký tự emoji.',
    valid_url: 'URL không đúng định dạng.',
    half_width: 'Vui lòng chỉ nhập các ký tự, ký tự chữ và số half-width.',
    full_width: 'Vui lòng chỉ nhập các ký tự full-width.',
  },
  en: {
    required: 'Please enter {_field_}.', // override 'required' rule.
    required_choose: 'Please enter select one {_field_}.',
    required_multi_choose: 'Please enter at least one {_field_}.',
    min: 'Please enter {length} characters or more.',
    max: 'Please enter within {length} characters.',
    required_editor: 'Please enter {_field_}.',
    required_image: 'Please upload pictures.',
    not_emoji: 'Please do not enter emoji characters.',
    valid_url: 'The URL is malformed.',
    half_width: 'Please enter only alphanumeric characters and half-width.',
    full_width: 'Please enter only full-width characters.',
  }
}

const messages = {
  vietnamese: {
    ...vietnamese,
    validation: {
      ...validationMessagesVietnamese.messages,
      ...dictionary.vi
    }
  },
  english: {
    ...english,
    validation: {
      ...validationMessagesEnglish.messages,
      ...dictionary.en
    }
  }
}

const i18n = new VueI18n({
  locale: LOCALE.vi, // set locale
  fallbackLocale: LOCALE.en,
  messages
})

export default i18n
