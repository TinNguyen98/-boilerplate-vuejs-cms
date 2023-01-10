<template>
  <div>
    <!-- Block: page title -->
    <page-title-component
      :title="$t('management_collection.create_collection')" />

    <!-- Block: Main content -->
    <collection-form-component />
  </div>
</template>

<script>
// Components
import PageTitleComponent from '@/shared/components/common/PageTitle'
import CollectionFormComponent from '@/shared/components/management_collection/CollectionForm'

export default {
  name: 'CreateCollectionPage',

  components: {
    PageTitleComponent,
    CollectionFormComponent,
  },
}
</script>

<style lang="scss" scoped></style>
