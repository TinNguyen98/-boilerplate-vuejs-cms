<template>
  <main id="resource">
    <transition name="page" mode="out-in">
      <router-view/>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'Resource'
}
</script>
