<template>
  <div>
    <p>
      \{{text}}
    </p>
    <div>
      <router-link :to="{path: 'helloagain/' + text}">
        Hello Again
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import helloAgain from './HelloAgain'

export default {
  name: 'HelloWorld',
  components: {
    'hello-again': helloAgain
  },
  computed: {
    ...mapGetters([
      'text'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
