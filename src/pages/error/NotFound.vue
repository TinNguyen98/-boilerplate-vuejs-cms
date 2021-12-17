<template>
  <div id="not_found">
    <h2 v-text="content" />
  </div>
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
