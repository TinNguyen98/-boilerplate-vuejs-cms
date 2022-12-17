<template>
  <div>
    <!-- Block: page title -->
    <page-title-component :title="$t('management_event.create_event')"/>

    <!-- Block: Main content -->
    <event-form-component/>
  </div>
</template>

<script>
// Store
import store from '@/shared/store'
// Components
import PageTitleComponent from '@/shared/components/common/PageTitle'
import EventFormComponent from '@/shared/components/management_event/EventForm'

export default {
  name: 'CreateEventPage',

  components: {
    PageTitleComponent,
    EventFormComponent
  },

  beforeRouteEnter (to, from, next) {
    return Promise.all([
      store.dispatch('frame/getFrameList'),
      store.dispatch('collection/getCollectionList')
    ]).then(_ => next())
  }
}
</script>
