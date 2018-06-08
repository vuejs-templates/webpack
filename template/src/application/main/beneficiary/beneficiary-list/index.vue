<template>
  <div class="container benificiary">
    <cust-item
    v-for="(item,index) in multiInsurants"
    :key="index"
    :custinfo="item"
    :propindex="index + 1"
    @onChange="onChange"
    @update="update"
    :applyId="applyId"
    ></cust-item>
    <div class="btn-next" @click="nextStep">下一步</div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import {BENEFICIARTYLIST, QUERYINSURANT, CHECKBENEFICTATY} from '@/api'
  import custItem from './cust-item'

  export default {
    name: 'beneficiary',
    data() {
      return {
        applyId: '',
        multiInsurants: [],
        custCollection: {}
      }
    },
    created() {
      this.applyId = this.$route.query.applyId;
      window.test = this
      if(this.applyId) {
        this.getBeneficiary();
      }
    },
    methods: {
      // 初始化受益人列表
      getBeneficiary() {
        this.axios.post(QUERYINSURANT, {'applyId': this.applyId})
        .then(({data})=>{
          if (data.success){
            this.multiInsurants = data.value
          } else {
            this.$vux.toast.show({
              text: data.errorMsg
            })
          }
        })
        .catch((err) =>{
          console.log(err);
        })
      },
      onChange(v){
        console.log(v)
        this.custCollection[v.insureSeq] = v.isValid
        console.log(this.custCollection)
      },
      // 实时更新数据
      update(){
        this.getBeneficiary();
      },
      nextStep() {
        // 校验是否缺少受益人信息
        let isValid = Object.values(this.multiInsurants).find(i => i.benefictaryDTO.benefictaryCustomerDTOList==null&&i
          .benefictaryDTO.benefictaryType==2)
        // let isValid = Object.values(this.custCollection).find(i=>!i)
        console.log(isValid)
        if(isValid!==undefined) {
          return this.$vux.toast.show({
                    text: '缺少指定受益人信息',
                    type: 'text',
                    width: '50%',
                    isShowMask: true
                  })
         }
        this.axios.post(CHECKBENEFICTATY, {applyId: this.applyId})
        .then(({data}) => {
          if (data.success){
            this.$router.push({path: '/notify/applicant', query:{applyId: this.applyId}})
          } else {
            this.$vux.toast.show({
              text: data.errorMsg
            })
          }
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },
    components: {
      custItem
    }
  }
</script>

<style lang='less' scoped>
   @import "../../../../assets/styles/page.less";
   @import "../../../../assets/styles/form.less";
  .benificiary{
    background-color:@bgGray;
    padding-bottom: 45px;
    .next {
      margin-top: 20px;
      width: 350px;
      height: 46px;
    }
  }
</style>

