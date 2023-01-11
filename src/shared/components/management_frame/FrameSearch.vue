<template>
  <div class="searchbar frame-search">
    <!-- Keyword -->
    <div class="block-field mb-sm-2">
      <label v-text="$t('management_frame.search_by_keyword')" />

      <a-input
        v-model="filter.keyword"
        :placeholder="$t('search')"
        @change="debounceSearch"
        @keydown.enter.prevent="search">
        <template #suffix>
          <a-icon
            v-if="filter.keyword"
            type="close-circle"
            theme="filled"
            class="icon-delete"
            @click.prevent="reset('keyword')" />

          <a-icon
            v-else
            type="search"
            class="cursor-pointer"
            @click.prevent="search" />
        </template>
      </a-input>
    </div>

    <!-- Status -->
    <div class="block-field">
      <label v-text="$t('status')" />

      <a-select
        v-model="filter.status"
        :placeholder="$t('status_placeholder')"
        allow-clear
        @change="search">
        <a-select-option
          v-for="item in STATUS"
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
import { STATUS, FORMAT_DATE } from '@/enums/pages/frame.enum'

export default {
  name: 'FrameSearch',

  mixins: [SearchMixin],

  data() {
    return {
      filter: {
        keyword: null,
        status: undefined,
      },
      STATUS,
      FORMAT_DATE,
    }
  },
}
</script>
