<!--
      descript: 税收居民
        author: xiangzhi
        param:

-->
<template>
  <div class="page-birth-adress">
    <div class="birthtitle">投保人出生地址</div>
    <div class="main">
      <div class="baseBoxLeft"><label class="input-label">同现居住地址</label></div>
      <div class="baseBoxright atop">
        <div class="radio">
          <div class="radio-button">
            <span :class="{active: isBirth === 'Y'}" @click="check(true)">是</span>
            <span :class="{active: isBirth === 'N'}" @click="check(false)">否</span>
          </div>
        </div>
      </div>
    </div>
    <form-unit
      v-if="isBirthAddr==='N'"
      :formModels="birthAdrModels"
      :formRules="birthAdrRules"
      @formChange="onChange">
    </form-unit>
  </div>
</template>

<script>
  import formUnit from '@/components/unit/form-unit'

  // models
  import $$birthAdrModels from './model/birth_address_model'
  import $$birthAdrRules from './model/birth_address_rule'
  export default {
    name: 'taxBirthAdress',
    components: {
      formUnit
    },
    data () {
      return {
        birthAdrModels: this.birthModels,
        birthAdrRules: $$birthAdrRules,
        isBirth: ''
      }
    },
    props: {
      birthModels: {
        type: Object,
        default () {
          return {}
        }
      },
      isBirthAddr: {
        type: String,
        default () {
          return 'Y'
        }
      }
    },
    // props: ['birthModels', 'isBirthAddr']
    created () {
      window.bt = this
      // this.$emit('birthFormChange', this.form)
    },
    watch: {
      birthModels (v) {
        this.birthAdrModels = v
      },
      birthAdrModels (v) {
        // console.warn('xxxxx', v)
        this.birthAdrModels = v
      },
      isBirthAddr (v) {
        this.isBirth = v
      }
    },
    methods: {
      chooseClause () {
        this.selected = !this.selected
      },
      onChange (v) {
        // this.updateForm(v)
        this.$emit('birthFormChange', v)
      },
      check (val) {
        // console.log(qqq)
        if (this.isBirth === 'Y') {
          if (val) {
            this.isBirth = 'Y'
          } else {
            this.isBirth = 'N'
            this.birthAdrModels = $$birthAdrModels
          }
        } else {
          if (val) {
            this.isBirth = 'Y'
          } else {
            this.isBirth = 'N'
          }
        }
        this.$emit('onBirthAddr', this.isBirth)
      }
    }
  }

</script>
<style lang='scss' rel="stylesheet/scss" scoped>
@import '~@/assets/scss/function';
  .page-birth-adress {
    margin-top: rem-calc(15);
    background-color: #fff;
    .birthtitle {
      padding-left: rem-calc(15);
      line-height: rem-calc(45);
      color: #999;
      font-size: rem-calc(30/2px);
      @include borderbottom-1px(#efefef);
    }
    .main{
      display: flex;
      align-items: center;
      margin-left: rem-calc(15);
      @include borderbottom-1px(#efefef);
      .baseBoxLeft{
        line-height:1.6;
      }
    }
    .radio {
      display: flex;
      align-items: top;
      .radio-button {
        margin-top: rem-calc(4);
        display: flex;
        height: rem-calc(25);
        overflow: hidden;
        width: rem-calc(70);
        margin-left: rem-calc(21);
        align-items: center;
        border: 1px solid #00a5ff;
        border-radius: 5px;
        margin-right: rem-calc(15);
        & > span {
          flex: 1;
          text-align: center;
          color: #999999;
          padding: rem-calc(6) 0;
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
  }

</style>
