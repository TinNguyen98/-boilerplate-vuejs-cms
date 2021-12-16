<template>
  <main id="not_authenticated">
    <h2 v-text="content" />
  </main>
</template>

<script>
export default {
  name: 'NotAuthenticated',

  data () {
    return {
      content: this.$t('not_authenticated')
    }
  }
}
</script>

<style lang="scss" scoped>
#not_authenticated {

}
</style>
