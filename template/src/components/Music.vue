<template>
  <div class="wrap">
    <div :class="['audio', {disabled: !musicStatus}]" @click="toggleMusic"></div>
    <audio id="bgMusic" :src="src" autoplay loop></audio>
  </div>
</template>

<script>
// import $ from 'jquery'

export default {
  props: ['src'],
  data () {
    return {
      musicStatus: true
    }
  },
  mounted () {
    function audioAutoPlay (id) {
      var audio = document.getElementById(id)
      audio.play()
      document.addEventListener(
        'WeixinJSBridgeReady',
        function () {
          audio.play()
        },
        false
      )
    }
    audioAutoPlay('bgMusic')
  },
  methods: {
    toggleMusic () {
      var bgMusic = document.querySelector('#bgMusic')
      if (bgMusic.paused) {
        bgMusic.play()
      } else {
        bgMusic.pause()
      }
      this.musicStatus = !this.musicStatus
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/core/fn.scss';

.audio {
  position: fixed;
  z-index: $zindex-fixed;
  top: 25px;
  right: 25px;
  width: 44px;
  height: 44px;
  background: url('../assets/audio/music.png') no-repeat center center;
  background-size: contain;
  &.disabled {
    background: url('../assets/audio/music_disabled.png') no-repeat center center;
    background-size: contain;
  }
}

</style>
