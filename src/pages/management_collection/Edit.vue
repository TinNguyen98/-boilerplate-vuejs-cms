<template>
  <div>
    <!-- Block: page title -->
    <page-title-component :title="detail.name" />

    <!-- Block: Main content -->
    <collection-form-component update-mode />
  </div>
</template>

<script>
// Store
import store from '@/shared/store'
import { mapActions } from 'vuex'
// Components
import PageTitleComponent from '@/shared/components/common/PageTitle'
import CollectionFormComponent from '@/shared/components/management_collection/CollectionForm'
// Others
import { liberateStore } from '@/shared/helpers/performance'

export default {
  name: 'EditEventPage',

  components: {
    PageTitleComponent,
    CollectionFormComponent,
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
