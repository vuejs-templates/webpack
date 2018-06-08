<!--
      descript: 单选组件
        author: gongshuai
        param: props
        checked 选中状态
-->
<template>
  <div class="wrapper">
    <div class="radio">
      <div class="radio-index" v-if="typeof(index) === 'number'">{{index+1}}.</div>
      <div class="radio-text">{{item.text}}</div>
      <div class="radio-button" @click="check()" v-show="radioShow" :class="{actno: !seled}">
        <span :class="{active: seled}">是</span>
        <span :class="{active: !seled}">否</span>
      </div>
      <!-- <div @click="aa">1111111111111</div> -->
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        nseled: this.checked
      }
    },
    created () {
      this.submitValue()
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
      checked: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      checked (Val, oldVal) {
        this.seled = Val
      }
    },
    computed: {
      seled: {
        get: function () {
          console.log('get')
          return this.nseled
        },
        set: function (v) {
          console.log('set')
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
      submitValue () {
        // console.log(`this.seled=${this.seled}`)
        this.$emit('input', {"no": this.index, "seled": this.seled})
      },
      check () {
        this.seled = !this.seled
        this.submitValue()
      }
    }
  }
</script>

<style lang='less' d>

  .wrapper {
    background-color: #ffffff;
    width: 100%;
    .radio {
      display: flex;
      .radio-index {
        margin-right: rem-calc(3);
        color: #999999;
      }
      .radio-text {
        flex: 1;
        line-height: rem-calc(20);
        align-self: center;
      }
      .radio-button {
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
        border: 1px solid #cfd0d1;
        & > :first-child {
          border-right: 1px solid #cfd0d1;
        }
        .active {
          color: #ffffff;
          background-color: #cfd0d1;
        }
      }
    }
  }
</style>
