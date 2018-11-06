<template>
  <el-dialog
    :visible.sync="dialogVisible"
  >
    11
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialogVisible: false
      }
    },
    methods: {
      focus () {
        this.dialogVisible = true
      }
    }
  }
</script>
