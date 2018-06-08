<!--
  * 
  * @Author: simon
  * @Date:   2018-05-22 10:15:40
  * @Last Modified by:   
  * @Last Modified time: 
  * 告知模板3:饮酒模板
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
      <div class="two-title">
        <div class="row">
                    已饮酒
          <input class="short-input" maxlength="2" v-model="firstreason[0]" />
                    年，
          <input class="short-input" maxlength="2" v-model="firstreason[1]" />          
                    两/周，种类
          <input class="short-input" maxlength="200" v-model="firstreason[2]" />          
        </div>
        <div class="row">
                    已戒酒<input class="short-input" maxlength="2" v-model="secondreason[0]" />年，原因<input v-model="secondreason[1]" maxlength="200" :placeholder="currentData.placeholdera" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentData:this.eachNotify.props||{},
      firstreason:this.eachNotify.props.pform.firstreason||[],
      secondreason:this.eachNotify.props.pform.secondreason||[]
    }
  },
  name: 'notify-model2',
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
    validate () {
      let pform = this.currentData && this.currentData.pform
      let errors = this.currentData && this.currentData.errors
      pform.firstreason = this.firstreason
      pform.secondreason = this.secondreason
      if(pform){
        if(pform.firststate === 'o'){
          return {status:true,inputData:this.eachNotify,msg:errors['firststate']}
        }else if(pform.firststate === 'y'){
          if(this.firstreason.length < 3 || !this.firstreason[0] || !this.firstreason[1] || !this.firstreason[2]){
            return {status:true,inputData:this.eachNotify,msg:errors['firstreason']}
          }
        }
      }
      return this.eachNotify
    }
  }
}
</script>
