<!-- 分享页面的内嵌式提示 -->
<template>
  <div class="view-tip-signature">
    <div class="main-tip">
      <template v-if="type==='success'">
        <img src="~@/assets/image/tips-success.png">
        <h2>恭喜您投保成功</h2>
        <p>{{info.msg}}</p>
        <p v-if="info.isNeedEmail">温馨提示: 电子保单将发送到您的电子邮箱,请注意查收。</p>
      </template>
      <template v-else-if="type==='fail[manual]'">
        <img src="~@/assets/image/sand_box.png" class="limit-height">
        <p>您的投保单将进一步进行人工核保,</p>
        <p>请关注人工核保结果, 谢谢!</p>
        <p>您的投保单号为<strong>{{info.contNo}}</strong>。</p>
      </template>
      <template v-else-if="type==='fail[pay]'">
        <img src="~@/assets/image/sad.png">
        <h2>啊哦 ~ ~, 支付遇到问题,</h2>
        <p>请核实后, 再进行支付。</p>
        <p>问题描述: {{info.msg}}</p>
        <p>请联系代理人，重新发起支付。</p>
      </template>
      <template v-else-if="type==='wait'">
        <img src="~@/assets/image/sand_box.png" class="limit-height">
        <p>{{info.msg}}</p>
        <p>您的投保单号为<strong>{{info.contNo}}</strong>。</p>
      </template>
      <template v-else-if="type==='changed[age]'">
        <img src="~@/assets/image/sand_box.png" class="limit-height">
        <p>{{info.msg}}</p>
        <p>您的投保单号为<strong>{{info.contNo}}</strong>。</p>
        <p>投保年龄发生变化请联系代理人。</p>
      </template>
      <template v-else-if="type==='wait[multiple]'">
        <img src="~@/assets/image/sand_box.png" class="limit-height"/>
        <p>您的投保单：</p>
        <p v-for="(action, contNo) in info.subJson" :key="contNo"><strong>{{contNo}}</strong>将进行{{action}}</p>
        <p>请关注投保结果，谢谢！</p>
        <p class="manual-contract">您的总投保单为<strong>{{info.sourceApplyNo}}</strong>。</p>
      </template>
      <template v-else>
        <img src="~@/assets/image/sad.png">
        <p>您的投保单提交遇到问题,</p>
        <p>请点击重新提交。</p>
        <footer>
          <div class="btn-block btn-primary" @click.native="$emit('recommit')">重新提交</div>
        </footer>
      </template>
    </div>
  </div>
</template>
<script>
  const statusArray = [
    {
      type: 'success',
      status: 2001 // 人工核保成功 2001
    }, {
      type: 'fail[manual]',
      status: 2003 // 人工核保失败 2003
    }, {
      type: 'fail[pay]',
      status: 10001 // 支付失败 10001
    }, {
      type: 'wait',
      status: [0, 2004, 10002, 10003] // 页面跳转中间状态页
    }, {
      type: 'wait[multiple]', // 多主险时有险种不满足要求需要人核
      status: [5001]
    }, {
      type: 'error',
      status: -1 // 程序出错跳转页面
    }, {
      type: 'changed[age]',
      status: -999 // 投保年龄发生变化
    }
  ]

  export default {
    components: {},
    props: {
      status: {
        type: [String, Number]
      },
      info: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      let status = this.status
      let item = statusArray.find(item => {
        return Array.isArray(item.status) ? item.status.indexOf(status) > -1 : item.status === status
      }) || {}
      return {
        type: item.type
      }
    }
  }
</script>
<style lang='less'>
  body{
    position: relative;
  }
  .view-tip-signature{
    text-align: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #f7f7f7;
    overflow: hidden;
    position: absolute;
    z-index: 5;
    box-sizing: border-box;
    .main-tip{
      min-height: 48.14%;
      background-color: white;
      padding-top: 10%;
      box-sizing: border-box;
    }
    img {
      display: block;
      max-width: 60px;
      margin: 10px auto 30px;
    }
    .limit-height{
      max-height: 46px;
    }
    h2{
      font-weight: normal;
      line-height: 40px;
      margin: 10px;
      font-size: 20px;
      color: #333;
    }
    strong{
      font-weight: normal;
      color: #00aeff;
    }
    p {
      padding-left: 5px;
      padding-right: 5px;
      font-size: 16px;
      margin: 10px 0;
      line-height: 20px;
      color:#bcbcbc;
      word-break: break-all;
    }
    footer{
      margin-top: 40px;
      padding: 0 15px;
    }
  }
</style>
