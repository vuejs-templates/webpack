/**
 * Created by Administrator on 2019/4/2.
 */
import { format } from 'date-fns';
export  default {
  //一般的过滤器
  formatTime(time){
    "use strict";
      if(time){
      return  format(time, 'YYYY-MM-DD HH:mm:ss');
      }
  },
  multiParam(first,second){
    return  first+'-'+second
  },
  multiParam2([first,second]){
    return  first+'-'+second
  }
}
