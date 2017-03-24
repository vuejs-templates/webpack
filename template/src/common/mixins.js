/**
 * mixin 全局的 toast
 */
import Vue from 'vue'
Vue.mixin({
  methods: {
    showToast(text) {
      this.$store.commit('UPDATE_TOAST', {
        show: true,
        text: text
      })
    },
    switchLoading(loading) {
      window.setTimeout(() => {
        this.$store.commit('UPDATE_LOADING', {
          status: loading.status || false,
          text: loading.text || ''
        })
      }, loading.time)
    }
  }
})
