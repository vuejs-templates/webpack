<template>
  <div class="container">

    <header>
      <!-- <div class="banner">
        <img src="" alt="">
      </div> -->
    </header>

    <article id="suggposfix">
      <section id="userInfo">

        <div class='info-header'>
          <p>敬呈<span style="color: #00aeff">{{applicant && applicant.name}}</span>男士的专属投保方案</p>
        </div>
        <div class='applicant-info info-line'>
          <p class="icon-addPerson">投保人</p>
          <div class="applicant-info-line">
            <p class='info-item'>
              <span>
                <div class="info_ico info_ico_name"></div>
                <div>{{applicant && applicant.name}}</div>
              </span>
              <span>
                <div class="info_ico info_ico_sex"></div>
                <div>{{applicant && _Sex(applicant.genderCode)}}</div>
              </span>
              <span>
                <div class="info_ico info_ico_age"></div>
                <div>{{applicant && applicant.age}}岁</div>
              </span>
            </p>
          </div>
        </div>

        <!-- <tabs v-if="content && Object.keys(content).length >= 1" :insurantList="content.insurants" :selected="tabIndex" :disabled="isDisabled" label="name" @beforeSelect="beforeSelect" @onSelect="onSelect" style="padding-bottom: 0">
        </tabs> -->

        <div class="insurants" v-for="(item, ind) in insurants" :key="ind" v-if="ind === tabIndex">

          

          <div class="info-line">

            <div style="margin:5px 0 15px 0">

              <tabs v-if="content && Object.keys(content).length >= 1" :insurantList="content.insurants" :selected="tabIndex" :disabled="isDisabled" label="name" @beforeSelect="beforeSelect" @onSelect="onSelect" style="padding-bottom: 0">
        </tabs>

            </div>
            
            <p class="icon-addPerson">被保险人{{ind + 1}}</p>
            <div>
              <p class='info-item'>
              <span>
                <div class="info_ico info_ico_name"></div>
                <div>{{item.relation}} {{item.name}}</div>
              </span>
              <span>
                <div class="info_ico info_ico_sex"></div>
                <div>{{_Sex(item.genderCode)}}</div>
              </span>
              <span>
                <div class="info_ico info_ico_age"></div>
                <div>{{item.age}}岁</div>
              </span>
                <!-- <span>{{item.name}}  </span>
                <span>{{_Sex(item.genderCode)}}</span>
                <span>{{item.age}}</span>
                <span>{{item.relation}}</span> -->
              </p>
            </div>
          </div>

          <div class='product-info info-line'>
            <p class="icon-addPerson">产品信息</p>
            <!-- <div v-for="(key, index) in insurants[ind].productList" :key="index">
              <p>{{key.abbrName}}</p>
              <CTable :data='_filter(key)' :head="productInfoHeader"></CTable>
            </div> -->
            <CTable :data='_filter(insurants[ind].productList)' :head="productInfoHeader"></CTable>
            
            
          </div>

          <div class="info-title">
            您所拥有的保险利益
          </div>
          <!-- <div class='own-title'>
            在合同有效期，您拥有如下保险利益:
          </div> -->
          <div class='own-explain'>
            在合同有效期，您拥有如下保险利益：以下给付原因及标准仅供了解产品使用，实际以保险条款描述为准。该保险计划将以您最终选择时的险种组合为准。
          </div>

          <!-- <div class='suggest-guide' ref="guide" id="suggguide">
            <tab>
              <tab-item :selected="selected == index" :id="'tab_select_'+index" @on-item-click="onItemClick" v-for="(item, index) in insurants[ind].productTabList" :key="index" ref="tab_select">{{item.abbrName}}</tab-item>
            </tab>
          </div> -->

          <template>
            <div :id="`benefit_${index}`" class='suggest-user-own info-block benefits' ref="benefits" v-for="(key, index) in insurants[ind].productList" :key="index" v-if="content2 && content2[index]">

              <div class="product-title">{{key.abbrName}}</div>
              
              <div class="body">

                <div v-for="(val, i) in content2[index].showCoverage" class="content2_line">
                <div class='own-life'>
                  <p class='life-title'>{{val.title}}</p>
                    <table class="suggtable" v-for="(val2, i2) in val.content">
                      <thead>
                        <tr>
                          <th v-for="(val3, i3) in val2.head">
                            {{val3 && val3.text}}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td v-for="(val4, i4) in val2.body[0]" v-html="val4"></td>
                        </tr>
                      </tbody>
                    </table>
                    <p>注：重大疾病分为A、B、C、D、E组，详细分组信息请见《重大疾病分组与给付限额表》。 不同组重大疾病均独立赔付 ，每组重大疾病赔付需间隔1年 ，A组重大疾病每次赔付基本保险金额，不同恶性肿瘤间隔5年后发生可重复赔付基本保险金额，最高合计赔付5次。 重大疾病保险金单一组别给付限额和累计给付限额约定详见条款。
                    </p>
                  </div>
                </div>

                <div v-for="(val5, i5) in key.clause" :key="i5" class="pdf">
                  <a :href="val5.value" target="_blank">{{val5.name}}</a>
                </div>

              </div>

              <div style="margin:10px 0;">
                <show-benefit :items="content2[index].showBenefit" v-if="content2[index].showBenefit !== null" />
              </div>

            </div>
            

          </template>

          <div class="dec">
            <p class='dec-confirm' :class="{ checked: next[ind] }" @click='onConfirmCheck(ind)'>我已阅读并知晓该险种的相关利益。</p>
            <input class="hiddenInput" type="hidden" name="clauseValue" v-model.trim="clauseValue" v-validate data-vv-as="请阅读该险种的相关利益" data-vv-rules="required">
          </div>

        </div>

      </section>
    </article>

    <footer>
      <div class="flex">
        <button class="weui-btn weui-btn_plain-primary" @click="shareBtn"> 分享 </button>
        <div class="btn-next" @click="_next">制作投保书</div>
      </div>
    </footer>

  </div>
</template>

<script>
// 导入自定义组件
import { tabs, CTable } from "../../../../components";
import ShowBenefit from "./show-benefit";
// 导入formUnit
import { Tab, TabItem } from "vformer";
// 导入MOCK数据
import { VIEWPLAN, MOREINSURESHOWBENEFITCOVERAGE, SHAREPROPOSAL } from "@/api";

let data = {
  content: {},
  content2: {},
  applicant: null,
  insurants: null,
  productList: null,
  tabIndex: 0,
  checked: 0,
  selected: 0,
  isDisabled: false,
  scrolled: false,
  productInfoHeader: [
    {
      name: "产品名称",
      figure: false
    },
    {
      name: "保障金额",
      figure: true
    },
    {
      name: "交费期/保障期",
      figure: false
    },
    {
      name: "首年保费",
      figure: true
    }
  ],
  next: []
};
export default {
  data() {
    return data;
  },
  updated() {
    let _this = this;
    this.$nextTick(function() {
      // window.addEventListener("scroll", winScroll);

      let arr = [];

      let refs = this.$refs.benefits;
      let tab_select = this.$refs.tab_select;
      let len = refs && refs.length;

      for (let i = 0; i < len; i++) {
        arr[i] = refs[i].offsetTop;
      }

      function winScroll(e) {
        arr.map((item, index) => {
          let sTop =
            document.body.scrollTop + document.documentElement.scrollTop;
          // console.log(`当前scroll:${sTop}`,`当前循环scroll:${item}`,`当前循环下一个scroll:${(arr[index+1] || 100000)}`,`当前tab值:${_this.selected}`,index)
          //当前循环scroll:742 当前scroll:100 当前循环下一个scroll:3786 当前tab值:0 0
          if (
            sTop >= item - 45 &&
            sTop < (arr[index + 1] - 45 || 100000) &&
            _this.selected !== index
          ) {
            _this.selected = index;
            // tab_select[index].$el.click();
          }
        });
      }
    });
  },
  computed: {
    inApp() {
      return !!window.HQAppJSInterface;
    },
    clauseValue() {
      return this.checked ? 1 : false;
    }
  },
  methods: {
    onSelect(v, data) {
      this.checked = 0;
      this.tabIndex = v;
      let query = { ...this.$route.query };
      if (query.insureId !== this.insurants[v].id) {
        query.insureId = this.insurants ? this.insurants[v].id : "";
        this.$router.replace({ name: "view-plan", query: query });
        this.getData();
      }
    },
    beforeSelect(v, data) {
      // console.log(v)
    },
    onItemClick(index) {
      this.selected = index;
      let id = `#benefit_${index}`;
      let _offset = this.$el.querySelector(id).offsetTop - 45;
      this.$el.querySelector("#suggposfix").scrollTop = _offset;
      window.scrollTo({ top: _offset });
    },
    shareBtn() {
      const { planId } = this.$route.query;
      if (this.source === "e投保") {
        this.eShare();
        return;
      }
      if (this.inApp) {
        this.axios
          .post(SHAREPROPOSAL, { planId })
          .then(
            ({ data }) => {
              if (data.success) {
                const value = data.value;
                window.showShare(
                  "2;3",
                  value.url,
                  value.coverPath,
                  value.title,
                  value.remark,
                  "shareCallback"
                );
              } else {
                this.__toast(data.errorMsg);
              }
            },
            fail => {}
          )
          .catch(err => {
            console.log(err);
            throw new Error(err);
          });
      }
    },
    // e投保分享
    eShare() {
      const { planId } = this.$route.query;
      this.axios
        .post(SHAREPROPOSAL, { planId })
        .then(({ data }) => {
          if (data.success) {
            const value = data.value;
            window.showShare(
              "2;3",
              value.url,
              value.coverPath,
              value.title,
              value.remark,
              "shareCallback"
            );
          } else {
            this.__toast(response.data.errorMsg);
          }
        }, toast)
        .catch(console.error);
    },
    getData() {
      // 加载所有被保人
      const { planId } = this.$route.query;
      if (this.applicant && Object.keys(this.applicant).length) {
        return this._MOREINSURESHOWBENEFITCOVERAGE();
      } else {
        return this.axios.post(VIEWPLAN, { planId }).then(({ data }) => {
          if (data.success) {
            this.content = data.value.content;
            this.applicant = data.value.content.applicant;
            this.insurants = data.value.content.insurants;
            this.productList = data.value.content.productList;
            if (!window.next) {
              Object.keys(data.value.content.insurants).map(item => {
                this.next[item] = false;
              });
              window.next = this.next;
              console.log(window.next);
            }

            // this.next = [1,2]
            // this.$store.actions.setPlanNext(this.next)
            // let insList2 = this.$store.getters.getPlanNext
            // console.log(insList2)

            this._MOREINSURESHOWBENEFITCOVERAGE();

            // 存储insList
            // this.insList && this.$store.dispatch('setInsList', [...this.insList])
          }
        });
      }

      // const {planId} = this.$route.query
      // this.axios
      //   .post(VIEWPLAN, { planId })
      //   .then(({ data }) => {
      //     if (data.success) {
      // this.content = data.value.content;
      // this.applicant = data.value.content.applicant;
      // this.insurants = data.value.content.insurants;
      // this.productList = data.value.content.productList;
      // Object.keys(data.value.content.insurants).map(item => {
      //   this.next[item] = false;
      // });
      //     }
      //   });
    },
    _MOREINSURESHOWBENEFITCOVERAGE() {
      let { insureId, planId } = this.$route.query;
      
      if (!insureId) {
        this.onSelect(0, this.insurants[0]);
        return;
      }

      this.insurants.find((item, index) => {
        if (item.id == insureId) {
          this.tabIndex = index
        }
      })

      let productIds = [];
      let ins = this.insurants.filter(item => {
        if (item.id === insureId) {
          return item;
        }
      });
      ins[0].productList.map(item => {
        productIds.push(item.productId);
      });

      return this.axios
        .post(MOREINSURESHOWBENEFITCOVERAGE, {
          planId,
          insureId,
          benefitType: "table",
          productIds: productIds,
          coverageType: "liability"
        })
        .then(({ data }) => {
          if (data.success) {
            // this.$set(this, content2, data.value.content);
            this.content2 = data.value.content;
          }
        });
    },
    _Sex(v) {
      return v == "M" ? "男" : "女";
    },
    _filter(data) {
      let newVal = [];
      
      let arr = {};
      data.map(item => {
        for (let key in item) {
          if (
            key === "abbrName" ||
            key === "amount_value" ||
            key === "pay" ||
            key === "insure" ||
            key === "premium"
          ) {
            arr[key] = item[key];
          }
        }
        let newArr = {};
        newArr["abbrName"] = arr["abbrName"];
        newArr["amount_value"] = arr["amount_value"];
        newArr["pay"] = arr["pay"] + '/' + arr["insure"];
        newArr["premium"] = arr["premium"];
        newVal.push(newArr);

      })
      
      
      // });
      return newVal;
    },
    onConfirmCheck(e) {
      // this.$set(this.next, e, !this.next[e]);
      this.$set(window.next, e, !window.next[e]);
    },
    _next() {
      
      let result = true;
      for (let i of this.next.values()) {
        if (i == false) {
          result = false;
          break;
        }
      }

      let { planId } = this.$route.query;

      if (result) {
        this.$router.push({ name: 'add-applicant-info', query: { planId: planId } })
      } else {
        this.$vux.toast.show({ text: "你还没有都勾选" });
      }
    }
  },
  components: {
    tabs,
    CTable,
    Tab,
    TabItem,
    ShowBenefit
  },
  created() {
    window.preview = this;
    this.getData();
  }
};
</script>

<style lang="less" scoped>
@import "../../../../assets/styles/page.less";
.container {
  * {
    box-sizing: border-box;
  }
  background: @titleBg;

  // #suggposfix {
  //   -webkit-overflow-scrolling: touch;
  //   overflow-y: auto;
  // }

  #userInfo {
    

    // .insurants {
    //   padding: 15px;
    // }

    .info-header {
      width: 100%;
      height: 43px;
      line-height: 43px;
      // background-color: @titleBg;
      font-size: 17px;
      padding: 0 15px;
    }

    .info-line {
      background: @white;
      border: 1px solid @weuiLineColorApplicant;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      padding: 15px;
      margin-bottom: 10px;
      &>p {
        margin-bottom: 10px;
      }
      // padding-bottom: 25px;
      // margin-bottom: 10px;
      // box-shadow: 0 -10px 10px 10px #f3f3f3;
    }
// .矩形_4 {
//   background-color: rgb( 255, 255, 255 );
//   position: absolute;
//   left: -2px;
//   top: 597px;
//   width: 754px;
//   height: 376px;
//   z-index: 242;
// }


    .info-item {
      border-radius: 8px;
      padding: 20px 0;
      display: flex;
      background: @weuiLineColorApplicant;
      width: 100%;
      span {
        flex: 1;
        border-right: 1px solid rgb( 225, 225, 225 );
        justify-content: center;
        align-items: center;
        flex-direction: column;
        display: flex;
        .info_ico {
          height: 30px;
          width: 30px;
          margin-bottom: 5px;
        }
        .info_ico_name {
          background: url(~@/assets/styles/images/name@2x.png) no-repeat;
          background-size: 100% 100%;
        }
        .info_ico_sex {
          background: url(~@/assets/styles/images/sex@2x.png) no-repeat;
          background-size: 100% 100%;
        }
        .info_ico_age {
          background: url(~@/assets/styles/images/age@2x.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      & span:last-child {
        border-right: none;
      }
    }

    .product-info {
      border-bottom: none;
      // & > div {
      //   margin: 0 8px;
      // }
      .charge-total {
        text-align: right;
        padding-right: 17px;
        margin-top: 17px;
      }
    }

    .info-title {
      line-height: 47px;
      width: 360px;
      margin: 0 auto;
      color: #00aeff;
      text-align: center;
      font-size: 16px;
      font-weight: normal;
    }
    .own-title {
      margin-top: 10;
      padding: 0 15;
      margin: 10px 8px;
      font-size: 15px;
      font-weight: normal;
    }
    .own-explain {
      padding: 0 15px;
      margin-bottom: 15px;
      font-size: 13px;
      line-height: 25px;
      color: #999;
    }

    .suggest-guide {
      position: static;
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 99;
      width: 100%;
      border-bottom: 1px solid #d0d0d0;
      margin-bottom: 9px;
      .vux-tab-selected {
        color: #00b1ff !important;
        border-bottom: 2px solid #00b1ff !important;
      }
      .vux-tab-ink-bar {
        background-color: #00b1ff !important;
        height: 1px !important;
      }
      .vux-tab-item {
        background: none !important;
      }
    }

    .suggtable {
      width: 100%;
      td,
      th {
        // border: 1px solid rgba(187, 187, 187, 1);
        text-align: center;
        padding: 10px;
      }
      th {
        background-color: #c3c3c3;
        color: rgba(255, 255, 255, 1);
        // border: 1px solid rgba(187, 187, 187, 1);
        text-align: center;
        &:first-child {
          width: 60%;
        }
      }
      td {
        background: #f8f8f8;
        color: #666666;
      }
    }

    .suggest-user-own {
      padding: 15px;
      .product-title {
        font-weight: bold;
        padding-left: 8;
        margin: 0 8px;
        font-size: 18px;
      }
      .content2_line {
        margin: 10px 8px;
        border-bottom: 1px solid #f0eff5;
        &:last-child {
          font-size: 100px;
        }
      }
      .body {
        background: @white;
        .pdf {
          padding: 10px 8px;
          a {
            color: #5697ff;
            font-size: 12px;
          }
        }
      }
      /*font-weight:bold;*/
      .own-life {
        .life-title {
          color: #666666;
          position: relative;
          margin: 12 0;
          padding: 10px 0;
          font-size: 15px;
          padding-left: 21px;
          span {
            font-size: 12px;
          }
          &:before {
            content: "";
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #00aeff;
            left: 8px;
            top: 0;
            bottom: 0;
            margin: auto;
          }
        }
        &>p {
          font-size: 10px;
          margin: 10px 0;
          color: #9f9f9f;
        }
      }
      .own-comments {
        color: #999;
        padding-left: 8px;
        padding-right: 8px;
        font-size: 11px;
        margin-top: 13px;
        line-height: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #f0f0f0;
      }
      .own-contract {
        padding-left: 8px;
        padding-right: 8px;
        margin-top: 19px;
        p {
          font-size: 13px;
          color: #999;
          line-height: 24px;
          span {
            color: #00aeff;
          }
        }
      }
    }

    .dec {
      margin: 0 15px;
    }

    .dec-confirm {
      line-height: 20px;
      height: 20px;
      min-height: 20px;
      font-size: 15px;
      color: #999999;
      /*font-weight:bold;*/
      padding-left: 32px;
      background: url(~@/assets/styles/images/checke.png) no-repeat;
      background-size: 20px 20px;
      /*<!--background-position:0 -33.5px;-->*/
    }
    .dec-confirm.checked {
      line-height: 20px;
      height: 20px;
      font-size: 15px;
      color: #00aeff;
      /*font-weight:bold;*/
      padding-left: 32px;
      background: url(~@/assets/styles/images/checked.png) no-repeat;
      background-size: 20px;
    }
  }

  footer {
    margin-top: 20px;
    .flex {
      display: flex;
      text-align: center;
      &>* {
        width: 50%;
        margin: 10px;
      }
      .btn-next {
        position: relative;
      }
    }
  }
}
</style>
