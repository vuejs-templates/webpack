<template>
  <div class="hq-sign-batch-xxs">
    <iframe class="frame-sign-xxs" :src="src" ref="frame"></iframe>
  </div>
</template>
<script>
  import dateFormat from '@/widget/util/dateFormat'
  export default {
    name: 'anySign',
    props: {
      info: Object
    },
    data () {
      return {
        // 每次加载改一个戳，牺牲性能换取避免错误的缓存命中
        // 同一天使用同一个指纹，如果一天内会再次命中缓存(如果开启了的话)
        src: `/static/anySign/index.html?date=${dateFormat(new Date(), 'yyyy-MM-dd')}`
      }
    },
    mounted () {
      const win = this.$refs.frame.contentWindow
      win.addEventListener('load', () => {
        win.commitSign(this.info, value => {
          this.$emit('finish', value)
        })
        win.document.querySelector('#comment_cancel').addEventListener('click', () => {
          this.$emit('finish', null)
        })
      })
    }
  }
</script>
<style lang=less>
  .hq-sign-batch-xxs{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
    background-color: white;
    iframe{
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
  }
  @media screen and (orientation : portrait) {
    .hq-sign-batch-xxs{
      transform: rotateZ(90deg);
      transform-origin: left top;
      top: 0;
      left: 100%;
      width: 100vh;
      height: 100vw;
    }
  }
</style>
