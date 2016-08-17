<template>
    <bh-header
        logo='http://res.wisedu.com/scenes/public/images/demo/logo.png'
        slogon='公有云APP开发平台'
        :has-sidemenu='false'
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

import router from 'src/router';

import BhHeader from 'bh-vue/bh-header/bhHeader';
import BhFooter from 'bh-vue/bh-footer/bhFooter';
import BhNav from 'bh-vue/bh-nav/bhNav';

// import store from 'vx/store';
// import {fetchMenus} from 'vx/action';
// import {menuList} from 'vx/getters';

var _ = Vue.util;

export default {
    data () {
        return {
            'userInfo': {
                'image': 'http://res.wisedu.com/scenes/public/images/demo/user1.png',
                'info': [
                    '开发者',
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
    ready () {
        console.log('setContentMinHeight');
    },
    components: {BhHeader, BhFooter, BhNav}
};
</script>
