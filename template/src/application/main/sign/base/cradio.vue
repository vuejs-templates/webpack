<!--
      descript: 单选组件
        author: gongshuai
        param: props

-->
<template>
  <div class="radio-button"  :class="[seled == 'y' ? 'active' : seled == 'n' ? 'actno' : '']">
    <span @click.self="seledcheck('y')">是</span>
    <span @click.self="seledcheck('n')">否</span>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        seled: this.checked
      }
    },
    created () {
    },
    props: ['checked'],
    computed: {
      seled: {
        get: function () {
          return this.checked
        },
        set: function (val) {
          this.seled = val
        }
      }
    },
    watch: {
      'checked' () {
        return (this.seled = this.checked)
      }
    },
    methods: {
      seledcheck (n) {
        // this.seled = this.seled == "o" ? "y" : "n"
        // if (this.seled == "o") {
        //   this.seled = "y"
        // } else if (this.seled == "y") {
        //   this.seled = "n"
        // } else {
        //   this.seled = "y"
        // }
        console.warn(n)
        this.seled = n
        this.$emit('input', this.seled)
      }
    }
  }
</script>
<style lang='less' >
  .radio-button {
    display: flex;
    height: rem-calc(25);
    overflow: hidden;
    width: rem-calc(70);
    margin-left: rem-calc(21);
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    & > span {
      flex: 1;
      text-align: center;
      color: #999999;
      padding: rem-calc(6) 0;
    }
    & > :first-child {
      border-right: 1px solid #ddd;
    }
    &.active {
      border: 1px solid #00a5ff;
      & > :first-child {
        border-right: 1px solid #00a5ff;
        background-color: #00a5ff;
        color: #ffffff;
      }
    }
    &.actno {
      border: 1px solid #00a5ff;
      & > :last-child {
        border-right: 1px solid #00a5ff;
        background-color: #00a5ff;
        color: #ffffff;
      }
    }
  }
</style>
