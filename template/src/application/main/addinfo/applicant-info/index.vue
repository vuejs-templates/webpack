<!--完善信息-->
<template>
  <div class="container applicant-info">
    <tab bar-active-color="#5697ff">
      <tab-item selected>投保人信息</tab-item>
      <tab-item disabled>被保人信息</tab-item>
    </tab>
    <form-unit name="applicantInfo" :formModels="formModel">
      <!-- 证件有效期 -->
      <!-- <template slot="cust">
        <div>
          <validate-cust :formModel="formModel.cust" name="cust"></validate-cust>
        </div>
      </template> -->
    </form-unit>
    <div class="button-wrapper">
      <div class="btn-next" @click="nextStep">下一步</div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import { formUnit, Tab, TabItem} from 'vformer'
  import modelData from './formModel'
  import {LOADAPPLY, SAVEAPPLIANTADDINSURANT, LOADAPPLYWITHMULTIINSURANTS} from '@/api'
  import validateCust from '../validate-cust'

  export default {
    name: 'applicant-info',
    data() {
      return {
        formModel: modelData,
        loadApply: {}
      }
    },
    created() {
      window.test = this;
      this.planId = this.$route.query.planId;
      this.getloadApply(this.planId);
      // this.mapMarrigeList(); //用来请求l列表
    },
    methods: {
      // 获取数据
      getloadApply(planId) {
        this.axios.post(LOADAPPLYWITHMULTIINSURANTS,{planId: planId})
        .then(({data}) => {
          if (data.success) {
            this.loadApply = data.value;
            let applicant = this.loadApply.applicant;
            this.getConfiginfo(applicant)
          } else {
             this._toast(data.errorMsg)
          }
        })
        .catch((err) => {
          console.log(err);
        })
      },
      // 回显
      getConfiginfo(data) {
        let model = JSON.parse(JSON.stringify(modelData))
        this.__setModel(model, data).then(res => {
          Object.keys(res).map(key => {
            if ((key==="relation"&&res.relation) ||
                (key==="name"&&res.name) ||
                (key==="birthday"&&res.birthday) ||
                (key==="genderCode"&&res.genderCode)){
              res[key].rules.readOnly = true
            }
          })
          return res
        }).then(res=>{
          this.formModel= res
        })
      },
      nextStep() {
        let fm = this.getForm('applicantInfo');
        let applicant = fm.formValues;
        let updateloadApply = {};
        fm.validateAll().then(res=>{
          if (res === true) {
            updateloadApply = Object.assign(this.loadApply, {applicant}, {isNeedPaperPolicy: applicant.isNeedPaperPolicy});
            this.submitData(updateloadApply);
          } else {
            this.$vux.toast.show({
             text: fm.getErrorMsg()
           })
          }
        })
      },
      submitData(updateloadApply) {
        this.axios.post(SAVEAPPLIANTADDINSURANT, updateloadApply)
          .then(({data}) => {
            if (data.success) {
              this.$router.push({path: 'insurant', query:{planId: this.planId}})
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
      validateCust
    }
  }
</script>

<style lang='less' scoped>
  @import "../../../../assets/styles/page.less";
  .applicant-info{
    background-color:@bgGray;
    padding-bottom: 45px;
    .button-wrapper {
      margin-top: 24px;
      margin-bottom: 25px;
      text-align: center;
    }
    .vux-tab .vux-tab-item.vux-tab-selected {
      color: @btnBlue;
    }
    .vux-tab .vux-tab-item.vux-tab-disabled {
      color: #666;
    }
  }
</style>
