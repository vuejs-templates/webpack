<!--
  保险产品详细模块
  -- jankergg
-->
<template>
  <div class="container choose-plan">
    <check-list labelPosition="right" required :options="prolist" v-model="checkList"></check-list>
    <div class="page__ft">
      <div @click="nextStep" class="btn-next"> 确定</div>
    </div>
  </div>
</template>

<script>
import { checkList } from 'vformer'
import { MAININSLIST, LOADRIDERINSLIST, SETPRODUCTLIST, SETRIDERINSLIST } from '@/api'
export default {
  name: 'choose-plan',
  data() {
    return {
      checkList: [],
      prolist: [],
      type: this.$route.query.type
    }
  },
  created() {
    window.choose = this
    this.getData()
  },
  methods: {
    getData() {
      // 判断是获取主险还是附加险
      let getInsList = MAININSLIST
      let params = {}
      if (this.type === 'rider') {
        getInsList = LOADRIDERINSLIST
        const { insureId, planId, parentId } = this.$route.query
        params = { insureId, planId, productId: parentId }
      }
      this.axios.post(getInsList, params).then(({ data }) => {
        if (data.success) {
          const list = this.type === 'rider' ? data.value.riderList : data.value
          this.prolist = list.map(item => {
            return {
              key: item.subCode,
              value: item.subName,
              link: item.bigUrl,
              ...item
            }
          })
        } else {
          this.__toast(data.errorMsg)
        }
      })
    },
    setProductList() {
      const { insureId, planId, parentId } = this.$route.query
      const productIds = this.checkList
      // 默认是添加主险的接口
      let postApi = SETPRODUCTLIST
      let params = { insureId, productIds, planId }

      if (parentId && this.type === 'rider') {
        params.parentId = parentId
        // 添加附加险的接口
        postApi = SETRIDERINSLIST
      }
      return this.axios.post(postApi, params)
    },
    nextStep() {
      this.setProductList().then(({ data }) => {
        if (data.success) {
          let mainQuery = { ...this.$route.query }
          // 删除险种类型，这个不需要回传
          delete mainQuery.type
          delete mainQuery.parentId
          this.$router.replace({ name: 'make-plan', query: mainQuery })
        } else {
          this.__toast(data.errorMsg)
        }
      })
    }
  },
  components: {
    checkList
  }
}
</script>
<style lang='less'>
@import '../../../../assets/styles/page.less';
@import "../../../../assets/styles/weui/widget/weui-button/weui-button";
@import "../../../../assets/styles/weui/widget/weui_cell/weui_check";
.choose-plan {
  .page__ft {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
