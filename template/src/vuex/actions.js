import * as types from './mutation-types';

export const fetchMenus = function ({ dispatch, state }) {
    var menus = [{
        'id': 0,
        'name': 'HelloWorld',
        'action': 'link',
        'icon': 'iconfont icon-bookmark',
        'url': '/apps/hello'
    }];

    dispatch(types.MENU_LIST, menus);
};

export const getCatagories = ({ dispatch, state }) => {
    dispatch(types.CATAGORY_LIST, [
        {stepId: 'basic', title: '基本信息'},
        {stepId: 'roll', title: '学籍信息'},
        {stepId: 'start', title: '入学信息'},
        {stepId: 'grad', title: '毕业信息'},
        {stepId: 'addr', title: '通讯信息'},
        {stepId: 'other', title: '其他'}
    ]);
};
