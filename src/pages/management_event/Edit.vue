<template>
  <div>
    <!-- Block: page title -->
    <page-title-component :title="detail.name"/>

    <!-- Block: Main content -->
    <event-form-component edit-mode/>
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

  data () {
    return {
      detail: {}
    }
  },

  beforeRouteEnter (to, from, next) {
    next()
    // return store.dispatch('event/getDetail').then(() => next())
  },

  created () {
    // Clone list from vuex
    // this.listData = JSON.parse(JSON.stringify(this.list))
    const result = EVENT_DATA.find(i => i.id === this.$route.params.id)
    if (!result) {
      return this.$router.push({ name: 'not_found' }, () => {})
    }
    this.detail = result
  },

  methods: {
    ...mapActions('event', [
      'getDetail',
      'updateEvent'
    ]),
  }
}
</script>

<style lang="scss" scoped></style>
