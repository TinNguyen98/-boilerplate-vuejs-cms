<template>
  <div>
    Collection Form {{ 'mode ' + (editMode ? 'EDIT' : 'CREATE') }}
  </div>
</template>

<script>
// Store
// Components
// Others

export default {
  name: 'CollectionFormComponent',

  props: {
    editMode: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped></style>
