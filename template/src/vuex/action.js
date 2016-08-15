import * as types from './mutation-types';

export const fetchMenus = function ({ dispatch, state }) {
    var menus = {
        title: '菜单',  // 标题
        iconFont: '', // 字体图标的总类名
        data: [[
            {
                'text': 'Hello', // 菜单名
                'icon': 'iconfont icon-bookmark',
                'href': '#!/apps/hello',
                'active': true  // 该标题为选中状态，必须有一个菜单的该属性是true
            }
        ]]
    };

    dispatch(types.MENU_LIST, menus);
};
