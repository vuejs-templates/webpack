<!--
  一个特定样式的复选框
  暂不支持组合使用
-->
<template>
  <i class="hq-checkbox" :class="{active: checked}">
    <input type="checkbox" :checked="checked" @change="update">
  </i>
</template>
<script>
  export default {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    methods: {
      update (e) {
        this.$emit('change', e.target.checked)
      }
    }
  }
</script>
<style lang=less>
  .hq-checkbox {
    position: relative;
    top: 3px;
    display: inline-block;
    background-color: #999;
    width: 16px;
    height: 16px;
    line-height: 16px;
    border-radius: 2px;
    margin-right: 6px;
    &:before {
      content: ' ';
      display: block;
      border-bottom: 2px solid #ffffff;
      border-left: 2px solid #ffffff;
      width: 16px;
      height: 8px;
      transform: rotate(-45deg) scale(.8);
    }
    [type=checkbox] {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      width: 16px;
      height: 16px;
      margin: 0;
    }
    &.active {
      background-color: #6dc54f;
    }
  }
</style>
