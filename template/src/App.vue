<template>
  {{#ProjectType}}
  <div id="wrapper" v-if="isShow">
    {{else}}
    <div id="wrapper">
    {{/ProjectType}}
    <h1>hello,world</h1>
    {{#router}}
    <router-view></router-view>
    {{/router}}
  </div>
</template>

<script>
  import Vue from 'vue'
  import base from 'assets/js/common'
  import {eventBus, MSG} from './events/systemEvent'
  export default {
    name: 'app',
    data () {
      return {
      {{#ProjectType}}
        isShow: true
      {{/ProjectType}}
      }
    },
    created () {
      {{#ProjectType}}
      if (base.isInSelfApp) {
        this.$appInterface.setPageName("抢钱风暴");
        if (!base.isLocal) {
          if (!this.$appInterface.isNetConnect()) {
            this.isShow = false;
            this.$appInterface.isWebHasError();
          }
        }
        eventBus.$on(eventMsg.CONNECTERROT, ()=> {
          console.log('connectError' + "报错信息");
          this.isShow = false;
          this.$appInterface.isWebHasError();
        });
      }
      {{/ProjectType}}
    },
    mounted () {
    }
  }
</script>

<style lang="Less">
  @import "assets/css/base.less";
</style>
