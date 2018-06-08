<!--
  保险产品详细模块
  -- jankergg
  说明：初始化拉取数据方法：loadProduct()
  添加主险：添加完之后调用 loadProduct()，用以获取完整数据
  删除险种：删除完之后调用 loadProduct重新初始化
-->
<template>
  <div class="container make-plan">
    <header>
      <tabs :insurantList="insList" :selected="insIndex" label="name" @onSelect="onChangeInsurant"></tabs>
    </header>
    <div class="page__hd" v-if="isEmpty">
      <p class="page__desc">保险计划</p>
      <div class="btn_box">
        <button class="weui-btn weui-btn_plain-primary" @click="addInsProduct">添加主险</button>
      </div>
    </div>
    <div class="page__bd" v-else>
      <div class="plan-detail">
        <div class="space-between">
          <div class="left">保险计划</div>
          <div class="right" @click="addInsProduct">更改主险</div>
        </div>
        <!-- 遍历循环渲染产品列表 -->
        <div class="product-item-box" v-for="(product, index) in productList" :key="index">
          <product-item :name="product.productId" :product="product"
          @onSyncData="syncDataFromInside"
          @onAddRider="addInsProduct"
          @onRemove="removeProduct"
          @onInit="onProductInit">
          </product-item>
        </div>
      </div>
    </div>
    <div class="page__ft">
      <div class="totalprice">首年保费合计: &nbsp;
        <span class="Premium">{{totalmoney}}元</span>
      </div>
      <div class="btn-next" @click="nextStep">生成计划书</div>
    </div>
  </div>
</template>

<script>
import productItem from '@/components/product-item'
import { tabs } from '@/components/index'
import { LOADALLINSURANT, LOADPROLIST, RMVPRODUCT, VIEWPLAN, QUERYPROGRESS } from '@/api'

export default {
  name: 'make-plan',
  data() {
    return {
      //被保人列表
      insList: [],
      // 默认被保人
      insIndex: 0,
      // 产品列表，由接口获取
      productList: [],
      // 总金额，由接口获取
      totalmoney: '',
      // 表单集合
      formCollection: {},
      // 产品是否为空，用来展示默认界面
      isEmpty: true
    }
  },
  created() {
    //主FXL000001，附FXL000003
    window.makeplan = this
    const { planId } = this.$route.query
    let insList = this.$store.getters.getInsList
    // 先读取store, 以planId为索引
    if (!insList || !insList[planId]) {
      this.loadAllInsurant()
    } else {
      this.insList = insList[planId]
    }
  },
  watch: {
    insList: {
      deep: true,
      handler(v) {
        // 如果有被保人ID，则拉取保单详情
        let {insureId} = this.$route.query
        if (insureId) {
          if (v && v.length) {
            let ins = v.find(i => i.insureId === insureId)
            // 更新 tab 显示
            this.insIndex = v.indexOf(ins)
          }
          this.loadProduct()
        } else {
          // 否则默认切换到第一被保人
          this.onChangeInsurant(0)
        }
      }
    }
  },
  methods: {
    // ==================================================初始化操作=====================================================================
    //初始化formUnit组件
    onProductInit(v) {
      // v: {name:{}}
      // 将当前表单挂载到当前结点
      Object.assign(this.formCollection, v)
    },
    //加载所有被保人
    loadAllInsurant() {
      const { planId } = this.$route.query
      return this.axios.post(LOADALLINSURANT, { planId }).then(({ data }) => {
        if (data.success) {
          let plans = data.value.content.planList
          this.insList = plans ? plans[0].insurants : []
          // 存储insList, 并以planId为key
          if (this.insList) {
            let storeObj = {}
            storeObj[planId] = [...this.insList]
            this.$store.dispatch('setInsList', storeObj)
          }
        } else {
          this.__toast(data.errorMsg)
        }
      })
    },
    // 初始化时拉取数据
    loadProduct() {
      const { insureId, planId } = this.$route.query
      this.axios.post(LOADPROLIST, { insureId, planId }).then(({ data }) => {
        if (data.success) {
          this.setInitData(data)
        } else {
          this.__toast(data.errorMsg)
        }
      })
    },
    // ==================================================数据处理=====================================================================
    //初始化数据
    setInitData(data) {
      const res = data.value.content
      // 如果规则有错，就触发提示
      if (res.ruleList && res.ruleList.length){
        this.__toast(res.ruleList[0])
      }
      this.totalmoney = res.totalPremium
      this.productList = res.insurants[0] ? res.insurants[0].productList : []
      this.isEmpty = !this.productList.length
    },
    //切换被保险人
    onChangeInsurant(index) {
      let query = { ...this.$route.query }
      if (query.insureId !== this.insList[index].insureId) {
        query.insureId = this.insList ? this.insList[index].insureId : ''
        this.$router.replace({ name: 'make-plan', query: query })
        this.loadProduct()
      }
    },
    syncDataFromInside(data) {
      // 同步一下总金额
      this.totalmoney = data.value.content.totalPremium
    },
    // ==================================================增删保险操作=====================================================================
    // 添加险种
    addInsProduct(e, parentId) {
      // 如果是添加附加险，会多传过来一个parentId
      // 此时e == ‘rider’
      let query = { ...this.$route.query, type: 'main' }
      if (typeof e === 'string') {
        query.type = e
        query.parentId = parentId
      }
      this.$router.push({ name: 'choose-plan', query: query })
    },
    // 删除险种
    removeProduct(e, product) {
      const { commodityId } = product
      const { planId, insureId } = this.$route.query
      let params = { insureId, commodityId, planId }
      // 如果是附加险则带上parentId
      if (product.parentId) {
        params.parentId = product.parentId
      }
      return this.axios.post(RMVPRODUCT, params).then(({ data }) => {
        if (data.success) {
          // 重新拉取数据
          return this.loadProduct()
        } else {
          this.__toast(data.errorMsg)
        }
      })
    },
    // ==================================================验证类=====================================================================
    // 验证全部
    validateAll() {
      // get form
      const forms = Object.keys(this.formCollection)
      // get form promised
      const formPromise = forms.map(form => this.formCollection[form].validateAll())
      return Promise.all(formPromise).then(res => {
        let unsolved = res.find(i => i !== true)
        if (unsolved === undefined) {
          return true
        } else {
          return unsolved
        }
      }).catch(e => { console.log(e) })
    },
    getProgress(){
      const { planId } = this.$route.query
      return this.axios.post(QUERYPROGRESS, { planId }).then(({ data })=>{
        console.log('progress', data)
      })
    },
    nextStep() {
      this.validateAll().then(res => {
        if (res === true) {
          const { planId } = this.$route.query
          this.axios.post(VIEWPLAN, { planId }).then(({ data }) => {
            if (data.success) {
              // this.getProgress()
              this.$router.push({ name: 'view-plan', query: { planId } })
            } else {
              if (data.errorMsg) {
                this.$vux.toast.show({ text: data.errorMsg })
              }
            }
          })
        } else {
          let errorMsg = res.getErrorMsg()
          this.$vux.toast.show({ text: errorMsg })
        }
      })
    }
  },
  components: {
    productItem,
    tabs
  }
}
</script>
<style lang='less' scoped>
  @import '../../../../assets/styles/page.less';
  .container {
    padding-bottom: 50px;
    background: @titleBg;
  }
  .make-plan{
    header {
      padding: 10px 0;
      background: @weuiBgColorPlain;
    }
    .page__hd{
      padding:10px;
    }
    .page__bd {
      padding: 0 10px;
    }
    .page__desc{
      padding:10px 0;
      color: @titleColor;
    }
    .right {
      color: @btnBlue;
      padding: 2px 4px;
      border: 1px solid @btnBlue;
    }
    .page__ft,.weui-cell__ft{
      display: flex;
      overflow: hidden;
      position: fixed;
      height: 50px;
      left: 0;
      bottom: 0;
      right:0;
      text-align: center;
      line-height: 50px;
      background: @weuiBgColorPlain;
      .totalprice {
        flex: 6;
        font-size: 16px;
        box-sizing: border-box;
        .price{
          color: @weuiColorPrimary;
          font-weight: bold;
        }
        .Premium {
          color: @colorPremium;
        }
      }
      .btn-next{
        flex: 4;
        height: 50px;
        position: relative;
        font-size: 17px;
        line-height: 50px;
      }
    }
  }
</style>
