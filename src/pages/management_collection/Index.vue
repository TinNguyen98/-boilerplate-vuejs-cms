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
               class="list-table custom-table"
               rowKey="id">

        <!-- Collection image -->
        <template slot="image" slot-scope="image">
          <img class="col-image"
               :src="image || require('@/assets/images/noimage_bg.png')"
               alt="collection image">
        </template>

        <!-- Updated at -->
        <template slot="updated_at" slot-scope="updated_at">
          {{ updated_at | filterFormatDate('HH:mm YYYY-MM-DD')}}
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
      <pagination-component :total="COLLECTION_DATA.length"
                            :current-page="1"
                            show-total
                            show-size-changer
                            @handleCurrentChange="handleCurrentChange($event)"/>
    </section>
  </div>
</template>

<script>
// Store
// import store from '@/shared/store'
import { mapActions, mapState } from 'vuex'
// Components
import PageTitleComponent from '@/shared/components/common/PageTitle'
import CollectionSearchComponent from '@/shared/components/management_collection/CollectionSearch'
import StatusTagComponent from '@/shared/components/common/StatusTag'
import PaginationComponent from '@/shared/components/common/Pagination'
// Others
import { PER_PAGE } from '@/enum/pagination.enum'
import { STATUS } from '@/enum/pages/collection.enum'
import { COLLECTION_DATA } from '@/enum/dummy-data.enum'

export default {
  name: 'ManagementCollectionPage',

  components: {
    PageTitleComponent,
    CollectionSearchComponent,
    StatusTagComponent,
    PaginationComponent
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
      COLLECTION_DATA
    }
  },

  beforeRouteEnter (to, from, next) {
    // const params = {
    //   page: 1,
    //   per_page: PER_PAGE.COLLECTION
    // }
    next()
    // return store.dispatch('collection/getCollectionList', params).then(() => next())
  },

  created () {
    // Clone list from vuex
    // this.listData = JSON.parse(JSON.stringify(this.list))
    this.listData = COLLECTION_DATA
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

    // Pagination
    handleCurrentChange (num) {
      this.params = {
        ...this.params,
        page: num
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
      this.removeEvent(id).then(res => {
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

<style lang="scss" scoped></style>
