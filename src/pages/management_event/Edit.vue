<template>
  <div>
    <!-- Block: Page title -->
    <page-title :title="detail.name" />

    <!-- Block: Main content -->
    <event-form update-mode />
  </div>
</template>

<script>
// Store
import store from '@/shared/store'
import { mapState } from 'vuex'
// Components
import PageTitle from '@/shared/components/common/PageTitle'
import EventForm from '@/shared/components/management_event/EventForm'
// Others
import { liberateStore } from '@/shared/helpers/performance'

export default {
  name: 'EditEventPage',

  components: {
    PageTitle,
    EventForm,
  },

  beforeRouteEnter(to, from, next) {
    return Promise.all([
      store.dispatch('event/getDetail', { id: to.params.id }),
      store.dispatch('frame/getFrameList'),
      store.dispatch('collection/getCollectionList'),
    ]).then((_) => next())
  },

  beforeRouteLeave(_, __, next) {
    liberateStore('event/detail', 'frame/list', 'collection/list')
    next()
  },

  computed: {
    ...mapState('event', ['detail']),
  },
}
</script>
