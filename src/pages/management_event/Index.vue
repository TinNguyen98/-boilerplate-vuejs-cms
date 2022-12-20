<template>
  <div class="main-container">
    <!-- Block: page title -->
    <page-title-component :title="$t('management_event.page_list')">
      <router-link tag="button"
                   :to="{ name: 'create_event' }"
                   class="ant-btn ant-btn-primary">
        <a-icon type="plus"/>
        {{ $t('management_event.create_event') }}
      </router-link>
    </page-title-component>

    <!-- Block: Main content -->
    <section class="main-container_content">
      <!-- Section: Search -->
     <event-search-component @filter-changed="onFilterChange($event)"/>

      <!-- Section: List table -->
      <a-table :columns="columns"
               :data-source="listData"
               :pagination="false"
               :scroll="{ x: 1300 }"
               :locale="{ emptyText: $t('no_data')}"
               :rowKey="(record) => record.id"
               class="list-table custom-table custom-scrollbar-vertical">

        <!-- Start at -->
        <template slot="start_time" slot-scope="start_time">
          {{ start_time | filterFormatDate(COMMON_FORMAT_DATE.ONLY_DATE)}}
        </template>

        <!-- Updated at -->
        <template slot="updated_at" slot-scope="updated_at">
          {{ updated_at | filterFormatDate(COMMON_FORMAT_DATE.HOUR_DATE)}}
        </template>

        <!-- Status -->
        <template slot="status" slot-scope="status">
          <status-tag-component :type="status"
                                :name="$t(`management_event.${status}`)"
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
                        :disabled="record.status === 'happening'"
                        @confirm="deleteRecord(record)">
            <a-button type="danger"
                      :disabled="record.status === 'happening'"
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
import EventSearchComponent from '@/shared/components/management_event/EventSearch'
import StatusTagComponent from '@/shared/components/common/StatusTag'
import PaginationComponent from '@/shared/components/common/Pagination'
// Others
import moment from 'moment'
import { COMMON_FORMAT_DATE } from '@/enum/common.enum'
import { PER_PAGE } from '@/enum/pagination.enum'
import { STATUS } from '@/enum/pages/event.enum'
import { EVENT_DATA } from '@/enum/dummy-data.enum'
import { liberateStore } from '@/shared/helpers/performance'

export default {
  name: 'ManagementEventPage',

  components: {
    PageTitleComponent,
    EventSearchComponent,
    StatusTagComponent,
    PaginationComponent
  },

  data () {
    return {
      listData: [],
      params: {
        page: 1,
        per_page: PER_PAGE.EVENT
      },
      statusOrder: ['happening', 'upcoming', 'happened'],
      isDelete: false,
      STATUS,
      EVENT_DATA,
      COMMON_FORMAT_DATE
    }
  },

  beforeRouteEnter (to, from, next) {
    const params = {
      page: 1,
      per_page: PER_PAGE.EVENT
    }
    return store.dispatch('event/getEventList', params).then(() => next())
  },

  beforeRouteLeave (_, __, next) {
    liberateStore('event/list')
    next()
  },

  created () {
    // Clone list from vuex
    this.listData = JSON.parse(JSON.stringify(this.list))
  },

  computed: {
    ...mapState('event', ['list', 'pagination']),

    columns () {
      return [
        {
          title: this.$t('management_event.event'),
          width: 540,
          dataIndex: 'name',
        },
        {
          title: this.$t('management_event.start_time'),
          width: 200,
          dataIndex: 'start_time',
          scopedSlots: { customRender: 'start_time' }
        },
        {
          title: this.$t('management_event.updated_at'),
          width: 200,
          dataIndex: 'updated_at',
          scopedSlots: { customRender: 'updated_at' }
        },
        {
          title: this.$t('status'),
          width: 218,
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          sorter: (a, b) => {
            const posA = this.statusOrder.indexOf(a.status)
            const posB = this.statusOrder.indexOf(b.status)

            if (posA === posB) return moment(a.updated_at) - moment(b.updated_at)
            return posA - posB
          }
        },
        {
          title: this.$t('management_event.manipulation'),
          align: 'center',
          fixed: 'right',
          width: 219,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },

  methods: {
    ...mapActions('event', [
      'getEventList',
      'removeEvent'
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
      this.$router.push({ name: 'edit_event', params: { id } })
    },

    deleteRecord (record) {
      const { id, status } = record
      if (!record || status === 'happening') return

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
      this.getEventList(params).then(() => {
        this.listData = JSON.parse(JSON.stringify(this.list))
      })
    }
  }
}
</script>
