<template>
  <header id="header">
    This's header
    <a-button
      type="primary"
      @click="handleLogout"
    >
      Log out
    </a-button>
  </header>
</template>

<script>
import FormMixin from '@/mixins/form.mixin'
import { mapActions } from 'vuex'

export default {
  name: 'Header',

  mixins: [FormMixin],

  data () {
    return {}
  },

  methods: {
    ...mapActions('auth', ['logout']),

    async handleLogout () {
      try {
        await this.logout()
        this.onSuccess(200, this.$t('logout_success'))
        await this.$router.push({ name: 'auth.login' })
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
#header {

}
</style>
