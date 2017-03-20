/**
 * @ajax
 * @author  stylehuan
 * @create  2017-01-22 13:30
 */
import axios from 'axios';
let emptyFn = function () {
};
export default function (options) {
  let _url = options.url;
  let _headers = options.headers || null;
  let _data = options.data || null;
  let _method = options.method || 'get';
  let _success = options.success || emptyFn;
  let _error = options.error || emptyFn;
  let _beforeSend = options.beforeSend || emptyFn;
  let _complete = options.complete || emptyFn;
  if (options.url == '') return;
  let config = {
    method: _method,
    url: _url,
    data: _data
  };
  if (_headers) {
    config.headers = _headers;
  }
  _beforeSend();
  console.log('--ajaxSend--', _url);
  axios(config).then(function (response) {
    console.log('--ajaxSuccess--', response);
    _complete(response.request, response.status);
    if (response.data) {
      _success(response.data);
    } else {
      console.log('--ajaxSuccess--', 'no data');
    }
  }).catch(function (error) {
    console.log('--ajaxError--', error);
    _error();
  });
}



