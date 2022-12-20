<template>
  <div class="main-container">
    <!-- Block: page title -->
    <page-title-component :title="$t('management_collection.page_list')">
      <router-link tag="button"
                   :to="{ name: 'create_collection' }"
                   class="ant-btn ant-btn-primary">
        <a-icon type="plus"/>
        {{ $t('management_collection.create_collection') }}
      </router-link>
    </page-title-component>

    <!-- Block: Main content -->
    <section class="main-container_content">
      <!-- Section: Search -->
      <collection-search-component @filter-changed="onFilterChange($event)"/>

      <!-- Section: List table -->
      <a-table :columns="columns"
               :data-source="listData"
               :pagination="false"
               :scroll="{ x: 1300 }"
               :locale="{ emptyText: $t('no_data')}"
               :rowKey="(record) => record.id"
               class="list-table custom-table custom-scrollbar-vertical">

        <!-- Collection image -->
        <template slot="image" slot-scope="image">
          <image-zoom :src="image" class-image="col-image" />
        </template>

        <!-- Updated at -->
        <template slot="updated_at" slot-scope="updated_at">
          {{ updated_at | filterFormatDate(COMMON_FORMAT_DATE.HOUR_DATE)}}
        </template>

        <!-- Status -->
        <template slot="status" slot-scope="status">
          <status-tag-component :type="status"
                                :name="$t(`management_collection.${status}`)"
          />
        </template>

        <!-- Action: EDIT - DELETE -->
        <template slot="action"
                  slot-scope="_, record">
          <a-button type="primary"
                    :loading="isDelete"
                    @click.prevent="editRecord(record.id)"
                    class="edit-button mr-1"
                    v-text="$t('edit')"/>

          <a-popconfirm :title="$t('delete_content')"
                        :ok-text="$t('popcomfirm_accept_btn')"
                        :cancel-text="$t('popcomfirm_cancel_btn')"
                        placement="topLeft"
                        :disabled="record.status === 'applying'"
                        @confirm="deleteRecord(record)">
            <a-button type="danger"
                      :disabled="record.status === 'applying'"
                      class="delete-button"
                      v-text="$t('delete')"/>
          </a-popconfirm>
        </template>
      </a-table>

      <!-- Section: Pagination -->
      <pagination-component v-if="pagination && pagination.total > 0"
                            :total="pagination.total"
                            :current-page="pagination.current_page"
                            :page-size="params.per_page"
                            show-total
                            show-size-changer
                            @handleSizeChange="handlePaginateChange($event, 'size')"
                            @handleCurrentChange="handlePaginateChange($event, 'page')"/>
    </section>
  </div>
</template>

<script>
// Store
import store from '@/shared/store'
import { mapActions, mapState } from 'vuex'
// Components
import PageTitleComponent from '@/shared/components/common/PageTitle'
import CollectionSearchComponent from '@/shared/components/management_collection/CollectionSearch'
import StatusTagComponent from '@/shared/components/common/StatusTag'
import PaginationComponent from '@/shared/components/common/Pagination'
import ImageZoom from '@/shared/components/common/ImageZoom'
// Others
import { COMMON_FORMAT_DATE } from '@/enum/common.enum'
import { PER_PAGE } from '@/enum/pagination.enum'
import { STATUS } from '@/enum/pages/collection.enum'
import { liberateStore } from '@/shared/helpers/performance'

export default {
  name: 'ManagementCollectionPage',

  components: {
    PageTitleComponent,
    CollectionSearchComponent,
    StatusTagComponent,
    PaginationComponent,
    ImageZoom
  },

  data () {
    return {
      listData: [],
      params: {
        page: 1,
        per_page: PER_PAGE.COLLECTION
      },
      isDelete: false,
      STATUS,
      COMMON_FORMAT_DATE
    }
  },

  beforeRouteEnter (to, from, next) {
    const params = {
      page: 1,
      per_page: PER_PAGE.COLLECTION
    }
    return store.dispatch('collection/getCollectionList', params).then(() => next())
  },

  beforeRouteLeave (_, __, next) {
    liberateStore('collection/list')
    next()
  },

  created () {
    // Clone list from vuex
    this.listData = JSON.parse(JSON.stringify(this.list))
  },

  computed: {
    ...mapState('collection', ['list', 'pagination']),

    columns () {
      return [
        {
          title: this.$t('management_collection.collection_name'),
          width: 428,
          dataIndex: 'name',
        },
        {
          title: this.$t('image'),
          width: 122,
          dataIndex: 'frame_image',
          scopedSlots: { customRender: 'image' }
        },
        {
          title: this.$t('management_collection.display_order'),
          width: 114,
          dataIndex: 'display_order',
          scopedSlots: { customRender: 'display_order' }
        },
        {
          title: this.$t('management_collection.updated_at'),
          width: 218,
          dataIndex: 'updated_at',
          scopedSlots: { customRender: 'updated_at' }
        },
        {
          title: this.$t('status'),
          width: 147,
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$t('management_collection.manipulation'),
          align: 'center',
          fixed: 'right',
          width: 202,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },

  methods: {
    ...mapActions('collection', [
      'getCollectionList',
      'removeCollection'
    ]),

    onFilterChange ($event) {
      const filter = {}
      for (const property in $event) {
        filter[`filters[${property}]`] = $event[property]
      }

      this.params = {
        ...this.params,
        ...filter,
        page: 1
      }
      this.fetchList(this.params)
    },

    /**
     * @param arg
     * @param type {string} ['page', 'size']
     */
    handlePaginateChange (arg, type = 'page') {
      if (type === 'page') {
        this.params = { ...this.params, page: arg }
      } else {
        this.params = { ...this.params, ...arg }
      }

      this.fetchList(this.params)
    },

    editRecord (id) {
      if (!id) return
      this.$router.push({ name: 'edit_collection', params: { id } }, () => {})
    },

    deleteRecord (record) {
      const { id, status } = record
      if (!record || status === 'applying') return

      this.isDelete = true
      this.removeCollection(id).then(res => {
        if (res) {
          this.isDelete = false
          this.onSuccess(this.$t('completion'), this.$t('delete_message_successfully'))
          this.fetchList(this.params)
        }
      })
    },

    fetchList (params) {
      this.getCollectionList(params).then(() => {
        this.listData = JSON.parse(JSON.stringify(this.list))
      })
    }
  }
}
</script>
