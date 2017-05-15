<template>
  <div id="app">
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
      <swiper-slide class="swiper-item">
        <Index></Index>
      </swiper-slide>
    </swiper>
    <i class="icon icon_arrow_up animated infinite fadeInUp"></i>
    <Share :mshare="mshare"></Share>
  </div>
</template>

<script>
import $ from 'jquery'
import Bus from 'Script/bus.js'
import Index from 'Src/components/Index.vue'
import Share from 'Src/components/Share.vue'

export default {
  name: 'app',
  data () {
    return {
      swiperOption: {
        initialSlide: 0,
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: false,
        spaceBetween: 30,
        mousewheelControl: true
      },
      mshare: {
        title: '母乳之旅 遇见最美的自己',
        desc: '妈妈网母乳喂养日特别策划就要发车啦，赶紧上车，一起来体验下神奇的母乳之旅吧~',
        image: 'https://act.mama.cn/cms/2017/medela/dist/static/share.jpg',
        link: window.location.href,
        zt_id: 59
      }
    }
  },
  components: {
    Index,
    Share
  },
  mounted () {
    // 注册 EventBus
    Bus.$on('customMethod', (msg) => {
    })
  }
}
</script>

<style lang="scss">
@import './assets/style/common.scss';
@import './assets/style/swiper.scss';

.icon_arrow_up {
  position: fixed;
  z-index: $zindex-fixed;
  bottom: 50px;
  left: 46%;
  width: 54px;
  height: 28px;
  background: url('./assets/images/icon_arrow_up.png');
  background-size: contain;
}
</style>
