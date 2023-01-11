<template>
  <div>
    <!-- Block: Page title -->
    <page-title :title="detail.name" />

    <!-- Block: Main content -->
    <frame-form update-mode />
  </div>
</template>

<script>
// Store
import store from '@/shared/store'
import { mapState } from 'vuex'
// Components
import PageTitle from '@/shared/components/common/PageTitle'
import FrameForm from '@/shared/components/management_frame/FrameForm'
// Others
import { liberateStore } from '@/shared/helpers/performance'

export default {
  name: 'EditFramePage',

  components: {
    PageTitle,
    FrameForm,
  },

  beforeRouteEnter(to, from, next) {
    return store
      .dispatch('frame/getDetail', { id: to.params.id })
      .then(() => next())
  },

  beforeRouteLeave(_, __, next) {
    liberateStore('frame/detail')
    next()
  },

  computed: {
    ...mapState('frame', ['detail']),
  },
}
</script>
