<template>
  <a-layout-content
    id="main"
    :class="{ 'full-screen': layout === 'auth' }">
    <transition
      name="page"
      mode="out-in">
      <router-view v-if="true" />
    </transition>
  </a-layout-content>
</template>

<script>
// Store
import { mapGetters } from 'vuex'

export default {
  name: 'MainLayout',

  computed: {
    ...mapGetters({ layout: 'layout' }),
  },
}
</script>

<style lang="scss" scoped>
#main {
  &.full-screen {
    margin: 0;
    padding: 0;
  }
}
</style>
