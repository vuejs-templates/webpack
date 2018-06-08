export default {
  // basicTitle: {
  //   rules: {
  //     label: '受益人信息',
  //     type: 'title'
  //   }
  // },
  relation: {
    value: '',
    rules: {
      label: '与被保险人关系',
      type: 'za-select',
      vRules: 'required',
      placeholder: '与被保险人关系',
      errorMsg: '与被保险人关系',
      showName: true,
      options: [[
        {
          name: '父母',
          value: '01'
        },
        {
          name: '配偶',
          value: '02'
        },
        {
          name: '子女',
          value: '03'
        },
        {
          name: '祖孙',
          value: '04'
        },
        {
          name: '监护',
          value: '05'
        },
        {
          name: '其他',
          value: '06'
        },
        {
          name: '保单服务人员',
          value: '07'
        },
        {
          name: '直系亲属',
          value: '08'
        },
      ]]
    }
  },
  name: {
    value: '',
    rules: {
      label: '姓名',
      type: 'za-input',
      vRules: 'required|username|usernameLength',
      placeholder: '请输入姓名',
      errorMsg: '请输入姓名'
    }
  },
  genderCode: {
    value: 'M',
    rules: {
      label: '性别',
      type: 'za-sex',
      vRules: 'required',
      placeholder: '请选择性别',
      errorMsg: '请选择性别'
    }
  },
  // 是否投保人 字段内容0
  custType: {
    value: 'Y',
    rules: {
      label: '是否投保人',
      type: 'za-yesno',
      vRules: 'required',
      errorMsg: '请选择'
    }
  },
  birthday: {
    value: '',
    rules: {
      label: '出生日期',
      type: 'za-date',
      vRules: 'required',
      placeholder: '请选择出生日期',
      errorMsg: '请选择出生日期'
    }
  },
  certType: {
    value: '',
    rules: {
      label: '证件类型',
      type: 'za-select',
      vRules: 'required',
      showName: true,
      placeholder: '请选择证件类型',
      options: [[
        {
          "value": "0",
          "name": "身份证"
        },
        {
          "value": "1",
          "name": "护照"
        },
        {
          "value": "2",
          "name": "军人证（军官证）"
        },
        {
          "value": "4",
          "name": "户口本"
        },
        {
          "value": "7",
          "name": "出生证"
        },
        {
          "value": "A",
          "name": "士兵证"
        },
        {
          "value": "B",
          "name": "回乡证"
        },
        {
          "key": "E",
          "name": "台胞证"
        }
      ]],
      errorMsg: '请选择证件类型'
    }
  },
  certNo: {
    value: '',
    rules: {
      label: '证件号码',
      type: 'za-input',
      vRules: 'required|isFullWidth',
      placeholder: '请输入证件号码',
      errorMsg: '请输入证件号码'
    }
  },
  // // 有效期 certValidity
  certValidity: {
    value: '',
    rules: {
      label: '有效期至',
      type: 'za-date',
      vRules: 'required',
      placeholder: '请选择有效期',
      errorMsg: '请选择有效期'
    }
  },
  citizenship: {
    value: '',
    rules: {
      label: '国籍',
      type: 'za-select',
      vRules: 'required',
      placeholder: '请选择国籍',
      errorMsg: '请选择国籍',
      options: [['xxxx', 'yyyyy', 'zzzzz']]
    }
  },
  benefitOrder: {
    value: '',
    rules: {
      label: '受益顺序',
      type: 'za-select',
      vRules: 'required',
      placeholder: '请选择受益顺序',
      errorMsg: '请选择受益顺序',
      options: [["1", "2", "3"]]
    }
  },
  benefitRatio: {
    value: '',
    rules: {
      label: '受益比例',
      type: 'title',
      type: 'za-input',
      vRules: 'required',
      placeholder: '请输入受益比例',
      errorMsg: '请输入受益比例',
      extra: {
        text: '%'
      }
    }
  },
}
