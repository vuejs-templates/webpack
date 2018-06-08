<!--
      descript: 单选组件
        author: gongshuai
        param: props
        checked 选中状态
-->
<template>
  <div class="announcement_warp">
    <div class="radio">
      <div class="radio-index" v-if="typeof(index) === 'number'">{{index+1}}.</div>
      <div class="radio-text">{{item.text}}</div>
      <div class="radio-button" v-show="radioShow" :class="{actno: !seled}">
        <span :class="{active: seled}" @click="check(true)">是</span>
        <span :class="{active: !seled}" @click="check(false)">否</span>
      </div>
      <!-- <div @click="aa">1111111111111</div> -->
    </div>
    <div class="radioTextarea" v-if = "toggle ? !seled : seled">
      <textarea maxlength="400"
      style="-webkit-appearance: none"
      @change = 'changeinput'
      :disabled="toggle ? seled : !seled"
      v-model.trim = "inputTxt"
      class="reasonarea"
      placeholder="请详述"></textarea>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        nseled: this.checked,
        inputTxt: this.reason
      }
    },
    created () {
      this.changeinput()
    },
    props: {
      item: {
        type: Object,
        default: function () {
          return {}
        }
      },
      index: '',
      radioShow: {
        type: Boolean,
        default: true
      },
      toggle: {
        type: Boolean,
        default: false
      },
      checked: {
        type: Boolean,
        default: false
      },
      reason: {
        type: String,
        default: ''
      }
    },
    watch: {
      checked (Val, oldVal) {
        this.seled = Val
      },
      reason (val, oldVal) {
        this.inputTxt = val
      }
    },
    computed: {
      seled: {
        get: function () {
          // console.log('get')
          return this.nseled
        },
        set: function (v) {
          // console.log('set')
          this.nseled = v
          this.submitValue()
        }
      }
    },
    methods: {
      // aa () {
      //   console.log(this.seled)
      //   console.log(this.checked)
      // },
      changeinput () {
        // debugger
        this.$emit('input', {"no": this.index, "seled": this.seled, "inputTxt": this.inputTxt})
      },
      submitValue () {
        // console.log(`this.seled=${this.seled}`)
        // debugger
        // this.$emit('input', {"no": this.index, "seled": this.seled, "inputTxt": this.inputTxt})
      },
      check (n) {
        this.seled = n
        this.changeinput()
      }
    }
  }
</script>

<style lang='less'  scoped>
  @import '~@/assets/scss/function';
  .announcement_warp {
    background-color: #ffffff;
    width: 100%;
    .radioTextarea{
      padding: rem-calc(15px) rem-calc(5px) 0 rem-calc(15px);
      .reasonarea{
        width: 100%;
        font-size: rem-calc(15px);
        height: rem-calc(100px0);
        outline: none;
      }
    }
    .radio-button.actno > :last-child{
      border-right: 1px solid #00a5ff !important;
    }
    .radio {
      display: flex;
      .radio-index {
        margin-top: rem-calc(4);
        margin-right: rem-calc(3);
        color: #999999;
      }
      .radio-text {
        flex: 1;
        align-self: center;
        font-size: rem-calc(16px);
        color: #333 !important;
        line-height: rem-calc(27) ;
      }
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
      & .radio-button.actno {
        border: 1px solid #00a5ff;
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
