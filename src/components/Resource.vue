<template>
  <div id="resource">
    <transition name="page" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Resource'
}
</script>
