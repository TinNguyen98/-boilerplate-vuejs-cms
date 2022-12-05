<template>
  <div>
    <!-- Block: page title -->
    <page-title-component :title="$t('management_frame.create_frame')"/>

    <!-- Block: Main content -->
    <frame-form-component/>
  </div>
</template>

<script>
// Components
import PageTitleComponent from '@/shared/components/common/PageTitle'
import FrameFormComponent from '@/shared/components/management_frame/FrameForm'

export default {
  name: 'CreateFramePage',

  components: {
    PageTitleComponent,
    FrameFormComponent
  }
}
</script>

<style lang="scss" scoped></style>
