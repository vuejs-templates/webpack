<template>
  <div class="Home">
    <h1>
      <img class="vertical-middle" :src="role.img" width="50" height="50" alt="ddd">
      欢迎 <span class="text-blue">{{role.name}}</span> 使用百果园ERP——管理系统
    </h1>
    <div class="backlog_list clearfix">
      <div class="backlog_item animated"
        :class="{'shake': backlog.count > 0 && backlog.shake, 'shadow-5 pointer': backlog.count > 0}"
        @click="backlog.count > 0 && $router.push(backlog.to)" v-for="(backlog, index) in backlogData" :key="index">
        <div class="_title">{{backlog.title}}</div>
        <div class="_bottom">
          <div class="inline-block" :class="'_icon-' + index"></div>
          <div class="_count inline-block" :class="{'text-danger': backlog.count > 0}">{{backlog.count}}</div>
          <span class="_detail" v-if="backlog.count > 0">详情</span>
        </div>
      </div>
    </div>

    <!-- <router-link to="editItemTest">测试edit-item</router-link>
    <br>
    <router-link to="editFormTest">测试edit-form</router-link>
    <br>
    <router-link to="sortTableTest">测试sortTableTest</router-link>
    <div style="margin-left: 500px;width: 80px">
      <remark-cell v-model="remark"></remark-cell>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      remark: '这是备注',
      backlogData: [
        {title: '请购单待办', count: 0, to: {name: 'purchasePending'}, shake: false},
        {title: '采购订单待办', count: 0, to: {name: 'orderPending'}, shake: false},
        {title: '待办业务3', count: 0, to: {name: 'purchasePending'}, shake: false},
        {title: '待办业务4', count: 0, to: {name: 'purchasePending'}, shake: false}
      ],
      timerIds: []
    }
  },
  created () {
    const timeoutTodo = (index, time) => {
      let timerId = setTimeout(() => {
        this.backlogData[index].shake = true
        this.backlogData[index].count += 1
        this.$message.warning('你收到新的待办任务，请及时处理！')
        setTimeout(() => {
          this.backlogData[index].shake = false
        }, 900)
      }, time)
      this.timerIds.push(timerId)
    }
    timeoutTodo(1, 100000)
    // timeoutTodo(0, 1000)
    // timeoutTodo(1, 5000)
    // timeoutTodo(3, 3000)
  },
  computed: {
    ...mapState(['role'])
  },
  beforeDestroy () {
    this.timerIds.forEach(timerId => {
      clearTimeout(timerId)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../assets/stylus/variable"
iconCommon($left, $top)
  display inline-block
  width 60px
  height 60px
  margin-right 16px
  background-size 240px 60px
  background-position $left $top
  background-repeat no-repeat
  background-image url('data:image/jpg;base64,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')

.Home
  .backlog_list
    .backlog_item
      padding 15px
      width: 21%
      margin-right: 40px
      float: left
      border-radius 6px
      box-shadow $box-shadow-inset
      &.shadow-5
        box-shadow $box-shadow-5
      ._title
        font-size 22px
        padding 10px 0
      ._bottom
        padding-top 15px
        ._icon
          &-0
            iconCommon(0, 0)
          &-1
            iconCommon(-60px, 0)
          &-2
            iconCommon(-120px, 0)
          &-3
            iconCommon(-180px, 0)
        ._count
          font-size 33px
          font-weight: 700
        ._detail
          float: right
          margin-top: 40px
</style>
