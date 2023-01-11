<template>
  <div>
    <!-- Block: Page title -->
    <page-title :title="$t('management_collection.create_collection')" />

    <!-- Block: Main content -->
    <collection-form />
  </div>
</template>

<script>
// Components
import PageTitle from '@/shared/components/common/PageTitle'
import CollectionForm from '@/shared/components/management_collection/CollectionForm'

export default {
  name: 'CreateCollectionPage',

  components: {
    PageTitle,
    CollectionForm,
  },
}
</script>
