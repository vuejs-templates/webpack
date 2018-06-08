<!--
  功能：为一个组件X装饰一个背景图
  组件X以作为当前组件的默认插槽的形式传递进来
  当前组件接收一个参数 src , 作为背景图的URL来源
  设计时，预期到的业务场景是组件X居中，背景图铺满整个视口
  并且，当前组件预期放入一个已经被撑开的盒子中，而非一个高度自适应的盒子，而App.vue等都具有这个能力

  @param src {String} <required> 图片路径
  @param hasBox {Boolean} <optional> 默认为false  是否要为包裹进来的组件创造一个居中的盒子
  当前组件创建盒子的开销大于子组件自己创建，而且，子组件一般习惯于自己创建，所以默认不创建

  也可以不传递进参数src,并传递参数hasBox为true，这样将创建一个居中的盒子

  实现中时，
  背景图实现的效果类型于CSS中的background-position:cover
  但是，不应采用CSS来实现这个效果。
  因为，这是结构层决定要这样一个业务图片，而非样式层决定要这样一个装饰图片。
  该图片也将被视作resource，而非image。
  另外，使用image来实现有一个好处，也就是当前组件可以通过优化具备更强的能力，比如：
  视差滚动，预加载 等

  当图片高度足够时，图片会水平铺满，垂直方向溢出的部分被裁剪
  当图片高度不够时，图片会垂直方向上铺满，水平方向上，多余的部分左右各裁剪50%
-->
<template>
  <div class="vue-bg">
    <img :src="src" @load="load($event)" :class="{fix}" alt=" " v-if="src">
    <slot name="header"></slot>
    <div class="box-default" v-if="hasBox">
      <slot></slot>
    </div>
    <slot v-else></slot>
    <slot name="footer"></slot>
  </div>
</template>
<script>
  export default {
    name: 'bg',
    props: {
      src: String,
      hasBox: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        fix: false
      }
    },
    methods: {
      load (e) {
        let {naturalWidth, naturalHeight} = e.target
        let {clientWidth, clientHeight} = document.documentElement
        //  如果背景图片的长宽比小于视口的长宽比，图片将更改为垂直方向平铺，水平方向溢出
        //  图片默认为水平方向平铺，垂直方向溢出
        if (naturalWidth / naturalHeight > clientWidth / clientHeight) {
          this.fix = true
        }
      }
    }
  }

</script>
<style lang='less' >
  .vue-bg{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    > img{
      position: absolute;
      display: block;
      width: 100%;
      height: auto;
      z-index: -1;
      &.fix{
        width: auto;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    > .box-default{
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, rem-calc(-80));
      float:left;
    }
  }
</style>
