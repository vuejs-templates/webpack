/**
 * @systemEent 自定义事件管理
 * @author  stylehuan
 * @create  2017-02-09 13:19
 */
import Vue from 'vue'

var _instance = ()=> {
    return new Vue();
};

export const SYSTEM_Msg = {
    ROUTER_BEFORE: "ROUTER_BEFORE",
    ROUTER_AFTER: "ROUTER_AFTER",
    CONNECTERROT: "CONNECTERROT"
};

export let eventBus = {
    on(events, callback){
        _instance.$on(events, callback);
    },
    emit(events, args){
        _instance.$emit(events, args);
    },
    off(events){
        _instance.$off(events);
    }
};