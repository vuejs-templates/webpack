/**
 * @throttle 节流函数
 * @author  stylehuan
 * @create  2017-02-09 13:50
 */
export default (fn, timeout) => {
  timeout = timeout || 20;
  var timeoutID;
  return function() {
    const scope = this;
    const args = arguments;
    if (timeoutID) {
      return;
    }
    timeoutID = setTimeout(function() {
      clearTimeout(timeoutID);
      timeoutID = null;
      fn.apply(scope, Array.prototype.slice.call(args));
    }, timeout);
  };
};
