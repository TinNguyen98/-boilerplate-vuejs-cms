<template>
  <div id="resource">
    <transition name="page" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import last from 'lodash-es/last'

export default {
  name: 'Resource',

  computed: {
    title () {
      return last(this.$route.meta.breadcrumbs).title
    }
  }
}
</script>
