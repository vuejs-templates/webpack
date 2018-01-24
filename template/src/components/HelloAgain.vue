<template>
  <div>
    <show-text :text="text"></show-text>
  </div>
</template>

<script>
import showText from './ShowText'

export default {
  data () {
    return {
      text: this.$route.params.text,
    }
  },
  components: {
    'show-text': showText,
  },
  watch: {
    '$route' (to, from) {
      this.text = to.params.text
      this.setText()
    },
  },
  methods: {
    setText () {
      this.text += ' here.'
    }
  },
  created () {
    this.setText()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
