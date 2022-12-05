<template>
  <a-pagination
    :current="currentPage"
    :page-size="pageSize"
    :total="total"
    :page-size-options="['10', '50', '100']"
    :show-size-changer="showSizeChanger"
    :show-total="onShowTotal"
    @showSizeChange="onShowSizeChange"
    @change="onChange">
  </a-pagination>
</template>

<script>
export default {
  name: 'PaginationComponent',

  props: {
    total: { type: Number, default: 0 },
    currentPage: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    showTotal: { type: Boolean, default: false },
    showSizeChanger: { type: Boolean, default: false }
  },

  methods: {
    onChange (val) {
      this.$emit('handleCurrentChange', val)
    },

    onShowTotal (total) {
      return this.showTotal && this.$t('total_number') + ' ' + total + ' ' +  this.$t('record')
    },

    onShowSizeChange (current, pageSize) {
      console.log(current, pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/helpers/_variables.scss';

.ant-pagination {
  padding: 11px 10px;
  text-align: right;
  background-color: $white;
}
</style>
