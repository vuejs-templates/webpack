<!--完善信息-->
<!-- 说明
  1. 所有被保人共用一个formUnit, formUnit只通过 formModel更新值(代码已实现)
  2. 当切换被保人时。(以下代码待完成)
     - 先从loadApply.insurants中取出该被保人的数据，记作 insX
     - 克隆formModel:  let newModel = this.__clone(this.formModel)
     - 调用__setModel方法，把数据赋值给newModel, 并最终更新formModel:
        this.__setModel(newModel, insX).then(res => {
          this.formModel = res
        })
  3. 只有采用这种方式，多formUnit才能实现动态赋值
 -->
<template>
  <div class="container insuran-Info">
    <tab bar-active-color="#5697ff">
      <tab-item disabled>投保人信息</tab-item>
      <tab-item selected>被保人信息</tab-item>
    </tab>
    <ul class="tabs-bar" v-if="loadApply.insurants">
      <li v-for="(item,index) in loadApply.insurants" :class="tabCls(index, loadApply.insurants.length)"
        @click="onSelect(index, item.insureSeq)" :key="index" v-if="loadApply.insurants && loadApply.insurants.length >=2">
        <p>{{item.name}}</p>
      </li>
    </ul>
    <div v-if="loadApply.insurants">
      <form-unit name="insurant" :formModels="formModel" @formEvent="insurantChange"></form-unit>
      <form-unit name="hemu" :formModels="hemujiaModal" @formEvent="hemuChange" v-if="this.hemujiaShowFlag === 'Y'"></form-unit>
      <div class="button-wrapper">
        <div class="btn-next" @click="saveSingle(false)" v-if="isSelect !== loadApply.insurants.length-1">保存</div>
        <div class="btn-next" @click="saveSingle(true)" v-else>下一步</div>
      </div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import { formUnit, Tab, TabItem} from 'vformer'
  import {modelData, hemujiaModal}from './formModel'
  import {SAVESINGLEINSURANT, LOADAPPLYWITHMULTIINSURANTS, SAVENSURANT} from '@/api'

  export default {
    name: 'recognizee-info',
    data() {
      return {
        loadApply: {},
        isSelect: 0,
        planId: '',
        applyId: '',
        formModel: modelData,
        hemujiaModal: hemujiaModal,
        insureSeqs: {},
        insureSeq: '',
        applicant: {},
        insurantsInfoSavedFlag: "N",      //是否在点击的时候校验依次点击
        sameAppInfo:{                     //同投保人的联系方式的字段
          withAppliant: 'Y',
          mobile: '',
          telphone: '',
          addr: {},
          zipcode: '',
          email: ''
        },                                
        hemujiaShowFlag: '',
        forms:['insurant']                 // 页面中form-unitname集合
      }
    },
    watch: {
      isSelect(pre, old){
        if (pre !== old){
          // let newModel = this.__clone(this.forModel);
          let item = this.loadApply.insurants[this.isSelect]
          this.getConfiginfo(item, this.formModel).then(res => {
            this.formModel = res;
          });
          if(this.hemujiaShowFlag==='Y'){
              this.getConfiginfo(item, this.hemujiaModal).then(res=> {
                this.hemujiaModal = res;
              })
          }
        }
      }
    },
    created() {
      window.test = this
      this.planId = this.$route.query.planId;
      this.getloadApply(this.planId)
    },
    methods: {
      // 同被保人的联系方式
      insurantChange(eventType,obj){
        if(obj.name === "withAppliant" && obj.value === 'Y') {
          let newModel = this.__clone(this.formModel)
          Object.keys(this.sameAppInfo).map(key=>{
            newModel[key].value = this.sameAppInfo[key]
          })
          this.$nextTick(()=>{
            this.formModel = newModel
          })
        }
      },
      hemuChange(event,obj){
        console.log(event,obj)
      },
      // tab 切换
      tabCls: function(index, len) {
        return [
          "tabs-tab",
          {
            "tabs-tab_3": len <= 3,
            "tabs-tab_4": len > 3,
            "tabs-tab-active_3": index === this.isSelect && len <= 3,
            "tabs-tab-active_4": index === this.isSelect && len > 3
          }
        ];
      },
      getloadApply(planId) {
        this.axios.post(LOADAPPLYWITHMULTIINSURANTS,{planId: planId})
        .then(({data}) => {
          if (data.success) {
            let loadApply = data.value;
            // 是否依次去校验被保人
            if (loadApply.insurantsInfoSavedFlag){
              this.insurantsInfoSavedFlag = "Y"
            }

            loadApply.insurants.forEach((item, index) => {
              this.insureSeqs[item.insureSeq] = item;
            })
            // 把‘同投保人’部分字段拷贝待用
            for(let key in this.sameAppInfo){
              loadApply.applicant[key] && (this.sameAppInfo[key] = loadApply.applicant[key])
            }
            // 转换当前被保人的数据
            let item = loadApply.insurants[this.isSelect]
            this.hemujiaShowFlag = loadApply.insurants[this.isSelect].hemujiaShowFlag
            this.getConfiginfo(item, this.formModel).then(res=> {
              this.formModel = res;
            })
            //是否在和睦家就诊
            if(this.hemujiaShowFlag==='Y'){
              this.forms.push('hemu');
              this.getConfiginfo(item, this.hemujiaModal).then(res=> {
                this.hemujiaModal = res;
                console.log(res)
              })
            }
            // 保存到本地
            this.applyId = loadApply.applyId
            // 必须，否则不会渲染
            this.$nextTick(()=>{
              this.loadApply = loadApply
            })
          } else {
            this.__toast(data.errorMsg)
          }
        })
        .catch((err) => {
          console.log(err);
        })
      },
      getConfiginfo(data, modelform) {
        let model = JSON.parse(JSON.stringify(modelform))
        return this.__setModel(model, data).then(res => {
          Object.keys(res).map(key => {
            if (res.relation.value==="00" && res[key].value){
              res[key].rules.readOnly = true;
            } else 
            if (modelform === this.formModel) {
              if ((key==="relation"&&res.relation) ||
                  (key==="name"&&res.name) ||
                  (key==="birthday"&&res.birthday) ||
                  (key==="genderCode"&&res.genderCode)){
                res[key].rules.readOnly = true
              }
            }
          })
          return res
        })
      },
      onSelect(v, data){
        let insureSeq = this.loadApply.insurants[this.isSelect].insureSeq,
            flag = false;
        if (this.isSelect == this.loadApply.insurants.length-1) {
          flag = true;
        }
        this.validateAll()
          .then(res => {
            if(res === true) {
              let insurant = {};
              this.forms.map(item => {
                insurant = this.getForm(item).formValues;
                insurant = Object.assign(this.insureSeqs[insureSeq], insurant)
              })
              if (flag){
                this.insurantsInfoSavedFlag = "Y"
              }
              this.axios.post(SAVESINGLEINSURANT, {applyId: this.applyId,insurant: insurant, insurantsInfoSavedFlag: this.insurantsInfoSavedFlag}) // 记得换接口SAVENSURANT
              .then(({data}) => {
                if(data.success){
                  this.getloadApply(this.planId)
                  if (this.isSelect != this.loadApply.insurants.length-1 && this.insurantsInfoSavedFlag == "N") {
                      if (this.isSelect + 1 < v) {
                        this.__toast("请依次填完被保人信息")
                        this.isSelect = this.isSelect + 1
                      } else {
                        this.isSelect = v
                      }
                  } else {
                    this.isSelect = v
                  }
                } else {
                  this.__toast(data.errorMsg)
                }
              })
              .catch((err) => {
                console.log(err)
              })
            } else {
              return this.__toast(fm.getErrorMsg())
            }
          })
      },
      validateAll() {
        const formPromise = [];
        this.forms.map(form => {
          this.getForm(form)?formPromise.push(this.getForm(form).validateAll()):'';
        })
        return Promise.all(formPromise)
        .then(res => {
          let unsolved = res.find(i => i !== true);
          if (unsolved === undefined) {
            return true;
          } else {
            return unsolved;
          }
        })
        .catch(e => {
          console.log(e);
        });
      },
      saveSingle(flag) {
        let insureSeq = this.loadApply.insurants[this.isSelect].insureSeq;
        this.validateAll().then(res => {
          if (res === true){
              let insurant = {};
              this.forms.map(item => {
                // 收集所有的formUnit的值
                insurant = this.getForm(item).formValues;
                insurant = Object.assign(this.insureSeqs[insureSeq], insurant)
              })
              // 如果是最后一个select,则为Y
              if(flag){
                this.insurantsInfoSavedFlag = "Y"
              }
             this.axios.post(SAVESINGLEINSURANT, {applyId: this.applyId,insurant: insurant, insurantsInfoSavedFlag: this.insurantsInfoSavedFlag})
              .then(({data}) => {
                if(data.success){
                  if (flag) {
                    this.$router.push({path: '/beneficiary/beneficiary-list', query: {applyId: this.applyId}})
                  } else {
                    this.isSelect = this.isSelect + 1
                    this.getloadApply(this.planId)
                  }
                } else {
                  this.$vux.toast.show({
                    text:data.errorMsg
                  })
                }
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            let errorMsg = res.getErrorMsg();
            this.$vux.toast.show({ text: errorMsg });
          }
        })
      }
    },
    components: {
      formUnit,
      Tab,
      TabItem
    }
  }
</script>

<style lang='less' scoped>
  @import "../../../../assets/styles/page.less";
  @VMin: calc(100vw / 6);
  @W: 120/2px;
  @H: 120/2px;
  .insuran-Info{
    background-color:@bgGray;
    padding-bottom: 45px;
    .vux-tab .vux-tab-item.vux-tab-selected {
      color: @btnBlue;
      border-bottom: 3px solid @btnBlue;
    }
    .vux-tab .vux-tab-item.vux-tab-disabled {
      color: #666;
    }
    .button-wrapper {
      margin-top: 24px;
      margin-bottom: 25px;
      text-align: center;
      .next {
        width: 350px;
        height: 46px;
      }
    }
    .tabs-bar {
      background-color:@white;
      box-sizing: border-box;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .tabs-tab {
        background-size: 100% 100%;
        background-color: @weuiBgColorTab;
        & > p {
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 70%;
        }
      }
      .tabs-tab_3 {
        display: inline-block;
        width: @W;
        height: @H;
        border-radius: @H;
        font-size: 12px;
        text-align: center;
        box-sizing: border-box;
        color: #ffffff;
        // transition: all 0.6s;
      }
      .tabs-tab_4 {
        display: inline-block;
        width: 100/2px;
        height: 100/2px;
        border-radius: 100/2px;
        font-size: 10px;
        text-align: center;
        box-sizing: border-box;
        // transition: all 0.6s;
      }
      .tabs-tab-active_3 {
        width: 138/2px;
        height: 150/2px;
        background: url(~@/assets/styles/images/tab_3.png);
        background-size: 100% 100%;
        color: rgba(255, 255, 255, 1);
        & > p {
          width: 80%;
        }
      }
      .tabs-tab-active_4 {
        width: 114/2px;
        height: 123/2px;
        background: url(~@/assets/styles/images/tab_4.png);
        background-size: 100% 100%;
        color: rgba(255, 255, 255, 1);
        & > p {
          width: 80%;
        }
      }
    }

  }
</style>
