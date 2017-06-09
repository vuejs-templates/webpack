import axios from 'axios'

const url = '/pubapi/translate/2'

export default {

  _getTranslate (params,cb,errorCb) {
    setTimeout(() => {
      this._getTranslate (params,cb,errorCb)
    }, 300)
  },

  getTranslate (params,cb,errorCb) {
    axios.get(url,{
      params: {
        from: 'auto',
        query: params.query
      }
    }).then( res => {
      typeof cb == "function" && cb(res.data)
    }).catch( error => {
      typeof errorCb == "function" && errorCb(error)
    })
  }


}
