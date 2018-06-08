<!--
      descript: 主险-特色
      author: jankergg
-->
<template>
  <div class="feature-page">
    <div class="positionFix">
      <div class="feature-banner">
        <img :src="item.bigUrl">
      </div>
      <div class="feature-content"  >
        <div class="content-title">险种特色</div>
        <ul >
          <li v-for="(p, index) in des" :key="index">
            <div>{{index+1}}.{{p}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="button-wrapper" v-if="inApp">
      <button class="bigblur-btn" @click="makePlan()">制作计划书</button>
      <button class="bigblur-btn" @click="makeProposal()">去投保</button>
    </div>
    <template v-else>
      <div class="btn-out-app" @click="makePlan()">制作计划书</div>
    </template>

  </div>
</template>
<script>
  import {SHAREPROPOSAL,SHARE_I_PRODUCTDETAIL,IPRODUCTDETAIL} from '@/api'
  export default {
    name: 'AppFeature',
    data () {
      return {
        name: "",
        item: {
          bigUrl: ''
        },
        des: [],
        shareData: '',
        iProductDetail: ''
      }
    },
    computed: {
      inApp(){
        return !!window.HQAppJSInterface
      },
      productId () {
        const {id, productId} = this.$route.query
        const storedProductId = this.$store.state.sale.productId
        return id || productId || storedProductId
      },
      planId () {
        return this.$route.query.planId || this.$store.state.sale.planId
      },
      source () {
        return this.$route.query.source
      }
    },
    created () {
      this.iProductDetail = this.inApp ? IPRODUCTDETAIL : SHARE_I_PRODUCTDETAIL
      this.loadData()
      this.getShareData()
    },
    methods: {
      alert (content) {
        this.$vux.alert.show({
          title: '说明',
          buttonText: '返回',
          onHide: () => {
            this.$router.back()
          },
          content
        })
      },
      share () {
        window.shareAppFeature = () => {
          window.showShare('2;3', this.shareData.data.value.url, this.shareData.data.value.coverPath, this.shareData.data.value.title, this.shareData.data.value.remark, 'shareCallback')
        }
      },
      getShareData () {
      	let productId = this.$route.query.productId||''
        let params = {productId: productId, planTypeFlag: 'shareCreate'}
        this.axios.post(SHAREPROPOSAL, params).then(response => {
          if (response.data.success) {
            this.shareData = response
            this.share()
          }
        }, fail => {
        }).catch((err) => {
          console.log(err)
          throw new Error(err)
        })
      },
      loadData () {
      	let productId = this.$route.query.productId||''
        this.axios.post(this.iProductDetail, {id: productId}).then(({data}) => {
        	if(data.success){
        		let val = data.value[0]
	          this.item.bigUrl = val.detailUrl
	          if (val.description) {
	            this.des = val.description.split(";")
	          }
        	}
        }, this.alert).catch(console.error)
      },
      makePlan () {
        let query = {...this.$route.query}
//      if (this.inApp) {
//        query.productId = this.productId
//        query.planId = this.planId
//      }
        this.$router.push({name: 'add-user', query: query})
      },
      makeProposal () {
        let query = this.$route.query
//      if (this.inApp) {
//        query.productId = this.productId
//        query.planId = this.planId
//      }
        this.$router.push({name: 'insure-add-user', query: query})
      }
    }
  }
</script>

<style lang='less' scoped>
  @import "../../../assets/styles/page.less";
  .feature-page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    background-color: #f7f7f7;
    .positionFix{
      overflow-x: hidden;
      overflow-y:auto;
      -webkit-overflow-scrolling: touch;
      position: absolute;
      top:0;
      left:0;
      right:0;
      bottom: 76px;
      & > .feature-title {
        font-size: 15px;
        color: #666666;
        height: 45px;
        line-height: 45px;
        text-align: center;
        background-color: #ffffff;
      }
      & > .feature-banner {
        width: 100%;
        overflow: hidden;
        & > img {
          width: 100%;
        }
      }
      & > .feature-content {
        padding: 15px 15px 20px 15px;
        background-color: #ffffff;
        & > .content-title {
          font-size: 15px;
          color: @weuiColorPrimaryLight;
          padding-bottom: 15px;
        }
        & > ul {
          list-style: none;
          padding: 15px 0;
          & > li {
            font-size: 13px;
            line-height: 23px;
          }
        }
      }
    }
    & > .button-wrapper {
      position: fixed;
      width: 100%;
      padding: 15px 0;
      display: block;
      bottom: 0;
      height:46px;
      left:0;
      background-color: #fff;
      text-align: center;
      & > .bigblur-btn {
        display: inline-block;
        width:46%;
        margin: 0 auto;
        height:46px;
        font-size: 17px;
        background-color:@btnBlue;
        color:#fff;
      }
    }
    .btn-out-app {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      line-height: 45px;
      text-align: center;
      background-color: @weuiColorPrimaryLight;
      color: #fff;
      font-size: 18px;
      margin: 15px;
      border-radius: 5px;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style-type: none;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    :not(:last-child) {
      flex: 1;
    }
    :last-child {
      flex: 3;
      background-color: @weuiColorPrimaryLight;
      color: white;
      font-size: 15px;
      word-spacing: 1px;
    }
  }
</style>
