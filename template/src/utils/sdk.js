import {init as sdkInit} from 'bh-mobile-sdk'

const DEV_MODE = process.env.NODE_ENV === 'development'
const HTTPS = location.protocol === 'https:'
let sdk = null

export const init = () => {
    return new Promise((resolve) => {
        sdkInit(function() {
            sdk = window.BH_MOBILE_SDK
            resolve()
        }, HTTPS)
    })
}

// 获取当前用户信息
export const getUserInfo = () => {
    return new Promise(resolve => {
        if (DEV_MODE) {
            resolve({
                name: 'qtx'
            })
        } else {
            sdk.cpdaily.getUserInfo(resolve)
        }
    })
}

// 获取当前学校信息
export const getTenantInfo = () => {
    return new Promise(resolve => {
        sdk.cpdaily.getTenantInfo(resolve)
    })
}

export const getTenantId = () => {
    return new Promise(resolve => {
        sdk.cpdaily.getTenantId(resolve)
    })
}

// 打开新窗口
export const openWindow = (url, options) => {
    sdk.UI.openWebView(url, options)
}

// 页面切换回来后的回调
export const setResume = onResume => {
    sdk.UI.webviewOnResume(onResume)
}

// toast
export const toast = msg => {
    sdk.UI.showToast(msg)
}

/**
 * go to login page
 */
export const gotoLoginPage = () => {
    sdk.UI.closeWebView()
    sdk.cpdaily.showLoginView(false, true)
}
