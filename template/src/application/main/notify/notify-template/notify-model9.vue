<!--
  * 
  * @Author: simon
  * @Date:   2018-05-22 10:15:40
  * @Last Modified by:   
  * @Last Modified time: 
  * 告知模板9:
  * "firststate": "o",
        "firstreason": ""
        ["secondstate"]: "o",
        ["secondreason"]: ""
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
          <span class="yes" @click="checkYesNo('yes','first')">是</span>
          <span class="no"  @click="checkYesNo('no','first')">否</span>
        </div>
      </div>
      <div class="textarea" v-if="currentData.pform.hasOwnProperty('firstreason')">
        <textarea v-model="currentData.pform.firstreason" :placeholder="currentData.placeholdera"></textarea>
      </div>
    </div>
    <div :class="['question-container',currentData.pform.secondstate]">
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData.ptitle1}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','second')">是</span>
          <span class="no"  @click="checkYesNo('no','second')">否</span>
        </div>
      </div>
      <div class="textarea" v-if="currentData.pform.hasOwnProperty('seconddetail')">
        请告知各保险合同约定的被保险人死亡给付的保险金额总和：<input v-model="currentData.pform.seconddetail" type="number" class="short-input" />万元。
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
    checkYesNo (type,pre) {
      if(type==='yes'){
        this.currentData.pform[pre+'state'] = 'y'
      }
      if(type==='no'){
        this.currentData.pform[pre+'state'] = 'n'
      }
    },
    validate () {
      let pform = this.currentData && this.currentData.pform
      let errors = this.currentData && this.currentData.errors
      if(pform){
        if(pform.firststate === 'o'){
          return {status:true,inputData:this.eachNotify,msg:errors['firststate']}
        }else if(pform.firststate === 'y'){
          if(pform.hasOwnProperty('firstreason') && !pform.firstreason){
            return {status:true,inputData:this.eachNotify,msg:errors['firstreason']}
          }
        }
        if(pform.secondstate === 'o'){
          return {status:true,inputData:this.eachNotify,msg:errors['secondstate']}
        }else if(pform.secondstate === 'y'){
          if(pform.hasOwnProperty('seconddetail') && !pform.seconddetail){
            return {status:true,inputData:this.eachNotify,msg:errors['seconddetail']}
          }
        }
      }
      return this.eachNotify
    }
  }
}
</script>
