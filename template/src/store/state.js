/**
 * Created by hq5544 on 16/3/26.
 * 初始状态
 */
const state = {
    loading: false,
    title: 'demo',
    footerShow: false,
    popupShow: false,
    popupHideBan: false,
    popupSettings: {
        title: '',
        btnList: [],
        content: ''
    },
    temp: {
        baseInfo: {}
    },
    token: ''
}

export default state
