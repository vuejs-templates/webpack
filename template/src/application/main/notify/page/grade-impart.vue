<!--
  分级告知
  -- simon,2018.05.28
-->
<template>
  <div class="notify-container">
    <div class="page__ft">
      <div class="weui-btn weui-btn_primary" @click="saveImpart(impartData.applyId)">下一步</div>
    </div>
  </div>
</template>

<script>
import { INITAPPLICANTANDINSURANTINFORM, SAVESINGLEINSURANTIMPART } from '@/api'
import notifyFixed from '../notify-fixed/notify-fixed.vue'
export default {
  name: 'notify-grade',
  data() {
    return {
      impartData: {}
    }
  },
  created() {
    this.getData(this.$route.query.applyId)
  },
  methods: {
    getData(applyId) {
      this.axios.post(INITAPPLICANTANDINSURANTINFORM, { applyId: applyId }).then(({ data }) => {

      })
    },
    nextStep() { }
  },
  components: {
    notifyFixed
  }
}
</script>
<style lang='less'>
@import "../../../../assets/styles/weui/widget/weui-button/weui-button";
@import "../../../../assets/styles/notify/notify.less";
.notify-container {
  padding-bottom: 50px;
  background: #efeff4;
  .page__ft {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
