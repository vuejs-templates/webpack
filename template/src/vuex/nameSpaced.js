//设置mutations,actions,getters的命名空间
export default (modules) => {
    return {
        SET_ACTIONS: `${modules}/SET_ACTIONS`,//发送actions
        SET_MUTATIONS: `${modules}/SET_MUTATIONS`,//触发mutations
        SET_GETTERS: `${modules}/SET_GETTERS`,//获取getters
        SET_INIT_ACTIONS:`${modules}/SET_INIT_ACTIONS`,//初始化actions状态
        SET_INIT_MUTATIONS:`${modules}/SET_INIT_MUTATIONS`//初始化mutations状态
    }
}