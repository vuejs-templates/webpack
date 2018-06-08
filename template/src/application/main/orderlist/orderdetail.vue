<template>
  <div class="search-detail-page">
    <div v-if="show" class="detail-content">
      <lineDialog :item = "items.basicInfo" title="基本信息"></lineDialog>
      <lineDialog :item = "items.appntInfo" title="投保人信息"></lineDialog>
      <div v-for="(item, index) in items.insuredBenifitInfo">
        <div v-for="(itm, ix) in item">
          <lineDialog :item = "itm" :title="ix" class="sonlist"></lineDialog>
        </div>
      </div>
      <lineDialog :item = "items.payInfo" title="缴费信息"></lineDialog>
      <div v-for="(item, idx) in items.riskInfo" :keys="idx">
        <div v-for="(ite, index) in item" :keys="index">
          <lineDialog :item = "ite" :title="index"></lineDialog>
        </div>
      </div>
    </div>

    <c_errMsg txt = "啊哦 ～～,抱歉当前无记录信息哦!" v-else></c_errMsg>
  </div>
</template>
<script>
  import Vue from 'vue'
  import searchdetail from './detailitem'
  import {ISEARCHDETAIL} from '@/api'
  let lineDialog = {
    data: () => {
      return {
        show: true,
        items: []
      }
    },
    name: 'searchdetail',
    created: function () {
    },
    computed: {
    },
    template: `
  <dl class="lineDialog">
    <dt :class="{'seled' : !show}" @click="toggle">{{title}}</dt>
    <dd v-for="(ite, idx) in item" :keys="idx" v-show="show">
      <div>{{ite.name}}</div>
      <div>{{ite.value}}</div>
    </dd>
  </dl>
  `,
    methods: {
      toggle () {
        this.show = !this.show
      }
    },
    props: ["item", "title"]
  }
  export default {
    data: () => {
      return {
        show: true,
        items: []
      }
    },
    name: 'orderdetail',
    created: function () {
      this.getData(false)
    },
    computed: {
    },
    methods: {
      getData (append = true) {
        // if (!this.$route.query.contNo) {
        //   return
        // }
        this.pageNum = append ? Number(this.pageNum) + 1 : 1
        this.axios.post(ISEARCHDETAIL, {contNo: this.$route.query.contNo || '10098928292'}).then(response => {
          if (response.data.success) {

            let data = response.data.value;
            let group = {};
            group.appntInfo = [];
            for(let i in data){
              group.appntInfo.push({
                name:i,
                value:data[i]
              })
            }
            this.items = group



//            this.items = response.data.value



          } else {
            this.$vux.toast.show({
              text: response.data.errorMsg,
              type: 'text',
              width: '50%',
              isShowMask: true
            })
          }
        }, fail => {
        }).catch((err) => {
          console.log(err)
          throw new Error(err)
        })
      },
      viewDetail (n) {
        // alert('cccc')
      }
    },
    components: {
      searchdetail, lineDialog
    }
  }
</script>
<style lang='less'>
  @import '../../../assets/styles/page.less';
  .lineDialog{
  & > dt{
      font-size: 15px;
      color:#999;
      height: 45px;
      vertical-align: middle;
      line-height: 45px;

      background-size: 100% 1px;
      background-position: bottom;
      background-repeat: no-repeat;
      background-image: url(~@/assets/styles/images/underscore.png);
    /*@include borderbottom-1px(#efefef);*/
      position: relative;
  &:after{
     content: "";
     position: absolute;
     border: 1px solid #999;
     border-bottom-color: transparent;
     border-left-color: transparent;
     top:0;
     right:15px;
     width: 30px;
     height: 30px;
     transform: rotate(-45deg) scale(.5);
     transform-origin:100% 75%;
   }
  &:before{
     content: "";
     display: inline-block;
     width: 3px;
     height: 32/2px;
     padding-left: 16/2px;
     box-sizing: border-box;
     border-left: 5/2px solid #00b0ff;
     vertical-align: middle;
     margin-top: -2px;
   }
  &.seled{
  &:after{
     transform: rotate(135deg) scale(.5);
     transform-origin:70% 50%;
   }
  }
  }
  & > dd{
      min-height: 45px;
      vertical-align: middle;
      display: table;
      width: 100%;
  &> div{
     display: table-cell;
     vertical-align: middle;

     background-size: 100% 1px;
     background-position: bottom;
     background-repeat: no-repeat;
     background-image: url(~@/assets/styles/images/underscore.png);
   /*@include borderbottom-1px(#efefef);*/
  &:last-child{
     text-align: right;
     padding-right:15px;
     color: #999;
   }
  }
  }
  &.sonlist{
  & > dt{
  &:before{
     display: none;
   }
  }
  }
  }
</style>
<style lang='less' scoped>
  @import '../../../assets/styles/page.less';
  .search-detail-page{
    background:#fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  .detail-content{
    margin-left: 15px;
  }
  }
</style>
