<template>
  <div id="app">
    <loading :show="loading.status" :text="loading.text" position="absolute"></loading>
    <toast v-model="toast.show" type="text" :time="toast.time">
    {{#router}}
    <router-view :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"></router-view>
    {{else}}
    <hello></hello>
    {{/router}}
  </div>
</template>

<script>
import { Loading, Toast } from 'cvux/src/components'
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

<style>
  @import '~cvux/src/styles/reset';
  body {
    background-color: #fbf9fe;
  }
</style>
