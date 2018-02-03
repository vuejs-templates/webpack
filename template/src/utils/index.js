/**
 * Created by nocoolyoyo on 2018/1/23.
 */

//获取当前客户端类型
export function clientType() {
  const ua = navigator.userAgent;
  const isMobile = /mobile/gi.test(ua);
  const isIOS = /ipad|iphone|mac/gi.test(ua);
  const isAndroid  = /android/gi.test(ua);

  if(isMobile && isIOS)
    return 'ios';
  if(isMobile && isAndroid)
    return 'android';
  return 'web';
}

