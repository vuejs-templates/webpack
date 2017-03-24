<template>
  <div id="app">
    <loading :show="loading.status" :text="loading.text" position="absolute"></loading>
    <toast v-model="toast.show" type="text" :time="toast.time">{{toast.text}}</toast>
    {{#router}}
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view></router-view>
    </transition>
    {{/router}}
  </div>
</template>

<script>
import { Loading, Toast } from '@cvux'

export default {
  name: 'app',
  components: {
    Loading,
    Toast
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    direction () { // 场景动画切换方向
      return this.$store.state.direction
    },
    toast () {
      return this.$store.state.toast
    }
  }
}
</script>

<style lang="less">
  @import '~cvux/src/styles/reset';
</style>
