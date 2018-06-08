<!--
  税收居民
-->
<template>
  <div class="page-tax-dweller">
    <div class="tax-checker">
      <div class="header">
        <div class="title">
          <div class="name">投保人</div>
          <div class="taxcheck_content">{{applicantName}}</div>
        </div>
      </div>
      <checker-list :options="taxStatements" :type="'radio'" :position="'right'" v-model="taxType"></checker-list>
    </div>
    <form-unit
      :formModels="formModels"
      :formRules="formRules"
      @formChange="onChange">
      <template slot="birthAddress">
        <birth-form name="birthAddress"></birth-form>
      </template>
    </form-unit>
    <tax-info :taxAreas="taxAreas" @onTaxAreas="onTaxAreas"></tax-info>
    <div class="tips">
      <span class="icon" :class="{active: readSelected}" @click="chooseClause"></span>
      <span>本人确认上述信息的真实、准确和完整，且当这些信息发生变更时，将在30日内通知贵机构，否则本人承担由此造成的不利后果。</span>
      <input class="hiddenInput" type="hidden" name="clause" v-model.trim="clauseValue" v-validate data-vv-as="请同意营销员声明" data-vv-rules="required">
    </div>
    <div class="btn-wrapper">
      <btn class="btn-primary btn-block" @click.native="nextStep">提交</btn>
    </div>
  </div>
</template>

<script>
  import {APP_TAX_INFO, WX_TAX_INFO, APP_TAX_HOLD, WX_TAX_HOLD} from '@/api'
  import taxInfo from '@/application/tax-dweller/tax-info'
  import formUnit from '@/components/unit/form-unit'
  import checkerList from '@/components/item/checker/checker-list2.vue'
  import birthAddress from '@/application/tax-dweller/birth_address.vue'
  import dateFormat from '@/widget/util/dateFormat'
  import btn from '@/components/base/btn.vue'
  import birthForm from './birth-form'

  // models
  import formModels from './model/tax_dweller_model'
  import formRules from './model/tax_dweller_rule'
  import $$birthTemplate from './model/birth_address_model'
  export default {
    components: {
      formUnit,
      checkerList,
      birthAddress,
      taxInfo,
      btn,
      birthForm
    },
    props: {
      applyId: {
        type: [String, Number]
      },
      inApp: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        applicantName: '',
        formModels: formModels,
        formRules: formRules,
        formStatus: '',
        formErrors: '',
        birthFormErrors: [],
        isBirthValid: '',
        readSelected: false,
        birthForm: '',
        options: {},
        taxType: null,
        isBirthAddr: '',
        taxAreas: [],
        taxStatements: [{key: '1', value: '既是中国又是其他国家（地区）税收居民'}, {key: '2', value: '仅为非中国税收居民'}],
        isValid: true,
        birthTemplate: $$birthTemplate
      }
    },
    computed: {
      clauseValue () {
        return this.readSelected ? 1 : null
      }
    },
    created () {
      this.oninit()
    },
    methods: {
      onChange (val) {
        this.updateForm(val)
      },
      updateForm (val) {
        this.isValid = val.isValid
        // this.formModels = val.value
        this.formErrors = val.errorBag
        this.formStatus = val.status
        // TODO 想办法优化这段代码，formModel在初始化时的双向绑定部分未生效: web-select-item.vue
        this.$nextTick(() => {
          this.form = val.value
        })
      },
      onValid () {},
      oninit () {
        this.formRules = formRules
        this.readSelected = false
        const {inApp, applyId} = this
        this.getData(inApp ? APP_TAX_INFO : WX_TAX_INFO, {applyId})
      },
      onTaxAreas (v) {
        this.taxAreas = v
      },
      checkCountry (v) {
        this.taxTypeArray = v.target.key
      },
      getData (url, param) {
        this.axios.post(url, param).then(({data: {success, errorMsg, value}}) => {
          if (success && value) {
            this.applicantName = value.applicantName
            this.taxType = value.taxType
            this.taxAreas = value.taxAreas
            let baseInfo = value.basicApntInfo
            // baseInfo.birthday = dateFormat(baseInfo.birthday, 'yyyy-MM-dd')
            let currentAddress = value.currentAddress
            let birthAddress = value.birthAddress
            let _model = {}
            let _key = ''
            for (let k in birthAddress) {
              this.formRules.birthAddress.options[k].value = birthAddress[k]
            }
            this.formModels.birthAddress.value.yesorno = value.isBirthAddr || 'Y'
            for (let i in baseInfo) {
              // baseInfoModel.push({name: i, value: baseInfo[i]})
              this.$set(this.formModels, i, {
                name: i,
                value: baseInfo[i]
              })
            }
            for (let key in currentAddress) {
              this.$set(this.formModels, key, {
                name: key,
                value: currentAddress[key]
              })
              // baseInfoModel.push({name: key, value: currentAddress[key]})
            }
          }
          if (!success) {
            this.$vux.toast.show({
              text: errorMsg,
              type: 'text',
              width: '50%',
              isShowMask: true
            })
          }
        }).catch(console.error)
      },
      chooseClause () {
        this.readSelected = !this.readSelected
      },
      saveTaxInfo (url, param) {
        this.axios.post(url, param).then((res) => {
          if (res.data.success == true) {
//            window.gobackbtn()
            this.$emit('end', param)
          } else {
            this.$vux.toast.show({
              text: res.data.errorMsg,
              type: 'text',
              width: '50%',
              isShowMask: true
            })
          }
        }).catch((err) => {
          throw new Error(err)
        })
      },
      nextStep () {
        if (!this.isValid) {
          if (this.form.birthAddress.value.yesorno === 'Y') {
            this.__toast(this.formErrors[0].msg)
          } else {
            if (this.form.birthAddress.value.options.countryDesc.value === '') {
              this.__toast('投保人出生地' + this.form.birthAddress.value.options.countryDesc.label + '不能为空')
              return
            } else if (this.form.birthAddress.value.options.provinceDesc.value === '') {
              this.__toast('投保人出生地' + this.form.birthAddress.value.options.provinceDesc.label + '不能为空')
              return
            } else if (this.form.birthAddress.value.options.cityDesc.value === '') {
              this.__toast('投保人出生地' + this.form.birthAddress.value.options.cityDesc.label + '不能为空')
              return
            } else if (this.form.birthAddress.value.options.detail.value === '') {
              this.__toast('投保人出生地' + this.form.birthAddress.value.options.detail.label + '不能为空')
              return
            }
          }
        } else {
          let pass = false
          if (this.taxAreas.length > 1) {
            pass = this.taxAreas.every((item, index) => {
              let num = index + 1
              if (item.taxCountry === '') {
                // alert(index)
                this.__toast('税收信息' + num + '税收居民国（地区）')
                return false
              }
              if (item.hasTaxPayerId === 'Y' && item.taxPayerId === '') {
                this.__toast('税收信息' + num + '请输入纳税人识别号')
                return false
              }
              if (item.hasTaxPayerId === 'N' && item.reasonType === '') {
                this.__toast('税收信息' + num + '请选择原因')
                return false
              }
              if (item.hasTaxPayerId === 'N' && item.reasonType === '2' && item.reason === '') {
                this.__toast('税收信息' + num + '请输入未能取得纳税人识别号的具体原因')
                return false
              }
              return true
            })
          } else {
            pass = this.taxAreas.every((item, index) => {
              if (item.taxCountry === '') {
                // alert(index)
                this.__toast('税收信息税收居民国（地区）')
                return false
              }
              if (item.hasTaxPayerId === 'Y' && item.taxPayerId === '') {
                this.__toast('税收信息请输入纳税人识别号')
                return false
              }
              if (item.hasTaxPayerId === 'N' && item.reasonType === '2' && item.reason === '') {
                this.__toast('税收信息请输入未能取得纳税人识别号的具体原因')
                return false
              }
              return true
            })
          }
          if (!pass) return
          if (!this.readSelected) {
            this.__toast('请阅读条款')
            return
          }
          let options = {}
          if (this.form.birthAddress.value.yesorno === 'Y') {
            options = {
              applyId: this.applyId,
              taxType: this.taxType,
              isBirthAddr: this.form.birthAddress.value.yesorno,
              basicApntInfo: {
                firstName: this.form.firstName.value,
                familyName: this.form.familyName.value,
                birthday: this.form.birthday.value
              },
              currentAddress: {
                cityDesc: this.form.cityDesc.value,
                countryDesc: this.form.countryDesc.value,
                detail: this.form.detail.value,
                provinceDesc: this.form.provinceDesc.value
              },
              birthAddress: {
                cityDesc: '',
                countryDesc: '',
                detail: '',
                provinceDesc: ''
              },
              taxAreas: this.taxAreas
            }
          } else {
            options = {
              applyId: this.applyId,
              taxType: this.taxType,
              isBirthAddr: this.form.birthAddress.value.yesorno,
              basicApntInfo: {
                firstName: this.form.firstName.value,
                familyName: this.form.familyName.value,
                birthday: this.form.birthday.value
              },
              currentAddress: {
                cityDesc: this.form.cityDesc.value,
                countryDesc: this.form.countryDesc.value,
                detail: this.form.detail.value,
                provinceDesc: this.form.provinceDesc.value
              },
              birthAddress: {
                cityDesc: this.form.birthAddress.value.options.cityDesc.value,
                countryDesc: this.form.birthAddress.value.options.countryDesc.value,
                detail: this.form.birthAddress.value.options.detail.value,
                provinceDesc: this.form.birthAddress.value.options.provinceDesc.value
              },
              taxAreas: this.taxAreas
            }
          }
          if (this.inApp) {
            this.saveTaxInfo(APP_TAX_HOLD, options)
          } else {
            this.saveTaxInfo(WX_TAX_HOLD, options)
          }
        }
      }
    }
  }

</script>
<style lang='scss' rel="stylesheet/scss">
@import '~@/assets/scss/function';

  .page-tax-dweller {
    .form-unit {
      .form-block {
        background-color: #fff;
      }
      .form-row {
        // background-color: #fff;
        .head {
          background-color: #fff;
          .msg {
            color: #999;
            &:before {
              display: none;
            }
          }
        }
        .baseBox {
          background-color: #fff;
          .baseBoxLeft {
            // flex: 1;
            padding-right: rem-calc(15);
          }
        }
        .title {
          margin-top: rem-calc(15);
        }
      }
    }
  }
</style>
<style lang='scss' rel="stylesheet/scss" scoped>
@import '~@/assets/scss/function';
  .page-tax-dweller {
    @include fullpage;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #f7f7f7;
    .checker-list-item {
      background-color: #fff;
      /deep/ .ui-cell {
        .checkbox:not(:checked) + label, .checkbox:checked + label {
          line-height: rem-calc(45);
          font-size: rem-calc(15px);
        }
      }
    }
    /deep/.form-unit {
      .form-block {
        .baseBox {
          padding-bottom: 0;
          padding-top: 0;
          .main {
            .baseBoxLeft {
              line-height: rem-calc(45);
            }
            .atop {
              align-items: center !important;
            }
          }
        }
        .check-list {
          .baseBox {
            padding-left: 0;
          }
        }
      }
      .form-row {
        // background-color: #fff;
        .weui-cells {
          margin-top: 0;
          &:before, &:after {
            display: none;
          }
        }
      }
    }
    // .form-unit {
    //   /deep/ .form-row {
    //     background-color: #fff;
    //     /deep/ .head {
    //       background-color: #fff;
    //       /deep/ .msg {
    //         color: #ccc;
    //         &:before {
    //           display: none;
    //         }
    //       }
    //     }
    //     /deep/ .baseBox {
    //       background-color: #fff;
    //       /deep/ .baseBoxLeft {
    //         // flex: 1;
    //         padding-right: rem-calc(15);
    //       }
    //     }
    //     /deep/ .title {
    //       margin-top: rem-calc(15);
    //     }
    //   }
    // }
    .tax-checker {
      .header {
        // @include borderbottom-1px(#efefef);
        padding-left: rem-calc(15);
        background-color: #fff;
        .title {
          @include borderbottom-1px(#efefef);
          display: flex;
          min-height: rem-calc(45);
          line-height: rem-calc(45);
          .name {
            color: #999;
            font-size: rem-calc(15px);
            padding-right: rem-calc(10);
          }
          .taxcheck_content {
            font-size: rem-calc(15px)
          }
        }
      }
    }
    .tips {
      padding: rem-calc(15) rem-calc(15) 0 rem-calc(15);
      display: flex;
      span {
        color: #999;
        line-height: 1.5;
      }
      .icon {
        display: inline-block;
        background-color: #fff;
        min-width: rem-calc(16);
        height: rem-calc(16);
        line-height: rem-calc(16);
        text-align: center;
        border-radius: rem-calc(2);
        margin-right: rem-calc(8);
        border: 1px solid #ddd;
        box-sizing: border-box;
        &:before {
          content: ' ';
          display: block;
          width: rem-calc(16);
          height: rem-calc(8);
          transform: rotate(-45deg) scale(.8);
        }
        &.active {
          background-color: #6dc54f;
          border: 0;
          &:before {
            content: ' ';
            display: block;
            border-bottom: 2px solid #ffffff;
            border-left: 2px solid #ffffff;
            width: rem-calc(15);
            height: rem-calc(8);
            transform: rotate(-45deg) scale(.8);
          }
        }
      }

      &> :last-child {
        flex: 1;
        font-size: rem-calc(12);
        line-height: rem-calc(20);
        color: #00b0ff;
      }
    }
    .btn-wrapper {
      margin: rem-calc(25) rem-calc(15);
    }
  }
</style>
