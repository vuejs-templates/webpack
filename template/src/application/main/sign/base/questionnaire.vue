<!--
  功能：逐一答卷
  该组件提供了答卷功能，试题通过参数提供，组件会展开问卷，让用户逐一选择
  答卷结束后，会向上emit一个finish事件并带上(payload)答案
  答卷结束后会切换到的一个视图，视图通过当前组件的默认插槽内嵌入的内容指定

  每道题目类似一个幻灯片，题目切换时有个左右滑动的效果
  它们宽度都一致，但每道题的题目内容可能长度不一，以致每一个幻灯片的高度可能会不一样
  相比于每个幻灯片的绝对居中，这里采取了另一个更权衡的策略：
  在保证为一道题目顶部对齐的情况下居中
  顶部对齐有益于流畅一致的交互感，而相比来说，一味地追求对齐可能导致视线的起伏

  题目只支持单选和多选，且可以混合在一起使用
  除此外并不支持其它风格的题型，比如带图标和带即时注解（和产品确认过没有该种题型 2017-08）
  单选和多选的交互方式已协调一致，选择和切换到下一题是分开的

  另外，除开第一题都有一个“上一题”的按钮
  最后一题没有“下一题”按钮，但有“提交”按钮

  当前组件实现了一个简陋的幻灯片功能（也就意味着未剥离出当前组件）
  当前组件对应的UI中，有多选框和单选框，它们分别使用Vux的Checklist组件和Radio组件
  两者的样式都有部分重写，重写的样式在 .list-checkbox 和 .list-radio 下

-->
<template>
  <div>
    <slot v-if="complete" :questions="questions" :answers="selected"></slot>
    <ui-bg v-else :src="bgImage">
      <div class="scroll-questionnaire">
        <div class="box-questionnaire">
          <div class="list-slide" :style="{width:questions.length*100+'%',left:-100*activeIndex+'%'}">
            <div class="slide" v-for="(question,index) in questions">
              <div class="panel-slide">
                <h2>
                  （{{index + 1}}/{{questions.length}}）{{question.title}}
                  <span class="tips-multiple" v-if="isMultiple(question)">多选</span>
                </h2>
                <checklist v-if="isMultiple(question)"
                           :key="question.id"
                           :options="adapter(question)"
                           :disabled="isDisabled(index)"
                           @on-change="fillIn"
                           class="list-checkbox list-options"></checklist>
                <radio v-else
                       :key="question.id"
                       :options="adapter(question)"
                       :disabled="isDisabled(index)"
                       @on-change="fillIn"
                       class="list-radio list-options"></radio>
                <div v-if="index === activeIndex && !graded && analysable && question.explains && checkedAny">
                  <div v-if="analyzed[index]" class="panel-analysis">
                    <h4 v-if="isRight(index)" class="emoji-smile">非常棒!</h4>
                    <h4 v-else class="emoji-pity">很遗憾~<span class="bar">正确：{{question.answer}}</span></h4>
                    <p v-html="question.explains"></p>
                  </div>
                  <p v-else :class="[isMultiple(question)?'join':'split']">
                    <a @click="viewAnalysis" class="link-block link-primary tips-down">查看解析</a>
                  </p>
                </div>
                <flexbox v-if="prevQuestion && nextQuestion" class="nav-question" :gutter="10">
                  <flexbox-item>
                    <a @click="navToPrev">上一题</a>
                  </flexbox-item>
                  <flexbox-item>
                    <a @click="navToNext({disabled:!checkedAny})" class="primary" :class="{disabled:!checkedAny}">下一题</a>
                  </flexbox-item>
                </flexbox>
                <template v-else>
                  <a v-if="prevQuestion" @click="navToPrev" class="btn-block btn-shy">上一题</a>
                  <a v-if="nextQuestion" @click="navToNext({disabled:!checkedAny})" class="btn-block" :class="{disabled:!checkedAny}">下一题</a>
                </template>
              </div>
              <a v-if="!nextQuestion" @click="navToNext({disabled:!checkedAny})" class="btn-block btn-primary" :class="{disabled:!checkedAny}">提交</a>
            </div>
          </div>
        </div>
      </div>
    </ui-bg>
  </div>
</template>
<script>
  import uiBg from './bg.vue'
  import {Checklist, Radio, Flexbox, FlexboxItem} from 'vux'
  export default {
    name: 'questionnaire',
    props: {
      list: { //  题目列表
        type: Array,
        default: []
      },
      bgImage: String,  //  背景图
      rewritable: { //  题目答案可被重写的
        type: Boolean,
        default: true
      },
      graded: { //  问卷是分值类问卷，分值类问卷只能在整个问卷答题完毕后显示分值，答题过程中没有答案和解析
        type: Boolean
      },
      analysable: { //  答题过程中题目可被解析的
        type: Boolean
      }
    },
    components: {uiBg, Checklist, Radio, Flexbox, FlexboxItem},
    data () {
      return {
        //  问卷
        questions: this.list,
        //  一个索引，指向了题库中当前正在展示的题目，索引从0开始
        activeIndex: 0,
        //  用以标识整个答题过程是否结束，答题结束会进入一个环节
        complete: false,
        //  答题卡，记录题目的答案，数组id对应相应题目编号，每一项的内容是'A', 'BC'这样
        //  这是实时的，任何UI更改都会同步到该数组中
        selected: [],
        //  记录题目是否已填写完毕，数组id对应相应题目编号，每一项的内容为boolean值
        //  这是阶段性的，
        //  一般来说，当查看答案（如果有）或者切到下一道题时，认为当前题目已经填写完毕
        //  组合该数组和策略rewritable，可以判断radio组件、checkbox组件是否应该disabled
        filled: [],
        //  标记题目是否已把答案解析展开，该过程不可逆（即展开后就不可以收起）
        //  数组id对应相应题目编号，每一项的内容为boolean值
        //  一般来说，看到了答案和解析后，都不再允许修改对应题目
        //  该数组用于记录答案的展开过程
        analyzed: []
      }
    },
    computed: {
      /**
       * 计算属性 prevQuestion , 上一道题目
       * @returns {Object} | null 如果是当成正在测试第一题，则没有上一题，上一题为null，其它情况指向上一题
       */
      prevQuestion () {
        return this.activeIndex > 0 ? this.questions[this.activeIndex - 1] : null
      },
      /**
       * 计算属性 currQuestion , 当前题日
       * @returns {Object} | null
       */
      currQuestion () { // 当前题目
        return (this.activeIndex >= 0 && this.activeIndex < this.questions.length) ? this.questions[this.activeIndex] : null
      },
      /**
       * 计算属性 nextQuestion , 下一道题目
       * @returns {Object} | {null}
       */
      nextQuestion () {
        return this.activeIndex < this.questions.length - 1 ? this.questions[this.activeIndex] : null
      },
      /**
       * 当前题目是否有选中任意选项
       * 选择和切换到下一题是分开的
       * @returns {Boolean} true表示至少选中了一项
       */
      checkedAny () {
        let checked = this.selected[this.activeIndex]
        return checked && checked.length > 0
      }
    },
    methods: {
      /**
       * 判断一道题目是否是多选题
       * @param question {Object} 题目 question包含一个answer属性
       * @returns {Boolean} true表示着该题是多选题，false表示该题是单选
       */
      isMultiple (ques) {
        return ques.type === '2'
      },
      /**
       * 判断一道题目是否不可继续编辑答案
       * @param index {Number} 题目在问卷中的顺序编号，从0开始，即index为0表示第一道题目
       * 一道题目若满足下面的条件之一，则再也不能编辑答案了
       * 1. 该道题目查看了答案
       * 2. 该道题目已经填写完了，且策略上设置不可再回头重写
       * @returns {Boolean} true表示该题目不可继续编辑
       */
      isDisabled (index) {
        return this.analyzed[index] || (this.filled[index] && !this.rewritable)
      },
      /**
       * 一个适配器，用以将源数据适配成Vux中Checklist组件、Radio组件接受的数据
       * @param source {Array} Checklist、Radio组件的options参数接受的数据
       */
      adapter (ques) {
        return this.isBoolQues(ques) ? ques.options : ques.options.map(({key, value}) => {
          return {value: key + ' ' + value, key}
        })
      },
      /**
       * 更新当前题的选中项，同步到答题卡中
       * 填写和切换到下一题是分开的，单选亦是如此
       * @param checked {String} | {Array} 当前题目的当前选中项，对于多选题它则是一个数组
       */
      fillIn (checked) {
        this.$set(this.selected, this.activeIndex, checked)
      },
      /**
       * 查看当前题目的标准答案和答案解析
       * 查看标准备答案和答案解析将导致当前题目的答案再也不可更改，且该题目会一直处于显示答案的状态
       */
      viewAnalysis () {
        this.$set(this.filled, this.activeIndex, true)
        this.$set(this.analyzed, this.activeIndex, true)
      },
      /**
       * "平整"一个字符串，统一内部的大小写并按大小排好序，用于答案比对
       * @param s {String}|{Array} 将要平整的字符串 默认为空字符串
       */
      floating (s = '') {
        if (Array.isArray(s)) {
          s = s.join('')
        }
        return s.toUpperCase().split('').sort().join('')
      },
      /**
       * 判断编号为n的题目答案是否正确
       * @param n {Number} 题目编号，第一题的编号是0，而不是1
       */
      isRight (n) {
        return this.floating(this.questions[n].answer) === this.floating(this.selected[n])
      },
      /**
       * 返回上一题，保留当前题和上一题的答案，并不作处理
       */
      navToPrev () {
        this.activeIndex--
      },
      /**
       * 切换到下一题（，如果应该的话），或者切换到下一步（这里是指切换到提交问卷的视图）
       * @param disabled {Boolean} true代表着不能切换当下一题，原因一般是当前题目还没有填
       */
      navToNext ({disabled} = {}) {
        if (disabled) {
          this.showToast('请先完善选择')
          return
        }
        if (!this.filled[this.activeIndex]) {
          this.$set(this.filled, this.activeIndex, true)
        }
        if (this.nextQuestion) {
          this.activeIndex++
        } else {
          this.complete = true
          this.report()
        }
      },
      /**
       * 在UI中显示 Toast 消息
       * @param msg {String} 消息内容
       */
      showToast (msg) {
        this.$vux.toast.show({
          type: "text",
          width: "14.5rem",
          text: msg
        })
      },
      /**
       * 沿着组件树向上emit事件
       * 然后，有多选题时，在对答案的校对前可能需要对答案排序，
       * 或者使用一个更健壮的equal函数，需保证 ab, BA, AB, ba互相间是相等的
       */
      report () {
        this.$emit('finish', {
          score: this.graded ? this.getScore() : null,
          answer: this.getAnswer()
        })
      },
      getAnswer () {
        return this.selected.map((selected, index) => {
          let {id} = this.questions[index]
          let answer = Array.isArray(selected) ? selected.join('') : selected
          return {id, answer}
        })
      },
      getScore () {
        let score = 0
        if (this.graded) {
          score = this.questions.map((ques, index) => {
            let selected = this.selected[index]
            return selected ? selected.split('').map(s => ques.scoreAnsVoList.find(it => it.option === s).score).reduce((a, b) => a + b) : 0
          }).reduce((a, b) => a + b)
        }
        return score
      },
      /**
       * 判断一道题是否是“是非题”
       * 是非题是指只有对和错两种选项的选择题
       * 但是在展示时会适配成 A.是 ；B.否 这样的方式展示
       * @param ques {Object} 题目
       * @returns {boolean} true代表着一道题是“是非题”
       */
      isBoolQues (ques) {
        return ques.type === '3'
      }
    }
  }

</script>
