export default {
  name: {
    value: '',
    rules: {
      label: '投保人',
      type: 'za-input',
      readOnly: false,
      vRules: 'required',
      placeholder: '请输入姓名',
      errorMsg: '请输入姓名'
      // extra: {
      //   text: '万元'
      // }
    }
  },
  idNo: {
    value: '',
    rules: {
      label: '证件号码',
      type: 'za-input',
      readOnly: false,
      vRules: 'required',
      placeholder: '请输入证件号码',
      errorMsg: '请输入证件号码'
      // extra: {
      //   text: '万元'
      // }
    }
  },
  contNo: {
    value: '',
    rules: {
      label: '保单号',
      type: 'za-input',
      readOnly: false,
      vRules: 'required',
      placeholder: '请输入保单号',
      errorMsg: '请输入保单号'
      // extra: {
      //   text: '万元'
      // }
    }
  },
  cust: {
    value: {
      begindate:'',
      enddate:''
    },
    rules: {
      label: '投保日期',
      // type: 'za-select',
      // readOnly: false,
      // vRules: 'required',
      // placeholder: '请输入',
      // errorMsg: '请输入如何看待寿险营销',
      begindate:{
        label: '',
        type: 'za-date',
        vRules: 'required',
        // readOnly: true,
        placeholder: '开始日期',
        errorMsg: '请输入开始日期'
      },
      enddate:{
        label: '',
        type: 'za-date',
        vRules: 'required',
        // readOnly: true,
        placeholder: '结束日期',
        errorMsg: '请输入结束日期'
      }

    }
  },
  appFlag: {
    value: '',
    rules: {
      label: '保单状态',
      type: 'za-select',
      vRules: 'required',
      placeholder:'请选择保单状态',
      // readOnly: true,
      errorMsg: '请选择保单状态',
      showName: true,
      options: [[{
        name: '失效',
        value: '1'
      }, {
        name: '承保',
        value: '2'
      }, {
        name: '终止',
        value: '3'
      }]]
    }
  }

}
