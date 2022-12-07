<template>
  <div>
    <!-- Block: page title -->
    <page-title-component :title="$route.meta['event_detail'].name"/>

    <!-- Block: Main content -->
    <event-form-component update-mode/>
  </div>
</template>

<script>
// Store
// import store from '@/shared/store'
import { mapActions } from 'vuex'
// Components
import PageTitleComponent from '@/shared/components/common/PageTitle'
import EventFormComponent from '@/shared/components/management_event/EventForm'
import { EVENT_DATA } from '@/enum/dummy-data.enum'

export default {
  name: 'EditEventPage',

  components: {
    PageTitleComponent,
    EventFormComponent
  },

  beforeRouteEnter (to, from, next) {
    const result = EVENT_DATA.find(i => i.id === to.params.id)
    if (!result) {
      return next({ name: 'not_found' })
    }
    to.meta['event_detail'] = result
    next()
    // return store.dispatch('event/getDetail').then(() => next())
  },

  methods: {
    ...mapActions('event', ['getDetail'])
  }
}
</script>

<style lang="scss" scoped></style>
