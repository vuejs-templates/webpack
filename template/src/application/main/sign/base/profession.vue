<!--
components: Cprofession
      name: Cprofession

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
<script>
export default{
  name: 'c_article',
  template: `<div @click="articleDetail(id)" class="cpt_article">
                 <img :src="imgpath" />
                 <div>
                    <div>{{title}}</div>
                    <div>{{word}}</div>
                 </div>
             </div>`,
  props: ["id", "imgpath", "title", "word"],
  methods: {
    articleDetail (n) {
      this.$emit('C_Click', {id: n})
    }
  }
}
</script>
<style lang='less' >
.cpt_article {
  position: relative;
  padding: rem-calc(15px) rem-calc(15px) rem-calc(15px) 0;
  height: rem-calc(70px);
  &>img{
    display: block;
    width:rem-calc(100px);
    height:rem-calc(70px);
    position: absolute;
  }
  &>div{
    margin: rem-calc(15px) 0 rem-calc(15px) rem-calc(115px);
    &>div:first-child{font-size: rem-calc(16px);color:#333;margin-bottom: rem-calc(13px);width:100%;overflow: hidden;}
    &>div:last-child{font-size: rem-calc(16px);color:#999;overflow: hidden;width:100%;}
  }
}
</style>
