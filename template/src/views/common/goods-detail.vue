<template>
  <div>
    <pagoda-erp-table
      service="order"
      model="goods_detail"
      :head-selection="false"
      :selection-column="false"
      ref="erpTable"
      :fit="true"
      size="mini"
      :table-filter-data="filterData"
    >
    </pagoda-erp-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    filterData: null
  },
  created () {
  },
  mounted () {

  },
  watch: {
  },
  methods: {
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
</style>
