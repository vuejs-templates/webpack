<!--
components: c_searchdetail
      name: c_searchdetail

    @event:
     C_Click: 点击事件

    #props:
        id: 文章id
   imgpath: 文章图片
     title: 文章title
      word: 文章正文

     &slot: default

    author: xx

  example:
        <c_article :id = "id"
                   :imgpath = "imgpath"
                   :title = "title"
                   :word = "word"
                   @C_Click = clickevent(n) n 文章为ID
        ></c_article>
-->
<template>
  <div class="searchbox" @click="articleDetail">
    <slot></slot>
    <div class="detailInfo">详情 ></div>
  </div>
</template>
<script>
  export default{
    name: 'c_searchdetail',
    props: ["id"],
    methods: {
      articleDetail () {
        this.$emit('C_Click', {id: this.id})
      }
    }
  }
</script>
<style lang='less' scoped>
  @import '../../../assets/styles/page.less';
  .searchbox{
    position: relative;
  .detailInfo{
    position: absolute;
    right:10px;
    color:#666;
    bottom:10%;
  }
  }
</style>
