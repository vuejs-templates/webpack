<template>
  <div style="padding: 20px">
    <div>搜索模块</div>
    <div class="searchCon">
      <Search :searchConfig="searchConfig" class="ser" v-on:Search="searchRef = $event" >
        <template slot="button">
          <div class="tgf">
            <el-button type="primary" @click="subSearch">提交</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
        </template>
      </Search>
      <div class="rig">
        <div class="tgf"><el-button type="primary" @click="subSearch">提交</el-button></div>
        <div class="tgf"><el-button @click="reset">重置</el-button></div>
      </div>
    </div>
    <div>表格数据模块</div>
    <Table :tableConfig="tableConfig" :tabDataList="tabDataList" >
    </Table>
  </div>
</template>
<script>
export default {
  name: 'TaskPoolIndex',
  data () {
    return {
      tableConfig: { // 表格配置
        headerCellStyle: {background: '#e8eef4'},
        stripe: true,
        page: {
          totalRecords: 100,
          pageNum: 0,
          pageSize: 10,
          totalPages: 10,
          showPageInfo: true
        },
        columnObj: [
          {
            label: '发起部门',
            props: 'departmentType'
          },
          {
            label: '接收部门',
            props: 'taskType'
          },
          {
            label: '任务分类',
            props: 'taskSubType1'
          },
          {
            label: '任务分类二级',
            props: 'taskSubType2'
          },
          {
            label: '任务分类三级',
            props: 'taskSubType3'
          },
          {
            label: '新建超时时效',
            props: 'taskEffectiveTime'
          },
          {
            label: '处理中超时时效',
            props: 'taskTimeOutValue'
          },
          {
            label: '任务负责人',
            props: 'taskResponseManValue'
          },
          {
            label: '操作',
            fixed: 'right',
            width: 330,
            props: 'ca',
            slot: 'control'
          }
        ],
        selection: {
        }
      },
      searchConfig: { // 搜索模块配置
        labelPosition: 'left', // 标签对齐方式
        colMinWidth: '400px', // 列最小宽度     默认是400px
        gutter: 40,
        size: 'medium', // 组件大小
        columns: 4, // 一行显示列数
        labelWidth: '180px', // 组件标题的宽度
        config: [
          {
            type: 'input',
            defaultValue: '',
            clearable: true,
            label: '文本框',
            placeholder: '请输入',
            modelname: 'keywordActivityName'
          },
          {
            type: 'inputNumber',
            defaultValue: '',
            clearable: true,
            label: '计数器',
            modelname: 'erty'
          },
          {
            type: 'textarea',
            defaultValue: '',
            label: '文本域',
            placeholder: '请输入',
            modelname: 'sdsd'
          },
          {
            type: 'composite',
            defaultValue: '',
            clearable: true,
            label: '复合型',
            slot: {
              type: 'prepend',
              text: 'Http://'
            },
            placeholder: '请输入',
            modelname: 'dfd'
          },
          {
            type: 'composite',
            defaultValue: '',
            clearable: true,
            label: '复合型前置输入框',
            slotText: {
              positionType: 'prepend',
              text: 'Http://'
            },
            placeholder: '请输入',
            modelname: 'dfertd'
          },
          {
            type: 'composite',
            defaultValue: '',
            clearable: true,
            label: '复合型后置输入框',
            slotText: {
              positionType: 'append',
              text: '.com'
            },
            placeholder: '请输入',
            modelname: 'ert'
          },
          {
            type: 'composite',
            defaultValue: '',
            clearable: true,
            label: '复合型后置带按钮输入框',
            slotButton: {
              positionType: 'append',
              text: '搜索'
            },
            placeholder: '请输入',
            modelname: 'oo'
          },
          {
            type: 'select',
            defaultValue: 'sd',
            label: '下拉框',
            clearable: true,
            options: [
              {label: 'sd', value: 'sd'},
              {label: 'fg', value: 'fg'}
            ],
            placeholder: '请选择',
            modelname: 'select'
          },
          {
            type: 'select',
            defaultValue: [],
            label: '下拉框多选',
            multiple: true,
            options: [
              {label: 'sd', value: 'sd'},
              {label: 'fg', value: 'fg'}
            ],
            placeholder: '请选择',
            modelname: 'erttg'
          },
          {
            type: 'select',
            defaultValue: '',
            label: '可搜索下拉框',
            filterable: true,
            options: [
              {label: 'sd', value: 'sd'},
              {label: 'fg', value: 'fg'}
            ],
            placeholder: '请选择',
            modelname: 'fbgyuy'
          },
          {
            type: 'cascader',
            defaultValue: ['zhinan', 'shejiyuanze', 'yizhi'],
            label: '级联选择器',
            placeholder: '请选择',
            modelname: 'fbgr',
            options: [
              {
                value: 'zhinan',
                label: '指南',
                children: [{
                  value: 'shejiyuanze',
                  label: '设计原则',
                  children: [{
                    value: 'yizhi',
                    label: '一致'
                  }]
                }]
              },
              {
                value: 'we',
                label: '指南2',
                children: [{
                  value: 'rt',
                  label: '设计原则2',
                  children: [{
                    value: 'ty',
                    label: '一致2'
                  }]
                }]
              }
            ]
          },
          {
            type: 'activeCascader',
            defaultValue: [],
            label: '动态加载次级选项',
            placeholder: '请选择',
            modelname: 'rtyu',
            handleItemChange: this.handleItemChange,
            cascaderProps: {
              value: 'value',
              children: 'children'
            },
            options: [
              {
                label: '江苏',
                value: 'js',
                children: []
              }, {
                label: '浙江',
                value: 'zj',
                children: []
              }
            ]
          },
          {
            type: 'radioGroup',
            defaultValue: '1',
            label: '单选框组合',
            modelname: 'vbg',
            options: [
              {value: '1', label: '男'},
              {value: '2', label: '女'}
            ]
          },
          {
            type: 'radioGroup',
            defaultValue: '1',
            label: '单选框组合按钮形式',
            modelname: 'ghu',
            radioButton: true,
            options: [
              {value: '1', label: '男'},
              {value: '2', label: '女'}
            ]
          },
          {
            type: 'checkbox',
            defaultValue: true,
            label: '单一的多选框',
            modelname: 'ghurty',
            CheckboxText: '备选项'
          },
          {
            type: 'checkboxGroup',
            defaultValue: ['1', '2'],
            label: '多选框组',
            modelname: 'ertgb',
            options: [
              {value: '1', label: '苹果'},
              {value: '2', label: '橘子'},
              {value: '3', label: '栗子'}
            ]
          },
          {
            type: 'checkboxGroup',
            defaultValue: ['1', '3'],
            label: '多选框组',
            modelname: 'egtb',
            checkboxButton: true,
            options: [
              {value: '1', label: '苹果'},
              {value: '2', label: '橘子'},
              {value: '3', label: '栗子'}
            ]
          },
          {
            type: 'baseDatePicker',
            placeholder: '选择日期',
            defaultValue: '2018-07-18',
            pickerType: 'date',
            label: '基础的日期选择控件',
            modelname: 'tyhe'
          },
          {
            type: 'otherDatePicker',
            placeholder: '选择周',
            defaultValue: '',
            pickerType: 'week',
            label: '其他日期单位',
            modelname: 'dcvc'
          },
          {
            type: 'dateTimePicker',
            placeholder: '选择日期时间',
            defaultValue: '',
            pickerType: 'datetime',
            label: '日期和时间点',
            modelname: 'eftry'
          },
          {
            type: 'datetimerange',
            label: '日期和时间范围',
            rangeSeparator: '至',
            modelname: 'wett'
          },
          {
            type: 'slot',
            slot: 'button'
          }
        ]
      }
    }
  },
  components: {
  },
  computed: {
    tabDataList () {
      return [].concat(this.$store.state.list)
    }
  },
  mounted () {
    this.getTableData()
  },
  activated () {},
  methods: {
    getTableData () {
      let params = {url: 'getOperatingActivityList', method: 'post', data: {pageNum: 8, pageSize: 1}, headers: {UserName: 'fanjuan@tuhu.cn'}}
      this.$store.dispatch('demo/getOperatingActivityList', params)
    },
    reset () {
      this.searchRef.$refs['serachForm'].resetFields()
    },
    subSearch () {
      console.log(this.searchRef.formData)
    },
    // 动态获取级联选项方法
    handleItemChange (val) {
      setTimeout(_ => {
        console.log(val)
      }, 300)
    }
  }
}
</script>
<style lang="scss" scoped>
.searchCon{
  display: flex;
}
.ser{
  width: calc(100vw - 100px);
}
.rig{
  width: 100px;
  padding-left: 20px;
  display: flex;
  flex-direction: column-reverse;
}
.tgf{
  padding: 10px 0;
}
</style>
