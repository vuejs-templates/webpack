<template>
  <div class="notFound">
    <img src="@/assets/img/404.png"/>
    <div style="display: inline-block; color: rgb(125,121,121); text-align: center; margin-left: 20px;">
      <span style="font-size: 60px">404</span><br />你要找的页面不存在<br />
      <router-link to="/home">返回首页</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'notFound'
}
</script>
<style lang="scss" scoped>
  .notFound{
    display: flex;
    width: 700px;
    margin: 0 auto;
    padding-top: 40px;
    align-items: center;
    line-height: 26px;
  }
</style>
