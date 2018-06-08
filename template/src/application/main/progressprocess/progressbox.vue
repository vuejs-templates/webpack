
<!--********************************************************************
 * Author        : gy
 * Filename      : progressbox.vue
 * Description   : 投保进度－tab子页面 排列子组件
 *  canCopy      : true 显示复制按钮
 *  canDele      : true 显示作废
 *
********************************************************************-->

<template>
  <div class='page-progressbox'>
    <c_scroll @Scroll="ScrollCallback" class="c_scrollData">
      <ul class="scrollList" v-if="show">
        <li v-for="(item, index) in items" :key="item.id">
          <progressarticle
          @C_View = "View"
          @C_Copy = "Copy"
          @C_Dele = "Dele"
          @C_Edit = "Edit"
          @C_pay = "Pay"
          @C_De_Sign="DeSign"
          @C_De_Pay="DePay"
          :id="item.id"
          :imgpath="item.imgPath"
          :title="item.title"
          :applicant="item.applicantName"
          :paytotal = "item.totalPremium"
          :tag = "item.tag"
          :step = "item.step"
          :type = "item.type"
          :time = "item.updateTime"
          :canCopy = "item.btnCopy"
          :canDele = "item.btnDelete"
          :canEdit = "item.btnEdit"
          :canView = "item.btnLook"
          :canPay = "item.btnPay"
          :proposalId = "item.proposalId"
          :planId = "item.planId"
          :applyId = "item.applyId"
          :inAirPay="item.btnBackAirPay"
          :inAirSign="item.btnBackAirSign"
          :isShowBeneficiary="item.isShowBeneficiary">
        </progressarticle>
      </li>
      </ul>
    </c_scroll>
  </div>
</template>

<script>
  import Vue from 'vue'
  import progressarticle from '@/components/service/progressarticle'
  import c_scroll from '@/components/service/scroll'
  import {IPROGRESS, PROGRESSDEL, PROGRESSCOPY, DE_SIGN_AIR, DE_PAY_AIR} from "@/api"

  export default {
    data: () => {
      return {
        confirmdiv: false,
        show: true,
        items: [],
        pageSize: 10,
        idc: 0,
        pageNum: 0,
        delpaln: '',
        delapply: ''
      }
    },
    name: 'progressbox',
    created: function () {
      if (this.$route.params.name) {
        this.doSearch()
      }
      if (!this.$route.params.name) {
        this.getData(false)
      }
    },
    components: {
      progressarticle,
      c_scroll
    },
    props: ["Interface", "idcode"],
    methods: {
      doSearch () {
        if (this.$route.params) {
          var param = {applicantName: this.$route.query.name, genderCode: this.$route.query.genderCode, birthday: this.$route.query.startTime, certNo: this.$route.query.idnumber, tabId: this.idcode, pageNum: this.pageNum, pageSize: this.pageSize}
          this.axios.post(this.Interface, param)
          .then((res) => {
            if (res.data.success) {
              this.items = res.data.value
              this.show = this.items.length !== 0
              console.log(this.show)
              if(!this.show){
                this.$vux.toast.show({
                  text: '啊哦 ～～,抱歉当前无记录信息哦!',
                  type: 'text',
                  width: '68%',
                  isShowMask: true
                })
              }
            } else {
              this.$vux.toast.show({
                text: res.data.errorMsg,
                type: 'text',
                width: '50%',
                isShowMask: true
              })
            }
          })
          .catch((err) => {
            console.log(err)
            throw new Error(err)
          })
        }
      },
      Pay (pid, aid) {
        this.$router.push({name: '/web/repay', query: {applyId: aid, planId: pid}})
      },
      View (pid, aid) {
        this.$router.push({name: '/web/progressdetail', query: {applyId: aid, planId: pid}})
      },
      Edit (s, pid, aid, isShowBeneficiary) {
        switch (s) {
          case 1:
          this.$router.push({name: "add-user", query: {applyId: aid, planId: pid}})
          break
          case 2:
          this.$router.push({name: "app-feature", query: {applyId: aid, planId: pid}})
          break
          case 3:
          this.$router.push({name: "make-plan", query: {applyId: aid, planId: pid}})
          break
          case 4:
          this.$router.push({name: "", query: {applyId: aid, planId: pid}})
          break
          case 10:
          this.$router.push({name: "add-info", query: {applyId: aid, planId: pid}})
          break
          case 11:
          this.$router.push({name: "beneficiary-list", query: {applyId: aid, planId: pid}})
          break
          case 12:
          this.$router.push({name: "/web/supplementInfo", query: {applyId: aid, planId: pid}})
          break
          case 13:
          this.$router.push({path: "/notify/applicant", query: {applyId: aid}})
          break
          case 14:
          this.$router.push({path: "/notify/insurant", query: {applyId: aid}})
          break
          case 15:
          this.$router.push({path: "/viewinsurerpact", query: {applyId: aid}})
          break
          case 16:
          this.$router.push({name: "/web/insuranceprev", query: {applyId: aid, planId: pid}})
          break
        }
      },
      getData (append = true) {
        this.pageNum = append ? Number(this.pageNum) + 1 : 1
        var param = {applicantName: this.$route.query.name, genderCode: this.$route.query.genderCode, birthday: this.$route.query.startTime, certNo: this.$route.query.idnumber, tabId: this.idcode, pageNum: this.pageNum, pageSize: this.pageSize}
        // @debug
        this.axios.post(this.Interface, param).then((response) => {
          if (response.data.success) {
            this.items = append ? this.items.concat(response.data.value) : response.data.value
            this.show = this.items.length !== 0
            console.log(this.show)
            if(!this.show){
              this.$vux.toast.show({
                text: '啊哦 ～～,抱歉当前无记录信息哦!',
                type: 'text',
                width: '68%',
                isShowMask: true
              })
            }
          } else {
            this.$vux.toast.show({
              text: response.data.errorMsg,
              type: 'text',
              width: '50%',
              isShowMask: true
            })
          }
        }, (response) => {
        }).catch((err) => {
          console.log(err)
          throw new Error(err)
        })

        // @debug
        // this.show = this.items.length !== 0
      },
      ScrollCallback (e) {
        if ((e.scrollHeight - e.scrollZoneHeight - e.scrollTop) < 2) {
          e.scrollElement.scrollTop = e.scrollHeight - e.scrollZoneHeight - 3
          this.getData()
        }
      },
      DeSign (it) {
        this.confirm(() => this.DeSignConfirm(it))
      },
      //  收回空中签名
      DeSignConfirm ({planId, applyId}) {
        this.axios.post(DE_SIGN_AIR, {planId, applyId}).then(({data: {success, errorMsg}}) => {
          if (success) {
            let related = this.items.find(it => it.applyId == applyId)
            related && this.$set(related, 'btnBackAirSign', false)
            this.getData(false)
          } else {
            this.toast(errorMsg)
          }
        })
      },
      DePay (it) {
        this.confirm(() => this.DePayConfirm(it))
      },
      //  收回空中支付
      DePayConfirm ({planId, applyId}) {
        this.axios.post(DE_PAY_AIR, {planId, applyId}).then(({data: {success, errorMsg}}) => {
          if (success) {
            let related = this.items.find(it => it.applyId == applyId)
            related && this.$set(related, 'btnBackAirPay', false)
            this.getData(false)
          } else {
            this.toast(errorMsg)
          }
        })
      },
      confirm (callback) {
        this.$vux.confirm.show({
          title: '提示',
          confirmText: '确认',
          cancelText: '取消',
          content: '客户有可能正在操作中，请确认后再收回',
          onConfirm: callback
        })
      },
      toast (text) {
        this.$vux.toast.show({
          text: text,
          type: 'text',
          width: '50%',
          isShowMask: true
        })
      },
      Copy (plan, apply) {
        this.axios.post(PROGRESSCOPY, {planId: plan, applyId: apply}).then((response) => {
          if (response.data.success) {
            // 如果成功从新调用
            this.$vux.toast.show({
              text: `复制成功`,
              type: 'text',
              width: '50%',
              isShowMask: true
            })
            this.getData(false)
          } else {
            this.$vux.toast.show({
              text: response.data.errorMsg,
              type: 'text',
              width: '50%',
              isShowMask: true
            })
          }
        }).catch((err) => {
          console.log(err)
          throw new Error(err)
        })
      },
      onCancel () {
      },
      onConfirm () {
        this.axios.post(PROGRESSDEL, {planId: this.delpaln, applyId: this.delapply}).then((response) => {
          if (response.data.success) {
            this.getData(false)
          } else {
            this.$vux.toast.show({
              text: response.data.errorMsg,
              type: 'text',
              width: '50%',
              isShowMask: true
            })
          }
        }).catch((err) => {
          console.log(err)
          throw new Error(err)
        })
      },
      Dele (plan, apply) {
        this.confirmdiv = true
        this.delpaln = plan
        this.delapply = apply
//        this.axios.post(PROGRESSDEL, {planId: plan, applyId: apply}).then((response) => {
//          if (response.data.success) {
//            this.getData(false)
//          } else {
//            this.$vux.toast.show({
//              text: response.data.errorMsg,
//              type: 'text',
//              width: '50%',
//              isShowMask: true
//            })
//          }
//        }).catch((err) => {
        //   throw new Error(err)
        //   console.log(err)
        // })

        let _this = this;
        if(this.confirmdiv == true){
          this.$vux.confirm.show({
            title:'提示信息',
            confirmext:'确认',
            canceltext:'取消',
            onCancel () {
              _this.onCancel();
            },
            onConfirm () {
              _this.onConfirm();
            }
          })
        }
      },
      Click (n) {
        this.$router.push({name: '/web/progressdetail', query: this.$router.query})
      }
    }
  }
  </script>

  <style lang='less' scoped>
  @import '../../../assets/styles/page.less';
  .page-progressbox{
    flex:1;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    .scrollList li{
      margin: 0;
      padding:0;
      display: block;
    }
    .scrollList {
      & > li:last-child {
        margin-bottom: 60;
      }
    }
    .msg {
      position: absolute;
      top: 10%;
    }
  }

  </style>
