<!--********************************************************************
 * Author        : gy
 * Filename      : index.vue
 * Description   : 投保进度－建议书首页

********************************************************************-->

<template>
  <div class='page-progress'>
    <div>
      <tab :animate="false" :line-width="2" active-color="#14a3ff" defaultColor="#666">
        <tab-item v-for="(item,index) in tab" :key="item.id" :selected="seled == index ? true : false" active-class="active" @on-item-click="handler(index, item.id)">
          {{item.name}}
        </tab-item>
      </tab>
    </div>
    <!--<keep-alive>-->
      <component v-bind:is="currentView" :Interface = "boxInterface" :idcode="idcode"></component>
    <!--</keep-alive>-->

    <!--<progressbox  :Interface = "boxInterface" :idcode="idcode"></progressbox>-->
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Tab, TabItem } from 'vformer'
  import {INSBENEFICARYINFOR, PROGRESSTAB, INPROGRESSLIST, IPROGRESSDETAIL, IPROGRESS, IPROGRESSINSURE, IPROGRESSPAY, IPROGRESSFINISH, IPROGRESSDELE, ISAMULET} from '@/api'
  import progressbox from '@/application/main/progressprocess/progressbox'
//  import progressbox from './progressbox'

  // 定义一个使用混合对象的组件
  let allBox = Vue.extend({
    mixins: [progressbox]
  })
  let adviceBox = Vue.extend({
    mixins: [progressbox]
  })
  let insurebox = Vue.extend({
    mixins: [progressbox]
  })
  let finishbox = Vue.extend({
    mixins: [progressbox]
  })
  let paybox = Vue.extend({
    mixins: [progressbox]
  })
  let delebox = Vue.extend({
    mixins: [progressbox]
  })

  export default {
    data: () => {
      return {
        seled: 0,
        tab: [],
        show: true,
        currentView: 'allBox',
        boxInterface: INPROGRESSLIST,
        idcode: 0
      }
    },
    name: 'progressprocess',
    components: {
      Tab, TabItem, progressbox, insurebox, finishbox, delebox, paybox, adviceBox, allBox
    },
    created: function () {
//      this.$store.dispatch('setapplyId', null)
//      this.$store.dispatch('setplanid', null)
//      this.$store.dispatch('setproposal', null)
//      this.$store.dispatch('setproduct', null)
//      if (this.$route.query.type == 3) {
//        this.$store.dispatch('setPressStatus', 3)
//      }
      console.log('store',this.$store);

      this.getTabData()
    },
    props: [],
    methods: {
      getTabData () {
        // @debug
        this.axios.post(PROGRESSTAB).then((response) => {
          console.log(response)
          this.tab = response.data.value
        })
        // @debug
        // this.tab = JSON.parse('[{ "code": "001", "name": "健康险" }, { "code": "002", "name": "理财险" }, { "code": "003", "name": "意外险" }, { "code": "004", "name": "养老险" }, { "code": "005", "name": "其他" }]')
      },
      handler (n, idc) {
        this.boxInterface = INPROGRESSLIST
        this.idcode = idc
        if (n == 0) {
          this.currentView = 'allBox'
        } else if (n == 1) {
          this.currentView = 'adviceBox'
        } else if (n == 2) {
          this.currentView = 'insurebox'
        } else if (n == 3) {
          this.currentView = 'paybox'
        } else if (n == 4) {
          this.currentView = 'finishbox'
        } else {
          this.currentView = 'delebox'
        }
      },
      test () {
//        alert('this is currentView' + this.currentView)
      }
    },
    activated: function () {

    }
  }
</script>

<style lang='less' scoped>
  @import '../../../assets/styles/page.less';
  .page-progress{
  /*@include fullpage;*/
  /*@include display-flex;*/
    position: absolute;
    top:0;left:0;right:0;bottom:0;

    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;

    overflow: hidden;
    background:$bgGray;
  }

</style>
