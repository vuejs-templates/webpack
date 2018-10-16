<template>
  <section class="header">
    <div class="left">
      <div class="logo">
        <img src="https://res.tuhu.org/managementUI/navigationUI/mnimg/logo.png">
      </div>
      <span class="title" v-text="description"></span>
    </div>
    <div class="userIns">
      <div class="name">
        <span></span>
        <div class="txt" id="userName">fanjuan@tuhu.cn</div>
      </div>
    </div>
  </section>
</template>

<script>
import { description } from '@/config/config'
export default {
  name: 'Header',
  data () {
    return {
      description
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .header{
    height: 50px;
    min-width: 800px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #2E4050;
    padding: 0 15px;
    z-index: 1001;
    position: fixed;
    left: 0;
    right: 0;
    .left{
      display: flex;
      align-items: center;
      .logo{
        width: 120px;
        height: 36px;
        margin-right: 10px;
      }
      .title{
        padding-left: 10px;
        font-size: 14px;
        position: relative;
        color: #fff;
        &:before{
          content: '';
          width: 1px;
          height: 18px;
          position: absolute;
          left: 0;
          top: 2px;
          display: block;
          background-color: #E1E1E1;
        }
      }
    }
    .userIns{
      display: flex;
      align-items: center;
      .name{
        display: flex;
        align-items: center;
        span{
          width: 20px;
          height: 20px;
          background: url(../../../assets/img/phone.svg) no-repeat;
          background-size: contain;
          margin-right: 5px;
        }
        .txt{
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
</style>
