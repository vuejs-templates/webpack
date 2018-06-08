export default {
  title1: {
    rules: {
      label: '基本信息',
      type: 'title'
    }
  },
  button_group: {
    value: 'ccc',
    rules: {
      label: 'button_group',
      type: 'za-button_group',
      options: [{name: '选项1', value:'aaa'},{name: '选项1', value:'ccc'},{name: '选项3', value:'bbb'}]
    }
  },
  income: {
    value: '',
    rules: {
      label: 'Income',
      type: 'za-input',
      readOnly: true,
      vRules: 'required|min:1|max:8',
      placeholder: '请输入',
      errorMsg: '请输入如何看待寿险营销',
      extra: {
        text: '万元'
      }
    }
  },
  address: {
    value: {
      "province": "",
      "provinceDesc": "",
      "city": "",
      "cityDesc": "",
      "district": "",
      "districtDesc": "",
      "detail": ""
    },
    rules: {
      label: 'Address',
      subLabel: 'detail',
      type: 'za-address',
      vRules: 'required',
      // readOnly: true,
      showDetail: true,
      errorMsg: '请输入如何看待寿险营销'
    }
  },
  birthDay: {
    value: '',
    rules: {
      label: 'birthDay',
      type: 'za-date',
      vRules: 'required',
      // readOnly: true,
      placeholder: '请选择',
      errorMsg: '请输入如何看待寿险营销'
    }
  },
  sex: {
    value: 'M',
    rules: {
      label: 'sex',
      type: 'za-sex',
      vRules: 'required',
      readOnly: true,
      placeholder: '请选择',
      errorMsg: '请输入如何看待寿险营销'
    }
  },
  CertType: {
    value: 'china001',
    rules: {
      label: 'CertType',
      type: 'za-select',
      vRules: 'required',
      placeholder: '请选择',
      // readOnly: true,
      errorMsg: '请输入如何看待寿险营销',
      showName: true,
      // options: [['xxxx', 'yyyyy', 'zzzzz']]
      options: [[{
        name: '中国',
        value: 'china'
      }, {
        name: '美国',
        value: 'USA'
      }, {
        name: '广东',
        value: 'china001'
      }, {
        name: '广西',
        value: 'china002'
      }, {
        name: '美国001',
        value: 'usa001'
      }]]
    }
  },
  bankCard: {
    value: '6226090211632175',
    rules: {
      label: 'bankCard',
      type: 'za-input',
      vRules: 'required|min:18|max:18',
      placeholder: '请输入',
      errorMsg: '请输入如何看待寿险营销'
    }
  },
  Reason: {
    value: 'xxxx',
    rules: {
      label: 'Reason',
      type: 'za-textarea',
      vRules: 'required|min:8',
      placeholder: '请输入',
      errorMsg: '请输入如何看待寿险营销'
    }
  }
}
