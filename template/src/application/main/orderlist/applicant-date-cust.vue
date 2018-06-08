<!--
注意： 此处引用的所有内置组件，都必须要加上:inset="true"
所有自定义组件都需要满足以下要求：
1、props: ['formModel', 'name', 'inset']
2、使用innerValue存储组件的值(否则不兼容Mixin)
3、使用baseMixin，使组件行为一致，并自动把结果集成到formUnit

baseMixin 做了以下事情：
1. 挂载、更新组件值到innerValue
2. 基于innerValue验证组件状态
3. 向formUnit汇报组件状态

自定义组件怎么写：
1. 引入baseMixin,引入所需要的基本组件，如：zaInput,zaSelect.
2. 根据组件需求，定义innerValue。
   innerValue应该满足：
   - 与formModels.value格式相同（否则需要在自定义组件内写数据转换方法）
   - innerValue会直接被emit到外部（即innerModel.value）
   - 数据格式不限，但如果不是String或者Array, 则需要重写onValidate，以覆盖baseMixin中的验证方法
3. 处理内联组件的验证状态及数值绑定（@onChange/@formChange/@formEvent）
4. 如果需要自定义报错逻辑，可以重写__errorMsg方法
5. 根据需要定义其它局部变量，尽量有明显特征，不容易引起冲突。
6. innerValue/isValid/errorMsg等定义在baseMixin内的变量属于约定变量，请尽量沿用。
-->
<template>
  <div id="applicantDateCust">
    <row-2-col>
      <template slot="label">{{formModel.rules.label}}</template>
      <template  slot="val">
        <div class="right">
          <za-date @onChange="onBeginDateChange" class="begindate" :formModel="begindateModel" :inset="true" :index="index" name="begindate"></za-date>
          至
          <za-date @onChange="onEndDateChange" class="enddate"  :formModel="endDateModel" :inset="true" :index="index" name="enddate"></za-date>
        </div>
      </template>
    </row-2-col>
  </div>
</template>

<script>
  import {zaInput, zaSelect, row2Col, baseMixin, zaDate} from 'vformer'

  export default {
    name: 'applicant-date-cust',
    mixins: [baseMixin],
    data() {
      return {
        innerValue: {
          begindate:'',
          enddate:''
        }
      }
    },
    props: ['formModel', 'name', 'index'],
    created() {
      window.testcs = this
    },
    computed: {
      begindateModel() {
        return {
          value: this.formModel.value.begindate,
          rules: this.formModel.rules.begindate
        }
      },
      endDateModel() {
        return {
          value: this.formModel.value.enddate,
          rules: this.formModel.rules.enddate
        }
      }
    },
    methods: {
      onEvent(t, v) {
      },
      onValidate() {
        return new Promise((resolve, reject) => {
          let isValid = (!!this.innerValue.begindate && !!this.innerValue.enddate)
          this.isValid = isValid
          if (isValid) {
            resolve(true)
          } else {
            reject(false)
          }
        }).catch(e => {
          return false
        })
      },
      onBeginDateChange(v) {
        console.warn('onBeginDateChange::', v)
        this.$set(this.innerValue, v.name, v.value)
      },
      onEndDateChange(v) {
        console.warn('custSelectChange::', v)
        this.$set(this.innerValue, v.name, v.value)
        // },
        // __toValue (v) {
        //   console.warn('=---------=', v)
        //   return v
      }
    },
    watch: {
      innerValue: {
        deep: true,
        handler(v) {
          console.log('看看')
          console.log(v);
          this.commit()
        }
      }
    },
    components: {
      zaInput,
      zaSelect,
      row2Col,
      zaDate
    }
  }
</script>

<style lang='less' scoped>
  @import '../../../assets/styles/page.less';
  #applicantDateCust{
    border-top:1px solid #e1e1e1;
  .right{

    /*margin-top: 25px;*/
    display: flex;
    .begindate{
      flex:5;
    }
    .enddate{
      flex:4;
    }
  }
  }

</style>
