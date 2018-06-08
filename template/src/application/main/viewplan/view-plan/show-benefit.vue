<template>
  <div id='userCalc' class='suggest-user-calc info-block'>
    <div class='info-header'>
      <p>{{this.items.content[0].TITLE || '查看保险利益金额'}}</p>
    </div>
    <div class='calc-detail'>
      <!-- 
      <div class='detail-line'>
        <div class='detail-left'>被保险人<span>44</span>岁</div>
        时&nbsp;&nbsp;累计保费
        <div class='detail-right blue'>{{ totalAll }}</div>
      </div>-->

      <div>
        <div>
          <div class='detail-line' v-for="(item, index) in this.items.content[0].HEADER[0]" :key="index">
            <div class='detail-left'>
              <div>{{item}}</div>
            </div>
            <div class='detail-right'><span class="red">{{datatable[index]}}</span></div>
          </div>

        </div>
      </div>

      <!-- <div class="grade">
        <div class="grade-select">
          <div class="grade-btn">
            <div class="grade-btn-item raduis-left">低</div>
            <div class="grade-btn-item">中</div>
            <div class="grade-btn-item raduis-right">高</div>
          </div>
          <div class="grade-txt">"低/中/高代表分红水平"</div>
        </div>
      </div> -->
      <div class='calc-tool'>
        <div class='calc-operate'>
          <i class='operate-before' @click='ageMinus'></i>
          <i class='operate-after' @click='agePlus'></i>
          <p>第1保单年度：被保险人<span>{{curage}}</span>岁</p>
        </div>
        <div class='calc-slide'>
          <CRange @onChange='onChange' :cur='curage' :min='beginage' :max='endage' unit='岁' :follow='true'></CRange>
          <!-- <range v-model="data4" :min="beginage" :max="endage"></range> -->
          <p>在交费期间内，您的每日投入为<span>{{each}}</span>元</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入自定义组件
import { CRange } from "../../../../components";
export default {
  name: "show-benefit",
  props: ["items"],
  components: {
    CRange
  },
  data() {
    return {
      // isGrade: true, // 低中高显示
      // curStage: 1, // 0低 1中 2高
      articleItem: [],
      articleContent: [],
      datatable: [],
      each: 0,
      beginage: 0,
      endage: 0,
      curage: 10,
      years: ""
    };
  },
  created() {
    window.ben = this;
    // this.isGrade = true
    // this.curStage = 1
    this.beginage = this.items.AGE_BEGIN;
    this.endage = this.items.AGE_END;
    this.articleItem = this.items.content[0];
    this.articleContent = this.items.content[0].CONTENT;
    this.curage = this.items.AGE_BEGIN;
    // if (this.items.content.length != 3) {
    //   this.isGrade = false
    //   this.curStage = 0
    // }
    this.getLevel();
  },
  mounted() {},
  watch: {
    curStage() {
      this.getLevel();
    },
    curage() {
      this.getLevel();
    },
    items() {
      this.getLevel();
    }
  },
  computed: {
    // curage: {
    //   get() {
    //     return this.age;
    //   }
    // },
    setCurAge: function(v) {
      // console.log(v)
    },
    // curCalc: function() {
    //   return this.getAgeData(this.age);
    // },
    totalAll: function() {
      let _charge = this.curCalc;
      if (!_charge) return 0;
      let total = 0;
      total += parseFloat(_charge.acciDie.replace("元", ""));
      total += parseFloat(_charge.curLife.replace("元", ""));
      total += parseFloat(_charge.diseDie.replace("元", ""));
      total += parseFloat(_charge.cash.replace("元", ""));
      total += parseFloat(_charge.acciShare[this.curStage].replace("元", ""));
      total += parseFloat(_charge.diseShare[this.curStage].replace("元", ""));
      total += parseFloat(_charge.liveShare[this.curStage].replace("元", ""));
      total += parseFloat(_charge.liveTotal.replace("元", ""));
      total += parseFloat(_charge.acciInsure.replace("元", ""));
      total += parseFloat(_charge.totalShare.replace("元", ""));
      total += parseFloat(_charge.yearShare.replace("元", ""));
      return total + "元";
    }
  },
  methods: {
    getLevel() {
      this.articleContent = this.items.content[0].CONTENT;
      this.beginage = this.items.AGE_BEGIN;
      this.endage = this.items.AGE_END;
      // this.curage = this.age
     
      if (! Object.keys(this.articleContent).length > 1) {
        return;
      }

      let a = this.articleContent.find((v, i, arr) => {
        return v[1] == this.curage;
      });

      if (a) {
        this.datatable = [...a];
        this.each = this.datatable[this.datatable.length - 1];
      } else {
        this.each = 0;
        this.datatable = [];
      }
    },
    // getAgeData(curAge) {
    //   for (let item of this.pageData.chargeInfo.ageList) {
    //     if (curAge === item.age) {
    //       return item;
    //     }
    //   }
    //   return null;
    // },
    getDetailLeft(val) {
      return val.split("|");
    },
    OnCheck(val) {
      this.curStage = val;
    },
    agePlus() {
      this.curage = this.curage + 1 <= this.items.AGE_END ? this.curage + 1 : this.items.AGE_END;
    },
    ageMinus() {
      this.curage = this.curage - 1 >= this.items.AGE_BEGIN ? this.curage - 1 : this.items.AGE_BEGIN;
    },
    onChange(age) {
      this.curage = age;
    },
    check(v) {
      this.curStage = v;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../../assets/styles/page.less";
.suggest-user-calc {
  .info-header {
    padding: 10px;
    background-color: @tableHeadBg;
    text-align: center;
    color: #333333;
  }
  /*font-weight:bold;*/
  // padding-bottom: 26px;
  .calc-detail {
    background: @white;
    padding-left: 8px;
    padding-right: 8px;
    // & .detail-line:first-child {
    //   font-size: 15px;
    // }
    & .detail-line.end {
      border-bottom: none;
    }
    .detail-line {
      position: relative;
      line-height: 24px;
      height: auto !important;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 12px;
      padding-right: 7px;
      border-bottom: 1px solid #f0f0f0;
      .detail-left {
        max-width: 70%;
        padding-right: 20px;
        span {
          color: #00aeff;
        }
      }
      .detail-right {
        position: absolute;
        bottom: 10px;
        right: 7px;
        max-width: 50%;
        color: #999;
      }
      .blue {
        color: #00aeff;
      }
    }
    .detail-line:after {
      content: " ";
      display: block;
      height: 0;
      font-size: 0;
      clear: both;
    }
    .detail-line.noline {
      border-bottom: none;
    }
    .calc-dividend {
      padding-bottom: 18px;
      background-color: #f8f8f8;
      & .detail-line:nth-child(2) {
        border-bottom: none;
      }
      .calc-btn-group {
        margin-top: 6px;
        margin-bottom: 14px;
      }
      .check-tip {
        font-size: 13px;
        text-align: center;
        color: #949494;
      }
      .detail-left {
        color: #00aeff;
      }
    }
  }
  .grade {
    background: #f8f8f8;
    .grade-select {
      .grade-btn {
        display: flex;
        height: 30px;
        line-height: 30px;
        width: 90%;
        text-align: center;
        margin: 0 auto;
        padding: 10 0;
        .grade-btn-item {
          flex: 1;
          border-right: 1px solid #dfdfdf;
          // @include borderleft-1px(#fff);
          background: #fff;
          color: #00aeff;

          &:last-child {
            border-width: 0;
          }
        }
        .raduis-left {
          border-radius: 10 0 0 10;
        }
        .raduis-right {
          border-radius: 0 10 10 0;
        }
        .active {
          background-color: #00aeff;
          color: #fff;
        }
      }
      .grade-txt {
        text-align: center;
        font-size: 13px;
        line-height: 25px;
        color: #999;
      }
    }
    .grade-prompt {
      padding-top: 20;
      font-size: 13px;
      line-height: 25px;
      color: #999;
    }
  }
  .calc-tool {
    /*font-weight:bold;*/
    margin-top: 26px;
    .calc-operate {
      text-align: center;
      height: 26px;
      position: relative;
      p {
        font-size: 15px;
        line-height: 26px;
        color: #333;
        font-weight: normal;
        span {
          color: #00aeff;
          font-weight: bold;
        }
      }
      i {
        position: absolute;
        width: 26px;
        height: 26px;
        background-color: #dedede;
        color: #fff;
        font-size: 36px;
        line-height: 26px;
        font-weight: normal;
        text-align: center;
        vertical-align: middle;
        font-style: normal;
      }
      .operate-before {
        left: 0;
        top: 0;
        background: url(~@/assets/styles/images/subtract.png) no-repeat;
        background-size: cover;
      }
      .operate-after {
        right: 0;
        top: 0;
        background: url(~@/assets/styles/images/plus.png) no-repeat;
        background-size: cover;
      }
    }
    .calc-slide {
      margin-top: 32px;
      padding-bottom: 16px;
      p {
        font-size: 12px;
        color: #999;
        text-align: center;
        margin-top: 16px;
        span {
          color: @colorPremium;
        }
      }
    }
  }
  .red {
    color: @colorPremium;
  }
}
</style>