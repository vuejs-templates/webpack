import errorMsg from '@/components/item/error-msg/error-msg.js'

export default {
  countryDesc: {
    label: '国家',
    type: 'input',
    rules: {
      toUpperCase: false,
      vRules: 'required',
      maxlength: 20,
      placeholder: '中文、英文或拼音',
      errorMsg: '投保人出生地国家'
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
      errorMsg: '投保人出生地省'
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
      errorMsg: '投保人出生地市'
    }
  },
  detail: {
    label: '详细地址',
    type: 'input',
    rules: {
      toUpperCase: false,
      vRules: 'required',
      maxlength: 100,
      placeholder: '中文、英文或拼音',
      errorMsg: '投保人出生地详细地址'
    }
  }
}
