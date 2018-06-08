<!--
      descript: 单选组件
        author: gongshuai
        param: props

      methods:
   seledcheck: 用于选择默认值 传入一个索引数即可
-->
<template>
    <div class="csinglebox" >
      <ul>
        <li v-for="(item, index) in items" :key="index" @click = "clickhandle">
            <chkbox
              :title = "item.title || item.value + item.content"
              :value = "item.value"
              :index = "index"
              :disabled = "disabled"
              @C_Click="seledcheck"
            ></chkbox>
        </li>
      </ul>
    </div>
</template>
<script>
  const chkbox = {
    template: `<div @click = "seledEvent('value')" class="ccheckbox" :class = "[disabled ? 'diseled' : seled ? 'seled' : '' ]">{{title}}</div>`,
    data () {
      return {
        seled: false
      }
    },
    name: 'chkbox',
    props: ['title', 'value', 'index', 'seledindex', 'disabled'],
    methods: {
      seledEvent (n) {
        if (this.disabled) {
          return
        }
        if (this.$parent.type == 'multiple') {
          this.seled = !this.seled
        } else {
          if (this.seled) {
            return
          }
          this.seled = !this.seled
        }
        this.$emit('C_Click', {title: this.title, value: this.value, index: this.index})
      },
      seled () {
        this.seled = true
      }
    }
  }
  export default {
    data () {
      return {
        checked: false
      }
    },
    created: function () {
    },
    mounted: function () {
      if (this.setValueByVal == 'o') {
        return
      }
      if (!this.setValueByVal) {
        this.seledcheck({index: this.setValueByIndex})
      } else {
        this.seledByValue(this.setValueByVal)
      }
    },
    components: {
      chkbox
    },
    props: ["items", "setValueByIndex", "type", "setValueByVal", "disabled", "detailId"],
    watch: {
      // 'setValueByVal' (val, nval) {
      //   console.log(val)
      //   // this.seledByValue(val)
      // }
    },
    methods: {
      clickhandle () {
        this.$emit('C_Click')
      },
      aaaaa () {
        this.seledByValue(this.setValueByVal)
      },
      setVal () {
        this.seledByValue(['b', 'c'])
      },
      seledcheck (n) {
        let isarray = Array.isArray(n.index)
        let idx = isarray ? n.index[0] : n.index
        if (this.type != 'multiple') {
          let val = null
          this.$children.map(function (v, i, a) {
            if (i != idx) {
              v.seled = false
            } else {
              v.seled = true
              val = v.value
            }
          })
          this.$emit('input', val)
          this.$emit('formChange', {detailId: this.detailId, answer: n.value})
        } else {
          let mval = []

          if (isarray) {
            var _self = this
            n.index.map(function (v, i, a) {
              _self.$children[v].seled = true
              mval.push(v.value)
            })
          } else {
            this.$children.map(function (v, i, a) {
              if (v.seled) {
                mval.push(v.value)
              }
            })
          }
          this.$emit('input', mval)
          this.$emit('formChange', {detailId: this.detailId, answer: mval.join('')})
        }
      },
      seledByValue (n) {
        let isarray = Array.isArray(n)
        if (this.type != 'multiple') {
          let idx = isarray ? n[0] : n
          let val = null
          this.$children.map(function (v, i, a) {
            if (v.value != idx) {
              v.seled = false
            } else {
              v.seled = true
              val = v.value
            }
          })
          this.$emit('input', val)
        } else {
          let mval = []
          if (isarray) {
            var _self = this
            n.map(function (v, i, a) {
              _self.$children.map(function (va, ind, ar) {
                if (va.value == v) {
                  va.seled = true
                  mval.push(va.value)
                }
              })
            })
          } else {
            this.$children.map(function (v, i, a) {
              if (v.value == n) {
                v.seled = true
              }
              if (v.seled) {
                mval.push(v.value)
              }
            })
          }
          this.$emit('input', mval)
        }
      }
    }
  }
</script>
<style lang='less' >
  .csinglebox{
    &>ul{
      margin-left: rem-calc(15px);
    }
    .ccheckbox{
      position: relative;
      vertical-align: middle;
      padding-left: rem-calc(25px);
      font-size: rem-calc(30/2px) !important;
      margin-bottom: rem-calc(6);
      &:before{
        content: ' ';
        width:rem-calc(20px);
        height: rem-calc(20px);
        background:url('~@/assets/image/check/unseled.png') no-repeat;
        background-size:100% 100%;
        display: inline-block;
        position: absolute;
        top: rem-calc(3px);
        left:0;
        margin-right: rem-calc(10px);
      }
      &.seled{
        &:before{
          content: ' ';
          width:rem-calc(20px);
          height: rem-calc(20px);
          background:url('~@/assets/image/check/seled.png') no-repeat;
          background-size:100% 100%;
          display: inline-block;
          position: absolute;
          top: rem-calc(3px);
          left:0;
          margin-right: rem-calc(10px);
        }
      }
      &.diseled{
        &:before{
          content: ' ';
          width:rem-calc(20px);
          height: rem-calc(20px);
          background:url('~@/assets/image/check/disable.png') no-repeat;
          background-size:100% 100%;
          display: inline-block;
          position: absolute;
          top: rem-calc(3px);
          left:0;
          margin-right: rem-calc(10px);
        }
      }
    }
  }
</style>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  .csinglebox{
    &>ul{
       &>li{
         list-style: none;
         display: inline-block;
         line-height: rem-calc(25px);
         vertical-align: top;
       }
    }
    &.seled{
      color: #f00;
    }
  }
</style>
