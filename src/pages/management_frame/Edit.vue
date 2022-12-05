<template>
  <div>
    <!-- Block: page title -->
    <page-title-component :title="detail.name"/>

    <!-- Block: Main content -->
    <frame-form-component edit-mode/>
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

  data () {
    return {
      detail: {}
    }
  },

  beforeRouteEnter (to, from, next) {
    next()
    // return store.dispatch('frame/getDetail').then(() => next())
  },

  created () {
    // Clone list from vuex
    // this.listData = JSON.parse(JSON.stringify(this.list))
    const result = FRAME_DATA.find(i => i.id === this.$route.params.id)
    if (!result) {
      return this.$router.push({ name: 'not_found' }, () => {})
    }
    this.detail = result
  },

  methods: {
    ...mapActions('frame', [
      'getDetail',
      'updateFrame'
    ]),
  }
}
</script>

<style lang="scss" scoped></style>
