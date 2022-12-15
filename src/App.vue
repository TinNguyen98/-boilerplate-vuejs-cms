<template>
  <div id="app">
    <component :is="layout" v-if="layout"/>

    <loading-component v-if="loading"/>
  </div>
</template>

<script>
// Store
import { mapState, mapGetters } from 'vuex'
// Components
import LoadingComponent from '@/shared/components/layout/Loading'

export default {
  name: 'ApplicationLayout',

  components: {
    LoadingComponent,
    'auth': () => import(/* webpackChunkName: "auth" */ '@/layouts/Auth.vue'),
    'default': () => import(/* webpackChunkName: "default" */ '@/layouts/Default.vue')
  },

  computed: {
    ...mapState('loader', ['loading']),
    ...mapGetters({ layout: 'layout' })
  }
}
</script>

<style lang="scss" scoped>
#app {
  max-height: 100vh;
  overflow: hidden;
}
</style>
