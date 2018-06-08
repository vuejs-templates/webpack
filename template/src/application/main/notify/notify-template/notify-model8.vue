<!--
  * 
  * @Author: simon
  * @Date:   2018-05-22 10:15:40
  * @Last Modified by:   
  * @Last Modified time: 
  * 告知模板1:題目有是否、下面每个小标题有是否和原因，最多到ptitlec
  * "state": "o",
  * reason："",
        "statea": "o",
        "reasona": "",
-->
<template>
  <div class="qtype qtype1_pages">
    <div :class="['question-container',currentData.pform.state]">
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
      <div class="textarea">
        <textarea v-model="currentData.pform.reason" :placeholder="currentData.placeholdera"></textarea>
      </div>
    </div>
    <div :class="['question-container',currentData.pform.statea]">
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData.ptitlea}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','A')">是</span>
          <span class="no"  @click="checkYesNo('no','A')">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea v-model="currentData.pform.reasona" :placeholder="currentData.placeholderb"></textarea>
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
    checkYesNo (type, row) {
      if(row === 'A'){
        if(type==='yes'){
          this.currentData.pform.statea = 'y'
        }
        if(type==='no'){
          this.currentData.pform.statea = 'n'
        }
      }else{
        if(type==='yes'){
          this.currentData.pform.state = 'y'
        }
        if(type==='no'){
          this.currentData.pform.state = 'n'
        }
      }
    },
    validate () {
      let pform = this.currentData && this.currentData.pform
      let errors = this.currentData && this.currentData.errors
      if(pform){
        if(pform.state === 'o'){
          return {status:true,inputData:this.eachNotify,msg:errors['state']}
        }
        if(pform.state === 'y' && !pform.reasona){
            return {status:true,inputData:this.eachNotify,msg:errors['reasona']}
          }
        if(pform.hasOwnProperty('statea')){
          if(pform.statea === 'o'){
            return {status:true,inputData:this.eachNotify,msg:errors['statea']}
          }
          if(pform.statea === 'y' && !pform.reasona){
            return {status:true,inputData:this.eachNotify,msg:errors['reasona']}
          }
        }
      }
      return this.eachNotify
    }
  }
}
</script>
