<template>
  <main id="not_found">
    <h2 v-text="content" />
  </main>
</template>

<script>
export default {
  name: 'NotFound',

  data () {
    return {
      content: this.$t('not_found')
    }
  }
}
</script>

<style lang="scss" scoped>
#not_found {

}
</style>
