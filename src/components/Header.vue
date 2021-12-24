<template>
  <header id="header">
    This's header
    <a-button
      type="primary"
      @click="handleLogout"
    >
      {{ $t('log_out') }}
    </a-button>

    <a-select
      :default-value="capitalizeFirstLetter($i18n.locale)"
      @change="switchLocale">
      <template v-for="(locale, index) in availableLocales">
        <a-select-option
          :key="index"
          :value="locale">
          {{ capitalizeFirstLetter(locale) }}
        </a-select-option>
      </template>
    </a-select>
  </header>
</template>

<script>
import FormMixin from '@/mixins/form.mixin'
import InputSelect from '@/components/Form/InputSelect'
import { capitalizeFirstLetter } from '@/utils/helper'
import { mapActions } from 'vuex'

export default {
  name: 'Header',

  mixins: [FormMixin],

  components: {
    InputSelect
  },

  computed: {
    availableLocales () {
      return this.$i18n.availableLocales.filter(i => i !== this.$i18n.locale)
    }
  },

  methods: {
    capitalizeFirstLetter,
    ...mapActions('auth', ['logout']),

    async handleLogout () {
      try {
        await this.logout()
        this.onSuccess(200, this.$t('logout_success'))
        await this.$router.push({ name: 'auth.login' })
      } catch (error) {}
    },

    switchLocale (locale) {
      this.$i18n.locale = locale
    }
  }
}
</script>

<style lang="scss" scoped>
#header {

}
</style>
