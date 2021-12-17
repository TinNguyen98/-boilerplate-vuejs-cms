<template>
  <div id="app">
    <vue-progress-bar/>
    <component :is="layout" v-if="layout"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Application',

  components: {
    'auth': () => import(/* webpackChunkName: "auth" */ '@/layouts/Auth.vue'),
    'default': () => import(/* webpackChunkName: "default" */ '@/layouts/Default.vue')
  },

  computed: {
    ...mapGetters({ layout: 'layout' })
  },

  head: {
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Boilerplate VueJS CMS'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/static/logo.png' }
    ]
  }
}
</script>

<style lang="scss" scoped>
#app {
  min-height: 100%;
}
</style>
