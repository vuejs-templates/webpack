
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-04-11 17:42
 * Filename      : bluebutton.vue
 * Description   : 蓝色底部按钮

********************************************************************-->

<template>
  <div class='blue-btn-content'>
    <button @click='onBtClick' :class="{'blue-btn': true,'disabled': isDisabled}">{{ val }}<slot></slot></button>
  </div>
</template>

<script>
  export default {
    name: 'c_button',
    props: ['val', 'linkUrl', 'disabled'],
    computed: {
      isDisabled () {
        return this.disabled
      }
    },
    methods: {
      onBtClick: function () {
        if (this.isDisabled) return
        this.$emit('Click')
      }
    }
  }
</script>

<style lang='less' >
  .blue-btn-content {
    text-align:center;
    .blue-btn {
      @include button;
      background-color: #00a4ff ;
    }
    .disabled {
      background-color: #c0c0c0;
    }
  }

</style>
