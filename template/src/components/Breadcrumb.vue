<template>
  <div class="Breadcrumb-main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in datas" :key="index">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    props: {
        datas: Array
    }
};
</script>

<style lang="less">
.Breadcrumb-main {
    width: 100%;
    height: 64px;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
}
</style>
