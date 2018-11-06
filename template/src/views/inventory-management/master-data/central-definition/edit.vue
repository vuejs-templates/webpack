<template>
  <div>
    <div class="edit-title">存货库房中心修改</div>
    <pagoda-form-group :form-options="formOptions" v-model="formData" label-width="140px" inline></pagoda-form-group>
    <el-button @click="$router.go(-1)">取消</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formOptions: [{
          type: 'text',
          label: '机构名称',
          key: 'name'
        }, {
          type: 'text',
          label: '成本组名称',
          key: 'name2'
        }, {
          type: 'text',
          label: '库房中心代码',
          key: 'code'
        }, {
          type: 'select',
          label: '库房中心名称',
          key: 'name3',
          options: [{
            label: '1'
          }]
        }, {
          type: 'text',
          label: '存货当前核算期',
          key: 'date'
        }],
        formData: {
          name: '初加工',
          name2: '初加工',
          code: '9090',
          date: '201801'
        }
      }
    }
  }
</script>

<style>
  .edit-title {
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 18px;
  }
</style>
