<template>
    <bh-header
        logo='http://res.wisedu.com/scenes/public/images/demo/logo.png'
        slogon='jqwidget-based Vue Components'
        :has-sidemenu='true'
        :nav-items='navItems'
        :side-menus='sideMenus'
        :icons='icons'
        :user-info='userInfo'
    >
    </bh-header>
    <main>
        <router-view></router-view>
    </main>
    <bh-footer copyright='版权信息：© 2015 江苏金智教育信息股份有限公司 苏ICP备10204514号'></bh-footer>
    <div id='message_success'></div>
    <div id='message_error'></div>
    <div id='jqxLoader' style='display:none'></div>
</template>

<script>
// require('directives/bhValidator');
// require('directives/bhToolTip');
require('filters/dateFilter');

import BhHeader from 'components/bh-header/bhHeader';
import BhFooter from 'components/bh-footer/bhFooter';

import store from 'vx/store';
import {fetchMenus} from 'vx/action';
import {menuList} from 'vx/getters';

export default {
    data () {
        return {
            'icons': [
                {'className': 'icon-apps', 'attrs': {'id': 'iconApps', 'data-flag': true}},
                {'className': 'icon-settings'}
            ],
            'navItems': [{
                'title': '组件', // 菜单名
                'hide': false, // 将该项菜单隐藏
                'active': true,  // 该标题为选中状态，必须有一个菜单的该属性是true
                'className': 'firstFlag',  // 可选，给该菜单名添加样式类
                'href': '#!/', // 可选，给该菜单添加链接
                'isOpenNewPage': false // 可选，该菜单是否要在新窗口打开，只有在配置了href才有效
            }],
            'userInfo': {
                'image': 'http://res.wisedu.com/scenes/public/images/demo/user1.png',
                'info': [
                    '游客',
                    '01115089'
                ],
                'logoutHref': '#'
            }
        };
    },
    store: store,
    vuex: {
        actions: {
            fetchMenus: fetchMenus
        },
        getters: {
            sideMenus: menuList
        }
    },
    ready () {
        this.fetchMenus();
        console.log('setContentMinHeight');
    },
    components: {BhHeader, BhFooter}
};
</script>
