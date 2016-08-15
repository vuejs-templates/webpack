<template>
    <div id='widget-app1' class='bh-p-8'>
        <p>{{title}}</p>
        <div>{{msg}}</div>
        <bh-button>这是一个按钮组件</bh-button>
        <div>
            <a v-link='contextPath + "/a"'>A页面</a>
            <a v-link='contextPath + "/b"'>B页面</a>
        </div>
        <hr class='bh-v-8'>
        <router-view></router-view>
    </div>
</template>

<script>
    import BhButton from 'bh-vue/bh-button/bhButton';

    var A = require('./a');
    var B = require('./b');

    export default {
        props: ['contextPath'],
        data () {
            return {
                title: 'APP ONE',
                msg: 'hello app 1',
                routes: {
                    '/a': {
                        component: A
                    },
                    '/b': {
                        component: B
                    }
                }
            };
        },
        activate (done) {
            this.$dispatch('widget-active', this.routes);
            done();
        },
        components: {BhButton}
    };
</script>

<style scoped>
    #widget-app1 {
        background-color: #eee;
    }
</style>
