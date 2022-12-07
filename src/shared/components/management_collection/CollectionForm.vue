<template>
  <div>
    Collection Form {{ 'mode ' + (updateMode ? 'EDIT' : 'CREATE') }}
  </div>
</template>

<script>
// Store
// Components
// Others

export default {
  name: 'CollectionFormComponent',

  props: {
    updateMode: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped></style>
