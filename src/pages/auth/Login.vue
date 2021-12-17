<template>
  <div v-if="layout === 'auth'" class="login">
    <input-text
      v-model="form.user_name"
      vid="user_name"
      field="user_name"
      placeholder="User name"
      prefix-icon="user"
    />

    <input-text
      v-model="form.password"
      vid="password"
      type="password"
      field="password"
      placeholder="Password"
      prefix-icon="lock"
    />

    <pre>{{ form }}</pre>
  </div>
</template>

<script>
import InputText from '@/components/Form/InputText'
import { mapGetters } from 'vuex'

export default {
  name: 'Login',

  components: {
    InputText
  },

  data () {
    return {
      form: {
        user_name: '',
        password: ''
      }
    }
  },

  computed: {
    ...mapGetters({ layout: 'layout' })
  }
}
</script>

<style lang="scss" scoped></style>
