<!--
  * 
  * @Author: simon
  * @Date:   2018-05-22 10:15:40
  * @Last Modified by:   
  * @Last Modified time: 
  * 告知模板7国外告知
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
      <div class="left-25">
                 居住时间
        <input placeholder="请输入居住时间" v-model="currentData.pform.firstreason" class="short-input" type="number" />个月
      </div>
      <div class="textarea left-25">
        <div>居住国家或地区</div>
        <textarea v-model="currentData.pform.firstdetail" :placeholder="currentData.placeholdera"></textarea>
      </div>
    </div>
    <div :class="['question-container',currentData.pform.secondstate]" >
      <div class="title">
        <p class="index">{{'A. '}}</p>
        <p class="title-text">
          {{currentData['ptitle1']}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','second')">是</span>
          <span class="no"  @click="checkYesNo('no','second')">否</span>
        </div>
      </div>
      <div class="textarea left-25">
        <div>居住的国家或地区</div>
        <textarea v-model="currentData.pform.secondreason[0]" placeholder="请详细居住的国家或地区"></textarea>
                目的地
        <textarea v-model="currentData.pform.secondreason[1]" placeholder="请详细居住的国家或地区"></textarea>
      </div>
      <div class="left-25">
                 居住时间
        <input placeholder="请输入居住时间" v-model="currentData.pform.seconddetail" class="short-input" type="number" />个月
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
        if(pform['firststate'] === 'o'){
          return {status:true,inputData:this.eachNotify,msg:errors['firststate']}
        }
        if(pform['firststate'] === 'y'){
          if(!pform['firstreason']){
            return {status:true,inputData:this.eachNotify,msg:errors['firstreason']}
          }
          if(!pform['firstdetail']){
            return {status:true,inputData:this.eachNotify,msg:errors['firstdetail']}
          }
        }
        if(pform['secondstate'] === 'o'){
          return {status:true,inputData:this.eachNotify,msg:errors['secondstate']}
        }
        if(pform['secondstate'] === 'y'){
          if(!pform['secondreason']){
            return {status:true,inputData:this.eachNotify,msg:errors['secondreason']}
          }
          if(!pform['seconddetail']){
            return {status:true,inputData:this.eachNotify,msg:errors['seconddetail']}
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
    .left-25{
      margin-left: 25px;
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
