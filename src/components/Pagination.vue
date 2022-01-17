<template>
  <a-pagination
    :current="currentPage"
    :page-size="pageSize"
    :total="total"
    @change="onChange" />
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    total: { type: Number, default: 0 },
    currentPage: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 }
  },

  methods: {
    onChange (val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .ant-pagination {
    text-align: right;
  }
</style>
