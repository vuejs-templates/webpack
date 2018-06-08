
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Last modified : 2017-04-07 17:40
 * Filename      : cardWrongEtc.vue
 * Description   : e投保－电子签名－证件影像上传－模版示意－问题

********************************************************************-->

<template>
  <div class="upload-eg">
    <tab :animate="false" :line-width="2">
      <tab-item @on-item-click="onRight" selected>标准模板示例</tab-item>
      <tab-item @on-item-click="onWrong">问题模板示例</tab-item>
    </tab>

    <div v-show="!isWrong" class="sample-right">
      <p class="sample-tip"><span>这样就不会出错咯~</span></p>
      <div class="sample-item">
        <span class="item-msg">正面</span>
        <div class="item-img-content"><img src="~@/assets/image/card_right1.jpg"></div>
      </div>
      <div class="sample-item">
        <span class="item-msg">背面</span>
        <div class="item-img-content"><img src="~@/assets/image/card_right2.jpg"></div>
      </div>
    </div>
    <div v-show="isWrong" class="sample-wrong">
      <div class="sample-item">
        <span class="item-msg">错误一: 有光点</span>
        <div class="item-img-content"><img src="~@/assets/image/card_wrong1.jpg"></div>
      </div>
      <div class="sample-item">
        <span class="item-msg">错误二: 光线不足,留白太多</span>
        <div class="item-img-content"><img src="~@/assets/image/card_wrong2.jpg"></div>
      </div>
      <div class="sample-item">
        <span class="item-msg">错误三: 模糊</span>
        <div class="item-img-content"><img src="~@/assets/image/card_wrong3.jpg"></div>
      </div>
      <div class="sample-item">
        <span class="item-msg">错误四: 角度倾斜</span>
        <div class="item-img-content"><img src="~@/assets/image/card_wrong4.jpg"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux'
  export default {
    data: () => {
      return {
        isCreated: false,
        isWrong: false
      }
    },
    name: 'resultExample',
    components: {Tab, TabItem},
    props: [],
    created () {
      this.doInit()
    },
    deactivated () {
      this.isCreated = false
    },
    methods: {
      doInit () {
        if (this.isCreated) {
          return
        }
        this.isCreated = true
        this.initGoBack()
      },
      initGoBack () {
        let self = this
        window.__callbacks = window.__callbacks || {}
        window.__callbacks.gobackbtn = function () {
          return self.goback()
        }
      },
      goback () {
        window.__callbacks.gobackbtn = null
        this.$store.state.ui.store.set('isNeedUpdate', false)
        this.$router.replace({name: 'upload'})
      },
      onRight: function () {
        this.isWrong = false
      },
      onWrong: function () {
        this.isWrong = true
      }
    }
  }
</script>

<style lang="less" >
  .upload-eg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;


    .vux-tab-selected {
      color: #00b1ff!important;
      border-bottom: 3px solid #00b1ff!important;
    }
    .vux-tab-ink-bar {
      background-color: #00b1ff!important;
      height:1px!important;
    }
    .sample-item {
      padding:3px;
      margin-bottom:16pxpx;
      .item-msg {
        background:url(~@/assets/image/faces.png) no-repeat;
        background-size:20pxpx;
        background-position:13px -34px;
      }
      .item-img-content {
        float:left;
        width:300pxpx;
        height:185pxpx;
        img {
          height:100%;
          border:1px solid #b5b5b5;
        }
      }
      &:after {
        content:"";
        height:0;
        display:block;
        clear:both;
      }
    }
    .sample-right {
      background-color:#fff;
      padding-bottom:16px;
      .sample-tip {
        text-align:center;
        padding-top:20px;
        padding-bottom:20px;
        span {
          font-size:13px;
          display:inline-block;
          height:25px;
          line-height:25px;
          padding-left:30px;
          background:url(~@/assets/image/faces.png) no-repeat;
          background-size:20px;
          background-position:3px 1px;
        }
      }
      .sample-item {
        span {
            float:left;
            text-align:center;
            width:56px;
            font-size:16px;
            background:none;
        }
      }
    }
    .sample-wrong {
      background-color:#fff;
      width:100%;
      padding-bottom:16px;
      .sample-item {
        span {
            display:block;
            font-size:13px;
            padding-left:40px;
            height:45px;
            line-height:45px;
        }
        .item-img-content {
          width:100%;
          text-align:center;
          img {
          }
        }
      }
    }
  }

</style>
