<template>
  <pagoda-left-right-layout title="左右详情页布局" subTitle="基本信息">
    <template slot="operation">
      <!-- 操作按钮栏插槽 -->
      <pagoda-row-btns :btns="rowBtns" :visibles="btnVisibles" multi-switch></pagoda-row-btns>
    </template>
    <template slot="tabs">
      <!-- 顶部tab栏插槽 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="tab标签一" name="first"></el-tab-pane>
        <el-tab-pane label="tab标签二" name="second"></el-tab-pane>
        <el-tab-pane label="tab标签三" name="third"></el-tab-pane>
        <el-tab-pane label="tab标签四" name="fourth"></el-tab-pane>
        <el-tab-pane label="tab标签五" name="five"></el-tab-pane>
      </el-tabs>
    </template>
    <template slot="content">
      <!-- 主内容区插槽 -->
      <div>
        主要内容区
      </div>
    </template>
    <template>
      <template slot="edit">
        <!-- 编辑按钮插槽 -->
        <div @click="handleEdit" v-if="!showBtns">
          <i class="iconfont icon-edit"></i>
        </div>
        <pagoda-row-btns v-if="showBtns" :btns="editBtns" :visibles="editBtnVisibles"></pagoda-row-btns>
      </template>
      <div slot="content-form">
        <!-- 表单插槽 -->
        <el-form :inline="true" label-width="114px" label-position="left" class="el-form-reset">
          <el-form-item label="标签文本1">
            <el-input v-model="form.value1" v-show="editable"></el-input>
            <p v-show="!editable">\{{form.value1}}</p>
          </el-form-item>
          <el-form-item label="标签文本2">
            <el-input v-model="form.value2" v-show="editable"></el-input>
            <p v-show="!editable">\{{form.value2}}</p>
          </el-form-item>
          <el-form-item label="标签文本3">
            <el-input v-model="form.value3" v-show="editable"></el-input>
            <p v-show="!editable">\{{form.value3}}</p>
          </el-form-item>
          <el-form-item label="标签文本4">
            <el-input v-model="form.value4" v-show="editable"></el-input>
            <p v-show="!editable">\{{form.value4}}</p>
          </el-form-item>
          <el-form-item label="标签文本5">
            <el-input v-model="form.value5" v-show="editable"></el-input>
            <p v-show="!editable">\{{form.value5}}</p>
          </el-form-item>
          <el-form-item label="标签文本6">
            <el-input v-model="form.value6" v-show="editable"></el-input>
            <p v-show="!editable">\{{form.value6}}</p>
          </el-form-item>
          <el-form-item label="标签文本7">
            <el-input v-model="form.value7" v-show="editable"></el-input>
            <p v-show="!editable">\{{form.value7}}</p>
          </el-form-item>
          <el-form-item label="标签文本8">
            <el-input v-model="form.value8" v-show="editable"></el-input>
            <p v-show="!editable">\{{form.value8}}</p>
          </el-form-item>
          <el-form-item label="标签文本9">
            <el-input v-model="form.value9" v-show="editable"></el-input>
            <p v-show="!editable">\{{form.value9}}</p>
          </el-form-item>
          <el-form-item label="标签文本0">
            <el-input v-model="form.value0" v-show="editable"></el-input>
            <p v-show="!editable">\{{form.value0}}</p>
          </el-form-item>
          <el-form-item label="标签文本11">
            <el-input v-model="form.value11" v-show="editable"></el-input>
            <p v-show="!editable">\{{form.value11}}</p>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </pagoda-left-right-layout>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      btnVisibles: ['save', 'submit', 'calculate', 'add'],
      rowBtns: {
        save: {
          type: 'primary',
          text: '保存按钮',
          onClick: this.handleSave,
          props: {
            plain: false
          }
        },
        submit: {
          type: 'primary',
          text: '提交按钮',
          onClick: this.handleSubmit,
          props: {
            plain: false
          }
        },
        calculate: {
          text: '计算',
          onClick: this.handleCalculate,
          tooltip: '结合计算方式和采购系数自动计算请购数量'
        },
        add: {
          type: 'primary',
          text: '确认',
          onClick: this.handleSubmit,
          props: {
            plain: false
          }
        }
      },
      fileList: [],
      editable: false,
      editBtns: {
        cancel: {
          text: '取消',
          onClick: () => {
            this.showBtns = false
            this.editable = !this.editable
          }
        },
        save: {
          type: 'primary',
          text: '保存',
          onClick: () => {},
          props: {
            plain: false
          }
        }
      },
      editBtnVisibles: ['cancel', 'save'],
      showBtns: false,
      form: {
        value1: 'XXXXXXXXXX',
        value2: 'XXXXXXXXXX',
        value3: 'XXXXXXXXXX',
        value4: 'XXXXXXXXXX',
        value5: 'XXXXXXXXXX',
        value6: 'XXXXXXXXXX',
        value7: 'XXXXXXXXXX',
        value8: 'XXXXXXXXXX',
        value9: 'XXXXXXXXXX',
        value0: 'XXXXXXXXXX',
        value11: 'XXXXXXXXXX'
      }
    }
  },
  methods: {
    // 切换tab栏触发事件
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 保存按钮触发事件
    handleSave () {
      this.$message.success('保存成功')
    },
    // 计算按钮触发事件
    handleCalculate () {
      this.$message.success('1+1=2')
    },
    // 提交按钮触发事件
    handleSubmit () {
      this.$message.success('提交成功')
    },
    // 编辑icon触发事件
    handleEdit () {
      this.editable = !this.editable
      this.showBtns = true
    }
  }
}
</script>
