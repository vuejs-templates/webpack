<!--
components: entroll_err
      name: entroll_err

    #props:
      txt: 提示信息
      btn: 按钮文字
      url: 点击按钮跳转页

     &slot: default

    author: xiangzhi

  example:
        <entroll_err txt = "txt" btn="txt" url="url"></entroll_err>
-->
<script>
import {ENROLL_REGISTER} from '@/api'
export default{
  name: 'entroll_err',
  template: `<div class="entroll_err_page">
                 <div class="error_icon">
                   <div class="txt">{{txt}}</div>
                   <div class="btn" @click="$emit('emptyShare')" v-if="btn">{{btn}}</div>
                 </div>
             </div>`,
  props: ["txt", "btn"],
  methods: {}
}
</script>
<style lang='less' >
.entroll_err_page {
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
  // align-items:Center;
  &>.error_icon{
    background: url('~@/assets/image/no_search.png') no-repeat;
    background-position: top center;
    background-size:rem-calc(120px) rem-calc(120px);
    padding-top: rem-calc(120px);
    position: relative;
    min-height: rem-calc(120px);
    min-width: rem-calc(120px);
    margin-top: rem-calc(60px);
    .txt {
      font-size: rem-calc(13px);
      color: #999;
      padding-top: rem-calc(10px);
      padding-bottom: rem-calc(35px);
    }
    .btn {
      width: rem-calc(120px);
      height: rem-calc(34px);
      line-height: rem-calc(34px);
      background: #00a4ff;
      border-radius: rem-calc(5px);
      text-align: center;
      font-size: rem-calc(15px);
      margin: 0 auto;
      color: #ffffff;
    }
  }
}
</style>
