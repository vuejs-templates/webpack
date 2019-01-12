<template>
  <div id="app">
    <div v-if="!isLoginPage">
      <Menu @onPress="handlePressMenu"></Menu>
      <Header :title="headerTitle" :subtitle="headerSubTitle"></Header>
    </div>
    <div :class="isLoginPage ? '' : 'page-content'">
      <router-view/>
    </div>
  </div>
</template>

<script src="./js/app.js"></script>

<style lang="less" src="./styles/app.less"></style>
