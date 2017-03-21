/**
 * @systemEent 自定义事件管理
 * @author  stylehuan
 * @create  2017-02-09 13:19
 */
import eventBus from './eventBus';
import eventMsg from './eventMsg';
let noop = function () {
};
export const MSG = eventMsg;
export let SystemEvent = {
  on (events, callback) {
    callback = callback || noop;
    eventBus.$on(events, function (data) {
      callback.call(null, data);
    });
  },
  emit (events, args) {
    eventBus.$emit(events, args);
  },
  off (events) {
    eventBus.$off(events);
  }
};
