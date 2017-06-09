import Vue from 'vue'
import QRCode from 'qrcode'

Vue.component('qrcode', {
  template: '<img :src="dataUrl">',
  props: {
    url: {
      type: String
    }
  },
  data() {
    return {
      dataUrl: null
    }
  },
  created() {
    QRCode.toDataURL(this.url, {margin: 1}, (err, url)=> {
      if (err) console.error(err)
      this.dataUrl = url
    })
  },
})
