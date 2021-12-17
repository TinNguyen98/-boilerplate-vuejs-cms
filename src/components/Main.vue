<template>
  <main id="main">
    <transition name="page" mode="out-in">
      <router-view v-if="true"/>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'Main'
}
</script>
