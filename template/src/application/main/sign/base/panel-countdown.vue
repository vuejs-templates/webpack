<!--
  手机号码验证面板
  @prop v-model: 它是一个对象，有三个属性 on，value和verCodeLength。
  当on变为true时会开始倒计时，这一般应在向服务器发送请求后设置。on的值会在倒计时结束后由v-model的更新机制更新为false。
  value表示输入框中的验证码的值。on的值会在输入完毕后由v-model的更新机制更新。
  @event send: 通过事件监听关键节点，点击发送按钮时会触发send事件，具体如何处理交由父组件
  @prop disabled:  代表countdown业务上是否不可用
  @prop period: 选填，倒计时持续时间，详见countdown.vue
  @prop tick: 选填，倒计时刻度值，详见countdown.vue
  有4个slot: default, title, tips-dynamic, tips 都有默认DOM结构，一般不需要替换
-->
<template>
  <div class="hq-panel-countdown">
    <slot name="title">
      <h2>短信验证码</h2>
    </slot>
    <section>
      <slot :disabled="disabled">
        <input type="text" placeholder="请输入验证码" :disabled="disabled || !counted"
               :value="verCode|number|maxLength(6)" @input="updateInput" maxlength="6">
      </slot>
      <button type="button" :class="{disabled:disabled||counting}" @click="$emit('send')" :disabled="counting">
        <countdown :on="counting" @end="counting=false" :period="period" :tick="tick">
          <template slot-scope="props">
            <template v-if="props.on">{{props.remain}}秒后重新获取</template>
            <template v-else>发送短信验证码</template>
          </template>
        </countdown>
      </button>
    </section>
    <slot name="tips-dynamic" :mobile="mobile" :counted="counted">
      <p class="tips-dynamic" v-if="counted">短信验证码已发送至手机{{mobile|mosaic}}，请注意查收。</p>
    </slot>
    <slot name="tips">
      <p class="tips">注：如连续输入错误超过3次，本次投保计划的交易将被撤销！</p>
    </slot>
  </div>
</template>
<script>
  import clone from '@/widget/util/clone'
  import countdown from './countdown.vue'
  export default {
    components: {countdown},
    model: {
      prop: 'model',
      event: 'update'
    },
    props: {
      model: {
        type: Object
      },
      disabled: {
        type: Boolean,
        default () {
          return false
        }
      },
      mobile: [String, Number],
      period: {
        type: Number,
        default () {
          return 120
        }
      },
      tick: {
        type: Number,
        default () {
          return 1
        }
      }
    },
    data () {
      return {
        // model的镜像，因为连续发射update事件时，后续使用model时，model可能还没来得及更新
        cache: null,
        counted: false
      }
    },
    computed: {
      counting: {
        get () {
          return this.model.on
        },
        set (on) {
          this.update({on})
        }
      },
      verCode: {
        get () {
          return this.model.value
        },
        set (value) {
          this.update({value})
        }
      }
    },
    watch: {
      counting (to, from) {
        if (from === false && to === true) {
          this.counted = true
        }
      }
    },
    methods: {
      // 更新输入的验证码
      updateInput (e) {
        this.verCode = e.target.value
      },
      // 更新模型数据
      update (append) {
        // 当连续地emit update event时，后续创建更新payload时可能最新的数据还没有刷新，因此这里要使用快速缓存 this.cache
        const cached = !!this.cache
//        let model = clone(cached ? this.cache : this.model)
        let model = clone(this.model)
        for (let key in append) {
          model[key] = append[key]
        }
        this.cache = clone(model)
        this.$emit('update', model)
      }
    }
  }
</script>
<style lang='less'>
  @color-split: #e1e1e1;
  @color-disabled: #999;
  .hq-panel-countdown{
    h2{
      background-color: #d8f4ff;
      color: #646464;
      margin-top: 15px;
      line-height: 45px;
      font-size: 15px;
      font-weight: normal;
      text-align: center;
      text-indent: 0;
    }
    section{
      border-bottom: 1px solid @color-split;
      padding: 16 12px;
      display: flex;
      background-color: white;
    }
    input{
      flex: 3;
      border: 0 none;
      line-height: 36px;
      box-sizing:border-box;
      font-size: 15px;
      padding: 0 5px;
      background-color: transparent;
      &:focus{
        border: 0 none;
        outline: 0 none;
      }
    }
    button{
      flex: 2;
      display: flex;
      background-color: #f69601;
      color: white;
      border: 0 none;
      outline: 0 none;
      line-height: 36px;
      border-radius: 4px;
      padding:0 12px;
      font-size: 13px;
      @include ellipsis;
      &.disabled{
        background-color: @color-disabled;
      }
    }
    .tips-dynamic{
      line-height: 45px;
      background-color: white;
      padding: 0 12px;
    }
    .tips{
      color:#00b0ff;
      font-size: 12px;
      padding: 8px 12px;
      line-height: 20px;
    }
  }
</style>
