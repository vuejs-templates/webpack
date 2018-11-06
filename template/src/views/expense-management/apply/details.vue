<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/expense-management/apply">客户费用申请</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>
    <pagoda-erp-detail title="详情" :data="details" item-width="250px"></pagoda-erp-detail>
  </div>
</template>

<script>
  export default {
    name: 'EXPENSE_MANAGEMENT_APPLY_DETAILS',
    data () {
      return {
        details: [
          {
            label: '结算单号',
            content: '10883399'
          },
          {
            label: '机构名称',
            content: '深圳配送中心'
          },
          {
            label: '机构代码',
            content: 'szpsk'
          },
          {
            label: '供应商名称',
            content: '南山科技园店'
          },
          {
            label: '供应商代码',
            content: '98872782'
          },
          {
            label: '发票录入状态',
            content: '未录入'
          },
          {
            label: '应付金额',
            content: '¥ 800.00'
          },
          {
            label: '应付未税金额',
            content: '¥ 720.00'
          },
          {
            label: '核算期',
            content: '201803'
          },
          {
            label: '备注',
            content: '大打算打算发发生的发生大大发顺丰'
          }
        ]
      }
    }
  }
</script>
