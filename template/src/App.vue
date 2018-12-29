<template>
  <div id="app" class="hec-wrap">
    <div v-if="!isLoginPage">
      <Menu></Menu>
      <Header></Header>
    </div>
    <div :class="isLoginPage ? '' : 'page-content'">
      <router-view/>
    </div>
  </div>
</template>

<script src='@/js/index.js'></script>

<style lang="less" src='@/styles/index.less'></style>
