<template>
  <div v-loading="pageLoading" element-loading-text="页面加载中...">
    <Crumb v-if="TabORCrumb==='crumb'" />
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'common',
  computed: {
    ...mapGetters([
      'pageLoading',
      'TabORCrumb'
    ])
  }
}
</script>
<style lang="scss" scoped>
</style>
