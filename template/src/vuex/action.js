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
