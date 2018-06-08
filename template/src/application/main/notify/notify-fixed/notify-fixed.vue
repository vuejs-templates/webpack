<!--
  告知模快组装页面
  -- simon,2018.05.21
-->
<template>
  <div class="notify-container">
    <div v-for="(item,key) in notifyList" class="each-answer" :key="key+'notifyson'">
      <notifyModel1 v-if="item.name=='1' || item.name=='5' || item.name=='6'|| item.name=='7'|| item.name=='8'|| item.name=='9'|| item.name=='11'||item.name=='14'|| item.name=='15'|| item.name=='16'" :index="key+1" :eachNotify="item">
      </notifyModel1>
      <notifyModel2 v-if="item.name=='2'" :index="key+1" :eachNotify="item"></notifyModel2>
      <notifyModel3 v-if="item.name=='3'" :index="key+1" :eachNotify="item"></notifyModel3>
      <notifyModel15 v-if="item.name=='4'" :index="key+1" :eachNotify="item"></notifyModel15>
      <notifyModel16 v-if="item.name=='10'||item.name=='s6'" :index="key+1" :eachNotify="item"></notifyModel16>
      <notifyModel5 v-if="item.name=='12'" :index="key+1" :eachNotify="item"></notifyModel5>
      <notifyModel6 v-if="item.name=='13'" :index="key+1" :eachNotify="item"></notifyModel6>
      <!--<notifyModel7 v-if="" :index="key+1" :eachNotify="item"></notifyModel7>-->
      <notifyModel8 v-if="item.name=='17'" :index="key+1" :eachNotify="item"></notifyModel8>
      <notifyModel9 v-if="item.name=='18'||item.name=='19'||item.name=='s1'||item.name=='s2'||item.name=='s3'||item.name=='s4'||item.name=='s5'" :index="key+1" :eachNotify="item"></notifyModel9>
      <!--<notifyModel10 v-if="item.name=='s12'" :index="key+1" :eachNotify="item"></notifyModel10>-->
      <!--<notifyModel11 v-if="item.name=='s6'" :index="key+1" :eachNotify="item"></notifyModel11>-->
      <notifyModel12 v-if="item.name=='s7'" :index="key+1" :eachNotify="item"></notifyModel12>
      <notifyModel13 v-if="item.name=='s8'" :index="key+1" :eachNotify="item"></notifyModel13>
      <notifyModel14 v-if="item.name=='s9'" :index="key+1" :eachNotify="item"></notifyModel14>
    </div>
  </div>
</template>

<script>
import { GETNOTIFY } from '@/api'
import notifyModel1 from '../notify-template/notify-model1.vue'
import notifyModel2 from '../notify-template/notify-model2.vue'
import notifyModel3 from '../notify-template/notify-model3.vue'
import notifyModel4 from '../notify-template/notify-model4.vue'
import notifyModel5 from '../notify-template/notify-model5.vue'
import notifyModel6 from '../notify-template/notify-model6.vue'
import notifyModel7 from '../notify-template/notify-model7.vue'
import notifyModel8 from '../notify-template/notify-model8.vue'
import notifyModel9 from '../notify-template/notify-model9.vue'
import notifyModel10 from '../notify-template/notify-model10.vue'
import notifyModel11 from '../notify-template/notify-model11.vue'
import notifyModel12 from '../notify-template/notify-model12.vue'
import notifyModel13 from '../notify-template/notify-model13.vue'
import notifyModel14 from '../notify-template/notify-model14.vue'
import notifyModel15 from '../notify-template/notify-model15.vue'
import notifyModel16 from '../notify-template/notify-model16.vue'
export default {
  name: 'notify',
  data() {
    return {
    }
  },
  created() {
  },
  props: ['notifyList'],
//watch:{
//	notifyList: {  
//　　　　handler(newValue, oldValue) {  
//　　　　　　for (let i = 0; i < newValue.length; i++) {  
//　　　　　　　　if (oldValue[i] != newValue[i]) {  
//　　　　　　　　　　console.log(newValue)  
//　　　　　　　　}  
//　　　　　　}  
//　　　　},  
//　　　　deep: true  
//　　}
//},
  methods: {
    //获取用户录入结果，校验,校验不通过返回空，否则返回完整数据
    getImpartValidate() {
      let errorMsg = ''
      let submitData = []
      for (var i = 0; i < this.$children.length; i++) {
        let chl = this.$children[i]
        let tempResult = chl.validate && chl.validate()
        if (tempResult && tempResult.status) {
          errorMsg = tempResult.msg
          break;
        }
        submitData.push(tempResult)
      }
      if (errorMsg) {
        this.$vux.toast.show({
          text: errorMsg,
          type: 'text',
          width: '50%',
          isShowMask: true
        })
        return
      }
      return submitData
    },
    //获取用户录入结果，不校验
    getImpartData() {
      let errorMsg = ''
      let submitData = []
      for (var i = 0; i < this.$children.length; i++) {
        let chl = this.$children[i]
        let tempResult = chl.validate && chl.validate()
        if (tempResult.status) {
          submitData.push(tempResult.inputData)
        } else {
          submitData.push(tempResult)
        }
      }
      return submitData
    }
  },
  components: {
    notifyModel1, notifyModel2, notifyModel3, notifyModel4, notifyModel5, notifyModel6, notifyModel7, notifyModel8, notifyModel9, notifyModel10,notifyModel11,
    notifyModel12,notifyModel13,notifyModel14,notifyModel15,notifyModel16
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
