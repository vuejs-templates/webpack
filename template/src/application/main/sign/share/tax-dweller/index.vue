<!--
  税收居民
-->
<template>
  <div>
    <tax-dweller :applyId="computedApplyId" :inApp="inApp" v-if="ready" @end="back"/>
  </div>
</template>
<script>
  import taxDweller from './tax-dweller.vue'
  export default {
    name: 'taxDwellerFile',
    components: {
      taxDweller
    },
    props: {
      inApp: {
        type: Boolean,
        default: true
      },
      applyId: {
        type: [Number, String]
      }
    },
    data () {
      return {
        ready: false,
        computedApplyId: this.applyId
      }
    },
    created () {
      if (this.inApp) {
        this.computedApplyId = this.$route.query.applyId
      }
      this.ready = true
    },
    methods: {
      back (options) {
        if (this.inApp) {
          window.gobackbtn()
        } else {
          this.$emit('end', options)
        }
      }
    }
  }
</script>
