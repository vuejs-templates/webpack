<!--
  * 
  * @Author: simon
  * @Date:   2018-05-22 10:15:40
  * @Last Modified by:   
  * @Last Modified time: 
  * 告知模板1:題目无是否、下面每个小标题有是否和原因，子标题最多可到N
  * 2周岁及以下儿童补充告知：
-->
<template>
  <div class="qtype qtype1_pages">
    <div  :class="['question-container',currentData.pform['state']]">
      <div class="title">
        <p class="index">{{index<9?('0'+index+'. '):(index+'. ')}}</p>
        <p class="title-text">
          {{'2周岁及以下儿童补充告知：'}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('y','')">是</span>
          <span class="no"  @click="checkYesNo('n','')">否</span>
        </div>
      </div>
      <div class="textarea">
              出生时体重为<input class="short-input" maxlength="2" v-model="currentData.pform['detail']" />公斤？
      </div>
    </div>
    <div :class="['question-container',currentData.pform['astate']]" >
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData['ptitlea']}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('y','a')">是</span>
          <span class="no"  @click="checkYesNo('n','a')">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea v-model="currentData.pform['areason']" maxlength="200" :placeholder="currentData.placeholdera"></textarea>
      </div>
    </div>
    <div :class="['question-container',currentData.pform['bstate']]" >
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData['ptitleb']}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('y','b')">是</span>
          <span class="no"  @click="checkYesNo('n','b')">否</span>
        </div>
      </div>
      <div class="textarea">
          <textarea v-model="currentData.pform['breason']" maxlength="200" :placeholder="currentData.placeholderb"></textarea>
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
  name: 'notify-model4',
  props: ["index", "eachNotify"],
  methods: {
    checkYesNo (type, row) {
    	this.currentData.pform[row+'state'] = type
    },
    validate () {
      let pform = this.currentData && this.currentData.pform
      let errors = this.currentData && this.currentData.errors
      if(pform){
      	if(pform['state'] === 'o'){
	        return {status:true,inputData:this.eachNotify,msg:errors['state']}
	      }
	      if(pform['state'] === 'y' && (!pform['detail'])){
	        return {status:true,inputData:this.eachNotify,msg:errors['detail']}
	      }
      	if(pform['astate'] === 'o'){
	        return {status:true,inputData:this.eachNotify,msg:errors['astate']}
	      }
	      if(pform['astate'] === 'y' && (!pform['areason'])){
	        return {status:true,inputData:this.eachNotify,msg:errors['areason']}
	      }
	      if(pform['bstate'] === 'o'){
	        return {status:true,inputData:this.eachNotify,msg:errors['bstate']}
	      }
	      if(pform['bstate'] === 'y' && (!pform['breason'])){
	        return {status:true,inputData:this.eachNotify,msg:errors['breason']}
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