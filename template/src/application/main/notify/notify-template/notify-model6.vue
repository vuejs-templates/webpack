<!--
  * 
  * @Author: simon
  * @Date:   2018-05-22 10:15:40
  * @Last Modified by:   
  * @Last Modified time: 
  * 告知模板6:題目没有是否、下面每个小标题有是否和原因，最多到ptitleh,其中a是一个输入项
  * 少儿告知
-->
<template>
  <div class="qtype qtype1_pages">
    <div class="question-container y">
      <div class="title">
        <p class="index">{{index<9?('0'+index+'. '):(index+'. ')}}</p>
        <p class="title-text">
          {{currentData.ptitle}}
        </p>
        <!--<div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','')">是</span>
          <span class="no"  @click="checkYesNo('no','')">否</span>
        </div>-->
      </div>
      <div class="textarea">
               出生时体重为<input v-model="currentData.pform.reason" class="short-input" maxlength="4" />周。
      </div>
    </div>
    <div :class="['question-container',currentData.pform[itemN+'state']]" v-for="(itemN,keyN) in forData">
      <div class="title">
        <p class="index">{{itemN.toUpperCase()+'. '}}</p>
        <p class="title-text">
          {{currentData['ptitle'+itemN]}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes',itemN)">是</span>
          <span class="no"  @click="checkYesNo('no',itemN)">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea v-model="currentData.pform[itemN+'reason']" :placeholder="currentData.placeholdera"></textarea>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentData:this.eachNotify.props||{},
      forData:['a','b']
    }
  },
  name: 'notify-model1',
  props: ["index", "eachNotify"],
  methods: {
    checkYesNo (type, row) {
      if(type==='yes'){
        this.currentData.pform[row+'state'] = 'y'
      }
      if(type==='no'){
        this.currentData.pform[row+'state'] = 'n'
      }
    },
    validate () {
      let pform = this.currentData && this.currentData.pform
      let errors = this.currentData && this.currentData.errors
      if(pform){
//      if(pform['state'] === 'o'){
//        return {status:true,inputData:this.eachNotify,msg:errors['state']}
//      }
        if(!pform['reason']){
          return {status:true,inputData:this.eachNotify,msg:errors['reason']}
        }
        for(var i=0;i<this.forData.length;i++){
          if(pform.hasOwnProperty(this.forData[i]+'state')){
            if(pform[this.forData[i]+'state'] === 'o'){
              return {status:true,inputData:this.eachNotify,msg:errors[this.forData[i]+'state']}
            }
            if(pform.hasOwnProperty(this.forData[i]+'reason') && pform[this.forData[i]+'state'] === 'y' && !pform[this.forData[i]+'reason']){
              return {status:true,inputData:this.eachNotify,msg:errors[this.forData[i]+'reason']}
            }
          }
        }
      }
      return this.eachNotify
    }
  }
}
</script>
<style lang='less'>
  .question-container{
    .title{
      margin-top:10px;
    }
    .short-input{
      border: none;
      outline: none;
      border-bottom: 1px solid #e7e7e7;
      padding-left:5px;
      &:focus{
        border: none;
        outline: none;
        border-bottom: 1px solid #e7e7e7;
      }
    }
  }
</style>
