<!--
      descript: 电子签名-税收居民
        author: xiangzhi
        param:

-->
<template>
  <div class="page-tax-check">
    <div class="tax_main">
      <div class="baseBoxLeft"><label class="input-label">仅为中国税收居民</label></div>
      <div class="baseBoxright atop">
        <div class="radio">
          <div class="radio-button">
            <span :class="{active: taxInfo.isChineseTaxResident === 'Y'}" @click="checker(true)">是</span>
            <span :class="{active: taxInfo.isChineseTaxResident === 'N'}" @click="checker(false)">否</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tax_main" v-if="taxInfo.isChineseTaxResident === 'N' && taxInfo.name === ''">
      <div class="baseBoxLeft font-color">请填写个人税收居民信息</div>
      <div class="baseBoxright">
        <div class="btn-upload" @click="goDetail(taxInfo.applyId)">
          <i class="sign"></i>
        </div>
      </div>
    </div>
    <div class="tax_main" v-if="taxInfo.isChineseTaxResident === 'N' && taxInfo.name !== ''">
      <ul class="list-tax">
        <li class="header">
          <span class="title">税收居民基本信息</span>
          <span class="tax_content font-color" @click="goDetail(taxInfo.applyId)">查看更多<i class="triangle-right"></i></span>
        </li>
        <li>
          <div class="title">姓&nbsp;/&nbsp;名</div>
          <div class="tax_content">{{taxInfo.name}}</div>
        </li>
        <li v-for="item in taxInfo.taxCountry">
          <div class="title">税收居民国（地区）</div>
          <div class="tax_content">{{item}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      taxInfo: {
        type: Object,
        default () {
          return {}
        }
      },
      inApp: {
        type: Boolean,
        default () {
          return true
        }
      },
      applyId: {
        type: [Number, String]
      }
    },
    methods: {
      checker (val) {
        if (val) {
          this.taxInfo.isChineseTaxResident = 'Y'
        } else {
          this.taxInfo.isChineseTaxResident = 'N'
        }
        this.$emit('taxResident', this.taxInfo.isChineseTaxResident)
      },
      goDetail (applyId) {
        this.$emit('openPanel')
        if (this.inApp) {
          this.$router.push({name: 'taxDwellerFile', query: {applyId}})
        }
      }
    }
  }

</script>

<style lang='less'  >
  .page-tax-check {
    background-color: #fff;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 15px;
    .tax_main{
      display: flex;
      background:none;width:100%;
      @include 1px solid #efefef;
      line-height: 45px;
      min-height: 45px;
      .baseBoxright {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      &:last-child {
        background-size: 0;
      }
    }
    .btn-upload {
      width: 25px;
      height: 25px;
      display: flex;
      padding: 5px;
      float: right;
      margin-right: 10px;
      > i {
        flex: 1;
      }
    }
    .sign {
      background: url("~@/assets/styles/images/sign/sign.png") no-repeat center center;
      background-size: contain;
    }
    .radio {
      display: flex;
      align-items: top;
      float: right;
      padding-right: 15px;
      .radio-button {
        display: flex;
        height: 25px;
        overflow: hidden;
        width: 70px;
        margin-left: 21px;
        align-items: center;
        border: 1px solid #00a5ff;
        border-radius: 5px;
        & > span {
          flex: 1;
          text-align: center;
          color: #999999;
          padding: 6) 0;
        }
        & > :first-child {
          border-right: 1px solid #00a5ff;
        }
        .active {
          color: #ffffff;
          background-color: #00a5ff;
        }
      }
    }
    .font-color {
      color: #00b0ff;
    }
    .list-tax {
      list-style: none;
      width: 100%;
      margin: 10px 15px 20px 0;
      border-radius: 5px;
      li {
        display: flex;
        padding: 0 15px;
        background-color: #f7f7f7;
        margin-bottom: 1px;
        &:last-child {
          border-radius: 0 0 8px 8px;
        }
        .tax_content {
          display: flex;
          flex: 1;
          justify-content: flex-end;
          align-items: center;
        }
        .triangle-right {
          display: inline-block;
          border-right: 1px solid red;
          border-bottom: 1px solid red;
          width: 8px;
          height: 8px;
          transform: rotate(-45deg);
        }
      }
    }
    .header {
      border-radius: 8px 8px 0 0;
      background-color: #d8f4ff !important;
      color: #999;
    }
  }
</style>
