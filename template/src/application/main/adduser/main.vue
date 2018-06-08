<!--
  这是一个demo
  用来演示formUnit如何使用，以及通过slot和baseMixin来扩展表单组件

  说明：form-unit
  name: 该字段为可选项，默认会生成一个随机id.
  formModels: 必填。接收一个配置文件，用来初始化表单。也可以先给空对象，再动态修改。
  formChange/formEvent 可选。用来处理回调
  性别：默认男，生日默认为1980-01-01
-->
<template>
  <div class="container">
  	<za-title className="main-title" >
            投保人信息
    </za-title>
    <form-unit name="applicant"
    	:formModels="applicantData"
    	@formEvent="applicantChange"
      @onInit="formUnitInit" >
      <template slot="occupation">
	      <za-occupation :formModel="applicantData.occupation" name="occupation"></za-occupation>
	    </template>
    </form-unit>
    <div v-for="(ins, key, index) of insList" :key="index">
      <za-title className="main-title" v-if="ins">
        {{getTitleIndex(index)}}
        <slot slot="icon" v-if="index!=0"><span @click="deleteInsurant(index)" class="icon_clear"></span></slot>
      </za-title>
      <form-unit v-if="index==0"
      	:name="'ins'+key"
      	@formEvent="insurantChange"
        @onInit="formUnitInit"
        :formModels="ins">
        <template slot="occupation">
          <za-occupation :formModel="ins.occupation" name="occupation"></za-occupation>
        </template>
      </form-unit>
      <form-unit v-else
      	:name="'ins'+key"
        @onInit="formUnitInit"
        :formModels="ins">
        <template slot="occupation">
          <za-occupation :formModel="ins.occupation" name="occupation"></za-occupation>
        </template>
      </form-unit>
    </div>
    <div class="btn-container">
    	<div @click="addIns" class="btn-add">
	    	<span class="icon-add-blue"></span>
	    	<span>添加被保人</span>
	    </div>
    </div>
    <div @click="nextStep" class="btn-next"> 下一步</div>
  </div>
</template>

<script>
// 导入formUnit
import { formUnit, zaInput, zaSelect, zaTitle } from "vformer";
import { LOADPROPOSAL, CREATMOREINSUREPROPOSAL } from "@/api";
import zaOccupation from "@/components/occupation"
// 导入配置文件
import { appModel, otherInsModel, firstInsModel } from "./formModel";

export default {
  data() {
    return {
      applicantData: appModel,
      //结构{0:{},1:{}}
      insList: {'0':this.__deepCopy(firstInsModel)},
      //数据结构 {'applicant':'','ins0':{},'ins1':{},...}
      formCollection: {}
    };
  },
  created() {
    window.test = this;
    this.getData();
  },
  methods: {
    formUnitInit(v) {
      this.formCollection[v.name] = v;
    },
    getData() {
      this.axios
        .post(LOADPROPOSAL, { planId: this.$route.query&&this.$route.query.planId||'' })
        .then(({ data }) => {
          if (data.success) {
            this.setData(data.value.content);
          }else if(this.$route.query&&this.$route.query.planId){
            this.$vux.toast.show({ text: data.errorMsg });
          }
        });
    },
    deleteInsurant(index){
      this.formCollection['ins'+index] = null
      this.insList[index] = null
    },
    getTitleIndex(index){
      let insList = this.insList
      // insurant存在的个数
      let realTotal = 0
      // 删除后存在的被保人的索引
      let resultIndex = 0
      Object.keys(insList).map((item,key) => {
        if(insList[item]){
          realTotal = realTotal + 1
          if(index>=parseInt(item)){
            resultIndex = resultIndex + 1
          }
        }
      })
      return index==0&&realTotal==1?'被保人信息':'第'+(resultIndex)+'被保人'
    },
    addIns() {
      let lenArr = Object.keys(this.insList);
      const newInsModel = this.__deepCopy(otherInsModel)
      let length = 0;
      lenArr.map((item,key) => {
        if(this.insList[item]){
          length = length + 1
        }
      })
      if (length >= 6) {
        this.$vux.toast.show({ text: '被保险人上限6个' });
        return;
      }
      this.$set(this.insList, lenArr.length, newInsModel);
    },
    setData(data) {
      let applicantLen = data.applicant&&Object.keys(data.applicant).length;
      let _self = appModel;
      // 设置投保人
      if (applicantLen) {
        Object.keys(data.applicant).map(item => {
          Object.keys(_self).map(item2 => {
            if (item == item2) {
              _self[item2].value = data.applicant[item];
            }
          });
        });
      }
      this.applicantData = _self
      //设置被保人
      let insurantArr = data.planList&&data.planList[0]&&data.planList[0]['insurants'] || []
      let resultInsurantArr = {}
      insurantArr.map((item, key) => {
        // copy被保人数据模型
        let copyInsrant = this.__deepCopy(otherInsModel)
        if(key === 0){
          copyInsrant = this.__deepCopy(firstInsModel)
        }
        // 迭代模型里的每个项的值
        Object.keys(copyInsrant).map((sItem, sKey) => {
          copyInsrant[sItem].value = item[sItem]
          // 如果是本人那么设置为只读
          if(item['relation'] === '00' && sItem!=='relation'){
          	copyInsrant[sItem].rules['readOnly'] = true
          	copyInsrant[sItem].rules['disabled'] = true
          }
        })
        resultInsurantArr[key] = copyInsrant
      })
      this.insList = resultInsurantArr
    },
    validateAll() {
      // get form
      const forms = Object.keys(this.formCollection);
      // get form promised
      const formPromise = []
      forms.map(form =>
        this.formCollection[form]?formPromise.push(this.formCollection[form].validateAll()):''
      );
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
    nextStep() {
      let submitData = {insurants:[]}
      this.validateAll().then(res => {
        if (res === true) {
          //校验通过，获取表单值
          const forms = Object.keys(this.formCollection);
          forms.map((item,key) => {
            if(item === 'applicant'){
              submitData[item] = this.formCollection[item].formValues
            }else if(this.formCollection[item]){
            	let insForm = this.formCollection[item].formValues
            	insForm['insureSeq'] = key
              submitData['insurants'].push(insForm)
            }
          })
          this.axios
            .post(CREATMOREINSUREPROPOSAL, submitData)
            .then(({ data }) => {
              if (data.success) {
                let plans = data.value.content.planList
                let planId = plans[0].planId
                let query = this.$route.query || {}
                query['planId'] = planId
                // store 存储 被保人列表，下一步使用
                this.$router.push({name:'make-plan', query:query})
              }else{
                this.$vux.toast.show({ text: data.errorMsg });
              }
          });
        } else {
          let errorMsg = res.getErrorMsg();
          this.$vux.toast.show({ text: errorMsg });
        }
      });
    },
    // 投保人信息变更，如果关系为本人要复制到被保人
    applicantChange(eventType,obj){
    	let insData = this.formCollection['ins0'].formValues
    	if(insData['relation'] === '00'){
    		this.$set(this.insList[0][obj.name], 'value', (typeof obj.value=='string')?obj.value:obj.value[0])
    	}
    },
    insurantChange(eventType,obj){
    	let insList = this.insList
    	//如果切为本人，那么将投保人信息回填到被保人，并且被保人信息不可编辑
    	if(obj.name === "relation" && obj.value[0] === '00'){
    		let applicantData = this.formCollection['applicant'].formValues
    		Object.keys(insList[0]).map((item,key)=>{
    			if(insList[0][item].rules && item!=='relation'){
    				this.$nextTick(()=>{
    					this.$set(insList[0][item].rules, 'readOnly', true)
    				  this.$set(insList[0][item], 'value', applicantData[item])
    				})
    			}
    		})
    	}else if(obj.name === "relation" && obj.value[0] !== '00'){
    		// 如果切位非本人关系，那么清空被保人信息，使其可编辑
        let newIns = this.__deepCopy(firstInsModel)
        newIns.relation.value = obj.value[0]
        insList[0] = newIns
    	}
    }
  },
  components: {
    formUnit,
    zaInput,
    zaSelect,
    zaTitle,
    zaOccupation
  }
};
</script>
<style lang='less' scoped>
@import "~@/assets/styles/page.less";
.container{
	padding-bottom: 60px;
	background-color:@bgGray;
	.btn-container{
		background-color:@bgGray;
		padding-top:20px;
		padding-bottom: 60px;
		.btn-add{
			color: @btnBlue;
			font-size: 17px;
			background-color:@white;
			text-align: center;
			display: block;
			padding-top:30px;
			padding-bottom: 30px;
			border:1px solid @white;
			.icon-add-blue{
				margin-right:2px;
			}
		}
	}

}
</style>
