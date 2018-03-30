import fetch from './fetch'
export function sendNotice(param,type){
    return fetch({
        url:'/api/notify/'+type,
        method:'post',
        data:param,
        headers:{
          "Content-Type": "application/json"
        }
    })
}
export function getFileArr(param){
  return fetch({
    baseURL:'http://192.168.0.12:8084',
    url:'/wxapi/fileupdown/filelist',
    method:'get',
    params:param,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
}
