<!--
components: c_bank
      name: c_bank

    @event:
     C_Click: 点击事件

    #props:
        id: 银行卡id
   imgpath: 银行卡图标
     title: 银行卡名

     &slot: default

    author: cc

  example:
        <c_bank :id = "id"
                   :imgpath = "imgpath"
                   :title = "title"
                   @C_Click = clickevent(n) n 银行卡id
        ></c_bank>
-->
<script>
export default{
  name: 'c_bank',
  template: `<div @click="chooseBank(id)" class="cpt_bank">
                <div class="bank-wrapper">
                  <img :src="imgpath" />
                   <div>{{title}}</div>
                </div>
             </div>`,
  props: ["id", "imgpath", "title"],
  methods: {
    chooseBank (n) {
      this.$emit('C_Click', {id: n})
    }
  }
}
</script>
<style lang='less' >
@import '~@/assets/scss/function';
.cpt_bank {
  position: relative;
  padding-left: rem-calc(30px);
  .bank-wrapper {
    height: rem-calc(100px);
    display: flex;
    align-items: center;
    @include borderbottom-1px(#efefef);
    &>img{
      width:rem-calc(50px);
      height:rem-calc(50px);
      border-radius: 50%;
      margin-right: rem-calc(40px);
    }
    &>div{
      font-size: rem-calc(30px);
    }
  }
}
</style>
