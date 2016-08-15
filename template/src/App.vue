<template>
    <bh-header
        logo='http://res.wisedu.com/scenes/public/images/demo/logo.png'
        slogon='公有云APP开发平台'
        :has-sidemenu='false'
        :nav-items='navItems'
        :icons='icons'
        :user-info='userInfo'
    >
    </bh-header>
    <main >
        <article bh-layout-role="navLeft" class="sc-navLeft-m sc-navLeft-category">
            <nav>
                <div class="sc-leftSide-bgAtTop"></div>
                <bh-nav :source='sideMenus' source-type='flat'></bh-nav>
            </nav>
            <router-view></router-view>
        </article>
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

import router from 'src/router';

import BhHeader from 'bh-vue/bh-header/bhHeader';
import BhFooter from 'bh-vue/bh-footer/bhFooter';
import BhNav from 'bh-vue/bh-nav/bhNav';

import store from 'vx/store';
import {fetchMenus} from 'vx/action';
import {menuList} from 'vx/getters';

var _ = Vue.util;

export default {
    data () {
        return {
            'icons': [
                {'className': 'icon-apps', 'attrs': {'id': 'iconApps', 'data-flag': true}},
                {'className': 'icon-settings'}
            ],
            // 'navItems': [{
            //     'title': '组件', // 菜单名
            //     'hide': false, // 将该项菜单隐藏
            //     'active': true,  // 该标题为选中状态，必须有一个菜单的该属性是true
            //     'className': 'firstFlag',  // 可选，给该菜单名添加样式类
            //     'href': '#!/', // 可选，给该菜单添加链接
            //     'isOpenNewPage': false // 可选，该菜单是否要在新窗口打开，只有在配置了href才有效
            // }],
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
    events: {
        // 支持插件机制
        'widget-active' (routes) {
            // console.log('widget active', this.$router);
            var matched = this.$router._currentTransition.to.matched;

            var len = matched.length;
            var segments = [];
            for (var i = 0; i < len; i++) {
                segments.push({
                    path: matched[i].handler.path,
                    handler: matched[i].handler
                });
            }

            for (var path in routes) {
                var handler = routes[path];
                router.addSubRouter(path, handler, _.extend([], segments));
            }
        }
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
    components: {BhHeader, BhFooter, BhNav}
};
</script>
