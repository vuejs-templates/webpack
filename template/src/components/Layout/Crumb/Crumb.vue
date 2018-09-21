<template>
  <div class="hei">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="pad">
      <el-breadcrumb-item v-for="(item, index) in CrumbArr" :key="index" v-text="item"></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Crumb',
  computed: {
    ...mapState('app', [
      'CrumbArr'
    ])
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .hei {
    height: 43px;
    background: #fff;
    border-bottom: #e2e2e2 solid 1px;
    padding-left: 10px;
  }
  .pad{
    line-height: 43px;
    height: 43px;
  }
</style>
