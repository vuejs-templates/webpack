<template>
  <div class="tabContent" :class="TabORCrumb!=='crumb' && TabORCrumb!=='tab' ? 'notop' : 'hastop'" v-loading="pageLoading" element-loading-text="页面加载中...">
    <!--<template v-for="(item, index) in TabsList">-->
      <!--<transition name="fade-transform" mode="out-in" :key="index">-->
        <!--<keep-alive v-if="flasgArr['a'+index]">-->
          <!--<router-view v-if="$route.path===item.link"></router-view>-->
        <!--</keep-alive>-->
      <!--</transition>-->
    <!--</template>-->
    <template v-for="(item, index) in TabsList">
      <keep-alive v-if="flasgArr['a'+index] && item.keepAlive" :key="item.link">
        <router-view v-if="$route.path===item.link"></router-view>
      </keep-alive>
      <router-view v-if="flasgArr['a'+index] && item.keepAlive === false && $route.path===item.link" :key="item.link"></router-view>
    </template>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'TabContent',
  data () {
    return {
      flasgArr: this.initAllKepp()
    }
  },
  methods: {
    // 初始化
    initAllKepp () {
      let yy = {}
      for (let i = 0; i < 100; i++) {
        yy['a' + i] = true
      }
      return yy
    }
  },
  computed: {
    ...mapState('layout', [
      'TabsList'
    ]),
    ...mapGetters([
      'TabORCrumb',
      'pageLoading'
    ])
  },
  created () {
    let self = this
    this.hub.$on('refresh', (index) => {
      self.flasgArr['a' + index] = false
      self.$nextTick(() => {
        self.flasgArr['a' + index] = true
      })
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .tabContent{
    background-color: #FFFFFF;
    position: relative;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
  .hastop{
    height: calc(100vh - 115px)
  }
  .notop{
    height: calc(100vh - 71px)
  }
</style>
