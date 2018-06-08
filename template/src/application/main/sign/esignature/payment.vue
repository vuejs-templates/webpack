<!--
 电子签名-支付信息
-->
<template>
  <div class="page-signature-payment subject-coco">
    <slot name="title">
      <za-title>支付信息
        <!--<span class="pay-tips">{{dynamicTips}}</span>-->
      </za-title>
    </slot>
    <section class="form-coco">
      <div class="group-input">
        <label>缴费方式</label>
        <input type="text" v-model="chargeType" readonly>
      </div>
      <div class="group-input">
        <label>支付方式</label>
        <div class="picker" v-if="payTypeSelectable">
          <popup-picker
            :data="payTypeList"
            placeholder="请选择支付方式"
            v-model="payType"
            show-name/>
        </div>
        <input v-else type="text" :value="payTypeName" readonly>
        <input type="hidden" :value="model.payType" name="payType" v-validate:payType.initial="'required'" data-vv-as="请选择支付方式">
      </div>
      <div class="group-input">
        <label>开户名</label>
        <input type="text" placeholder="请填写开户名" v-model="accountName" data-vv-as="请填写开户名"
               name="accountName" v-validate:accountName.initial="'required|username|checkUser|usernameLength'" readonly>
      </div>
      <div class="group-input">
        <label>开户银行</label>
        <div class="picker">
          <popup-picker placeholder="请选择开户银行" v-model="bank" :data="dynamicBankList" show-name />
          <input type="hidden" :value="model.bank" name="bank" v-validate:bank.initial="'required'" data-vv-as="请选择开户银行">
        </div>
        <span class="photo" @click="scanBankCard" v-if="inApp">
            <img src="~@/assets/styles/images/sign/camera.png">
          </span>
      </div>
      <div class="group-input">
        <label>银行账号</label>
        <input type="text" placeholder="请填写银行账号" v-validate:account.initial="'required|bankcard'" data-vv-as="请填写银行账号"
               :value="account|number|bankCard" @change="updateAccount" name="account" maxlength="23" class="warn">
      </div>
      <div class="group-input">
        <label>支付金额</label>
        <input type="text" placeholder="请填写支付金额" v-model="charge" readonly>
        <span class="unit">元</span>
      </div>
      <div class="group-input">
        <label>手机号码</label>
        <input type="text" :value="mobile|number" @change="updateMobile" name="mobile"
               data-vv-as="请填写手机号码" v-validate:mobile.initial="'required|mobile'" maxlength="11">
      </div>
      <div class="group-input">
        <p class="pay-tips">{{dynamicTips}}</p>
      </div>
    </section>
  </div>
</template>
<script>
  import { zaTitle,PopupPicker } from 'vformer'
  import clone from '@/widget/util/clone'
  import equals from '@/widget/util/equals'
  import {GET_BANK_LIST} from '@/api'

  export default {
    name: 'payment',
    components: {
      zaTitle,PopupPicker
    },
    model: {
      event: 'update',
      prop: 'model'
    },
    props: {
      model: {
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
      }
    },
    data () {
      return {
        // model的镜像，因为连续发射update事件时，后续的model可能已经不是最新的了，视图不应直接使用该数据
        cache: null,
        chargeType: '银行转账', // 固定的，现在就只有一个选项
        bankList: [],
        payTypeList: [[{value: '0', name: '实时扣款'}, {value: '1', name: '批量扣款'}]]
      }
    },
    computed: {
      // 支付方式
      payType: {
        get () {
          const {payType} = this.model
          return payType ? [payType] : ['0']
        },
        set ([payType]) {
          this.update({payType})
        }
      },
      dynamicTips: {
        get () {
          if (!this.bank[0]) return
          let tips = ''
          const [payType] = this.payType
          let singleAmount = ''
          let dayAmount = ''
          let bank = (this.dynamicBankList[0] || []).find((item) => {
            return item.value === this.bank[0]
          })
          if (!bank) return
          singleAmount = payType === '0' ? bank.singleAccSingleLimit0 : bank.singleAccSingleLimit1
          dayAmount = payType === '0' ? bank.singleAccSingleDayLimit0 : bank.singleAccSingleDayLimit1
          tips = `该银行单账户单笔限额${singleAmount}, 单账户单日限额${dayAmount}`
          return tips
        }
      },
      dynamicBankList: {
        get () {
          const [payType] = this.payType
          const [bankList] = this.bankList
          return bankList ? [bankList.filter(it => it.payType.indexOf(payType) > -1)] : []
        }
      },
      payTypeName: {
        get () {
          const [payType] = this.payType
          return this.payTypeList[0].find(it => it.value === payType).name
        }
      },
      payTypeSelectable: {
        get () {
          return this.model.payTypeSelect
        }
      },
      // 开户户主名
      accountName: {
        get () {
          return this.model.accountName
        },
        set (accountName) {
          this.update({accountName})
        }
      },
      // 开户银行
      bank: {
        get () {
          const {bank} = this.model
          return bank ? [bank] : []
        },
        set ([bank]) {
          this.update({bank})
        }
      },
      // 银行账号
      account: {
        get () {
          return this.model.account
        },
        set (account) {
          account = account.replace(/\D/g, '')
          this.update({account})
        }
      },
      // 支付金额
      charge: {
        get () {
          return this.model.totalPremium
        },
        set (totalPremium) {
          this.update({totalPremium})
        }
      },
      // 手机号码
      mobile: {
        get () {
          return this.model.mobile
        },
        set (mobile) {
          this.update({mobile})
        }
      }
    },
    watch: {
      'errors.errors' (to, from) {
        if (equals(to, from)) return
        this.$emit('validation', clone(this.errors.errors))
      }
    },
    created () {
      this.getBanks().then(() => {
        this.$validator.validateAll().then(null, () => {
          // just do nothing.
        })
      })
    },
    methods: {
      // 获取银行卡列表
      getBanks () {
        return this.axios.get(GET_BANK_LIST).then(({data: {success, value, errorMsg}}) => {
          if (!success) {
            this.toast(errorMsg)
            return Promise.reject(errorMsg)
          }
          this.bankList = [value.dictItemList.map(({
            code: value,
            desc: name,
            payType,
            issueId,
            type = 'bank',
            singleAccSingleDayLimit0,
            singleAccSingleDayLimit1,
            singleAccSingleLimit0,
            singleAccSingleLimit1
          }) => ({
            name,
            value,
            type,
            payType,
            issueId,
            singleAccSingleDayLimit0,
            singleAccSingleDayLimit1,
            singleAccSingleLimit0,
            singleAccSingleLimit1
          }))]
          return Promise.resolve(value)
        })
      },
      toast (text) {
        this.$vux.toast.show({
          type: "text",
          width: '200px',
          text
        })
      },
      // 扫描银行行
      scanBankCard () {
        window.getBank().then(res => {
          // cardInfo里： card_number银行卡号，issuer银行类别, type银行卡类别（借记卡or信用卡）
          const cardInfo = JSON.parse(res)
          const bankName = cardInfo['issuer']
          const issueId = cardInfo['issuer_id']
          const bank = this.dynamicBankList[0].find(bank => bank.issueId === issueId)
          if (bank) {
            this.account = cardInfo.card_number
            this.bank = [bank.value]
            this.form.cardImgUrl = cardInfo.cardImgUrl
          } else {
            this.toast(`暂不支持${bankName}${cardInfo.type}`)
          }
        }).catch(console.error)
      },
      updateAccount (e) {
        this.account = e.target.value
      },
      updateMobile (e) {
        this.mobile = e.target.value
      },
      // 发起事件同步数据到父组件中
      update (append) {
        // 当连续地emit update event时，后续创建更新payload时可能model数据还没有更新，因此这里要使用快速缓存 this.cache
        const cached = !!this.cache
        let model = clone(cached ? this.cache : this.model)
        for (let key in append) {
          model[key] = append[key]
        }
        this.cache = clone(model)
        this.$emit('update', model)
      }
    }
  }
</script>

<style lang=less>
  .page-signature-payment {
    input.warn{
      color: red !important;
    }
    .pay-tips {
      font-size: 11px;
      line-height: 18px;
      padding: 14px 15px 14px 0;
      color: #00b0ff;
      width: 100%;
    }
    .form-coco {
      background-color: white;
      padding-left: 15px;
      font-size: 14px;
      [readonly], [disabled] {
        background-color: white;
      }
      .group-input > input{
        box-sizing: border-box;
        display: block;
        text-align: right;
        line-height: 24px;
        border-radius: 2px;
        border: 0 none;
        padding: 10px 15px;
        color: #999;
        &:focus{
          outline: 0 none;
        }
        &:active{
          background-color: white;
        }
      }
      .group-input {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 0;
        >input[type=text] {
          flex: 1;
          font-size: inherit;
          font-weight: 400;
        }
        >label{
          max-width: 120px;
          word-break: break-all;
          line-height: 20px;
          margin-right: 5px;
          padding-top: 5px;
          padding-bottom: 5px;
          font-weight: 400;
        }
      }
      .group-input + .group-input::before {
        position: absolute;
        content: ' ';
        height: 1px;
        z-index: 1;
        left: 0;
        right: 0;
        top: 0;
        background-color: #D9D9D9;
        transform: scaleY(0.5);
      }
      .group-input:nth-last-child(1) + .group-input:nth-last-child(1)::after {
        position: absolute;
        content: ' ';
        height: 1px;
        z-index: 1;
        left: 0;
        right: 0;
        top: 0;
        background-color: #D9D9D9;
        transform: scaleY(0.5);
      }
      .picker{
        flex: 1;
        position: relative;
        z-index: 0;
      }
      .photo{
        width: 55px;
        height: 44px;
        display: flex;
        border-left: 1px solid #efefef;
        img{
          display: block;
          width: 25px;
          height: 20px;
          margin: auto;
        }
      }
      .unit{
        color: #999;
        margin-right: 15px;
        margin-left: -13px;
      }
    }
    .tips {
      font-size: 12px;
      line-height: 20px;
      color: #00b0ff;
      margin: 15) 15) 0;
    }
    input::-webkit-input-placeholder{
      color: #999;
      font-weight: 300;
    }
  }
  .weui-cell_access  {
  	margin-right:15px;
	.weui-cell__ft{
	   padding-right:10px;
       &:after{
  	    content: " ";
	    display: inline-block;
	    height: 8px;
	    width: 8px;
	    border-width: 1px 1px 0 0;
	    border-color: #999;
	    border-style: solid;
	    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	    top: -2px;
	    position: absolute;
	    top: 50%;
	    margin-top: -4px;
	    right: 2px;
  	  }
	}    
  }
</style>

