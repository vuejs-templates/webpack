<!--
  一个简单的按钮，保持了和原生<button>一样的API,但可以简化使用它，并略调整了一些默认参数，并某些方面增强了它
  默认的type由submit变为了button
  按钮的文本由插槽传入，如果没有，默认为“确定”
  调用方使用该组件时，绑定click事件时应使用 @click.native="XXX" 这样的方式（因为使用的是原生事件，本组件并没有额外地派生事件）

  submitbtn.vue的替代版本
  主要的替代变更如下：
  1. 按钮内容不使用属性val传入，而是使用<slot>传入
  2. 按钮有明确了类型button，而不再是使用默认类型submit,submit应使用在于更清晰的上下文中（比如表单提交），而button应用于更广泛的场景
  submit强调表单，并自适应相应表格的enter事件、button的click事件，并最后会让相应的表单产生submit事件
  button调整的是交互，表明这是一个交互按钮
  3. 不处理disabled属性，因为这与实际应用时的业务场景紧密相关，而且 submitbtn.vue 只有添加disabled的逻辑，没有移除的逻辑
  4. 对样式不作多余的假设，但提供了一些预设主题 btn-block btn-primary btn-reverse( reverse 表现为线框样式）

  设计思路：
  业务不应耦合进组件
  应简化逻辑而不是复杂化逻辑（或者，提供了一些附加的能力），否则就没有价值
  额外的能力应提供一组易用的API，供调用者使用，而不是假定一些行为
  （除非很确定该行为一定是必选的，比如对点击行为的节流（debounce）,或者加载提示，等）
  然而，这可能会随着业务的变化而不断调整

  注：

  debounce:
  如果用手指一直按住一个弹簧，它将不会弹起直到你松手为止。
  也就是说当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间。

  throttle:
  如果将水龙头拧紧直到水是以水滴的形式流出，那你会发现每隔一段时间，就会有一滴水流出。
  也就是会说预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期。

-->
<template>
  <button class="vue-btn" :type="type" :disabled="disabled" @click="proxy($event)"><slot>确认</slot></button>
</template>
<script>
  export default {
    name: 'btn',
    props: {
      type: {
        type: String,
        default: () => 'button'
      },
      disabled: {
        type: Boolean,
        default: () => false
      },
      debounce: {
        Type: Number,
        default: () => 400
      }
    },
    data () {
      return {
        lastActived: null
      }
    },
    methods: {
      proxy (event) {
        let now = Date.now()
        if (this.lastActived) {
          if (now - this.lastActived < this.debounce) {
            event.preventDefault()
            event.stopPropagation()
          }
        }
        this.lastActived = now
      }
    }
  }
</script>
<style lang="less" >
  @color-primary: #00aeff;
  @color-reverse: white;
  @color-disabled: #c0c0c0;
  button{
    border-radius: 4px;
    border: 1px solid;
    font-size:rem-calc(18px);
    text-align: center;
    box-sizing: border-box;
    height: rem-calc(45);
    padding-right: rem-calc(15);
    padding-left: rem-calc(15);
    &[disabled]{
      background-color: @color-disabled;
      border-color: @color-disabled;
    }
  }
  .btn-primary{
    border-color: @color-primary;
    background-color: @color-primary;
    color: @color-reverse;
  }
  .btn-reverse{
    border-color: @color-primary;
    background-color: transparent;
    color: @color-primary;
  }
  .btn-block{
    display: block;
    width: 100%;
  }
</style>
