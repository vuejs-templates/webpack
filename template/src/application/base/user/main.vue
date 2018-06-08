<!--
      descript: 我的名片
-->
<template>
  <div class="cardBox">
    <div class="card" @click="shareBtn">
      <div class="title"></div>
      <div class="content">
        <header>
          <div class="placeholder-photo photo">
            <img v-if="imgHeader != ''" :src="imgHeader" class="photo">
          </div>
          <h1 class="name" id="name">{{name}}</h1>
          <p class="job"><span id="jobtitle">{{jobtitle}}</span><br/><span id="job1">{{job}}</span></p>
        </header>
        <div class="icon">
          <div class="infor email" id="email"><div>{{email}}</div></div>
          <div class="infor phone" id="mobile"><div><a :href="`tel: ${mobile}`">{{mobile}}</a></div></div>
          <div class="infor tel" id="tel"><div><a :href="`tel: ${tel}`">{{tel}}</a></div></div>
          <div class="infor website"><div>{{website}}</div></div>
          <div class="infor address" id="address"><div>{{address}}</div></div>
          <img class="qrcode" src='~@/assets/styles/images/bussiness/qrcode2.png'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {IBUSSINESSCARD, IBUSINESSCARDSHARING} from '@/api'
  export default {
    name: 'name-card',
    props: {
      inApp: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    data () {
      return {
        name: '',
        job: '',
        jobtitle: '',
        email: '',
        mobile: '',
        tel: '',
        website: '',
        address: '',
        shareimg: '',
        sharelink: '',
        sharetitle: '',
        sharedsc: '',
        uid: '',
        shareid: '',
        imgHeader: ''
      }
    },
    created: function () {
      this.uid = this.$route.query.uid || ''
      this.shareid = this.$route.query.shareid
      this.getData()
      this.shareinit()
    },
    methods: {
      // 初始化分享功能
      shareinit () {
        if (this.shareid) { return }
        let params = {id: this.uid, shareid: 'HqAPP'}
        if (!this.inApp) {
          Object.assign(params, {planTypeFlag: 'sharePlan', staffNo: this.$route.query.staffNo})
        }
        this.axios.post(IBUSINESSCARDSHARING, params).then((response) => {
          if (response.data.success) {
            this.shareimg = response.data.value.imgPath
            this.sharelink = response.data.value.linkUrl
            this.sharetitle = response.data.value.title
            this.sharedsc = response.data.value.content
            this.shareBtn()
          } else {
            this.$vux.toast.show({
              text: response.data.errorMsg,
              type: 'text',
              width: '50%',
              isShowMask: true
            })
          }
        }).catch(console.error)
      },
      // 显示分享菜单
      shareBtn () {
        window.showShareArr(null, this.sharelink, this.shareimg, this.sharetitle, this.sharedsc)
      },
      // 获取分享信息
      getData () {
        let params = {id: this.uid, shareid: 'HqAPP'}
        if (!this.inApp) {
          Object.assign(params, {planTypeFlag: 'sharePlan', staffNo: this.$route.query.staffNo})
        }
        this.axios.post(IBUSSINESSCARD, params).then((response) => {
          if (response.data.success) {
            this.name = response.data.value.userName || ''
            this.job = response.data.value.companyName || ''
            this.jobtitle = response.data.value.grandName || ''
            this.mobile = response.data.value.mobile || ''
            this.tel = response.data.value.phone || ''
            this.email = response.data.value.email || ''
            this.address = response.data.value.companyAddress || ''
            this.website = response.data.value.webSite || ''
            this.imgHeader = response.data.value.imgHeader || ''
          } else {
            this.__toast(response.data.errorMsg)
          }
        }).catch(console.error)
      }
    }
  }
</script>

<style lang='less' scoped>
.cardBox{
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
}
.card{
  width: 90%;
  margin: 0 auto;
  border-radius: 10px 10px;
  overflow: hidden;
  box-shadow: 1px 1px 15px #cecece;
  -webkit-box-shadow: 1px 1px 15px #cecece;
  position: relative;
  top: 40px;
  .title{
    background:#11adff;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 140px;
    height: 90px;
  }
  .content{
    padding: 31px 20px 36px;
    background: #fff;
    .name{
      color:#333;
      font-size: 21px;
      line-height: 24px;
      height: 24px;
      margin-bottom: 13px;
      font-weight: 500;
    }
    .job{
      color:#666666;
      font-size: 14px;
      height: 54px;
      line-height: 18px;
      border-bottom: 1px solid #efefef;
    }
    .photo{
      float: right;
      clear: right;
      display: inline-block;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      // font-size: 0;
    }
    .placeholder-photo {
      height: 80px;
      background: url('~@/assets/styles/images/placeholder/photo.png') scroll no-repeat center center;
      background-size: contain;
    }
    .icon{
      margin-top: 28px;
      position: relative;
      a, a:hover, a:visited, a:focus , a:active{
        color: #11ADFF;
      }
    }
    .icon{
      .infor:before{
      padding-right: 9px
    }
    .infor{color:#888;margin-bottom: 9px; width: 60%;font-size: 11px;word-break: break-all; display: flex;}
    .infor{
      div{
        flex: 1;
        padding-top: 4px;
        line-height: 18px;
      }
    }
    .qrcode{
      width: 80px;
      height: 80px;
      display: block;
      position: absolute;
      bottom: 0;
      right: 0
    }
    &>.email:before,
    &>.phone:before,
    &>.tel:before,
    &>.website:before,
    &>.address:before{
      // background: url('~@/assets/styles/images/bussiness/address.png') no-repeat;
      content: " ";
      width: 20px;
      height: 20px;
      margin-right: 3px;
      display: inline-block;
      background-size: 100%;
      position: relative;
      top: 2px;
      font-size:12px;
    }
    &>.email:before{background: url('~@/assets/styles/images/bussiness/mail.png') no-repeat; background-size: contain;}
    &>.phone:before{background: url('~@/assets/styles/images/bussiness/phone.png') no-repeat; background-size: contain;}
    &>.tel:before{background: url('~@/assets/styles/images/bussiness/tel.png') no-repeat; background-size: contain;}
    &>.website:before{background: url('~@/assets/styles/images/bussiness/website.png') no-repeat; background-size: contain;}
    &>.address:before{background: url('~@/assets/styles/images/bussiness/address.png') no-repeat; background-size: contain;}
    }
  }
}
</style>
