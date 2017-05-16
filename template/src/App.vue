<template>
  <div id="app">
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
      <swiper-slide class="swiper-item">
        <Index></Index>
      </swiper-slide>
    </swiper>
    <i class="icon icon_arrow_up animated infinite fadeInUp"></i>
    <Share :mshare="mshare"></Share>
    <Music :src="mp3"></Music>
  </div>
</template>

<script>
// import $ from 'jquery'
import Bus from 'Script/bus.js'
import Index from 'Src/components/Index.vue'
import Share from 'Src/components/Share.vue'
import Music from 'Src/components/Music.vue'

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
        title: '自定义标题',
        desc: '自定义描述',
        image: 'https://act.mama.cn/cms/2017/medela/dist/static/share.jpg',
        link: window.location.href,
        zt_id: 0
      },
      mp3: require('./assets/audio/bg.mp3')
    }
  },
  components: {
    Index,
    Share,
    Music
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
