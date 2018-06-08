import deepClone from '@/utils/clone.js'

export default {
  methods: {
    __clone(data){
      try{
        return JSON.parse(JSON.stringify(data))
      } catch(e){
        console.error(e, '克隆对象失败')
        return data
      }
    },
    __deepCopy(data) {
      return deepClone(data)
    },
    // 从接口转化数据到formModel
    __setModel(model, data){
      Object.keys(model).map(key => {
        if (model[key].value !== undefined && data[key] !== undefined && data[key] !== null) {
          model[key].value = data[key]
        }
      })
      return Promise.resolve(model)
    },
    __toast(msg) {
      this.$vux.toast.show({
        text: msg,
        type: 'text',
        width: '50%',
        isShowMask: true
      })
    }
  }
}
