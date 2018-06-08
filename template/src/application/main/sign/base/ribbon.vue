<!--
  为一个块状元素在边角绑上缎带
  一般位置只会有左上和右上，没有左下和右下，所以，这里简化位置为左和右
  如果有特殊场景需要在左下或者右下绑定，再添加一个reverse参数并设置为true进行扩展
  缎带的旋转角度都是45deg，该组件会自动计算旋转点和垫底背景色的位置和尺寸

  @param slogan {String} <required> 标语，即缎带上的文本
    从设计上来说不是必填，但从业务上来说是必填的
    即然调用该组件，那么就是期望为某个组件（通过slot插槽指定）绑一个缎带，那么调用时就应该带上该参数
    如果该参数为空，则绑缎带功能静默失败，其它一切休提

  @param position {String} <optional> 缎带的放置位置
    可选的值有 left , right，默认为 left

  @param reverse {Boolean} <optional> 是否反转，默认为 false
    这里反转是指位置由左上、右上分别切换成左下、右下
    组件的调用参数 position 和 reverse 组合起来决定了 ribbon的位置
    position:'left',reverse:false 时，位于左上（这也是默认位置）
    position:'right',reverse:false 时，位于右上
    position:'left',reverse:true 时，位于左下
    position:'right',reverse:true 时，位于右下

  @param rs {Object} <optional> 样式的配置对象，该对象里主要包含三个参数： {fontSize, lineHeight, padding}
    rs即ribbon style的意思，这里不能使用属性名style，
    因为使用他时，组件无法得知这是传给组件的props之一，还是为这次的组件调用额外赋予一个层叠样式
    rs有一个默认值，但是，当调用时只设置rs中的一项时，该项并不会和其它的默认项合并（merge）
    （然而，rs的确可以只设置其中任意一项）
    其中，fontSize控制字体大小，默认为 10px
    lineHeight决定标语的行高和高度，默认为 12px
    宽度由lineHeight、<param>slogan</param>的长度、padding决定
    这里假定了缎带中的标语全是中文，中文一个字体的长宽比这里视作1：1，所以lineHeight这里视作单位字体的宽度
    box-sizing保持为content-box,
    padding 默认为 0，padding的值只应用到左右内边距上，并不会应用到上下内边距上，这里像设定行内元素一样地设定样式
    另外，需要注意的是，内部元素有旋转和缩放，chrome需要对应的DOM元素表现为块状元素

  @param bg {String} <optional> 缎带垫底的背景色，默认为 rgba(0,0,0,0.5)
    可以为任一合理的颜色值

  @param baseSize {Number} <optional> 基准字体大小，默认为 12 (即12px)
    它定义了一个阀值，小于该值将通过启用缩放的方式辅助字体表现得像它设置的那样
    标语习惯性地被设置为较小的字体
    chrome 最小仅能支持12px的字体，所以偶尔可能需要为小于12px的字体通过启用缩放达到预期的视觉效果
-->
<template>
  <div class="box-ribbon">
    <slot></slot>
    <span v-if="slogan" v-once class="ribbon-bg" :class="[position,{reverse}]" :style="backStyle"></span>
    <span v-if="slogan" v-once class="ribbon-slogan" :class="[position,{reverse}]" :style="frontStyle">
      <template v-if="scale===1">{{slogan}}</template>
      <em v-else :style="innerStyle">{{slogan}}</em>
    </span>
  </div>
</template>
<script>
  export default {
    name: 'ribbon',
    props: {
      /**
       * 缎带的垫底的背景色
       */
      bg: {
        Type: String,
        default: () => 'rgba(0,0,0,0.5)'
      },
      /**
       * 缎带的位置
       * 可选的值： left, right
       */
      position: {
        Type: String,
        default: () => 'left'
      },
      /**
       * 是否反转上下
       * reverse 为 true 时，缎带将居于底部而非顶部
       */
      reverse: {
        Type: Boolean,
        default: () => false
      },
      /**
       * 缎带的标语
       * 使用时不应为空
       * 但为了更友好地使用，这里并没有设置 required: true
       */
      slogan: String,
      /**
       * 缎带样式（ ribbon style ）
       */
      rs: {
        Type: Object,
        default: () => ({
          lineHeight: 12,
          fontSize: 10,
          padding: 0
        })
      },
      /**
       * 基准大小，字体和行高与它有关，字体小于该值时将会启用缩放
       */
      baseSize: {
        Type: Number,
        default: () => 12
      }
    },
    computed: {
      /**
       * 缎带标语的字体大小
       */
      fontSize () {
        let {rs: {fontSize}, baseSize} = this
        return Math.max(fontSize, baseSize)
      },
      /**
       * 缎带的缩放比例
       * chrome 最小仅能支持12px的字体，为小于12px的字体通过启用缩放达到预期的视觉效果
       * 设置的字体大于或者等于12px时为scale为1，小于12px时启用缩放
       * 当字体为9时缩放比例为 0.75，其它以此类推
       * @returns {Number} 缩放比例，大于零，并且小于或者等于一
       */
      scale () {
        return this.rs.fontSize / this.fontSize
      },
      /**
       * 缎带标语的高度
       * 目前只处理汉字，汉字高度一般视作等于行度
       * 但优先使用配置项（如果有的话）
       */
      height () {
        return this.rs.lineHeight || this.fontSize
      },
      /**
       * 缎带标语的宽度
       * 目前认为缎带只包含汉字
       * 汉字长度比为1:1
       */
      width () {
        let {slogan: {length}, height, rs: {padding = 0}} = this
        return length * height + padding * 2
      },
      /**
       * 缎带标语的transform的CSS描述
       */
      transform () {
        let {position, reverse} = this
        let degree = this.getDegree({position, reverse})
        return `rotate(${degree})`
      },
      /**
       * 缎带标语的transform-origin的CSS描述
       */
      transformOrigin () {
        let {width, height, position, reverse, toRem} = this
        let {x, y} = this.getTransformOrigin(width)
        if (position === 'right') {
          x = width - x
        }
        if (reverse) {
          y = height - y
        }
        return `${toRem(x)} ${toRem(y)}`
      },
      /**
       * 缎带标语的内联style样式
       */
      frontStyle () {
        let {fontSize, width, height, transform, transformOrigin, toRem} = this
        return {
          fontSize: toRem(fontSize),
          width: toRem(width),
          height: toRem(height),
          lineHeight: toRem(height),
          transform,
          transformOrigin
        }
      },
      /**
       * 缎带的背景的内联style样式
       * 通过相临的两边（其中一边是透明的）绘制一个等腰三角形作为ribbon的垫底背景
       */
      backStyle () {
        let {width, height, bg, position, reverse, toRem, getSide} = this
        let sideLength = getSide({width, height})
        let colored = reverse ? 'bottom' : 'top'
        let transparent = position === 'left' ? 'right' : 'left'
        sideLength = toRem(sideLength)
        return {
          [`border-${colored}`]: `${sideLength} solid ${bg}`,
          [`border-${transparent}`]: `${sideLength} solid transparent`
        }
      },
      /**
       * <em>标签的内联style样式，当reverse为true时需要重置一下 transform-origin
       */
      innerStyle () {
        let {reverse, width, height, scale, toRem} = this
        let x = toRem(width * scale / 2)
        let y = toRem(height)
        let style = {
          transform: `scale(${scale})`
        }
        if (reverse) {
          style.transformOrigin = `${x} ${y}`
        }
        return style
      }
    },
    methods: {
      /**
       * 将一个像素值转为rem值
       * （有部分失真）
       */
      toRem: px => (px / 14).toFixed(3) + 'rem',
      /**
       * 计算缎带旋转的中心点（相对位置）
       * 即transform-origin(css旋转的中心点）的值
       * 该相对位置的值仅与宽度有关
       * @param width
       * @returns {{x: number, y: number}}
       */
      getTransformOrigin: width => {
        let x = width * (2 + Math.sqrt(2)) / 4
        let y = width * Math.sqrt(2) / 4
        return {x, y}
      },
      /**
       * 根据缎带位置和是否反转计算缎带的旋转角度
       * 顺时针为正，逆时针为负
       * 绝对值都是45deg
       * @param position {String} 缎带的位置
       * @param reverse {Boolean} 缎带是否由顶部反转到底部
       * @returns {string}  缎带的旋转角度的字符串表示（带有单位deg）
       */
      getDegree: ({position, reverse}) => {
        let map = {
          left: -45,
          right: 45
        }
        let degree = map[position] || 0
        return degree * (reverse ? -1 : 1) + 'deg'
      },
      /**
       * 根据缎带标语的布局长宽计算缎带的垫底背景的边长
       * @param width 缎带标语的布局宽度
       * @param height 缎带标语的布局长度
       * @returns {number} 缎带的垫底背景的边长
       */
      getSide: ({width, height}) => {
        return Math.sqrt(2) * width / 2 + Math.sqrt(2) * height
      }
    }
  }
</script>
<style lang='less' >
  .box-ribbon{
    position:relative;
    z-index:0;
    &::after{
      content: ' ';
      display: block;
      height: 0;
      clear: both;
    }
  }
  .ribbon-slogan{
    display:block;
    z-index:1;
    color: white;
    text-align: center;
    > em{
      display: block;
      font-weight: normal;
      font-style: normal;
      line-height: inherit;
      word-break: keep-all;
    }
  }
  .ribbon-slogan,
  .ribbon-bg{
    position: absolute;
    &.left{
      left: 0;
    }
    &.right{
      right: 0;
    }
    &.left,
    &.right{
      top: 0;
      &.reverse{
        top: initial;
        bottom: 0;
      }
    }
  }
</style>
