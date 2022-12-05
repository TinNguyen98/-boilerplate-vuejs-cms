<template>
  <div class="page-title d-flex justify-content-between align-items-center">
    <h5 class="page-title_content" v-text="title"/>

    <!-- Custom button -->
    <div class="page-title_action d-flex align-items-center flex-shrink-0">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTitleComponent',

  props: {
    title: { type: String, required: true, default: '' }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/helpers/_variables.scss';

.page-title {
  padding: 12px 10px 12px 38px;
  background-color: $white;

  &_content {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    color: $text-black-color;
    padding-right: 10px;
  }

  &_action {
    & > *:not(:last-child) {
      margin-right: 15px;
    }
  }
}
</style>
