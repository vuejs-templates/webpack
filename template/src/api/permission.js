import http from './http'

const url = '/getPermission'

export default function (data) {
  return new Promise((resolve, reject) => {
    http({
      url,
      data
    }).then(res => {
      resolve(res.data.data)
    }, reject)
  })

}
