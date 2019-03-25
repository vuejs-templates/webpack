<template>
  <pagoda-detail-layout-v1 @back="backFunc" content-title="详情页标题" form-title="商品列表">
    <!-- 右上角按钮插槽 -->
    <div slot="content-btn">
      <pagoda-row-btns
        :btns="rowBtns"
        :visibles="btnVisibles"
      >
      </pagoda-row-btns>
    </div>
    <!-- 中间表单插槽 -->
    <div class="clearfix" slot="content-form">
      <pagoda-form-group
        v-model="formData"
        :form-options="formOptions"
        inline
      ></pagoda-form-group>
    </div>
    <!-- 下方主内容区 -->
    <template slot="content">
      <!-- 副标题组件-->
      <pagoda-sub-title>副标题</pagoda-sub-title>
      <pagoda-table
        :request="request"
        ref="tableRef"
      ></pagoda-table>
    </template>
  </pagoda-detail-layout-v1>
</template>

<script>
import { deepCopy } from 'pagoda-ui/src/utils'

export default {
  computed: {
    formOptions () {
      return [{
        label: '表单label',
        key: 'key1',
        type: this.editable ? 'input' : 'text',
        props: {
          clearable: true
        }
      }, {
        label: '表单label',
        key: 'key2',
        type: this.editable ? 'input' : 'text',
        props: {
          clearable: true
        }
      }, {
        label: '表单label',
        key: 'key3',
        type: this.editable ? 'select' : 'text',
        options: [{
          label: 'select-option',
          value: 'select-value1'
        }, {
          label: 'select-option',
          value: 'select-value2'
        }],
        props: {
          clearable: true,
          disabled: true
        }
      }, {
        label: '表单label',
        key: 'key4',
        type: this.editable ? 'select' : 'text',
        options: [{
          label: 'select-option',
          value: 'select-value1'
        }, {
          label: 'select-option',
          value: 'select-value2'
        }],
        props: {
          clearable: true
        }
      }, {
        label: '表单label',
        key: 'key5',
        type: this.editable ? 'select' : 'text',
        options: [{
          label: 'select-option',
          value: 'select-value1'
        }, {
          label: 'select-option',
          value: 'select-value2'
        }],
        props: {
          clearable: true
        }
      }]
    }
  },
  data () {
    return {
      editable: false,
      formData: {
        key1: '默认值',
        key2: '默认值',
        key3: 'select-value2',
        key4: 'select-value1',
        key5: 'select-value1'
      },
      rowBtns: {
        edit: {
          text: '编辑',
          onClick: () => {
            this.cacheFormData = deepCopy(this.formData)
            this.editable = true
            this.btnVisibles = ['save', 'cancel']
          }
        },
        save: {
          text: '保存',
          onClick: () => {
            this.editable = false
            this.btnVisibles = ['edit']
          }
        },
        cancel: {
          text: '取消',
          onClick: () => {
            this.formData = this.cacheFormData
            this.editable = false
            this.btnVisibles = ['edit']
          }
        }
      },
      btnVisibles: ['edit']
    }
  },
  methods: {
    request (_, currentPage) {
      const tableHead = [{
        label: 'id',
        prop: 'id'
      }, {
        label: '姓名',
        prop: 'name'
      }, {
        label: 'rr',
        prop: 'tt'
      }, {
        label: '性别',
        prop: 'sex'
      }, {
        label: '婚否',
        prop: 'married'
      }, {
        label: '年龄',
        prop: 'age'
      }]

      const mokeData = Array.from({
        length: 10
      }, item => (item = {
        id: 1232,
        name: 'adads',
        tt: 'nbpszx',
        sex: 'asdasd',
        married: '是',
        age: 23
      }))

      return new Promise(resolve => {
        // 模拟请求接口
        setTimeout(() => {
          resolve({
            head: tableHead,
            data: mokeData
          })
        }, 20)
      })
    },
    backFunc () {
      this.$router.replace({
        path: '/main'
      })
    }
  }
}
</script>
