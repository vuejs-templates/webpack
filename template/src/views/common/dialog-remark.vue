<template>
  <el-dialog v-bind="$attrs" :title="title" :visible.sync="visibleTmpl" :before-close="beforeClose">
    <el-input
      type="textarea"
      :rows="4"
      resize="none"
      v-model="remark">
    </el-input>
    <pagoda-row-btns class="text-center mt-10" :btns="rowBtnsTmpl" :visibles="btnVisibles"></pagoda-row-btns>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      remark: '',
      visibleTmpl: this.visible,
      rowBtnsTmpl: {
        save: {
          type: 'primary',
          text: '保存',
          onClick: () => {
            this.$emit('save', this.remark)
          }
        },
        cancel: {
          text: '取消',
          type: 'text',
          onClick: () => {
            this.$emit('update:visible', false)
            this.$emit('cancel', this.remark)
          }
        }
      }
    }
  },
  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false
    },
    rowBtns: Object,
    btnVisibles: {
      type: Array,
      default: () => {
        return ['save', 'cancel']
      }
    }
  },
  created () {
    if (this.rowBtns) {
      this.rowBtnsTmpl = this.this.rowBtns
    }
  },
  mounted () {
  },
  watch: {
    visible (n) {
      console.log(n)
      this.remark = ''
      this.visibleTmpl = n
    }
  },
  methods: {
    beforeClose (done) {
      console.log('要关闭了')
      this.$emit('update:visible', false)
      done()
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
</style>
