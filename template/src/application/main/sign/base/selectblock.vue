<!--
      descript: 选择块组件
        author: gongshuai
        param: props

-->
<template>
  <div class="wrapper">
    <div class="title">{{title}}</div>
    <div class="item">
      <ul>
        <li v-for="(item, index) in list" :key="index" class="block"
            :class="{selected: selectArr[index] == index}"
            @click="select(index, item)">{{item.value}}
        </li>
      </ul>
    </div>
    <div class="input" v-show="inputShow">
      <input type="text" placeholder="请详细描述" :maxlength="max" v-model.trim="textValue">
    </div>
    <!-- <div @click="seleSubmit">111111111111111111111111</div> -->
  </div>
</template>

<script>
  export default {
    data () {
      // 页面回选的时候不能触发created等生命周期hook (安卓only)
      setTimeout(() => this.doInit())
      return {
        isCreated: false,
        inputShow: false,
        inputText: this.seled.inputTxt,
        selectArr: new Array(this.list.length),
        max: 400
      }
    },
    props: {
      list: {
        type: Array,
        default: []
      },
      mutiple: {
        type: Boolean,
        default: false
      },
      seled: {
        type: Object,
        default: function () {
          return {seleVal: null, inputTxt: null}
        }
      },
      title: {
        type: String,
        default: ''
      }
    },
    computed: {
      textValue: {
        get: function () {
          return this.inputText
        },
        set: function (v) {
          this.inputText = v
          this.seleSubmit()
        }
      }
    },
    watch: {
      seled () {
        this.inputText = this.seled.inputTxt
        this.setByVal(this.seled.seleVal)
        this.seleSubmit()
      },
      list (val) {
        console.log('new val:', val)
      }
    },
    created () {
      this.doInit()
    },
    methods: {
      doInit () {
        if (this.isCreated) {
          return
        }
        this.isCreated = true
        this.inputText = this.seled.inputTxt
        this.setByVal(this.seled.seleVal)
        this.seleSubmit()
      },
      seleSubmit () {
        // let result = this.selectArr.map(function (v, i, arr) {
        //   if (v) {
        //     console.log(v)
        //     return v
        //   }
        // })
        // console.log(this)
        let result = []
        for (let i = 0; i < this.selectArr.length; i++) {
          if (this.selectArr[i] || this.selectArr[i] == 0) {
            result.push(this.list[i])
          }
        }
        this.$nextTick(() => {
          let newresult = {'txt': this.inputShow ? this.textValue : "", 'seled': result, "hasTxt": this.inputShow}
          this.$emit('input', newresult)
        })
      },
      select (index, obj) {
        const current = this.selectArr[index] !== undefined
        const select = current && this.selectArr[index] === index
        if (this.mutiple) {
          if (select) {
            this.selectArr.splice(index, 1, undefined)
          } else {
            this.selectArr.splice(index, 1, index)
            // this.seleSubmit()
          }
          // 修复‘取消选择 其它’选项时，validate 不能及时更新的问题
          this.seleSubmit()
          if (this.list.length === (index + 1)) {
            this.selectArr[index] ? this.inputShow = true : this.inputShow = false
          }
        } else {
          this.inputShow = this.list.length === (index + 1)
          this.selectArr.forEach((item) => {
            this.selectArr.splice(item, 1, undefined)
          })
          this.selectArr.splice(index, 1, index)
          this.seleSubmit()
        }
        // 关于被保险人的 为亲戚的时候出现 输入框
        if ((this.title == "您与被保险人关系" || this.title == "您与投保人关系") && index == 2) {
          this.inputShow = true
        }
        // 被保险人告知零时用 之后改
        if (this.title == "投保经过" && index == 3 && obj.key == 'd' && obj.value == '原已认识') {
          this.inputShow = true
          this.max = 100
        } else {
          this.max = 400
        }
      },
      setByVal (n) {
        let isArr = Array.isArray(n)
        let _self = this
        if (!n) {
          return
        }
        if (isArr) {
          n.map(function (v, i, arr) {
            for (let z = 0; z < _self.list.length; z++) {
              if (_self.list[z].key == v) {
                _self.select(z, _self.list[z])
              }
            }
          })
        } else {
          for (let z = 0; z < _self.list.length; z++) {
            if (_self.list[z].key == n) {
              _self.select(z, _self.list[z])
            }
          }
        }
      }
    }
  }
</script>

<style lang='less' >

  .wrapper {
    background-color: #ffffff;
    font-size: rem-calc(15);
    .title {
      color: #333333;
    }
    .item {
      margin: rem-calc(10) 0;
      & > ul {
        list-style: none;
        .block {
          display: inline-block;
          color: #999999;
          text-align: center;
          height: rem-calc(30);
          width: rem-calc(150/2px);
          text-align: center;
          line-height: rem-calc(30);
          margin-right: rem-calc(20/2px);
          margin-bottom: rem-calc(20/2px);
          border: 1px solid #b5b5b5;
          border-radius: rem-calc(5)
        }
        .selected {
          color: #ffffff;
          background-color: #91dbfe;
          border: 1px solid #91dbfe;
        }
      }
    }
    .input {
      display: flex;
      margin-right: rem-calc(15);
      & > input {
        flex: 1;
        height: rem-calc(45px);
        font-size: rem-calc(12px);
        padding-left: rem-calc(15px);
        outline: none;
        background: #fff;
        border-color: #b5b5b5;
        border-radius: 0;
        -webkit-appearance: none;

      }
    }
  }
</style>
