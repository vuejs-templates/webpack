<template>
  <pagoda-layout
    collapse
    :collapse-icon="['iconfont icon-shensuocaidan1', 'iconfont icon-shensuocaidan']"
    :side-menu="sideMenu"
    :top-menu="topMenu"
    :header-props="{
      height: '50px'
    }"
    :side-menu-default-active="$route.path"
    @tabs-change="handleTabsChange"
    @tabs-data-change="handleTabsDataChange"
    @select-top-menu="handleSelectTopMenu"
  >
    <div slot="header-left" class="logo">百果园</div>
    <div slot="header-right" class="user-info">user-info</div>
    <keep-alive :include="include">
      <router-view></router-view>
    </keep-alive>
  </pagoda-layout>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      include: [],
      sideMenu: [{
        icon: 'el-icon-location',
        label: '采购价',
        subMenu: [{
          label: '调价单录入',
          // 当菜单label有冲突的时候，使用tabName作为tab的label
          tabName: '采购价-调价单录入',
          name: 'demo1',
          url: '/demo1'
        }]
      }, {
        icon: 'el-icon-location',
        label: '配送/退货价',
        subMenu: [{
          label: '调价单录入',
          // 当菜单label有冲突的时候，使用tabName作为tab的label
          tabName: '配送/退货价-调价单录入',
          name: 'demo2',
          url: '/demo2'
        }]
      }],
      topMenu: [{
        label: '处理中心',
        url: 'http://localhost:8080/#/'
      }, {
        label: '我的工作台',
        url: 'xxx'
      }, {
        label: '消息中心',
        disabled: true,
        url: 'xxx'
      }]
    }
  },
  methods: {
    handleTabsDataChange (tabs) {
      // 【keep-alive】缓存tab标签对应路由的组件实例
      console.log(tabs.filter(el => el.name).map(el => el.name))
      this.include = tabs.filter(el => el.name).map(el => el.name)
    },
    handleTabsChange ({ url }) {
      this.$router.push(url)
    },
    handleSelectTopMenu (data) {
      console.log(data)
    }
  }
}
</script>

<style type="text/stylus" lang="stylus">
  .logo, .user-info
    font-size 20px
    text-align center
    color #fff
</style>
