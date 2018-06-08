<!--
components: c_nofound
      name: c_nofound

    #props:
      txt: 大标题
     txt1: 副标题

     &slot: default

    author: xx

  example:
        <c_nofound :txt = "title"></c_nofound>
-->
<script>
export default{
  name: 'c_errMsg',
  template: `<div class="no_found_page">
                 <div class="error_icon">
                   <div>{{txt}}<slot></slot></div>
                   <div v-if="txt1">{{txt1}}</div>
                 </div>
             </div>`,
  props: ["txt", "txt1"],
  methods: {
  }
}
</script>
<style lang='less' >
.no_found_page {
  text-align: center;
  font-size: rem-calc(30px);
  background: #f7f7f7;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content:center;
  align-items:center;
  &>.error_icon{
    background: url('~@/assets/image/error.png') no-repeat;
    background-position: top center;
    background-size:rem-calc(80px) rem-calc(80px);
    padding-top: rem-calc(120px);
    min-height: rem-calc(100px);
    min-width: rem-calc(80px);
    margin: auto;
    &>div:first-child{
      font-size: rem-calc(22px);
      color: #333;
      margin-bottom: rem-calc(10px);
    }
    &>div:last-child{
      font-size: rem-calc(16px);
      color: #999;
    }
  }
}
</style>
