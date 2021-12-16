<template>
  <div v-if="layout === 'auth'" class="login">
      <h2 v-text=" 'Login' " />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Login',

  data () {
    return {}
  },

  computed: {
    ...mapGetters({ layout: 'layout' })
  }
}
</script>

<style lang="scss" scoped></style>
