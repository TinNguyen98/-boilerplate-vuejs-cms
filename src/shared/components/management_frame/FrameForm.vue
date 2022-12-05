<template>
  <div>
    Frame Form {{ 'mode ' + (editMode ? 'EDIT' : 'CREATE') }}
  </div>
</template>

<script>
// Store
// Components
// Others

export default {
  name: 'FrameFormComponent',

  props: {
    editMode: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped></style>
