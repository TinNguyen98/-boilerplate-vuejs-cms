<template>
  <div>
    <!-- Block: page title -->
    <page-title-component :title="$route.meta['frame_detail'].name"/>

    <!-- Block: Main content -->
    <frame-form-component update-mode/>
  </div>
</template>

<script>
// Store
// import store from '@/shared/store'
import { mapActions } from 'vuex'
// Components
import PageTitleComponent from '@/shared/components/common/PageTitle'
import FrameFormComponent from '@/shared/components/management_frame/FrameForm'
import { FRAME_DATA } from '@/enum/dummy-data.enum'

export default {
  name: 'EditFramePage',

  components: {
    PageTitleComponent,
    FrameFormComponent
  },

  beforeRouteEnter (to, from, next) {
    const result = FRAME_DATA.find(i => i.id === to.params.id)
    if (!result) {
      return next({ name: 'not_found' })
    }
    to.meta['frame_detail'] = result
    next()
    // return store.dispatch('frame/getDetail').then(() => next())
  },

  methods: {
    ...mapActions('frame', ['getDetail'])
  }
}
</script>

<style lang="scss" scoped></style>
