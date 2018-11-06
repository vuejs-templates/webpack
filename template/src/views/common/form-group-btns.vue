<template>
  <div class="form-group-btns mb-20" :style="{'padding-left': formLabelWidth}">
    <el-button type="primary" @click="submit">查询</el-button>
    <el-button type="warning" @click="reset">重置</el-button>
  </div>
</template>

<script>
import { formLabelWidth } from '@/utils/default-setting'
export default {
  data () {
    return {
      formLabelWidth
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    },
    reset () {
      this.$emit('reset')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
// 筛选表单按钮组统一样式
.form-group-btns
  text-align left
  padding 0px 0 15px 40px
  border-bottom 1px solid #ebeff2
</style>
