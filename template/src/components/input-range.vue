<template>
  <div
    class="pagoda-input-range"
    :class="{
      'pagoda-input-range--focus': isFocus
    }">
    <el-input
      :value="value[0]"
      :clearable="false"
      @input="$emit('input', [arguments[0], value[1]])"
      @focus="focus('startInput')"
      @blur="blur('startInput')">
    </el-input>
    <span class="range-separator">{{rangeSeparator}}</span>
    <el-input
      :value="value[1]"
      :clearable="false"
      @input="$emit('input', [value[0], arguments[0]])"
      @focus="focus('endInput')"
      @blur="blur('endInput')">
    </el-input>
    <span class="el-input__suffix el-input__suffix-loading" @click="$emit('input', [])" v-if="clearable">
      <span class="el-input__suffix-inner">
        <i class="el-select__caret el-input__icon el-icon-circle-close"></i>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'input-range',
  data () {
    return {
      startInputFocus: false,
      endInputFocus: false,
      isFocus: false
    }
  },
  props: {
    value: {
      type: null,
      default: []
    },
    rangeSeparator: {
      type: String,
      default: '至'
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  created () {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    focus (Input) {
      this[`${Input}Focus`] = true
      this.isFocus = true
    },
    blur (Input) {
      this[`${Input}Focus`] = false

      this.$nextTick(() => {
        if (!this.startInputFocus && !this.endInputFocus) {
          this.isFocus = false
        }
      })
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  .pagoda-input-range
    border 1px solid #dcdfe6
    border-radius 4px

    &--focus
      border-color #00C587
    &:hover
      .el-icon-circle-close
        display block

    .el-input
      width 90px
      input
        border none
    .range-separator
      vertical-align middle
      font-size 12px
    .el-icon-circle-close
      display none
      line-height normal
      cursor pointer
</style>
