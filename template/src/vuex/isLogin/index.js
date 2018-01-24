import nameSpaced from "../nameSpaced"
//设置登录数据模块的命名空间为isLogin
const types = nameSpaced('isLogin');

const state = {
    loginFlag:false,
    Nid:0,
    TeamData:null,
    Eid:0,
    Xid:0
}
const mutations = {
    [types.SET_MUTATIONS](state, {loginFlag,Nid,TeamData,Eid,Xid}){
        state.loginFlag = loginFlag;
        state.Nid = Nid;
        state.TeamData = TeamData;
        state.Eid = Eid;
        state.Xid = Xid;
    }
}
const actions = {
    [types.SET_ACTIONS]({commit},data){
        commit(types.SET_MUTATIONS,data);
    }
}

const getters = {
    [types.SET_GETTERS](state) {
        return state;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}