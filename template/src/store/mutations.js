/**
 * Created by hq5544 on 16/3/26.
 */
import {
    CHANGE_TITLE,
    TOGGLE_POPUP,
    SETTING_POPUP,
    FOOTER_SHOW,
    TOGGLE_LOADING,
    TOGGLE_HIDE_BAN,
    SET_TEMP_INFO,
    SET_TOKEN
} from './mutation-types'

const mutations = {
    [TOGGLE_LOADING] (state, status) {
        state.loading = status
    },
    [CHANGE_TITLE] (state, title) {
        state.title = title
    },
    [FOOTER_SHOW] (state, title) {
        state.footerShow = title
    },
    [TOGGLE_POPUP] (state, show) {
        state.popupShow = show
    },
    [TOGGLE_HIDE_BAN] (state, ban) {
        state.popupHideBan = ban
    },
    [SETTING_POPUP] (state, settings) {
        const defaultList = [
            {
                text: '确定',
                fn () {}
            }
        ]
        state.popupSettings.title = settings.title || '提醒'
        state.popupSettings.content = settings.content
        state.popupSettings.btnList = settings.btnList || defaultList
    },
    [SET_TEMP_INFO] (state, temp) {
        Object.assign(state.temp, temp)
    },
    [SET_TOKEN] (state, token) {
        state.token = token
    }
}

export default mutations
