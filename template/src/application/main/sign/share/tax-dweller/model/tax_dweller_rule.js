let date = new Date()
// let stime = `${date.getFullYear() - 65}-${date.getMonth() + 1}-${date.getDate()}`
// let etime = `${date.getFullYear() - 16}-${date.getMonth() + 1}-${date.getDate()}`

export default {
  baseInfo: {
    label: '投保人',
    name: 'baseInfo',
    type: 'title',
    extraClass: 'title'
  },
  familyName: {
    label: '姓',
    type: 'input',
    rules: {
      toUpperCase: false,
      vRules: 'required',
      maxlength: 20,
      placeholder: '英文或拼音',
      errorMsg: '投保人姓不能为空'
    }
  },
  firstName: {
    label: '名',
    type: 'input',
    rules: {
      toUpperCase: false,
      vRules: 'required',
      maxlength: 20,
      placeholder: '英文或拼音',
      errorMsg: '投保人名不能为空'
    }
  },
  birthday: {
    label: '出生日期',
    type: 'time',
    rules: {
      vRules: 'required',
      // stime: stime,
      // etime: etime,
      placeholder: '请选择出生日期',
      errorMsg: '投保人出生日期不能为空'
    }
  },
  presentAddress: {
    label: '投保人现居住地址',
    name: 'presentAddress',
    type: 'title',
    extraClass: 'title'
  },
  countryDesc: {
    label: '国家',
    type: 'input',
    rules: {
      toUpperCase: false,
      vRules: 'required',
      maxlength: 20,
      placeholder: '中文、英文或拼音',
      errorMsg: '投保人现居住地国家不能为空'
    }
  },
  provinceDesc: {
    label: '省',
    type: 'input',
    rules: {
      toUpperCase: false,
      vRules: 'required',
      maxlength: 20,
      placeholder: '中文、英文或拼音',
      errorMsg: '投保人现居住地省不能为空'
    }
  },
  cityDesc: {
    label: '市',
    type: 'input',
    rules: {
      toUpperCase: false,
      vRules: 'required',
      maxlength: 20,
      placeholder: '中文、英文或拼音',
      errorMsg: '投保人现居住地市不能为空'
    }
  },
  detail: {
    label: '详细地址',
    type: 'input',
    rules: {
      toUpperCase: false,
      vRules: 'required',
      maxlength: 120,
      placeholder: '中文、英文或拼音',
      errorMsg: '投保人现居住地详细地址不能为空'
    }
  },
  birthInfo: {
    label: '投保人出生地址',
    name: 'birthInfo',
    type: 'title',
    extraClass: 'title'
  },
  'birthAddress': {
    label: '同现居住地址',
    display: 'block',
    type: 'check-block-tax',
    slotType: 'ctype1',
    options: {
      'countryDesc': {
        type: 'input',
        label: '国家',
        rules: {
          vRules: 'required',
          maxlength: 20,
          placeholder: '中文、英文或拼音',
          errorMsg: '投保人出生地国家不能为空'
        },
        value: ''
      },
      'provinceDesc': {
        type: 'input',
        label: '省',
        rules: {
          vRules: 'required',
          maxlength: 20,
          placeholder: '中文、英文或拼音',
          errorMsg: '投保人出生地国家不能为空'
        },
        value: ''
      },
      'cityDesc': {
        type: 'input',
        label: '市',
        rules: {
          vRules: 'required',
          maxlength: 20,
          placeholder: '中文、英文或拼音',
          errorMsg: '投保人出生地国家不能为空'
        },
        value: ''
      },
      'detail': {
        type: 'input',
        label: '详细地址',
        rules: {
          vRules: 'required',
          maxlength: 100,
          placeholder: '中文、英文或拼音',
          errorMsg: '投保人出生地国家不能为空'
        },
        value: ''
      }
    }
  }
}
