<template>
  <div id="app">
    <component
      :is="layout"
      v-if="layout" />

    <loading v-if="loading" />
  </div>
</template>

<script>
// Store
import { mapState, mapGetters, mapActions } from 'vuex'
// Components
import Loading from '@/shared/components/layout/Loading'

export default {
  name: 'Application',

  components: {
    Loading,
    auth: () => import(/* webpackChunkName: "auth" */ '@/layouts/Auth.vue'),
    default: () =>
      import(/* webpackChunkName: "default" */ '@/layouts/Default.vue'),
  },

  computed: {
    ...mapState('loader', ['loading']),
    ...mapState('language', ['locale']),
    ...mapGetters({ layout: 'layout' }),
  },

  created() {
    this.locale && this.setLanguage(this.locale)
  },

  methods: {
    ...mapActions('language', ['setLanguage']),
  },
}
</script>

<style lang="scss" scoped>
#app {
  max-height: 100vh;
  overflow: hidden;
}
</style>
