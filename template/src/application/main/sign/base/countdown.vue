<template>
  <span class="hq-countdown-core">
    <slot :remain="remain" :on="on"></slot>
  </span>
</template>
<script>
  export default {
    name: 'countdown',
    props: {
      period: {
        type: Number,
        default: () => 120
      },
      tick: {
        type: Number,
        default: () => 1
      },
      on: {
        type: Boolean,
        default: () => false
      }
    },
    data () {
      return {
        remain: this.period,
        tid: null
      }
    },
    watch: {
      on (to, from) {
        if (from === false && to === true) {
          this.guard()
          this.start()
        }
      }
    },
    methods: {
      step () {
        this.remain -= this.tick
        if (this.remain < 0) {
          this.remain = 0
        }
        if (this.remain == 0) {
          this.guard()
          this.$emit('end')
        }
      },
      guard () {
        let {tid} = this
        if (tid != null) {
          window.clearInterval(tid)
          this.tid = null
        }
      },
      start () {
        this.remain = this.period
        let {tick} = this
        this.tid = window.setInterval(this.step, tick * 1000)
      }
    }
  }
</script>
<style>
  .hq-countdown-core{
    word-break: keep-all;
    flex: 1;
  }
</style>
