<template>
  <div>
     Event Form {{ 'mode ' + (editMode ? 'EDIT' : 'CREATE') }}
  </div>
</template>

<script>
// Store
// Components
// Others

export default {
  name: 'EventFormComponent',

  props: {
    editMode: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped></style>
