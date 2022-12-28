<template>
  <div class="searchbar frame-search">
    <!-- Keyword -->
    <div class="block-field mb-sm-2">
      <label v-text="$t('management_frame.search_by_keyword')"/>

      <a-input-search v-model="filter.keyword"
                      :placeholder="$t('search')"
                      @change="debounceSearch"
                      @blur="search"
                      @keydown.enter.prevent="search"
                      allow-clear
      />
    </div>

    <!-- Status -->
    <div class="block-field">
      <label v-text="$t('status')"/>

      <a-select v-model="filter.status"
                :placeholder="$t('status_placeholder')"
                :class="{ 'not-value': !filter.status }"
                allow-clear
                @change="search"
      >
        <a-select-option v-for="item in STATUS"
                         :key="item.id"
                         :value="item.value">
          {{ $t(`management_frame.${item.value}`) }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
// Others
import SearchMixin from '@/shared/mixins/search.mixin'
import { STATUS, FORMAT_DATE } from '@/enum/pages/frame.enum'

export default {
  name: 'FrameSearchComponent',

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
