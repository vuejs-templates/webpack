<!--
  components: Mask
        name: mask

      @event:
       Click: 点击事件
      OnShow: 显示事件 触发自动为 body 添加 overflow:hidden
      OnHide: 隐藏事件 触发去除 body overflow:hidden 改为 空

      #props:
     bgcolor: 传递mask 层的background-color rgba
         max: true body.style.overflow = max ? hidden : ''

       &slot:

      author: xx

    example:
      <MaskLayer bgcolor="rgba(110,110,132,.5)" :show="pop_mask.show" @Click="toggleMask">
        <br/>this is maskLayer
      </MaskLayer>
-->
<template>
  <div class="mask" :style="{ backgroundColor: bgcolor }" @click="maskClick">
      <slot>lsldllsdldsllsdl</slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  name: 'c_mask',
  props: [
    'bgcolor', 'show', 'max'
  ],
  created: function () {
    this.toggle(this.show)
  },
  watch: {
    show (n) {
      this.toggle(n)
    }
  },
  components: {

  },
  computed: {
  },
  methods: {
    maskClick () {
      this.$emit('Click')
    },
    toggle (n) {
      document.body.style.overflow = this.max ? 'hidden' : ''
    }
  }
}
</script>
<style lang='less' >
  $vue-gray:000;
  .mask {
    position: fixed;
    top:0%;left:0;right:0;bottom:0;
    background-color:rgba($vue-gray,$vue-gray,$vue-gray,.3);
    z-index: 999999999999;
  }
</style>
