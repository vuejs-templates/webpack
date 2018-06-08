<!--
      descript: 税收居民
        author: xiangzhi
        param:

-->
<template>
  <div class="page-tax-info">
    <div v-for="(item, index) in areas" class="tax-info">
      <div class="taxtitle">税收信息
        <span v-if="areas.length > 1">{{index+1}}</span>
        <span class="del" v-if="areas.length > 1" @click="del(index)"></span>
      </div>
      <div class="tax_country">
        <div class="taxlabel">税收居民国（地区）</div>
        <root-input
          @formChange="ctrChange"
          @formPassed=""
          :rules="{vRules: 'required', maxlength: 10, placeholder: '中文', toUpperCase: false}"
          :value="item.taxCountry"
          :index="index"
          name="taxCountry">
        </root-input>
      </div>
      <div class="group-switch">
        <span>纳税人识别号</span>
        <hq-switch v-model="areas[index].hasTaxPayerId" :map="{Y:'有',N:'无'}"/>
      </div>
      <div class="tax_code" v-if="item.hasTaxPayerId==='Y'">
        <root-input
          @formChange="ctrChange"
          @formPassed=""
          :rules="rules"
          :value="item.taxPayerId"
          :index="index"
          name="taxPayerId">
        </root-input>
      </div>
      <div class="tax_reason" v-if="item.hasTaxPayerId==='N'">
        <div class="reason_exp">请选择原因：</div>
        <checker-list :options="[{key: '1', value: '居民国（地区）不发放纳税人识别码'}, {key: '2', value: '账户持有人未能取得纳税人识别码'}]" :type="'radio'" :position="'left'" v-model="areas[index].reasonType"/>
        <textarea-item
          v-show="item.reasonType==='2'"
          @formChange="ctrChange"
          :rules="{toUpperCase: false, vRules: 'required', maxlength: 250, placeholder: '请输入未能取得纳税人识别号的具体原因'}"
          :value="item.reason"
          :index="index"
          name="reason">
          </textarea-item>
      </div>
    </div>
    <div class="add_tax" @click="add">
      <i class="add_icon"></i>
      <span class="add_txt">增加税收居民国（地区）</span>
    </div>
    <confirm
      v-model="birthShow"
      :close-on-confirm="false"
      content="确认删除该税收信息吗？"
      confirmText='确定'
      cancelText='点错了'
      @on-confirm="birthDel"
      ></confirm>
  </div>
</template>

<script>
  import {Confirm} from 'vux'
  import formUnit from '@/components/unit/form-unit'
  import rootInput from '@/components/root-items/root-input'
  import textareaItem from "@/components/item/textarea-item"
  import checkerList from '@/components/item/checker/checker-list2.vue'
  import hqSwitch from '@/components/base/hq-switch.vue'
  import clone from '@/widget/util/clone.js'
  import {toast} from '@/widget/util/currying.js'

  // models
  import birthAdrModels from './model/birth_address_model'
  import birthAdrRules from './model/birth_address_rule'
  export default {
    name: 'taxInfo',
    components: {
      formUnit,
      rootInput,
      checkerList,
      hqSwitch,
      textareaItem,
      Confirm
    },
    data () {
      return {
        delIndex: '',
        birthShow: false,
        taxIndex: '',
        value: '1',
        form: {},
        rules: {
          toUpperCase: false,
          vRules: 'required',
          maxlength: 20,
          placeholder: '请输入纳税人识别号'
        }
      }
    },
    props: {
      taxAreas: {
        type: Array,
        default () {
          return []
        }
      }
    },
    created () {
      this.birthShow = false
    },
    computed: {
      areas: {
        get () {
          return this.taxAreas
        },
        set (areas) {
          this.$emit('onTaxAreas', clone(areas))
        }
      },
      clauseValue () {
        return this.selected ? 1 : null
      }
    },
    methods: {
      toast,
      add () {
        let areas = clone(this.areas)
        if (areas.length > 1) {
          this.toast('最多添加两条税收信息')
          return
        }
        areas.push({
          taxCountry: '',
          hasTaxPayerId: 'Y',
          taxPayerId: '',
          reasonType: '',
          reason: ''
        })
        this.areas = areas
      },
      birthDel () {
        this.areas = this.areas.filter((it, id) => id !== this.delIndex)
      },
      ctrChange ({value, name, index}) {
        this.areas[index][name] = value
      },
      codeChange (v) {
        if (this.taxIndex !== '') {
          this.areas[this.taxIndex].taxPayerId = v.value
        }
      },
      resChange (v) {
        if (this.taxIndex !== '') {
          this.areas[this.taxIndex].reason = v.value
        }
      },
      del (index) {
        this.birthShow = true
        this.delIndex = index
        // this.$vux.confirm.show({
        //   title: '',
        //   content: '确认删除该税收信息?',
        //   confirmText: '确定',
        //   cancelText: '点错了',
        //   onConfirm: () => {
        //     this.areas = this.areas.filter((it, id) => id !== index)
        //   }
        // })
      },
      getIndex (e, i) {
        this.taxIndex = i
      },
      checkTaxPayerId ([reasonType]) {
        if (this.taxIndex !== '') {
          this.areas[this.taxIndex].reasonType = reasonType
        }
      },
      chooseClause () {
        this.selected = !this.selected
      },
      checkTax (val, i) {
        if (val) {
          this.areas[i].hasTaxPayerId = 'Y'
        } else {
          this.areas[i].hasTaxPayerId = 'N'
        }
      }
    }
  }

</script>
<style lang='scss' rel="stylesheet/scss" scoped>
@import '~@/assets/scss/function';
  .page-tax-info {
    font-size: rem-calc(15px);
    margin-top: rem-calc(15);
    /deep/ .weui-dialog {
      border-radius: rem-calc(10px);
      // width: rem-calc(260px);
      // height: rem-calc(113px);
      .weui-dialog__bd {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: rem-calc(70px);
        font-size: rem-calc(15px);
        padding: 0;
      }
      .weui-dialog__ft {
        .weui-dialog__btn {
          color: #00a5ff;
          font-size: rem-calc(15px);
        }
      }
    }
    .tax-info {
      background-color: #fff;
    }
    .taxtitle {
      position: relative;
      padding-left: rem-calc(15);
      line-height: rem-calc(45);
      color: #999;
      font-size: rem-calc(30/2px);
      @include borderbottom-1px(#efefef);
      .del {
        display: inline-block;
        width: rem-calc(45);
        height: rem-calc(45);
        position: absolute;
        top: 0;
        right: 0;
        background: url('~@/assets/image/tax/del.png') no-repeat;
        -webkit-background-size: cover;
        background-size: 40%;
        background-position: center center;
        color: #00b0ff;
      }
    }
    .tax_country, .tax_code {
      min-height: rem-calc(45);
      line-height: rem-calc(45);
      display: flex;
      align-items: center;
      margin-left: rem-calc(15);
      @include borderbottom-1px(#efefef);
    }
    .tax_code {
      /deep/ .rootInput {
        text-align: left;
        &::-webkit-input-placeholder {
          text-align: left;
        }
      }
    }
    .group-switch {
      font-size: rem-calc(14);
      display: flex;
      background-color: white;
      justify-content: space-between;
      align-items: center;
      line-height: rem-calc(25);
      padding: rem-calc(8) rem-calc(15);
      @include borderbottom-1px(#efefef);
      & > span {
        font-size: rem-calc(15px);
      }
    }
    .tax_reason {
      margin-left: rem-calc(15);
      /deep/ .checker-list-item {
        .ui-cell {
          .checkbox:not(:checked) + label, .checkbox:checked + label {
            line-height: rem-calc(45);
            font-size: rem-calc(15px);
            padding-right: rem-calc(15);
            color: #666;
          }
        }
      }
      /deep/ .detail {
        display: none;
      }
      /deep/ .reason_exp {
        color: #999;
        margin-left: rem-calc(15);
        font-size: rem-calc(15px);
        line-height: rem-calc(45);
        @include borderbottom-1px(#efefef);
      }
      /deep/ .ui-cell {
        .checkbox {
          position: absolute;
          left: -9999px;
          cursor: pointer;
          font-size: rem-calc(15px);
          display: flex;
          line-height: rem-calc(45);
        }
      }
      /deep/ .ui-cell {
        &:last-child {
          background-size: 0;
        }
      }
      /deep/ .weui-textarea-counter {
        display: none;
      }
      .textarea {
        /deep/ .weui-textarea {
          margin-left: rem-calc(45);
          width: 80%;
          box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          -webkit-appearance:none;
          padding: rem-calc(10) rem-calc(10);
        }
      }
    }
    .add_tax {
      min-height: rem-calc(45);
      line-height: rem-calc(45);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: rem-calc(10);
      background-color: #fff;
      font-size: 16px;
      color: #00a5ff;
      .add_icon {
        display: inline-block;
        width: rem-calc(20);
        height: rem-calc(20);
        padding-right: rem-calc(15);
        position: relative;
        &:before {
          content: ' ';
          display: inline-block;
          width: rem-calc(20);
          height: rem-calc(2);
          background-color: #00a5ff;
          position: absolute;
          top: rem-calc(9);
          left: 0;
        }
        &:after {
          content: ' ';
          display: inline-block;
          width: rem-calc(2);
          height: rem-calc(20);
          background-color: #00a5ff;
          position: absolute;
          top: 0;
          left: rem-calc(9);
        }
      }
    }
  }

</style>
