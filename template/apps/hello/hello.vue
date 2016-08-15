<template>
    <section id='widget-app1' class='bh-p-8'>
        <h3 class='bh-pb-16'>
            演示如何开发及嵌入第三方App
        </h3>
        <div></div>
        <bh-button>这是一个按钮组件</bh-button>
        <div class='bh-pt-16'>
            <a v-link='contextPath + "/a"'>A页面</a>
            <a v-link='contextPath + "/b"'>B页面</a>
        </div>
        <hr class='bh-v-8'>
        <router-view></router-view>
    </section>
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
        route: {
            activate: function (transition) {
                // console.log('hello activate!', transition);
                this.contextPath = transition.to.path;
                this.$dispatch('widget-active', this.routes);
                transition.next();
            }
        },
        components: {BhButton}
    };
</script>

<style scoped>
    #widget-app1 {
        /*background-color: #eee;*/
    }
</style>
