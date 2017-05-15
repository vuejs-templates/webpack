<template>
  <div class="com">
    <div class="logo animated fadeIn"></div>
    <div class="title animated fadeInUp"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/core/fn.scss';

.com {
  background: url('../assets/images/bg_index.png') no-repeat left top;
  background-size: cover;
}

.logo {
  position: absolute;
  top: 40px;
  left: 40px;
  background: url('../assets/images/logo.png') no-repeat center center;
  background-size: cover;
  width: 310px;
  height: 53px;
}

.title {
  margin-top: 235px;
  margin-left: auto;
  margin-right: auto;
  background-image: url('../assets/images/title.png');
  background-size: cover;
  width: 654px;
  height: 283px;
}
</style>
