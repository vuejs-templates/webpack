<template>
  <pagoda-layout
    :class="{'full-content': $route.name === 'detail2'}"
    :side-menu="sideMenu"
    :side-menu-default-active="$route.fullPath"
    @tabs-change="handleTabsChange"
  >
    <div slot="header-left" class="logo">百果园</div>
    <div slot="header-right">
      <el-dropdown>
        <div class="user-info">
          <img class="user-head" src="http://uploads.oh100.com/allimg/1709/117-1FZ5102542-52.jpg"/>
          <span class="user-name">用户名称</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">菜单1</el-dropdown-item>
          <el-dropdown-item command="b">菜单2</el-dropdown-item>
          <el-dropdown-item command="c" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
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
  watch: {
    $route () {
      console.log(this.$route)
    }
  },
  methods: {
    handleTabsChange ({ url, query = {}, params = {} }) {
      this.$router.replace({
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
    &.full-content .el-main > .pagoda-layout__main {
      padding-left: 0;
      padding-right: 0;
    }

    .logo {
      font-size: 20px;
      text-align: center;
      color: #fff;
    }
    .user-info {
      cursor: pointer;
    }
    .user-name {
      font-size: 12px;
      color: #D9DEE4;
    }
    .user-head {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
</style>
