<template>
  <div>
    <!-- Block: Page title -->
    <page-title :title="$t('management_frame.create_frame')" />

    <!-- Block: Main content -->
    <frame-form />
  </div>
</template>

<script>
// Components
import PageTitle from '@/shared/components/common/PageTitle'
import FrameForm from '@/shared/components/management_frame/FrameForm'

export default {
  name: 'CreateFramePage',

  components: {
    PageTitle,
    FrameForm,
  },
}
</script>
