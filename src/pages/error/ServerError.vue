<template>
  <main id="server_error">
    <h2 v-text="content" />
  </main>
</template>

<script>
export default {
  name: 'ServerError',

  data () {
    return {
      content: this.$t('server_error')
    }
  }
}
</script>

<style lang="scss" scoped>
#server_error {

}
</style>
