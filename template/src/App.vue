<template>
    <pagoda-layout
      :side-menu="sideMenu"
      :top-menu="topMenu"
      :side-menu-props="{
        'background-color': '#001529',
        'text-color': '#fff',
        'active-text-color': '#409eff'
      }"
      :side-menu-default-active="$route.path"
      @tabs-change="handleTabsChange"
    >
      <div slot="header-left" class="logo"><h3>百果园ERP</h3></div>
      <div slot="header-right">大佬</div>
      <router-view/>
    </pagoda-layout>
</template>

<script>
  import allSideMenu from './allSideMenu.json'

  import {
    getApplicationMenu
  } from "./utils/get-application-permission"

  export default {
    data () {
      getApplicationMenu(allSideMenu).then(permissitionMenu => {
        this.sideMenu = permissitionMenu
      })

      return {
        sideMenu: allSideMenu,
        topMenu: [
          {
            label: '财务管理',
            url: location.href
          }
        ]
      }
    },

    methods: {
      handleTabsChange ({url}) {
        console.log(url)
        this.$router.replace(url)
      }
    }
  }
</script>

<style lang="less" type="text/less">
  body {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0;
    padding: 0;
  }
  .logo{
    background-color: #002140;
    text-align: center;
    color: #fff;
  }
  .logo h3 {
    margin: 0;
  }
  .el-breadcrumb {
    margin-bottom: 20px;
  }
  .main {
    .pagoda-table{
      padding-top: 20px;
      border-top: 1px solid #e4e4e4;
    }
  }
</style>
