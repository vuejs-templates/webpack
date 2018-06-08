export default {
  basicTitle: {
    rules: {
      label: '基本信息',
      type: 'title'
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
  certType: {
    value: '',
    rules: {
      label: '证件类型',
      type: 'za-select',
      showName:true,
      readOnly: false,
      vRules: 'required',
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
  certValidity: {
    value: '',
    rules: {
      label: '有效期至',
      type: 'za-date',
      vRules: 'required',
      showName:true,
      placeholder: '请选择有效期',
      errorMsg: '请选择有效期'
    }
  },
  // cust: {
  //   value: {
  //     begindate:'',
  //     enddate:''
  //   },
  //   rules: {
  //     label: '有效期至',
  //     begindate:{
  //       label: '',
  //       type: 'za-date',
  //       vRules: 'required',
  //       placeholder: '请选择有效期',
  //       errorMsg: '请选择有效期'
  //     },
  //     checklong:{
  //       label: '',
  //       type: 'check-list',
  //       vRules: 'required',
  //       placeholder: '',
  //       errorMsg: '请选择有效期',
  //       extra: {
  //         text: '长期'
  //       }
  //     }
  //   }
  // },
  citizenship: {
    value: '中国',
    rules: {
      label: '国籍',
      type: 'za-select',
      vRules: 'required',
      placeholder: '请选择国籍',
      errorMsg: '请选择国籍',
      // showName:true,
      options: [['中国 ', '美国', '俄罗斯', '英国']]
    }
  },
  contactTitle: {
    rules: {
      label: '联系方式',
      type: 'title'
    }
  },
  mobile: {
    value: '',
    rules: {
      label: '手机号码',
      type: 'title',
      type: 'za-input',
      vRules: 'required',
      placeholder: '请输入手机号码',
      errorMsg: '请输入手机号码'
    }
  },
  telphone: {
    value: '',
    rules: {
      label: '住宅电话',
      type: 'za-input',
      vRules: 'required',
      placeholder: '请输入住宅电话',
      errorMsg: '请输入住宅电话'
    }
  },
  addr: {
    value: [],
    rules: {
      label: '通讯地址',
      subLabel: '详细地址',
      type: 'za-address',
      vRules: 'required',
      placeholder: '请选择通讯地址',
      showDetail: true,
      showName:true,
      errorMsg: '请选择通讯地址',
      options: [['xxxx', 'yyyyy', 'zzzzz']]
    }
  },
  zipcode: {
    value: '',
    rules: {
      label: '邮政编码',
      type: 'za-input',
      vRules: 'required|numeric|min:6',
      placeholder: '请输入通讯地址邮政编码',
      // readOnly: true,
      errorMsg: '请输入邮政编码'
    }
  },
  familyAddr: {
    value: [],
    rules: {
      label: '家庭地址',
      subLabel: '详细地址',
      type: 'za-address',
      vRules: 'required',
      placeholder: '请选择家庭住址',
      showDetail: true,
      errorMsg: '请选择家庭住址',
      options: [['xxxx', 'yyyyy', 'zzzzz']]
    }
  },
  faimlyZipCode: {
    value: '',
    rules: {
      label: '邮政编码',
      type: 'za-input',
      vRules: 'required|numeric|min:6',
      placeholder: '请输入家庭地址邮政编码',
      // readOnly: true,
      errorMsg: '请输入邮政编码'
    }
  },
  isNeedPaperPolicy: {
    value: 'Y',
    rules: {
      label: '是否接受纸质保单',
      type: 'za-yesno',
      vRules: 'required',
      showName:true,
      errorMsg: '请选择是否是否接受纸质保单'
    }
  },
  email: {
    value: '',
    rules: {
      label: '邮箱地址',
      type: 'za-input',
      vRules: 'required',
      placeholder: '请输入邮箱地址',
      errorMsg: '请输入邮箱地址'
    }
  },
  supplementTitle: {
    rules: {
      label: '补充信息',
      type: 'title'
    }
  },
  companyName: {
    value: '',
    rules: {
      label: '工作单位',
      type: 'za-input',
      vRules: 'required|stringlength',
      placeholder: '请输入工作单位',
      errorMsg: '请输入工作单位'
    }
  },
  jobContent: {
    value: '',
    rules: {
      label: '工作内容',
      type: 'za-input',
      vRules: 'required',
      placeholder: '请输入工作内容',
      errorMsg: '请输入工作内容'
    }
  },
  occupation: {
    value: '',
    rules: {
      label: '职业',
      type: 'za-select',
      vRules: 'required',
      placeholder: '请选择',
      errorMsg: '请选择被保人职业',
      showName: true,
      options: [[
        {
          name: '企业经理',
          value: '1050102'
        }, {
          name: '企业职能部门经理或主管',
          value: '1050103'
        },
        {
          name: '工厂、企业负责人',
          value: '1050104'
        },
        {
          name: '统计人员',
          value: '2060201'
        },
        {
          name: '保险推销员',
          value: '2070202'
        },
        {
          name: '营业员',
          value: '4010101'
        }
        // 'xxxx', 'yyyyy', 'zzzzz'
      ]]
    }
  },
  marrige: {
    value: '',
    rules: {
      label: '婚姻状况',
      type: 'za-select',
      showName:true,
      vRules: 'required',
      placeholder: '请选择婚姻状况',
      errorMsg: '请选择婚姻状况',
      options: [[
        {
          value: "0",
          name: "未婚"
        },
        {
          value: "1",
          name: "已婚"
        },
        {
          value: "2",
          name: "离异"
        },
        {
          value: "3",
          name: "丧偶"
        }
        // 'xxxx', 'yyyyy', 'zzzzz'
      ]]

    }
  },
  salary: {
    value: '',
    rules: {
      label: '税前年收入',
      type: 'za-input',
      vRules: 'required|decimal:2',
      placeholder: '请输入税前年收入',
      errorMsg: '请输入税前年收入',
      extra: {
        text: '万元'
      }
    }
  },
  height: {
    value: '',
    rules: {
      label: '身高',
      type: 'za-input',
      vRules: 'required',
      placeholder: '请输入身高',
      errorMsg: '请输入身高',
      extra: {
        text: '厘米'
      }
    }
  },
  weight: {
    value: '',
    rules: {
      label: '体重',
      type: 'za-input',
      vRules: 'required',
      placeholder: '请输入体重',
      errorMsg: '请输入体重',
      extra: {
        text: '公斤'
      }
    }
  },
  autoRenewal: {
    value: 'Y',
    rules: {
      label: '是否自动续保',
      type: 'za-yesno',
      vRules: 'required',
      showName:true,
      errorMsg: '请选择是否是否自动续保'
    }
  },
}
