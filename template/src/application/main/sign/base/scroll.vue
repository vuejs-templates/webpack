<!--
      author: xx
        name: c_scroll
    descript: 父元素必须为display:flex 滚动区域为flex 内容padding-bottom:10px 当滚动到底部会提升10px

      @event: Scroll 滚动时触发 间隔 500毫秒
  -->
<script>
export default{
  data () {
    return {
      scrollToTop: 0,
      status: true
    }
  },
  name: 'c_scroll',
  template: `<div  class="scroll_component"  ref="scrollContain">
              <slot></slot>
             </div>`,
  watch: {
    scrollTo: function (val, oldval) {
      this.scrollToTop = val
      this.$refs.scrollContain.scrollTop = this.scrollToTop
    }
  },
  mounted: function () {
    let contain = this.$refs.scrollContain
    let _self = this
    contain.addEventListener('scroll', function (e) {
      requestAnimationFrame(() => {
        if (_self.status) {
          _self.status = false
          let timeout
          timeout = setTimeout(function () {
            _self.status = true
            clearTimeout(timeout)
            _self.$emit('Scroll', {
              "scrollHeight": e.target.scrollHeight,
              "scrollTop": e.target.scrollTop,
              "scrollZoneHeight": e.target.offsetHeight,
              "scrollElement": e.target
            })
          }, 500)
        }
      })
    })
  }
}
</script>
<style lang='less' >
.scroll_component {
    padding-bottom:10px;
    position: relative;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-perspective: 1000;
    perspective: 1000;
    &:hover {
        will-change: scroll-position;
    }
    flex: 1;
}
</style>
