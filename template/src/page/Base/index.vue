<template>
  <div v-loading.fullscreen.lock="pageLoading" element-loading-text="页面加载中...">
    <Crumb v-if="TabORCrumb==='crumb'" />
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'common',
  computed: {
    ...Vuex.mapGetters([
      'pageLoading',
      'TabORCrumb'
    ])
  }
}
</script>
<style lang="scss" scoped>
</style>
