<template>
  <div v-if="layout === 'auth'"
       class="login d-flex justify-content-between align-items-center">
    <ValidationObserver
      ref="observer"
      tag="form"
      class="login-container ml-auto mr-auto"
      @submit.prevent="validateBeforeSubmit()">

      <h3 class="login-title" v-text="$t('login')"/>

      <InputText v-model="form.username"
                 vid="username"
                 :label="$t('login_id')"
                 field="login_id"
                 :placeholder="$t('login_id_placeholder')"
                 rules="required|half_width|max:100|not_emoji"
                 class-container="mb-2"
                 class-input="login-custom__input"
                 hidden-asterisk
      />

      <InputText v-model="form.password"
                 vid="password"
                 type="password"
                 :label="$t('password')"
                 field="password"
                 :placeholder="$t('password_placeholder')"
                 rules="required|half_width|min:8|max:100|not_emoji"
                 class-container="mb-3"
                 class-input="login-custom__input"
                 show-password
                 hidden-asterisk
      />

      <div class="d-flex justify-content-between align-items-center mb-4">
        <InputCheckbox v-model="remember_password"
                       :name-label="$t('remember_password')"
                       field="remember_password"
        />

        <p class="login-forgot_password"
           @click.prevent="openAlertForgotPassword"
           v-text="$t('forgot_password')"/>
      </div>

      <a-button type="primary"
                html-type="submit"
                :loading="isSubmit"
                class="login-submit_btn"
                block
      >
        {{ $t('login') }}
      </a-button>
    </ValidationObserver>
  </div>
</template>

<script>
// Store
import { mapActions, mapGetters } from 'vuex'
// Components
import InputText from '@/shared/components/form/InputText'
import InputCheckbox from '@/shared/components/form/InputCheckbox'
// Others
import FormMixin from '@/shared/mixins/form.mixin'
import { scrollToErrorPlace, handleInputProtection } from '@/shared/helpers'

export default {
  name: 'LoginPage',

  components: {
    InputText,
    InputCheckbox
  },

  mixins: [FormMixin],

  data () {
    return {
      form: {
        username: 'admin',
        password: '12345678'
      },
      remember_password: false,
      isSubmit: false
    }
  },

  computed: {
    ...mapGetters({ layout: 'layout' })
  },

  methods: {
    ...mapActions('auth', ['userLogin']),

    openAlertForgotPassword () {
      this.$notification.open({
        message: this.$t('forgot_password'),
        description: this.$t('forgot_password_instruction')
      })
    },

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.handleSubmit()
      } else {
        scrollToErrorPlace(this.$refs.observer)
      }
    },

    handleSubmit () {
      this.isSubmit = true
      const formProtected = handleInputProtection(this.form)

      this.userLogin(formProtected).then(res => {
        if (res) {
          this.onSuccess(this.$t('completion'), this.$t('login_success'))
          this.isSubmit = false
          // Remove process login api in network tab
          window.location.reload()
        } else {
          this.onError(this.$t('fail'), this.$t('login_fail'))
          this.isSubmit = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/helpers/_variables.scss';

.login {
  color: $text-color;
  min-height: 100vh;
  &-container {
    width: 404px;
    max-width: 31.222vw;
  }

  &-submit_btn {
    width: 100%;
    height: 50px;
    font-size: 16px;
    color: $white;
    border-radius: 10px;
  }

  &-logo {
    margin-bottom: 70px;
  }

  &-title {
    font-family: 'Kumbh Sans', sans-serif;
    font-size: 30px;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 32px;
  }

  &-forgot_password {
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
  }
}
</style>
