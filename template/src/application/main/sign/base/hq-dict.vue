<template>
  <abbr class="hq-dict" @click="tips" :title="title">{{this.keyword}}</abbr>
</template>
<script>
  import dict from './dict.js'
  export default {
    props: {
      keyword: String,
      validator (keyword) {
        console.assert(dict[keyword], `字典里没有该项，请在字典里添加对应项.`)
        return dict[keyword]
      }
    },
    data () {
      return {
        title: this.keyword ? dict[this.keyword] : null
      }
    },
    methods: {
      tips () {
        const {title} = this
        if (!title) return
        const content = `<div style="text-align:justify">${title}</div>`
        this.$vux.alert.show({title: '说明', content})
      }
    }
  }
</script>
<style>
  .hq-dict{
    border-bottom: 0 none;
    text-decoration: none;
    color: #00b0ff;
  }
</style>
