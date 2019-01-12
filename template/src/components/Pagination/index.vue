<template>
  <div class="Pagination-wrap">
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="handleCureentClick"
    ></el-pagination>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.less" lang="less"></style>
