<template>
  <div>
    <!-- Block: page title -->
    <page-title-component :title="detail.name"/>

    <!-- Block: Main content -->
    <frame-form-component update-mode/>
  </div>
</template>

<script>
// Store
import store from '@/shared/store'
import { mapState } from 'vuex'
// Components
import PageTitleComponent from '@/shared/components/common/PageTitle'
import FrameFormComponent from '@/shared/components/management_frame/FrameForm'
import { liberateStore } from '@/shared/helpers/performance'

export default {
  name: 'EditFramePage',

  components: {
    PageTitleComponent,
    FrameFormComponent
  },

  beforeRouteEnter (to, from, next) {
    return store.dispatch('frame/getDetail', { id: to.params.id }).then(() => next())
  },

  beforeRouteLeave (_, __, next) {
    liberateStore('frame/detail')
    next()
  },

  computed: {
    ...mapState('frame', ['detail'])
  }
}
</script>
