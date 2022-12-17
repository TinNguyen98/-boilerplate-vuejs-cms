<template>
  <div>
    <!-- Block: page title -->
    <page-title-component :title="detail.name"/>

    <!-- Block: Main content -->
    <event-form-component update-mode/>
  </div>
</template>

<script>
// Store
import store from '@/shared/store'
import { mapState } from 'vuex'
// Components
import PageTitleComponent from '@/shared/components/common/PageTitle'
import EventFormComponent from '@/shared/components/management_event/EventForm'

export default {
  name: 'EditEventPage',

  components: {
    PageTitleComponent,
    EventFormComponent
  },

  beforeRouteEnter (to, from, next) {
    return Promise.all([
      store.dispatch('event/getDetail', { id: to.params.id }),
      store.dispatch('frame/getFrameList'),
      store.dispatch('collection/getCollectionList')
    ]).then(_ => next())
  },

  computed: {
    ...mapState('event', ['detail'])
  }
}
</script>
