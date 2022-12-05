<template>
  <div>
    <!-- Block: page title -->
    <page-title-component :title="detail.name"/>

    <!-- Block: Main content -->
    <collection-form-component edit-mode/>
  </div>
</template>

<script>
// Store
// import store from '@/shared/store'
import { mapActions } from 'vuex'
// Components
import PageTitleComponent from '@/shared/components/common/PageTitle'
import CollectionFormComponent from '@/shared/components/management_collection/CollectionForm'
import { COLLECTION_DATA } from '@/enum/dummy-data.enum'

export default {
  name: 'EditEventPage',

  components: {
    PageTitleComponent,
    CollectionFormComponent
  },

  data () {
    return {
      detail: {}
    }
  },

  beforeRouteEnter (to, from, next) {
    next()
    // return store.dispatch('collection/getDetail').then(() => next())
  },

  created () {
    // Clone list from vuex
    // this.listData = JSON.parse(JSON.stringify(this.list))
    const result = COLLECTION_DATA.find(i => i.id === this.$route.params.id)
    if (!result) {
      return this.$router.push({ name: 'not_found' }, () => {})
    }
    this.detail = result
  },

  methods: {
    ...mapActions('collection', [
      'getDetail',
      'updateCollection'
    ]),
  }
}
</script>

<style lang="scss" scoped></style>
