/**
 * @module service 示例
 * http用法请参考 http://res.wisedu.com/FS/vue-doc/module-utils_http.html
 */
import {postJson, handler} from 'bh-vue/utils/http';
import {api} from 'conf/api';

export const updateInfo = (info) => {
    return postJson(api.UPDATE_INFO, info, handler.CODE);
};
