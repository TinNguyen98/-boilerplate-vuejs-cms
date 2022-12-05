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
    required: '{_field_} là bắt buộc', // override 'required' rule.
    required_choose: '{_field_} là bắt buộc chọn', // override 'required' rule.
    required_only_enter: '{_field_}を入力ください',
    required_only_choose: '{_field_}を選択ください',
    required_editor: '{_field_}を入力してください',
    required_image: '画像を選択してください',
    email: '{_field_}ドレスの形式が正しくありません',
    not_emoji: '使用できない文字が入力されています',
    contain_lower_latin: 'パスワードは英大文字・英小文字・数字・記号から4 種混ぜ合わせて10 以上16文字以内を入力してください。',
    contain_upper_latin: 'パスワードは英大文字・英小文字・数字・記号から4 種混ぜ合わせて10 以上16文字以内を入力してください。',
    contain_numeric: 'パスワードは英大文字・英小文字・数字・記号から4 種混ぜ合わせて10 以上16文字以内を入力してください。',
    contain_special_char: 'パスワードは英大文字・英小文字・数字・記号から4 種混ぜ合わせて10 以上16文字以内を入力してください。',
    valid_url: 'URLの形式が正しくありません',
    limit_startend_date: '応募期間は10年以内にご入力ください',
    real_startend_date: '終了日には、開始日より後の日付を指定してください',
    max_editor: '{length}文字以内で入力してください'
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
