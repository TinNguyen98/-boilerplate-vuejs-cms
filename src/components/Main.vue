<template>
  <main id="main"
        :style="{'min-height': 'calc(100vh - ' + mainHeight + 'px)'}">
    <transition name="page" mode="out-in">
      <router-view v-if="true"/>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'Main',

  data () {
    return {
      mainHeight: 0
    }
  },

  mounted () {
    if (this.$route.meta['layout'] === 'auth') return

    const headerHeight = document.querySelector('header').clientHeight
    const footerHeight = document.querySelector('footer').clientHeight
    this.mainHeight = headerHeight + footerHeight
  }
}
</script>

<style lang="scss" scoped></style>
