<!--
  * 
  * @Author: simon
  * @Date:   2018-05-22 10:15:40
  * @Last Modified by:   
  * @Last Modified time: 
  * 告知模板1:題目有是否、下面有/无問題、选是后有原因
  * 题目状态有未选、选是、选否，只能一级
-->
<template>
  <div class="qtype qtype1_pages">
    <div :class="['question-container',currentData.pform.firststate]">
      <div class="title">
        <p class="index">{{index<9?('0'+index+'. '):(index+'. ')}}</p>
        <p class="title-text">
          {{currentData.ptitle}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes')">是</span>
          <span class="no"  @click="checkYesNo('no')">否</span>
        </div>
      </div>
      <div class="main-detail">
        <div class="detail-row" v-for="(item, index) in currentData.pitems" :value="item.value" @click="checkItem(index,item.value)">
          <label :class="['checkbox',currentData.pform.firstdetail.indexOf(item.value)!==-1?'check':'']"></label>
          <p>{{item.title}}</p>
        </div>
      </div>
      <div class="textarea" v-if="currentData.pform.hasOwnProperty('firstreason')">
        <textarea v-model="currentData.pform.firstreason" maxlength="200" :placeholder="currentData.placeholdera"></textarea>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentData:this.eachNotify.props||{}
    }
  },
  name: 'notify-model1',
  props: ["index", "eachNotify"],
  methods: {
    checkYesNo (type) {
      if(type==='yes'){
        this.currentData.pform.firststate = 'y'
      }
      if(type==='no'){
        this.currentData.pform.firststate = 'n'
      }
    },
    checkItem (index, value) {
      if(this.currentData.pform.firststate === 'n'){
        this.currentData.pform.firststate = 'y'
      } else {
        let detail = this.currentData.pform.firstdetail
        if(detail){
          let arrIndex = detail.indexOf(value)
          arrIndex!==-1?this.currentData.pform.firstdetail.splice(arrIndex,1):this.currentData.pform.firstdetail.push(value)
        } else{
          this.currentData.pform.firstdetail = [value]
        }
        this.currentData.pform.firststate = 'y'
      }
    },
    validate () {
      let pform = this.currentData && this.currentData.pform
      let errors = this.currentData && this.currentData.errors
      if(pform){
        if(pform.firststate === 'o'){
          return {status:true,inputData:this.eachNotify,msg:errors['firststate']}
        }else if(pform.firststate === 'y'){
          //如果firstdetail\firstreason存在那么校验detail是否有值
          if((this.currentData.pitems) && (!pform.firstdetail || pform.firstdetail.length === 0)){
            return {status:true,inputData:this.eachNotify,msg:errors['firstdetail']}
          }
          if(pform.hasOwnProperty('firstreason') && !pform.firstreason){
            return {status:true,inputData:this.eachNotify,msg:errors['firstreason']}
          }
        }
      }
      return this.eachNotify
    }
  }
}
</script>
