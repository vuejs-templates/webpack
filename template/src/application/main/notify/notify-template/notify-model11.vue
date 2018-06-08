<!--
  * 
  * @Author: simon
  * @Date:   2018-05-22 10:15:40
  * @Last Modified by:   
  * @Last Modified time: 
  * 告知模板1:題目无是否、下面每个小标题有是否和原因，子标题最多可到N
  * "Astate": "o",
        "Areason": "",
        "Bstate": "o",
        "Breason": "",
        "Cstate": "o",
        "Creason": "",
-->
<template>
  <div class="qtype qtype1_pages">
    <div class="question-container o">
      <div class="title">
        <p class="index">{{index<9?('0'+index+'. '):(index+'. ')}}</p>
        <p class="title-text">
          {{currentData.ptitle}}
        </p>
      </div>
    </div>
    <div :class="['question-container',currentData.pform[item+'state']]" v-for="(item,key) in eachPre" v-if="currentData.pform[item+'state']">
      <div class="title">
        <p class="index">{{item+'. '}}</p>
        <p class="title-text">
          {{currentData['ptitle'+item]}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('y',item)">是</span>
          <span class="no"  @click="checkYesNo('n',item)">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea  maxlength="200" v-model="currentData.pform[item+'reason']" :placeholder="currentData.placeholdera"></textarea>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentData:this.eachNotify.props||{},
      eachPre:['A','B','C','D','E','F','G','H','I','J','K','L','M','N']
    }
  },
  name: 'notify-model1',
  props: ["index", "eachNotify"],
  methods: {
    checkYesNo (type, row) {
    	this.currentData.pform[row+'state'] = type
    },
    validate () {
      let pform = this.currentData && this.currentData.pform
      let errors = this.currentData && this.currentData.errors
      let eachPre= this.eachPre
      if(pform){
      	for(var i=0;i<eachPre.length;i++){
      		let st = eachPre[i]+'state'
      		if(pform.hasOwnProperty(eachPre[i]+'state')){
	          if(pform[st] === 'o'){
	            return {status:true,inputData:this.eachNotify,msg:errors[st]}
	          }
	          if(pform[st] === 'y' && !pform[eachPre[i]+'reason']){
	            return {status:true,inputData:this.eachNotify,msg:errors[st]}
	          }
	        }
      	}
      }
      return this.eachNotify
    }
  }
}
</script>
