<template>
  <main-component />
</template>

<script>
// Store
import { mapState } from 'vuex'
// Components
import MainComponent from '@/shared/components/Main'

export default {
  name: 'AuthLayout',

  components: {
    MainComponent,
  },

  computed: {
    ...mapState('auth', ['bearerToken']),
  },

  created() {
    // In case the user restores the previous page in the browsers
    this.bearerToken && this.$store.commit('SET_LAYOUT', { layout: 'default' })
  },
}
</script>
