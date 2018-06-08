<!--
  * 
  * @Author: simon
  * @Date:   2018-05-22 10:15:40
  * @Last Modified by:   
  * @Last Modified time: 
  * 告知模板1:題目无是否、下面每个小标题有是否和原因，子标题最多可到N
  * 女性告知：
-->
<template>
  <div class="qtype qtype1_pages">
    <div class="question-container o">
      <div class="title">
        <p class="index">{{index<9?('0'+index+'. '):(index+'. ')}}</p>
        <p class="title-text">
          {{'女性告知：'}}
        </p>
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
              孕周为<input class="short-input" maxlength="2" v-model="currentData.pform['adetail'][0]" />，胚胎数为<input class="short-input" maxlength="2" v-model="currentData.pform['adetail'][1]" />。
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
          <textarea maxlength="200" v-model="currentData.pform['breason']" :placeholder="currentData.placeholdera"></textarea>
      </div>
    </div>
    <div :class="['question-container',currentData.pform['cstate']]" >
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData['ptitlec']}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('y','c')">是</span>
          <span class="no"  @click="checkYesNo('n','c')">否</span>
        </div>
      </div>
      <div class="textarea">
              距今时间为<input class="short-input" maxlength="2" v-model="currentData.pform['cdetail']" />年
      </div>
    </div>
    <div :class="['question-container',currentData.pform['dstate']]" >
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData['ptitled']}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('y','d')">是</span>
          <span class="no"  @click="checkYesNo('n','d')">否</span>
        </div>
      </div>
      <div class="textarea">
          <textarea maxlength="200" v-model="currentData.pform['dreason']" :placeholder="currentData.placeholderb"></textarea>
      </div>
    </div>
    <div :class="['question-container',currentData.pform['estate']]" >
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData['ptitlee']}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('y','e')">是</span>
          <span class="no"  @click="checkYesNo('n','e')">否</span>
        </div>
      </div>
      <div class="textarea">
          <textarea maxlength="200" v-model="currentData.pform['ereason']" :placeholder="currentData.placeholderc"></textarea>
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
  name: 'notify-model2',
  props: ["index", "eachNotify"],
  methods: {
    checkYesNo (type, row) {
    	this.currentData.pform[row+'state'] = type
    },
    validate () {
      let pform = this.currentData && this.currentData.pform
      let errors = this.currentData && this.currentData.errors
      if(pform){
      	if(pform['astate'] === 'o'){
	        return {status:true,inputData:this.eachNotify,msg:errors['astate']}
	      }
	      if(pform['astate'] === 'y' && (!pform['adetail'] || !pform['adetail'][0]|| !pform['adetail'][1])){
	        return {status:true,inputData:this.eachNotify,msg:errors['adetail']}
	      }
	      if(pform['bstate'] === 'o'){
	        return {status:true,inputData:this.eachNotify,msg:errors['bstate']}
	      }
	      if(pform['bstate'] === 'y' && (!pform['breason'])){
	        return {status:true,inputData:this.eachNotify,msg:errors['breason']}
	      }
	      if(pform['cstate'] === 'o'){
	        return {status:true,inputData:this.eachNotify,msg:errors['cstate']}
	      }
	      if(pform['cstate'] === 'y' && (!pform['cdetail'])){
	        return {status:true,inputData:this.eachNotify,msg:errors['cdetail']}
	      }
	      if(pform['dstate'] === 'o'){
	        return {status:true,inputData:this.eachNotify,msg:errors['dstate']}
	      }
	      if(pform['dstate'] === 'y' && (!pform['dreason'])){
	        return {status:true,inputData:this.eachNotify,msg:errors['dreason']}
	      }
	      if(pform['estate'] === 'o'){
	        return {status:true,inputData:this.eachNotify,msg:errors['estate']}
	      }
	      if(pform['estate'] === 'y' && (!pform['ereason'])){
	        return {status:true,inputData:this.eachNotify,msg:errors['ereason']}
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