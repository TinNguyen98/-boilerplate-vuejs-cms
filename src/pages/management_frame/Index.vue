<template>
  <div class="main-container">
    <!-- Block: Page title -->
    <page-title :title="$t('management_frame.page_list')">
      <router-link
        tag="button"
        :to="{ name: 'create_frame', query: { type: FRAME_TYPE[0].value } }"
        class="ant-btn ant-btn-primary">
        <a-icon type="plus" />
        {{ $t('management_frame.create_effect') }}
      </router-link>

      <router-link
        tag="button"
        :to="{ name: 'create_frame', query: { type: FRAME_TYPE[1].value } }"
        class="ant-btn ant-btn-primary">
        <a-icon type="plus" />
        {{ $t('management_frame.create_background') }}
      </router-link>
    </page-title>

    <!-- Block: Main content -->
    <section class="main-container_content">
      <!-- Section: Search -->
      <frame-search @filter-changed="onFilterChange($event)" />

      <!-- Section: List table -->
      <a-table
        :columns="columns"
        :data-source="listData"
        :pagination="false"
        :scroll="{ x: 1300 }"
        :locale="{ emptyText: $t('no_data') }"
        :rowKey="(record) => record.id"
        class="list-table custom-table custom-scrollbar-vertical">
        <!-- Frame image -->
        <template
          slot="image"
          slot-scope="image">
          <image-zoom
            :src="image"
            :all-loaded.sync="isImageAllLoaded"
            class-image="col-image" />
        </template>

        <!-- Frame type -->
        <template
          slot="type"
          slot-scope="type">
          {{ type | filterCapitalizeFirstLetter }} Frame
        </template>

        <!-- Updated at -->
        <template
          slot="updated_at"
          slot-scope="updated_at">
          {{ updated_at | filterFormatDate(COMMON_FORMAT_DATE.HOUR_DATE) }}
        </template>

        <!-- Status -->
        <template
          slot="status"
          slot-scope="status">
          <status-tag
            :type="status"
            :name="$t(`management_frame.${status}`)" />
        </template>

        <!-- Action: EDIT - DELETE -->
        <template
          slot="action"
          slot-scope="_, record">
          <a-button
            type="primary"
            :loading="isDelete"
            @click.prevent="editRecord(record.id)"
            class="edit-button mr-1"
            v-text="$t('edit')" />

          <a-popconfirm
            :title="$t('delete_content')"
            :ok-text="$t('popcomfirm_accept_btn')"
            :cancel-text="$t('popcomfirm_cancel_btn')"
            placement="topLeft"
            :disabled="record.status === 'applying'"
            @confirm="deleteRecord(record)">
            <a-button
              type="danger"
              :disabled="record.status === 'applying'"
              class="delete-button"
              v-text="$t('delete')" />
          </a-popconfirm>
        </template>
      </a-table>

      <!-- Section: Pagination -->
      <pagination
        v-if="pagination && pagination.total > 0"
        :total="pagination.total"
        :current-page="pagination.current_page"
        :page-size="params.per_page"
        show-total
        show-size-changer
        @handleSizeChange="handlePaginateChange($event, 'size')"
        @handleCurrentChange="handlePaginateChange($event, 'page')" />
    </section>
  </div>
</template>

<script>
// Store
import store from '@/shared/store'
import { mapState, mapGetters, mapActions } from 'vuex'
// Components
import PageTitle from '@/shared/components/common/PageTitle'
import FrameSearch from '@/shared/components/management_frame/FrameSearch'
import StatusTag from '@/shared/components/common/StatusTag'
import Pagination from '@/shared/components/common/Pagination'
import ImageZoom from '@/shared/components/common/ImageZoom'
// Others
import moment from 'moment'
import { COMMON_FORMAT_DATE } from '@/enums/common.enum'
import FormMixin from '@/shared/mixins/form.mixin'
import { PER_PAGE } from '@/enums/pagination.enum'
import { STATUS, FRAME_TYPE } from '@/enums/pages/frame.enum'
import { liberateStore } from '@/shared/helpers/performance'

export default {
  name: 'ManagementFramePage',

  components: {
    PageTitle,
    FrameSearch,
    StatusTag,
    Pagination,
    ImageZoom,
  },

  mixins: [FormMixin],

  data() {
    return {
      listData: [],
      params: {
        page: 1,
        per_page: PER_PAGE.FRAME,
      },
      statusOrder: ['applying', 'not_apply'],
      isDelete: false,
      isImageAllLoaded: false,
      STATUS,
      FRAME_TYPE,
      COMMON_FORMAT_DATE,
    }
  },

  beforeRouteEnter(to, from, next) {
    const params = {
      page: 1,
      per_page: PER_PAGE.FRAME,
    }
    return store.dispatch('frame/getFrameList', params).then(() => next())
  },

  beforeRouteLeave(_, __, next) {
    liberateStore('frame/list')
    next()
  },

  created() {
    // Clone list from vuex
    this.listData = JSON.parse(JSON.stringify(this.list))
  },

  computed: {
    ...mapState('frame', ['list', 'pagination']),
    ...mapGetters({ isMobile: 'isMobile' }),

    columns() {
      return [
        {
          title: this.$t('management_frame.frame_name'),
          width: 428,
          dataIndex: 'name',
        },
        {
          title: this.$t('image'),
          width: 122,
          dataIndex: 'frame_image',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: this.$t('management_frame.frame_type'),
          width: 232,
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' },
        },
        {
          title: this.$t('management_frame.updated_at'),
          width: 209,
          dataIndex: 'updated_at',
          scopedSlots: { customRender: 'updated_at' },
        },
        {
          title: this.$t('status'),
          width: 147,
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          sorter: (a, b) => {
            const posA = this.statusOrder.indexOf(a.status)
            const posB = this.statusOrder.indexOf(b.status)

            if (posA === posB)
              return moment(a.updated_at) - moment(b.updated_at)
            return posA - posB
          },
        },
        {
          title: this.$t('management_frame.manipulation'),
          align: 'center',
          fixed: this.isImageAllLoaded ? 'right' : false,
          width: this.isMobile ? 150 : 202,
          scopedSlots: { customRender: 'action' },
        },
      ]
    },
  },

  methods: {
    ...mapActions('frame', ['getFrameList', 'removeFrame']),

    onFilterChange($event) {
      const filter = {}
      for (const property in $event) {
        filter[`filters[${property}]`] = $event[property]
      }

      this.params = {
        ...this.params,
        ...filter,
        page: 1,
      }
      this.fetchList(this.params)
    },

    /**
     * @param arg
     * @param type {string} ['page', 'size']
     */
    handlePaginateChange(arg, type = 'page') {
      if (type === 'page') {
        this.params = { ...this.params, page: arg }
      } else {
        this.params = { ...this.params, ...arg }
      }

      this.fetchList(this.params)
    },

    editRecord(id) {
      if (!id) return
      this.$router.push({ name: 'edit_frame', params: { id } })
    },

    deleteRecord(record) {
      const { id, status } = record
      if (!record || status === 'applying') return

      this.isDelete = true
      this.removeFrame(id).then((res) => {
        if (res) {
          this.isDelete = false
          this.onSuccess(
            this.$t('completion'),
            this.$t('delete_message_successfully')
          )
          this.fetchList(this.params)
        }
      })
    },

    fetchList(params) {
      this.getFrameList(params).then(() => {
        this.listData = JSON.parse(JSON.stringify(this.list))
      })
    },
  },
}
</script>
