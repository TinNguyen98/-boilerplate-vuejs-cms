<template>
  <div v-if="layout === 'auth'"
       class="login d-flex justify-content-center align-items-center">
    <ValidationObserver
      ref="observer"
      tag="form"
      class="login_container pl-sm-4 pr-sm-4"
      @submit.prevent="handleSubmit">
      <input-text
        v-model="form.email"
        vid="email"
        label="Email"
        field="email"
        :placeholder="$t('login_email_placeholder')"
        prefix-icon="user"
        rules="required|email|max:100"
        class-container="mb-2"
      />

      <input-text
        v-model="form.password"
        vid="password"
        type="password"
        label="Password"
        field="password"
        :placeholder="$t('login_password_placeholder')"
        prefix-icon="lock"
        rules="required|max:100"
        class-container="mb-4"
        show-password
      />

      <a-button
        type="primary"
        html-type="submit"
        :loading="isSubmit"
        :disabled="!(form.email && form.password)"
        block
      >
        {{ $t('sign_in') }}
      </a-button>
    </ValidationObserver>
  </div>
</template>

<script>
import store from '@/store'
import FormMixin from '@/mixins/form.mixin'
import InputText from '@/components/Form/InputText'
import { mapGetters } from 'vuex'
import { scrollToErrorPlace } from '@/utils/helper'

export default {
  name: 'Login',

  components: {
    InputText
  },

  mixins: [FormMixin],

  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      isSubmit: false
    }
  },

  computed: {
    ...mapGetters({ layout: 'layout' })
  },

  methods: {
    async handleSubmit () {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.isSubmit = true

        const response = await store.dispatch('auth/login', this.form)
        if (response) {
          this.onSuccess(200, this.$t('login_success'))
          await this.$router.push({ name: 'dashboard' })
          this.isSubmit = false
        } else {
          this.onError(404, this.$t('login_fail'))
          this.isSubmit = false
        }
      } else {
        scrollToErrorPlace(this.$refs.observer)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/helpers/_variables.scss';

.login {
  min-height: 100vh;
  &_container {
    width: 100%;
    max-width: 30rem;
  }
}
</style>
