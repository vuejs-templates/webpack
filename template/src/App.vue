<template>
  <pagoda-layout
    :side-menu="sideMenu"
    @tabs-change="handleTabsChange"
  >
    <div slot="header-left" slot-scope="scope" style="font-size: 0">
      <img src="http://erp2.hwdev.pagoda.com.cn/store/static/img/left_nav_logo.5da9ac7.png" class="logo"/>
      <span class="logo-text" v-show="!scope.collapse">百果园</span>
    </div>
    <template slot="header-right">
      <el-dropdown placement="bottom" trigger="click">
        <div class="user-info">
          <img class="user-head" src="http://uploads.oh100.com/allimg/1709/117-1FZ5102542-52.jpg"
          /><span class="user-name">用户名称</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">菜单1</el-dropdown-item>
          <el-dropdown-item command="b">菜单2</el-dropdown-item>
          <el-dropdown-item command="c" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <router-view></router-view>
  </pagoda-layout>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      sideMenu: [{
        icon: 'el-icon-location',
        label: '主页面',
        subMenu: [{
          label: '主页面',
          url: '/main'
        }]
      }]
    }
  },
  methods: {
    handleTabsChange ({ url, query = {}, params = {} }) {
      this.$router.push({
        path: url,
        query,
        params
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss">
  .pagoda-layout{
    & > .el-header {
      .logo-text {
        margin-left: 12px;
        font-size: 16px;
        vertical-align: middle;
      }
      .user-info {
        cursor: pointer;
      }
      .user-name {
        margin-left: 10px;
        font-size: 12px;
        color: #D9DEE4;
        vertical-align: middle;
      }
      .user-head, .logo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }
</style>
