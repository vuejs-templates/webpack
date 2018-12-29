<template>
  <div class="hec-pagination-wrap">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      @current-change="handleCureentClick"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: Number
  },
  methods: {
    handlePrevClick(val) {
      this.$emit("prevClick", val);
    },
    handleNextClick(val) {
      this.$emit("nextClick", val);
    },
    handleCureentClick(val) {
      this.$emit("cureentClick", val);
    }
  }
};
</script>

<style lang="less">
.hec-pagination-wrap {
  width: 100%;
  height: 64px;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .el-pagination {
    margin-right: 30px;
  }
}
</style>
