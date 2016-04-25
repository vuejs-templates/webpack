/**
 * Created by hq5544 on 16/3/26.
 */
import * as types from './mutation-types'

export const toggleLoading = ({ dispatch }, status) => {
    dispatch(types.TOGGLE_LOADING, status)
}
export const changeTitle = ({ dispatch }, nextTitle) => {
    dispatch(types.CHANGE_TITLE, nextTitle)
}
export const showPopup = ({ dispatch }) => {
    dispatch(types.TOGGLE_POPUP, true)
}
export const hidePopup = ({ dispatch }) => {
    dispatch(types.TOGGLE_POPUP, false)
}
export const toggleHideBan = ({ dispatch }, ban) => {
    dispatch(types.TOGGLE_HIDE_BAN, ban)
}
export const settingPopup = ({ dispatch }, settings) => {
    dispatch(types.SETTING_POPUP, settings)
}
export const toggleFooterShow = ({ dispatch }, show) => {
    dispatch(types.FOOTER_SHOW, show)
}
export const setTempInfo = ({ dispatch }, temp) => {
    // 缓存表单信息
    dispatch(types.SET_TEMP_INFO, temp)
}
export const setToken = ({ dispatch }, token) => {
    dispatch(types.SET_TOKEN, token)
}
