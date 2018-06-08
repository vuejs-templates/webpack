<template>
  <div id="previewSheet">
    <div class="form-title" index="0"><div class="msg">
      被保险人
    </div></div>
    <div class="info-item"   v-for="(infolist,index) in currentInsurerInfo" :key="index">

      <div class="content">
        <div class="left">
          <span>{{infolist.name}}</span>
        </div>
        <div class="right">
          <span>{{infolist.value}}</span>
        </div>
      </div>
    </div>


    <div class="form-title"><div class="msg">
      受益人
    </div></div>

    <div v-for="(item,beneIdx) in currentBene" :key="item.key">
      <div class="info-item">
        <div class="content">
          <div class="left">
            <span>{{item.key}}</span>
          </div>
          <div class="right">
            <span></span>
          </div>
        </div>
      </div>

      <div class="info-item" v-for="(cell,cellIdx) in item.itemList" :key="cellIdx">
        <div class="content">
          <div class="left">
            <span>{{cell.name}}</span>
          </div>
          <div class="right">
            <span>{{cell.value}}</span>
          </div>
        </div>
      </div>
    </div>



    <div class="form-title" index="0"><div class="msg">
      投保事项
    </div></div>
    <div class="insure-terms">

      <div class="content" v-for="(prod,index) in currentProdInfo" :key="index">
        <div class="productname">{{prod.abbrName}}</div>
        <div class="title">
          <div class="cell">保障金额（元）</div>
          <div class="cell">保险期</div>
          <div class="cell">缴费年期</div>
          <div class="cell">首年保费</div>
        </div>
        <div class="fare">
          <div class="cell">{{prod.amount_value}}</div>
          <div class="cell">{{prod.insure}}</div>
          <div class="cell">{{prod.pay}}</div>
          <div class="cell">{{prod.premium}}</div>
        </div>
      </div>
    </div>

    <div class="gross">
      <div class="left">期缴保费合计</div>
      <div class="right">{{currentPaySum}}</div>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Array,
        required: true,
        default:[]
      },
      currentTab:{
        type:Number,
        default:0
      }
    },
    created() {
//      this.currentInsurerInfo = this.info[this.currentTab].insured;
    },
    data: function() {
      return {
        tabIdx:0,
        currentInsurerInfo:null,
        currentProdInfo:null,
        currentBene:null,
        currentPaySum:''
      };
    },
    methods: {

    },
    watch: {
      currentTab(val){
        this.tabIdx = val;
        this.currentInsurerInfo = this.info[val].insured;
        this.currentBene = this.info[val].benefitModel.benefitList;
        this.currentProdInfo = this.info[val].productList;
        this.currentPaySum = this.info[val].payInfo[0].value;
        console.log('currentBene',this.currentBene)
      }
    }
  };
</script>

<style <style lang="less" scoped>
#previewSheet{
  .form-title {
    background-color: #f7f7f7;
    overflow: hidden;
    height: 3rem;
    line-height: 3rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 1.07143rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .info-item{
    height: 44px;
    background-color: #fff;
    .content{
      height: 43px;
      margin-left: 20px;
      border-bottom:1px solid #d9d9d9;
      display: flex;
      .left{
        flex:1;
        display: flex;
        align-items: center;
      }
      .right{
        flex:1;
        display: flex;
        align-items: center;
        justify-content:flex-end;
        padding-right: 10px;
      }
    }
  }

  .insure-terms {
    background-color: #fff;
    .content {
      margin-left: 20px;
      border-bottom: 1px solid #d9d9d9;
      display: flex;
      flex-direction: column;
      .productname{
        padding: 10px 0;
      }
      .title{
        display: flex;
        padding-bottom: 10px;
        div{
          flex:1;
        }
      }
      .fare{
        padding-bottom: 10px;
        display: flex;
        div{
          flex:1;
        }
      }
    }
  }
  .gross{
    height: 40px;
    line-height: 40px;
    display: flex;
    .left{
      flex:1;
      padding-left: 20px;
    }
    .right{
      flex:1;
      text-align: right;
      padding-right: 20px;
    }
  }
}

</style>
