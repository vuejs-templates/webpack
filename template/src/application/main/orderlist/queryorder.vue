<!--
-->
<template>
  <div id="queryorder">
    <form-unit name="queryform" :formModels="formModel" @formChange="onChange" @formEvent="onEvent">
      <template slot="cust">
        <div>
          <applicant-date-cust :formModel="formModel.cust" name="cust"></applicant-date-cust>
        </div>
      </template>
    </form-unit>

    <div class="buttonGroup">
      <div  class="resetbtn" @click="reset"><button>清空</button></div>
      <div class="searchbtn" @click="submit"><button>查询</button></div>
    </div>
  </div>
</template>
<script>
  import { formUnit, zaInput, zaSelect, Tab, TabItem, AlertPlugin, ConfirmPlugin, ToastPlugin } from 'vformer'
  import {ISBANKS} from '@/api'
  import formModel from './formmodule'
  import applicantDateCust from './applicant-date-cust'
  const nowTime = function () {
    return new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) > 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + new Date().getDate()
  }
  let endtime = (new Date().getFullYear() - 100) + '-' + ((new Date().getMonth() + 1) > 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + new Date().getDate()
  export default {
    name: 'queryorder',
    data () {
      return {
        formModel:formModel,
        stime: endtime,
        title: '',
        etime: nowTime(),
        hascardKind: false,
        statusList: [[    //  保单状态列表
          {name: '失效', value: '1'},
          {name: '承保', value: '2'},
          {name: '终止', value: '3'}
        ]],
        cardKindList: [[
          {
            "value": "0",
            "name": "身份证"
          },
          {
            "value": "1",
            "name": "护照"
          },
          {
            "value": "10",
            "name": "中国护照"
          }]],
        // [['身份证', '军人证', '护照']],
        form: {
          name: '',
          insurestatus: '',
          // genderCode: 'M',
          // birthday: null,
          // cardKind: [],
          cardNum: '',
          appFlag: [],  //  保单状态
          contNo: '',   //  保单号
          polApplyStartDate: '',  //  投保开始日期
          polApplyEndDate: ''  //  投保结束日期
        }
      }
    },
    created () {
      window.que = this
      if (process.env.NODE_ENV === 'production') {
        window.getDictionary('card_type').then(success => {
          this.cardKindList = [[...success]]
        }, fail => {
          console.log(fail)
        }).catch(e => {
          console.log(e)
          throw new Error(e)
        })
      } else {
        this.cardKindList = [window.dictionary['card_type']]
      }
    },
    components: {
      formUnit,
      applicantDateCust,
      zaInput, zaSelect,
      Tab,TabItem
    },
    methods: {
      onEvent(t, v, name) {
        console.warn(t, `这次更新是由${name}触发的`, v)
      },
      onChange(v, name) {
        console.log('trigger: formChange::', v, name)
      },
      submit () {
        let fm = this.getForm('queryform').formValues;

        console.log(fm);
        let param={};

          for(let i in fm){
            if(i=='cust'){
              param.polApplyStartDate = fm[i].begindate;
              param.polApplyEndDate = fm[i].enddate;
            }
            else{
              param[i] = fm[i];
            }
          }

        console.log(param);
        this.$router.push({path: "/orderlist", query: param})



//        let {name, cardNum: idNo} = this.form
//        let {appFlag: [appFlag], contNo, polApplyStartDate, polApplyEndDate} = this.form
//        let param = {name, idNo, appFlag, contNo, polApplyStartDate, polApplyEndDate}
//        this.$router.push({path: "/web/search", query: param})
      },
      chooseGender (v) {
        // this.form.genderCode = v
      },
      ages: function (str) {
        const r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
        const d = new Date(r[1], r[3] - 1, r[4])
        if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
          const Y = new Date().getFullYear()
          const age = Y - r[1]
          if (age < 16) {
            this.$vux.toast.show({
              text: "投保人年龄不得小于16周岁",
              type: 'text',
              width: '50%',
              isShowMask: true
            })
          }
        }
      },
      changebirthday (v) {
        // this.ages(v)
        // console.log(nowTime())
      },
      chooseaddress () {
        this.address = !this.address
        this.seled = !this.seled
      },
      reset () {
          let copyFormModel = JSON.parse(JSON.stringify(this.formModel));
          this.formModel = copyFormModel;
      },
      onHide () {
      },
      onChange () {
      },
      pickStatus () {},
      change () {},
      cardtime () {

      }
    }
  }
</script>
<style lang='less' scoped>
  @import '../../../assets/styles/page.less';
  #queryorder{
    .buttonGroup{
      width: 100%;
      height: 95px;
      line-height: 95px;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color:#fff;
      /*margin-top:4px;*/
      border-top:1px solid #e1e1e1;
      button{
        border: 0;
        width: 165px;
        height: 45px;
        font-size: 16px;
        border-radius: 4px;
      }
      .searchbtn, .resetbtn{
        flex: 1;
        text-align: center;
      }
      .resetbtn button{
        border: 1px solid #d2d2d2;
        color: #666;
        background-color: #fff;
      }
      .searchbtn button{
        background-color: #00b1ff;
        color: #fff;
      }
    }
  }
</style>
