/**
 * @CtWebStorage
 * @author  stylehuan
 * @create  2017-01-20 10:53
 */
var cookie = {
    setCookie(key, value){
        var d = new Date();
        d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * 30);
        document.cookie = key + "=" + encodeURI(value) + "; expires=" + d.toGMTString();
    },
    getCookie(key){
        var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
        if (arr != null) {
            return decodeURIComponent(arr[2]);
        }
        return "";
    }
}

export default {
    getItem(key){
        return window.localStorage ? localStorage.getItem(key) : cookie.getCookie(key)
    },
    setItem(key, val){
        window.localStorage ? localStorage.setItem(key, val) : cookie.setCookie(key, val);
    }
}