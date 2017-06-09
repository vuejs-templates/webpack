import Vue from 'vue'
import './iconfont.js'

Vue.component('icon', {
  render: function (createElement) {
    return createElement(
      'svg',{
        attrs: {
          'class': 'icon',
          'aria-hidden': "true"
        },
      }, [createElement('use',{
            attrs: {
              'xlink:href': '#'+this.xlink,
            }
          }, this.$slots.default)]
    )
  },
  props: {
    xlink: {
      type: String,
      required: true
    }
  }
})
