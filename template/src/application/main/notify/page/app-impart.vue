<!--
  复杂告知页面
  -- simon,2018.05.28
-->
<template>
  <div class="notify-container">
    <div class="tabs" v-if="impartData.applicantImpart">
      <div class="tabs-content">
        <notifyFixed :notifyList="impartData.applicantImpart"></notifyFixed>
      </div>
    </div>
    <div class="page__ft">
      <div class="btn-next" @click="saveImpart(impartData.applyId)">下一步</div>
    </div>
  </div>
</template>

<script>
import { INITAPPLICANTANDINSURANTINFORM, SAVESINGLEAPPIMPART } from '@/api'
import notifyFixed from '../notify-fixed/notify-fixed.vue'
export default {
  name: 'notify-main',
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
        if (data.success && data.value.applicantImpart) {
          data.value.applicantImpart = JSON.parse(data.value.applicantImpart)
          this.impartData = data.value
        } else if (data.errorMsg) {
          this.$vux.toast.show({ text: data.errorMsg, type: 'text', width: '50%', isShowMask: true })
        }
      })
    },
    saveImpart(applyId) {
      let impartData = this.impartData
      let subData = {}
      let inputImpart = this.getChildImpartData()
      if (!inputImpart) {
        return
      }
      subData['applicantImpart'] = inputImpart
      subData['applyId'] = applyId
      this.axios.post(SAVESINGLEAPPIMPART, subData).then(({ data }) => {
        if (data.success) {
          //成功后保存告知到当前页面数据
          this.$router.push({name:'notify-insurant', query:this.$route.query})
        }else{
        	this.__toast(data.errorMsg)
        }
      })
    },
    // 获取子组件告知录入信息
    getChildImpartData() {
      for (var i = 0; i < this.$children.length; i++) {
        let chl = this.$children[i]
        let tempResult = chl.getImpartValidate && chl.getImpartValidate()
        if (tempResult) {
          return JSON.stringify(tempResult)
        }
      }
    }
  },
  components: {
    notifyFixed
  }
}
</script>
<style lang='less'>
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
