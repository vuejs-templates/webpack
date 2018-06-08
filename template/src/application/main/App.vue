
<template>
<div id="app">
  <router-view/>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang='less'>
  @import '../../assets/styles/weui/base/reset.less';
  @import '../../assets/styles/weui/widget/weui_cell/weui_cell_global';
  @import '../../assets/styles/weui/base/variable/color.less';
  html,body{height:100%}
  #app{
    height:100%;
    position:relative;
    background: @weuiBgColorDefault;
  }
</style>
