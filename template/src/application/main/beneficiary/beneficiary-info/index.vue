<template>
  <div class="container bene-Info">
    <za-title className="main-title" >
            受益人信息
      <slot slot="icon" >
      	<span @click="importInfo" class="icon-import-blue-font"></span>
    		<span @click="scanInfo" class="icon-scan-blue-font"></span>
      </slot>
    </za-title>
    <form-unit name="benificiary" :formModels="formModel" @formChange="onChange" @formEvent="onEvent">
    </form-unit>
    <div class="button-wrapper">
      <div class="btn-next" @click="nextStep">下一步</div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { formUnit, Tab, TabItem, zaTitle} from 'vformer'
  // 导入配置文件
  import modelData from './formModel'
  import {SAVEASSIGNBEBEFICTORY, BENEFICIARCUSTUMER, SAVEBENEFICTARY, UPDATEBENEFICTARY, QUERYINSURANT} from '@/api'

  export default {
    name: 'beneficiary-info',
    data() {
      return {
        formModel: modelData,
        loadApply: {},
        applyId: '',
        custId: '',
        insureSeq: '',
        benefictaryType: '',
        benefictaryCustomer: {}
      }
    },
    created(){
      let query = this.$route.query;
      this.applyId = query.applyId;
      this.custId = query.custId || '';
      this.insureSeq = query.insureSeq || '';
      this.benefictaryType = query.benefictaryType || '';
      if (this.insureSeq && this.custId) {
        this.queryBenefictaryCustomer();
      }
    },
    mounted() {
    },
    methods: {
      onEvent(t, v, name) {
        console.warn(t, `这次更新是由${name}触发的`, v)
      },
      onChange(v, name) {
        console.log('trigger: formChange::', v, name)
      },
      queryBenefictaryCustomer() {
        this.axios.post(QUERYINSURANT, {'applyId': this.applyId})
        .then(({data})=>{
          if (data.success){
            // let benefictaryCustomer = {}
            data.value.forEach((item)=>{
              if (item.insureSeq == this.insureSeq) {
                this.benefictaryCustomer = item.benefictaryDTO.benefictaryCustomerDTOList.find(item => item.custId == this.custId)
              }
            })
            this.getConfiginfo(this.benefictaryCustomer);
          } else {
            this.$vux.toast.show({
              text: data.errorMsg
            })
          }
        })
        .catch((err) =>{
          console.log(err);
        })
      },
      getConfiginfo(data) {
        let nd = JSON.parse(JSON.stringify(modelData));
        this.__setModel(nd, data).then(res => {
          res.benefitOrder.value = res.benefitOrder.value + ''
          return res
        }).then(res =>{
          this.formModel = res;
        })
      },
      nextStep() {
        let fm = this.getForm('benificiary');
        let benificiary = fm.formValues;
        fm.validateAll().then(res=>{
          if (res === true) {
            benificiary = Object.assign(this.benefictaryCustomer, benificiary)
            this.submitData(benificiary)
          } else {
            this.$vux.toast.show({
             text: fm.getErrorMsg()
           })
          }
        })
      },
        /**
       * 导入受益人人信息
       */
      importInfo(){
        window.getCustomer().then(result => {
          let succ = JSON.parse(result)
          this.getConfiginfo(succ)
        }, fail => {
        }).catch(e => {
          throw new Error(e)
        })
      },
      /**
       * 扫描受益人人信息
       */
      scanInfo(type,insIndex){
        window.idCardScan().then(result => {
          let data = JSON.parse(result)
          this.getConfiginfo(data)
        }, fail => {
        }).catch(e => {
          throw new Error(e)
        })
      },
      // 为什么修改和填写是两个接口
      submitData(benificiary) {
        this.axios.post(SAVEASSIGNBEBEFICTORY, {benefictaryCustomer:benificiary, applyId: this.applyId, insureSeq: this.insureSeq, benefictaryType: this.benefictaryType,
         custId:this.custId})
          .then(({data}) => {
            if (data.success) {
              this.$router.push({path: 'beneficiary-list', query:{applyId: this.applyId}})
            } else {
              this.$vux.toast.show({
                text:data.errorMsg
              })
            }
          })
          .catch((err) => {
            console.log(err);
          }) 
      }
    },
    components: {
      formUnit,
      Tab,
      TabItem,
      zaTitle
    }
  }
</script>

<style lang='less' scoped>
  @import "../../../../assets/styles/page.less";
  .bene-Info{
    .button-wrapper {
      margin-top: 24px;
      margin-bottom: 25px;
      text-align: center;
      .next {
        width: 350px;
        height: 46px;
      }
    }
  }
</style>

