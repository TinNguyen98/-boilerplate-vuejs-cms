<template>
  <div v-if="layout === 'auth'"
       class="login d-flex justify-content-center align-items-center">
    <ValidationObserver
      ref="observer"
      tag="form"
      class="login_container pl-sm-4 pr-sm-4"
      @submit.prevent="handleSubmit">

      <h2 class="text-center mb-2" v-text=" 'Boilerplate VueJS CMS' "/>

      <input-text
        v-model="form.login_id"
        vid="login_id"
        :label="$t('login_id')"
        field="login_id"
        :placeholder="$t('login_id_placeholder')"
        prefix-icon="user"
        rules="required|email|max:100"
        class-container="mb-2"
      />

      <input-text
        v-model="form.password"
        vid="password"
        type="password"
        :label="$t('password')"
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
        :disabled="!(form.login_id && form.password)"
        block
      >
        {{ $t('login') }}
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
        login_id: '',
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
    padding: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  }
}
</style>
