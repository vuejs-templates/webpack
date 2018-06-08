<!--
  * 
  * @Author: simon
  * @Date:   2018-05-22 10:15:40
  * @Last Modified by:   
  * @Last Modified time: 
  * 告知模板1:題目有是否、下面每个小标题有是否和原因，最多到ptitlec
  * "state": "o",
        "statea": "o",
        "reasona": "",
        "stateb": "o",
        "reasonb": "",
        "statec": "o",
        "reasonc": ""
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
    </div>
    <div :class="['question-container',currentData.pform.statea]">
      <div class="title">
        <p class="index">A.</p>
        <p class="title-text">
          {{currentData.ptitlea}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','A')">是</span>
          <span class="no"  @click="checkYesNo('no','A')">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea v-model="currentData.pform.reasona" :placeholder="currentData.placeholdera"></textarea>
      </div>
    </div>
    <div :class="['question-container',currentData.pform.stateb]">
      <div class="title">
        <p class="index">B.</p>
        <p class="title-text">
          {{currentData.ptitleb}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','B')">是</span>
          <span class="no"  @click="checkYesNo('no','B')">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea v-model="currentData.pform.reasonb" :placeholder="currentData.placeholderb"></textarea>
      </div>
    </div>
    <div :class="['question-container',currentData.pform.statec]">
      <div class="title">
        <p class="index">C.</p>
        <p class="title-text">
          {{currentData.ptitlec}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','C')">是</span>
          <span class="no"  @click="checkYesNo('no','C')">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea v-model="currentData.pform.reasonc" :placeholder="currentData.placeholderc"></textarea>
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
      }else if(row === 'B'){
        if(type==='yes'){
          this.currentData.pform.stateb = 'y'
        }
        if(type==='no'){
          this.currentData.pform.stateb = 'n'
        }
      }else if(row === 'C'){
        if(type==='yes'){
          this.currentData.pform.statec = 'y'
        }
        if(type==='no'){
          this.currentData.pform.statec = 'n'
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
        if(pform.hasOwnProperty('statea')){
          if(pform.statea === 'o'){
            return {status:true,inputData:this.eachNotify,msg:errors['statea']}
          }
          if(pform.statea === 'y' && !pform.reasona){
            return {status:true,inputData:this.eachNotify,msg:errors['reasona']}
          }
        }
        if(pform.hasOwnProperty('stateb')){
          if(pform.stateb === 'o'){
            return {status:true,inputData:this.eachNotify,msg:errors['stateb']}
          }
          if(pform.stateb === 'y' && !pform.reasonb){
            return {status:true,inputData:this.eachNotify,msg:errors['reasonb']}
          }
        }
        if(pform.hasOwnProperty('statec')){
          if(pform.statec === 'o'){
            return {status:true,inputData:this.eachNotify,msg:errors['statec']}
          }
          if(pform.statec === 'y' && !pform.reasonc){
            return {status:true,inputData:this.eachNotify,msg:errors['reasonc']}
          }
        }
      }
      return this.eachNotify
    }
  }
}
</script>
