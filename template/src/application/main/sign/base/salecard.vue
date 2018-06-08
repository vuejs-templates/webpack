
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-04-22 11:52
 * Filename      : salecard.vue
 * Description   : 销售信息卡片组件

********************************************************************-->

<template>
  <div class='sale-card-content' style="font-weight: normal">
    <div class='card-header' style="background:#d9f3ff">
      <p style="color: #009eff">销售信息</p>
    </div>
    <div class='card-body'>
      <div class='body-id'>电子投保单号: {{inform.id}}</div>
      <div class='body-info'>
        <div class='head-content'>
          <!-- <img src='~@/assets/image/head-default.png'> -->
          <img v-if="inform.src" :src="inform.src"/>
          <img v-else  src='~@/assets/image/head-default.png'/>
        </div>
        <div class='info-content'>
          <p style="font-weight: normal">{{inform.name}}</p>
          <p style="font-weight: normal">代码：{{inform.code}}</p>
          <p style="font-weight: normal">销售渠道：{{inform.channel}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
* inform  id
*         src
*         name
*         code
*         channel
*/
  export default {
    created: function () {
    },
    activated: function () {
      // this.getData(false)
    },
    methods: {},
    props: ["inform"]
  }
</script>

<style lang='less' >
  .sale-card-content {
    border-radius: rem-calc(5px);
    background-color:#fff;
    overflow:hidden;
    width:rem-calc(345px);
    height:rem-calc(177px);
    margin: auto;
    font-weight:bold;
    box-shadow: 0 0 rem-calc(12px) rem-calc(.8px) rgba(152, 152, 152, 0.25);
    .card-header {
      width:100%;
      background-color:#d9d9d9;
      height:rem-calc(35px);
      font-size:rem-calc(15px);
      text-align:center;
      color:#fff;
      line-height:rem-calc(35px);
    }
    .card-body {
      .body-id {
        width:rem-calc(323px);
        border-bottom:1px solid #f0f0f0;
        margin:auto;
        height:rem-calc(43px);
        text-align:center;
        line-height:rem-calc(43px);
        color:#00aeff;
        margin-bottom:rem-calc(17px);
      }
      .body-info {
        display:flex;
        align-items:stretch;
        padding-left:rem-calc(30px);
        padding-right:rem-calc(30px);
        box-sizing:border-box;
        .head-content {
          width:rem-calc(63px);
          height:rem-calc(63px);
          img {
            width:100%;
            height: 100%;
            border-radius: rem-calc(63/2px);
          }
        }
        .info-content {
          padding-left:rem-calc(19px);
          flex:1;
          p {
            /*line-height:rem-calc(21px);*/
            line-height: 0;
            padding-top: rem-calc(10px);
            padding-bottom: rem-calc(10px);
          }
          & p:nth-child(1) {
            font-size:rem-calc(15px);
            color:#333;
          }
          & p:nth-child(2) {
            font-size:rem-calc(13px);
            color:#999;
          }
          & p:nth-child(3) {
            font-size:rem-calc(13px);
            color:#999;
          }
        }
      }
    }
  }

</style>
