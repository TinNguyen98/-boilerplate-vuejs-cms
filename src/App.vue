<template>
  <div id="app">
    <component :is="layout" v-if="layout"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ApplicationLayout',

  components: {
    'auth': () => import(/* webpackChunkName: "auth" */ '@/layouts/Auth.vue'),
    'default': () => import(/* webpackChunkName: "default" */ '@/layouts/Default.vue')
  },

  computed: {
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
