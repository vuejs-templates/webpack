<template>
   <div class="cust-item">
        <div class="insuran_index">
          <p>第{{ propindex }}被保险人 <span>{{custinfo.name}}</span></p>
        </div>
        <ul class="weui-navbar">
            <li v-for='(tab, index) in tabs' class="weui-navbar__item" :class="{'weui-bar__item_on': current==index + 1}" @click="saveBenefictary(index)" :key="index">
                {{ tab.name }}
            </li>
        </ul>
        <ul>
          <div>
            <ul class="wrap" v-if="custinfo.benefictaryDTO">
              <li class="contents" v-for="(item, idx) in custinfo.benefictaryDTO.benefictaryCustomerDTOList"  v-if="current==2" :key="idx">
                <div class="first-line">
                  <span class="name">{{ item.name }}</span>
                  <span class="relation">{{ item.relation }}</span>
                  <span class="ratio">受益比例</span>
                  <span class="percentage">{{item.benefitRatio }}%</span>
                  <span class="arrow" @click="edit(custinfo.insureSeq, item.custId)"></span>
                </div>
                <div class="seconde-line">
                  <span class="certNo">证件&nbsp;&nbsp;{{ item.certNo }}</span>
                  <span class="vilidate">有效期&nbsp;&nbsp;{{ item.certValidity }}</span>
                </div>
                <div class="third-line"><span @click="del(custinfo.insureSeq, item.custId)" class="del"><i class="icon_delete"></i>删除</span></div>
              </li>
            </ul>
              <router-link :to="{path: 'beneficiary-info', query: {applyId: this.applyId, insureSeq: custinfo.insureSeq, benefictaryType: current}}" v-if="current==2">
                <div class="weui-btn add"><span class="icon-add-blue"></span>&nbsp;<span>添加受益人</span></div>
              </router-link>
          </div>
        </ul>
    </div>
</template>

<script>

import {DELETEBENEFICTARY, SAVEAPPLIANTADDINSURANT, SAVEASSIGNBEBEFICTORY} from '@/api'

export default {
  data(){
    return {
      tabs: [
        {name:'法定受益人'},
        {name:'指定受益人'},
        {name:'投保人为受益人'}
      ],
      insuranRelation: '',
      relation:[
        {
          name: '父母',
          value: '01'
        },
        {
          name: '配偶',
          value: '02'
        },
        {
          name: '子女',
          value: '03'
        },
        {
          name: '祖孙',
          value: '04'
        },
        {
          name: '监护',
          value: '05'
        },
        {
          name: '其他',
          value: '06'
        },
        {
          name: '保单服务人员',
          value: '07'
        },
        {
          name: '直系亲属',
          value: '08'
        }
      ],
      current: 0,
      isValid: true
    }
  },
  props: {
    custinfo: Object,
    applyId: '',
    propindex: Number
  },
  // computed:{
  //   pointed(){// 是否有指定受益人
  //     return this.custinfo.benefictaryDTO.benefictaryCustomerDTOList
  //     if (this.custinfo.benefictaryDTO.benefictaryCustomerDTOList == null) {
  //       return false
  //     } else {
  //       return true
  //     }
  //   }
  // },
  watch: {
    // current(v){
    //   if(v==2){
    //     this.isValid = this.pointed
    //   } else {
    //     this.isValid = true
    //   }
    // }
  },
  created(){
    window.cust = this
    // this.commit()
  },
  mounted(){
    console.log(this.propindex)
    this.$nextTick(() => {
      if (this.custinfo.benefictaryDTO) {
        this.current = this.custinfo.benefictaryDTO.benefictaryType 
        // this.commit()
        if (this.custinfo.benefictaryDTO.benefictaryCustomerDTOList) {
           this.custinfo.benefictaryDTO.benefictaryCustomerDTOList.forEach(item1 => {
            this.relation.forEach(item2 =>{
              if(item2.value === item1.relation){
                item1.relation = item2.name
              }
            })
          })
        }
      } 
      else {
        this.current = 0
      }
    })
  },
  methods:{
    saveBenefictary(index){      
      this.current = index + 1
      this.axios.post(SAVEASSIGNBEBEFICTORY, {applyId: this.applyId, insureSeq: this.custinfo.insureSeq, benefictaryType: this.current})
          .then(({data}) => {
            if (data.success) {
              this.$emit('update')
              // 去更新数据，然后在校验
            } else {
              this.$vux.toast.show({
                text:data.errorMsg
              })
            }
          })
          .catch((err) => {
            console.log(err);
          }) 
    },
    commit(event){
      // 等数据请求回来了再去判断
      // 向父组件emit事件
      // debugger
      if (this.custinfo.benefictaryDTO.benefictaryType == 2) {
          if (this.custinfo.benefictaryDTO.benefictaryCustomerDTOList == null) {
            this.isValid = false
          } else {
            this.isValid = true
          }
      } else {
        this.isValid = true
      }
      this.$emit(event||'onChange', {insureSeq: this.custinfo.insureSeq, index: this.current, isValid: this.isValid})
    },
    // 删除受益人
    del(insureSeq, custId) {
      if (this.custinfo.benefictaryDTO.benefictaryCustomerDTOList && this.custinfo.benefictaryDTO.benefictaryCustomerDTOList.length == 1) {
        this.$vux.toast.show({
          text: '当前仅有一个指定受益人，不能删除',
          type: 'text',
          width: '50%',
          isShowMask: true
        })
      } else {
        this.axios.post(DELETEBENEFICTARY, {
          applyId:      this.applyId,
          insureSeq:   insureSeq,
          custId:       custId
        })  
        .then(({data}) => {
          if (data.success){
            this.$emit('update')
          } else {
            this.$vux.toast.show({
              text: data.errorMsg
            })
          }
        }).catch((e) => {
          console.log(e)
          // throw new Error(e)
        })
      }
    },
    // 重新编辑受益人
    edit(insureSeq, custId) {
      this.$router.push({path: 'beneficiary-info', 
      query: {
        applyId:     this.applyId,
        insureSeq:   insureSeq,
        custId:       custId,
        benefictaryType: this.current
        }
      })
    },
  }
}
</script>
<style lang='less' scoped>
  @import '../../../../assets/styles/weui/widget/weui_tab/navbar.less';
  @import "../../../../assets/styles/page.less";
  @import "../../../../assets/styles/form.less";

  .delIcon(@c: url('../../../../assets/styles/images/delete.png')) {
    width: 20px;
    height: 20px;
    background: @c;
    background-size: 100%;
  }
  .cust-item{
    background-color: #ffffff;
    height: 100%;
    padding: 0 15px;
    margin-bottom: 10px;
    .insuran_index{
      height: 45px;
      line-height: 45px;
      color: #666666;
      font-size: 15px;
      p:before{
        content: '';
        display: inline-block;
        width: 11px;
        height: 16px;
        border-left: 3px solid #006def;
        vertical-align: middle;
      }
    }
    .weui-navbar {
      border: 1px solid @btnBlue;
      color: @btnBlue;
      margin-bottom: 15px;
      li.weui-navbar__item{
        height: 38px;
        font-size: 14px;
        line-height: 38px;
        padding: 0;
      }
    }
    .weui-navbar__item[data-v-39e951fc]:after{
      border-right: 2px solid @btnBlue;
    }
    .weui-navbar{
      position: relative;
    }
    .contents {
      background-color: #f7f7f7;
      font-size: 15px;
      border-bottom: 1px solid #efefef;
      color: #999999;
      position: relative;
      padding: 11px 13px 0 13px;
      .first-line {
        display: flex;
        margin-bottom: 17px;
        span {
            display: inline-block;
            font-size: 15px;
            position: relative;
        }
        .name {
          width: 24%;
          font-size: 15px;
          color: #282828;
          border-right: 1px solid #dedede;
        }
        .relation{
          width: 27.3%;
           color: #282828;
           border-right: 1px solid #dedede;
           text-align: center;
        }
        .ratio {
          width: 25%;
           color: #282828;
           text-align: right;
           margin-right: 10px;
        }
        .percentage {
           color: red;
           width: 16.8%;
        }
      }
      .seconde-line{
        display: flex;
        padding-bottom: 15px;
        border-bottom: 1px solid #efefef;
        .certNo {
          width: 60%;
          font-size: 13px;
          color: #bbbbbb;
        }
        .vilidate {
          width: 39%;
          font-size: 13px;
          color: #bbbbbb;
        }
      }
      .third-line{
        height: 45px;
        line-height: 45px;
        span{
          display: inline-block;
          width: 100%;
          text-align: right;
          color: @btnBlue;
            .icon_delete{
              background:url('../../../../assets/styles/images/common/delete_2x.png') no-repeat center center;
              width:22px;
              height:22px;
              background-size: cover;
              display: inline-block;
              vertical-align: text-bottom;
            }
        }
      }
      span.arrow {
        content: " ";
        display: inline-block;
        height: 10px;
        width: 10px;
        border-width: 1px 1px 0 0;
        border-color: @btnBlue;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        margin-top: 6px;
      }
    }
    .add {
      width: 48%;
      border: 1px solid @btnBlue;
      margin-top: 29px;
      margin-bottom: 29px;
      background-color: #ffffff;
      color: @btnBlue;
      font-size: 16px;
      span{
        vertical-align: middle;
      }
    }
  }
</style>