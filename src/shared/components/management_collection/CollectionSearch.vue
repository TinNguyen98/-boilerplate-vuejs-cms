<template>
  <div class="searchbar collection-search">
    <!-- Keyword -->
    <div class="block-field mb-sm-2">
      <label v-text="$t('management_collection.search_by_keyword')"/>

      <a-input v-model="filter.keyword"
               :placeholder="$t('search')"
               @change="debounceSearch"
               @keydown.enter.prevent="search"
      >
        <template #suffix>
          <a-icon v-if="filter.keyword"
                  type="close-circle"
                  theme="filled"
                  class="icon-delete"
                  @click.prevent="reset('keyword')"/>

          <a-icon v-else
                  type="search"
                  class="cursor-pointer"
                  @click.prevent="search"/>
        </template>
      </a-input>
    </div>

    <!-- Status -->
    <div class="block-field">
      <label v-text="$t('status')"/>

      <a-select v-model="filter.status"
                :placeholder="$t('status_placeholder')"
                allow-clear
                @change="search"
      >
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
import { STATUS, FORMAT_DATE } from '@/enums/pages/collection.enum'

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
