<template>
  <transition name="page" mode="out-in">
    <router-view v-if="true"/>
  </transition>
</template>

<script>
export default {
  name: 'Main'
}
</script>
