import axios from 'axios'

// import _ from 'lodash'
const _mock = require('./mock-data')

const getQueByIdsUrl = '/api/getQueByIds'

export default {

  getQueByIds (ids,cb,errorCb) {
    axios.get(getQueByIdsUrl, {
      params:{
        'ids': ids
      }
    }).then( res => {
      typeof cb == "function" && cb(res.data)
    }).catch( error => {
      typeof errorCb == "function" && errorCb(error)
    });
  },

  getReport (id,cb,errorCb) {
    setTimeout(() => cb( _mock ), 100)
  }

}
