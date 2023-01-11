<template>
  <div>
    <!-- Block: Page title -->
    <page-title :title="detail.name" />

    <!-- Block: Main content -->
    <collection-form update-mode />
  </div>
</template>

<script>
// Store
import store from '@/shared/store'
import { mapActions } from 'vuex'
// Components
import PageTitle from '@/shared/components/common/PageTitle'
import CollectionForm from '@/shared/components/management_collection/CollectionForm'
// Others
import { liberateStore } from '@/shared/helpers/performance'

export default {
  name: 'EditEventPage',

  components: {
    PageTitle,
    CollectionForm,
  },

  data() {
    return {
      detail: {},
    }
  },

  beforeRouteEnter(to, from, next) {
    return store
      .dispatch('collection/getDetail', { id: to.params.id })
      .then(() => next())
  },

  beforeRouteLeave(_, __, next) {
    liberateStore('collection/detail')
    next()
  },

  methods: {
    ...mapActions('collection', ['getDetail']),
  },
}
</script>
