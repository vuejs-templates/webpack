<template>
  <pagoda-layout v-if="!$route.meta.full" logo="" title="" collapse
                 :collapse-icon="['iconfont icon-shensuocaidan1', 'iconfont icon-shensuocaidan']" :side-menu="sideMenu"
                 :top-menu="topMenu" :header-props="{
      height: '50px'
    }"
                 :top-menu-default-active="topMenuActive" :side-menu-default-active="sideMenuActive"
                 @tabs-change="handleTabsChange" @tabs-data-change="handleTabsDataChange"
                 @select-side-menu="handleSelectSideMenu" @collapse-change="handleCollapseChange"
                 @select-top-menu="handleSelectTopMenu" ref="layout" class="pagoda-layout-purchase pagoda-erp-ui-reset"
                 v-loading="loading.fullShow">
    <div slot="header-left" class="logo"><h3>百果园ERP</h3>
    </div>
    <div slot="header-right">
      <img class="vertical-middle" :src="role.img" width="38" height="38" alt="ddd">
      <!-- 2018-5-31 14:53:44 增加切换角色功能 -->
      <el-dropdown @command="handleCommand" class="pointer text-blue" style="width: 80px;" trigger="click">
			<span class="el-dropdown-link">
          {{role.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item disabled><span class="fz12" style="margin-left: -10px;">请购单角色</span></el-dropdown-item> -->
          <el-dropdown-item v-for="(rl, index) in roles" :key="index" :command="rl" :disabled="rl.name === role.name">
            {{rl.name}}
          </el-dropdown-item>
          <!-- <el-dropdown-item disabled divided><span class="fz12" style="margin-left: -10px;">采购单角色</span></el-dropdown-item>
            <el-dropdown-item disabled>待添加</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="mb-10">
		<span v-if="$route.meta.back" class="fz13 inline-block por text-green" style="top: -3px;">
        <a class="pointer" @click="goBack()">返回上一级</a> |
      </span>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="inline-block" v-if="breadcrumb && breadcrumb.length">
        <el-breadcrumb-item v-for="(item, index) in breadcrumb" :class="{'is-link': item.name}" :key="index"
                            @click.native="handleBreadcrumbChange(item.name)">{{item.label}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <template v-if="isRouterAlive">
      <keep-alive :include="include">
        <router-view v-loading="loading.show" ref="routerView"></router-view>
      </keep-alive>
    </template>
  </pagoda-layout>
  <router-view v-loading="loading.fullShow" v-else></router-view>
</template>
<script>
  /* eslint-disable */
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex'
  // import { deepCopy } from '@/utils/utils'
  // let subMenuUrls = []; // 存储所有二级菜单对象
  // sideMenu.forEach(side => {
  //  side.subMenu.forEach(sub => {
  //    const {label, url} = sub;
  //    subMenuUrls.push({label, url});
  //  });
  // });

  export default {
    name: "App",
    data() {
      return {
        include: [], // 缓存组件的name数组
        isRouterAlive: true // 实现reload刷新组件的方法
      }
    },
    methods: {
      ...mapMutations(['setRole', 'setTopMenuActive']),
      handleTabsChange(param) {
        // let meta = this.$route.meta
        // let routeParams = this.StoreService.routeParams[param.url] || {}
        // 如果是侧边栏或者首页才跳路由  如果是属于相同path下的详情页则不跳转
        // console.log(this.$route.path, param.url)
        this.$router.push(param.url)
      },
      handleTabsDataChange(tabs) {
        this.include = tabs.filter(el => el.name).map(el => el.name)
      },
      handleCollapseChange() {
        setTimeout(() => this.$bus.$emit('dolayout'), 300)
      },
      handleSelectSideMenu(data) {
        // if (data.url === this.$route.name) {
        //   console.log('重新刷新页面')
        //   this.reload()
        // }
      },
      handleSelectTopMenu({url}) {
        if (url !== '/') {
          let target = window.location.origin + url
          window.location.href = target
        }
      },
      handleBreadcrumbChange(name) {
        name && this.$router.push({
          name
        })
      },
      handleCommand(command) { // 切换角色操作
        this.setRole(command)
        this.$router.replace('/')
        this.reload()
      },
      reload() { // 实现reload刷新组件的方法
        this.isRouterAlive = false
        this.$nextTick(() => (this.isRouterAlive = true))
      },
      goBack() { // 2018-6-1 16:13:17 增加返回上级操作
        let back = this.$route.meta.back
        if (back === 'back') {
          this.$router.back()
        } else {
          this.$router.push({
            name: back
          })
        }
      }
    },
    computed: {
      topMenuActive() {
        let topMenuActive = this.$route.meta.topMenu || '/'
        this.setTopMenuActive(topMenuActive)
        return topMenuActive
      },
      sideMenuActive() {
        return this.$route.path || this.$route.meta.name || "/";
      },
      ...mapState(['breadcrumb', 'loading', 'roles', 'role', 'topMenu']),
      ...mapGetters(['sideMenu', 'navNoPermission'])
    },
    watch: {
      '$route'(to, from) {
        // console.log(to);
        this.$nextTick(() => {
          let $layout = this.$refs.layout;
          //记录活跃路由名称
          if ($layout) { // layout出来之后再处理
            // 记录路由最近一次打开的的参数
            this.StoreService.setRouteParams(to)
            // 路由跳转之后tab激活也跟着变化
            if (to.name === '/') { // 首页比较特殊
              $layout.handleSideMenuSelect({
                label: '首页',
                url: '/'
              })
            }
            /* else {
                                  $layout.handleSideMenuSelect({label: to.meta.name, url: to.name })
                                }*/
            // let len = result.length;
            // if(len > 0) { // 取最后一个当前激活状态，如果有跳转说明tab也需要激活， 暂不需要
            //   let {label, to} = result[len - 1] ;
            //   to && $layout.handleSideMenuSelect({label, url: to.name});
            // }
            // 二级菜单里有路由name的话，说明tab也需要激活 layout已实现不需要了
            // let activeTab = subMenuUrls.find(sub => sub.url === to.name);
            // activeTab && $layout.handleSideMenuSelect({label: activeTab.label, url: activeTab.url});
          }
        });
      }
    }
  };
  /* eslint-disable */
</script>
<style lang="stylus">
  .pagoda-layout-purchase
    .collapse-icon {
      &.icon-shensuocaidan, &.icon-shensuocaidan1 {
        font-size 12px
        right 2px !important
      }
    }
    // 模拟面包屑可激活的状态
    .el-breadcrumb__item.is-link
      .el-breadcrumb__inner
        font-weight 700
        text-decoration: none
        transition color .2s cubic-bezier(.645, .045, .355, 1)
        color #303133
        &:hover
          color #409eff
          cursor: pointer
    /* 下拉角色菜单 */
    .el-dropdown
      line-height 16px
    .logo
      background-color: #002140;
      text-align: center;
      color: #fff;
      h3
        margin: 0;
</style>
