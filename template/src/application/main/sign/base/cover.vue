<!--
  功能：为一个交互流程添加一个封面页（或者说“准备页”）
  直到准备页点击开始了后，这段交互流程方才开始
  被当前组件装饰的这段交互流程，以默认插槽的方式传递进来

  该组件内包含一个CSS animation动画
-->

<template>
  <div class="vue-cover">
    <slot v-if="ready"></slot>
    <ui-bg v-else :src="bgImage" :hasBox="false">
      <span class="shadow-start animation-breath"></span>
      <a @click.prevent="start" class="start">开始</a>
    </ui-bg>
  </div>
</template>

<script>
  import uiBg from './bg.vue'
  export default {
    name: 'cover',
    props: {
      bgImage: String //  封面页使用的背景图
    },
    data: function () {
      return {
        ready: false
      }
    },
    components: {uiBg},
    methods: {
      start () {
        this.ready = true
        this.$emit('start')
      }
    }
  }
</script>

<style lang='less' >
  /* 定义一个动画的一组关键帧，该动画产生一种类似于呼吸的效果 */
  @keyframes breath {
    from {
      width:rem-calc(120);
      height:rem-calc(120);
      background-color: rgba(188,231,254, 0);
    }
    to {
      width:rem-calc(140);
      height:rem-calc(140);
      background-color: rgba(188,231,254, 0.9);
    }
  }

  /*开始按钮及其背景后的装饰环。因为在开始按钮上使用动画将导致运算过量致使UI失帧，故这里将其动画部分挪出来以阴影背景的方式实现*/
  .shadow-start,
  .start{
    font-weight: 700;
    position: absolute;
    display: block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
  .start{
    line-height: rem-calc(120);
    height: rem-calc(120);
    width: rem-calc(120);
    color: white;
    background-color: #00abff;
    text-align: center;
    font-size: rem-calc(24);
    letter-spacing: rem-calc(12);
    text-indent: rem-calc(12);
  }
  .animation-breath{
    animation: breath 1.6s infinite;
    animation-timing-function: ease-out;
    animation-direction: alternate;
  }
</style>
