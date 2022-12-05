<template>
  <div class="searchbar collection-search">
    <!-- Keyword -->
    <div class="block-field mb-sm-2">
      <label v-text="$t('management_collection.search_by_keyword')"/>

      <a-input-search v-model="filter.keyword"
                      :placeholder="$t('search')"/>
    </div>

    <!-- Status -->
    <div class="block-field">
      <label v-text="$t('status')"/>

      <a-select v-model="filter.status"
                :placeholder="$t('status_placeholder')">
        <a-select-option v-for="item in STATUS"
                         :key="item.id"
                         :value="item.value">
          {{ $t(`management_collection.${item.value}`) }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
// Others
import SearchMixin from '@/shared/mixins/search.mixin'
import { STATUS, FORMAT_DATE } from '@/enum/pages/collection.enum'

export default {
  name: 'CollectionSearchComponent',

  mixins: [SearchMixin],

  data () {
    return {
      filter: {
        keyword: null,
        status: null
      },
      STATUS,
      FORMAT_DATE
    }
  }
}
</script>

<style lang="scss" scoped></style>
