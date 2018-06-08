<!--
  这是一个demo
  用来演示formUnit如何使用，以及通过slot和baseMixin来扩展表单组件

  说明：form-unit
  name: 该字段为可选项，默认会生成一个随机id.
  formModels: 必填。接收一个配置文件，用来初始化表单。也可以先给空对象，再动态修改。
  formChange/formEvent 可选。用来处理回调
-->
<template>
  <div class="container">
    <tab>
      <tab-item selected @on-item-click="onItemClick">已发货</tab-item>
      <tab-item @on-item-click="onItemClick">未发货</tab-item>
      <tab-item @on-item-click="onItemClick">全部订单</tab-item>
    </tab>
    <form-unit name="f1" :formModels="formModel" @formChange="onChange" @formEvent="onEvent">
      <template slot="cust">
        <div>
          <test-cust :formModel="formModel.cust" name="cust"></test-cust>
        </div>
      </template>
    </form-unit>
    <form-unit name="f2" :formModels="formModel2" @formChange="onChange" @formEvent="onEvent">
    </form-unit>
    <div class="weui-btn-area">
      <button @click="setConfirm(data1)" class="weui-btn weui-btn_primary"> 动态添加表单示例 </button>
      <button @click="setConfirm(data2)" class="weui-btn weui-btn_plain-primary"> 添加自定义组件示例 </button>
      <button @click="nextStep" class="weui-btn weui-btn_warn next"> next step </button> <br>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  // 导入formUnit
  import { formUnit, zaInput, zaSelect, Tab, TabItem, AlertPlugin, ConfirmPlugin, ToastPlugin } from 'vformer'

  // 导入配置文件
  import modelData from './formModel'
  // 导入自定义组件
  import testCust from './test-cust'

  Vue.use(AlertPlugin)
  Vue.use(ConfirmPlugin)
  Vue.use(ToastPlugin)

  export default {
    name: 'form-unit-demo',
    data() {
      return {
        formModel: modelData,
        formModel2: {}
      }
    },
    created() {
      window.test = this
    },
    methods: {
      onEvent(t, v, name) {
        console.warn(t, `这次更新是由${name}触发的`, v)
      },
      onChange(v, name) {
        console.log('trigger: formChange::', v, name)
      },
      onItemClick(){},
      nextStep(){
        // 获取name为f1的表单对象
        let fm = this.getForm('f1')
        fm.validateAll().then(res=>{
          if (res) {
            this.$vux.alert.show({
              title: '验证通过',
              content: "进入下一步",
              onShow () {
                console.log('Plugin: I\'m showing')
              },
              onHide () {
                console.log('Plugin: I\'m hiding now')
              }
            })
          } else {
            this.$vux.toast.show({
            // getErrorMsg() 获取表单第一条报错
             text: fm.getErrorMsg()
           })
          }
        })
      },
      setConfirm(data){
        let self = this
        this.$vux.confirm.show({
          title: '确认设置formModel?',
          content: 'Content',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            console.log('plugin cancel')
          },
          onConfirm () {
            data()
          }
        })
      },
      data1() {
        // let nd = JSON.parse(JSON.stringify(modelData))
        let nd = {}
        nd['home'] = {
          value: 'xuchang',
          rules: {
            label: 'home',
            type: 'za-input',
            vRules: 'required',
            placeholder: '请输入',
            errorMsg: '请输入'
          }
        }
        nd['work'] = {
          value: 'zhongan',
          rules: {
            label: 'work',
            type: 'za-input',
            vRules: 'required',
            placeholder: '请输入',
            errorMsg: '请输入'
          }
        }
        nd['position'] = {
          value: 'yyy',
          rules: {
            label: 'position',
            type: 'za-select',
            vRules: 'required',
            options: [['xxx', 'yyy', 'ooo']],
            placeholder: '请输入',
            errorMsg: '请输入'
          }
        }
        this.formModel = {}
        // 这是强制form-unit重新初始化
        this.$nextTick(() => {
          this.formModel = nd
        })
      },
      data2() {
        // let nd = this.$children[0].__clone(modelData)
        let nd = {}
        nd['cust'] = {
          value: {
            select: 'sssss',
            name: 'jankergg'
          },
          rules: {
            label: '个人信息',
            select: {
              label: '国家',
              vRules: 'required',
              options: [['aaaaa', 'bbbbb', 'ccccc']],
              placeholder: '请输入',
              errorMsg: '请输入'
            },
            name: {
              label: '名字',
              vRules: 'required',
              placeholder: '请输入',
              errorMsg: '请输入'
            }
          }
        }
        this.formModel2 = nd
      },
      next () {
        this.$children[0].validateAll().then(res =>{
          alert('验证通过')
        })
      }
    },
    components: {
      formUnit,
      testCust,
      zaInput, zaSelect,
      Tab,TabItem
    }
  }
</script>
<style lang='less' scoped>
  @import '../src/assets/styles/weui/widget/weui-button/weui-button.less';
  .container {
    font-size: 12px;
    .button-container{
      text-align: center;
      button {
        font-size:15px;
        color:#fff;
        padding: 10px;
        text-align:center;
        width:100px;
        display:inline-block;
        box-sizing: border-box;
        border: 1px solid yellowgreen;
        background: lightseagreen;
        margin: 1rem auto 0;
        &.data2{
          background: green;
          margin-left:50px;
        }
        &.next{
          background:yellowgreen;
          display:block;
          width:250px;
        }
      }
    }
  }
</style>
