<template>
  <div class="app-wrapper">
    <Header></Header>
    <div class="container">
      <Menu></Menu>
      <section class="Content">
        <Tabs v-if="TabORCrumb==='tab'" />
        <Crumb v-if="TabORCrumb==='crumb'" />
        <TabContent></TabContent>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  computed: {
    ...mapGetters([
      'TabORCrumb'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .container{
    display: -webkit-box;
    padding-top: 50px;
    background: #fff;
  }
  .Content{
    padding: 10px;
    background: #f5f5f5;
    width: calc(100vw - 120px);
    min-width: 800px;
    overflow: hidden;
    overflow-x: auto;
    margin-left: 100px;
  }
</style>
