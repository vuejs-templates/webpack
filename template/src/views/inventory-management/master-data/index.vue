<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="存货初始化设置查询" name="/inventory-management/master-data"></el-tab-pane>
      <el-tab-pane label="存货库房查询" name="/inventory-management/master-data/storage-room"></el-tab-pane>
      <el-tab-pane label="存货库房中心定义" name="/inventory-management/master-data/central-definition"></el-tab-pane>
      <el-tab-pane label="成本组定义" name="/inventory-management/master-data/cost-group"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  const routePathMap = [
    '/inventory-management/master-data',
    '/inventory-management/master-data/storage-room',
    '/inventory-management/master-data/central-definition',
    '/inventory-management/master-data/cost-group'
  ]

  export default {
    nestedRoute: true,
    data () {
      return {
        activeName: this.getActiveName()
      }
    },
    methods: {
      handleClick (tab) {
        this.$router.replace(tab.name)
      },
      getActiveName () {
        let activeName = ''

        routePathMap.forEach(path => {
          if(this.$route.path.includes(path)) {
            activeName = path
          }
        })

        return activeName
      }
    },
    watch: {
      $route () {
        this.activeName = this.getActiveName()
      }
    }
  }
</script>
