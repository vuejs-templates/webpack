<!--
  * 
  * @Author: simon
  * @Date:   2018-05-22 10:15:40
  * @Last Modified by:   
  * @Last Modified time: 
  * 告知模板12:简单模板里的第6题
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
        <textarea maxlength="200" v-model="currentData.pform[itemN+'reason']" :placeholder="currentData.placeholdera"></textarea>
      </div>
    </div>
    
    <div class="question-container o">
      <div class="title">
      	<p class="index">{{'07. '}}</p>
        <p class="title-text">
                   女性告知：
        </p>
      </div>
    </div>
    <!--a.现在怀孕了吗？-->
    <div :class="['question-container',currentData.pform.Oreason.Oastate]" v-if="currentData.pform.Oreason">
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData.ptitleOa}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','Oa','Oreason')">是</span>
          <span class="no"  @click="checkYesNo('no','Oa','Oreason')">否</span>
        </div>
      </div>
      <div class="textarea">
        b.孕周为<input v-model="currentData.pform.Oreason.Oadetail[0]" class="short-input" maxlength="2" />，胚胎数为
        <input v-model="currentData.pform.Oreason.Oadetail[1]" class="short-input" maxlength="2" />。
      </div>
    </div>
    <!--c.是否有怀孕并发症？-->
    <div :class="['question-container',currentData.pform.Oreason.Ocstate]" v-if="currentData.pform.Oreason">
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData.ptitleOc}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','Oc','Oreason')">是</span>
          <span class="no"  @click="checkYesNo('no','Oc','Oreason')">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea maxlength="200" v-model="currentData.pform.Oreason.Ocreason" placeholder="请详细说明"></textarea>
      </div>
    </div>
    <!--d.是否有过剖腹产史？距今时间为___年-->
    <div :class="['question-container',currentData.pform.Oreason.Odstate]" v-if="currentData.pform.Oreason">
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData.ptitleOd}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','Od','Oreason')">是</span>
          <span class="no"  @click="checkYesNo('no','Od','Oreason')">否</span>
        </div>
      </div>
      <div class="textarea">
                距今时间为<input v-model="currentData.pform.Oreason.Odreason" class="short-input" maxlength="2" />年
      </div>
    </div>
    <!--e.正打算通过自然或人工方式拥有子女？ -->
    <div :class="['question-container',currentData.pform.Oreason.Oestate]" v-if="currentData.pform.Oreason">
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData.ptitleOe}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','Oe','Oreason')">是</span>
          <span class="no"  @click="checkYesNo('no','Oe','Oreason')">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea maxlength="200" v-model="currentData.pform.Oreason.Oereason" placeholder="请详细说明"></textarea>
      </div>
    </div>
    <!--f.因不育被建议需要接受检查、治疗、服药或手术？ -->
    <div :class="['question-container',currentData.pform.Oreason.Ofstate]"  v-if="currentData.pform.Oreason">
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData.ptitleOf}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','Of','Oreason')">是</span>
          <span class="no"  @click="checkYesNo('no','Of','Oreason')">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea maxlength="200" v-model="currentData.pform.Oreason.Ofreason" placeholder="请详细说明"></textarea>
      </div>
    </div>
    <!--a.每天抽烟超过15支或以任何方式服用烟草？ -->
    <div :class="['question-container',currentData.pform.Preason.Pastate]" v-if="currentData.pform.Preason">
      <div class="title">
        <p class="index">{{'8. '}}</p>
        <p class="title-text">
          {{currentData.ptitlePa}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','Pa','Preason')">是</span>
          <span class="no"  @click="checkYesNo('no','Pa','Preason')">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea maxlength="200" v-model="currentData.pform.Preason.Pareason" placeholder="请详细说明"></textarea>
      </div>
    </div>
    <!--b.在过去5年中，一年内体重增大或减少超过12公斤或25磅？ -->
    <div :class="['question-container',currentData.pform.Preason.Pbstate]"  v-if="currentData.pform.Preason">
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData.ptitlePb}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','Pb','Preason')">是</span>
          <span class="no"  @click="checkYesNo('no','Pb','Preason')">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea maxlength="200" v-model="currentData.pform.Preason.Pbreason" placeholder="请详细说明"></textarea>
      </div>
    </div>
    <!--c. 其他的疾病或症状？ -->
    <div :class="['question-container',currentData.pform.Preason.Pcstate]" v-if="currentData.pform.Preason">
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData.ptitlePc}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','Pc','Preason')">是</span>
          <span class="no"  @click="checkYesNo('no','Pc','Preason')">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea maxlength="200" v-model="currentData.pform.Preason.Pcreason" placeholder="请详细说明"></textarea>
      </div>
    </div>
    <!--2周岁及以下儿童补充告知： -->
    <div :class="['question-container',currentData.pform.Qreason.Qastate]" v-if="currentData.pform.Qreason">
      <div class="title">
        <p class="title-text">
          {{currentData.ptitleQa}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','Qa','Qreason')">是</span>
          <span class="no"  @click="checkYesNo('no','Qa','Qreason')">否</span>
        </div>
      </div>
      <div class="textarea">
                出生时体重为<input maxlength="4" v-model="currentData.pform.Qreason.Qadetail" class="short-input" />公斤？
      </div>
      <div class="textarea">
        <textarea maxlength="200" v-model="currentData.pform.Qreason.Qareason" placeholder="请详细说明"></textarea>
      </div>
    </div>
    <div :class="['question-container',currentData.pform.Qreason.Qbstate]" v-if="currentData.pform.Qreason">
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData.ptitleQb}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','Qb','Qreason')">是</span>
          <span class="no"  @click="checkYesNo('no','Qb','Qreason')">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea maxlength="200" v-model="currentData.pform.Qreason.Qbreason" placeholder="请详细说明"></textarea>
      </div>
    </div>
    <div :class="['question-container',currentData.pform.Qreason.Qcstate]" v-if="currentData.pform.Qreason">
      <div class="title">
        <p class="index"></p>
        <p class="title-text">
          {{currentData.ptitleQc}}
        </p>
        <div class="radio-yesno">
          <span class="yes" @click="checkYesNo('yes','Qc','Qreason')">是</span>
          <span class="no"  @click="checkYesNo('no','Qc','Qreason')">否</span>
        </div>
      </div>
      <div class="textarea">
        <textarea maxlength="200" v-model="currentData.pform.Qreason.Qcreason" placeholder="请详细说明"></textarea>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentData:this.eachNotify.props||{},
      forData:['A','B','C','D','E','F','G','H','I','J','K','L','M','N'],
      validateO:['Oc','Oe','Of'],
      validateP:['Pa','Pb','Pc'],
      validateQ:['Qa','QB','QC']
    }
  },
  name: 'notify-model1',
  props: ["index", "eachNotify"],
  methods: {
    checkYesNo (type, row,pNode) {
      if(type==='yes'){
        if(pNode){
          this.currentData.pform[pNode][row+'state'] = 'y'
        }else{
          this.currentData.pform[row+'state'] = 'y'
        }
      }
      if(type==='no'){
        if(pNode){
          this.currentData.pform[pNode][row+'state'] = 'n'
        }else{
          this.currentData.pform[row+'state'] = 'n'
        }
      }
    },
    validate () {
      let pform = this.currentData && this.currentData.pform
      let errors = this.currentData && this.currentData.errors
      if(pform){
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
      //校验少儿
      if(pform.Oreason){
        if(pform.Oreason['Oastate'] === 'y' && (!pform.Oreason.Oadetail[0] || !pform.Oreason.Oadetail[0])){
          return {status:true,inputData:this.eachNotify,msg:errors[this.validateData['Oreason']['Oadetail']]}
        }
        for(var i=0;i<this.validateO.length;i++){
          let title = this.validateO[i]+'state'
          if(pform['Oreason'][title] === 'o'){
            return {status:true,inputData:this.eachNotify,msg:errors['Oreason'][title]}
          }
          if(pform['Oreason'][title] === 'y' && !pform['Oreason'][this.validateO[i]+'reason']){
            return {status:true,inputData:this.eachNotify,msg:errors[['Oreason'][this.validateO[i]+'reason']]}
          }
        }
      }
      //校验抽烟超过15支
      if(pform.Preason){
        for(var i=0;i<this.validateP.length;i++){
          let title = this.validateP[i]+'state'
          if(pform['Preason'][title] === 'o'){
            return {status:true,inputData:this.eachNotify,msg:errors['Preason'][title]}
          }
          if(pform['Preason'][title] === 'y' && !pform['Preason'][this.validateP[i]+'reason']){
            return {status:true,inputData:this.eachNotify,msg:errors[['Preason'][this.validateP[i]+'reason']]}
          }
        }
      }
      //校验2周岁及以下儿童补充告知
      if(pform.Qreason){
        for(var i=0;i<this.validateQ.length;i++){
          let title = this.validateQ[i]+'state'
          if(pform['Qreason'][title] === 'o'){
            return {status:true,inputData:this.eachNotify,msg:errors['Qreason'][title]}
          }
          if(pform['Qreason'][title] === 'y' && !pform['Qreason'][this.validateQ[i]+'reason']){
            return {status:true,inputData:this.eachNotify,msg:errors[['Qreason'][this.validateQ[i]+'reason']]}
          }
          if(pform['Qreason'][title] === 'y' && !pform['Qreason']['Qadetail']){
            return {status:true,inputData:this.eachNotify,msg:errors['Qreason']['Qadetail']}
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
