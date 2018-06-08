
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-04-14 15:38
 * Filename      : btngroup.vue
 * Description   : 按钮组

********************************************************************-->

<template>
  <div class='group-btn-container'>
    <div class='group-btn-checker' @click='onCheck'>
      <div v-for='(item,idx) in valList' class='btn-cell' :class='{checked:idx==0}' :data-value='item.id'>{{ item.val }}</div>
    </div>
</div>
</template>

<script>
  export default {
    data: () => {
      return {
        valList: [],
        seled: 0
      }
    },
    props: ['btlist'],
    methods: {
      onCheck: function (e) {
        let el = e.target
        let btList = el.parentNode.querySelectorAll('.btn-cell')
        if (el.className.match(/checked/)) return
        let _self = this
        btList.forEach(function (item, idx) {
          if (item.dataset.value == el.dataset.value - 1 ||
            item.dataset.value == el.dataset.value ||
            item.dataset.value == btList.length - 1) {
            item.style.borderRight = 'none'
          } else {
            item.style.borderRight = '1px solid #dedede'
          }
          item.className = item.className.replace(/checked/g, '')
        })
        el.className += ' checked'
        console.log(el.dataset['value'])
        this.$emit('Check', el.dataset['value'])
      }
    },
    created () {
      this.valList = this.btlist
    }
  }
</script>

<style lang='less' >
  @import '~assets/scss/function';
  .group-btn-container {
    width:100%;
    .group-btn-checker {
      margin:auto;
      width:rem-calc(298px);
      height:rem-calc(30px);
      border-radius:rem-calc(15px);
      overflow:hidden;
      display:flex;
      align-items:stretch;
      border:1px solid #dedede;
      .btn-cell {
        flex:1;
        border-right:1px solid #dedede;
        background-color:#fff;
        color:#00aeff;
        text-align:center;
        line-height:rem-calc(30px);
      }
      .btn-cell:last-child {
        border-right:none;
        width:rem-calc(198px);
      }
      .btn-cell:first-child {
        width:rem-calc(198px);
      }
      .btn-cell.checked {
        background-color:#00aeff;
        color:#fff;
        border-right:none;
      }
    }
  }

</style>
