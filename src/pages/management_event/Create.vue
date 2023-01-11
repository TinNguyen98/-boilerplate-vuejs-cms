<template>
  <div>
    <!-- Block: Page title -->
    <page-title :title="$t('management_event.create_event')" />

    <!-- Block: Main content -->
    <event-form />
  </div>
</template>

<script>
// Store
import store from '@/shared/store'
// Components
import PageTitle from '@/shared/components/common/PageTitle'
import EventForm from '@/shared/components/management_event/EventForm'
// Others
import { liberateStore } from '@/shared/helpers/performance'

export default {
  name: 'CreateEventPage',

  components: {
    PageTitle,
    EventForm,
  },

  beforeRouteEnter(to, from, next) {
    return Promise.all([
      store.dispatch('frame/getFrameList'),
      store.dispatch('collection/getCollectionList'),
    ]).then((_) => next())
  },

  beforeRouteLeave(_, __, next) {
    liberateStore('frame/list', 'collection/list')
    next()
  },
}
</script>
