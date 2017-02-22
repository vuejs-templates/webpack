<template>
    <div class='hello'>
        <h3>静态资源测试</h3>
        <hr>
        <div class='caselist'>
            <div class='case'>
                <btn @click.native='say'>背景(background-image)是否正常</btn>
            </div>
            <div class='case'>
                <p>测试 img 标签</p>
                <img src="../../statics/imgs/u16.png">
            </div>
            <div class='case'>
                <p>测试动态加载本地图片</p>
                <btn @click.native='load'>加载本地图片</btn>
                <btn @click.native='unload'>取消</btn>
                <div>
                    <img :src="imgUrl" alt='待加载...'>
                </div>
            </div>
        </div>
        <h3>web font 测试</h3>
        <hr>
        <div class='caselist'>
            <div class='case'>
                <i class='fa fa-times fa-spin'></i>
                <i class='fa fa-signal'></i>
                <i class='fa fa-home'></i>
                <i class='fa fa-road fa-spin'></i>
            </div>
        </div>
	{{#i18n}}
        <h3>多语言测试</h3>
        <hr>
        <div class='caselist'>
            <div class='case'>
                \{{$t('title')}}
            </div>
            <div class='case'>
                <button @click='toggleLang'>\{{$t('switchLang')}}</button>
            </div>
        </div>
	{{/i18n}}
	{{#vuex}}
        <h3>经典vuex测试</h3>
        <hr>
        <div class='caselist'>
            <div class='case'>
                计数：\{{count}}
            </div>
            <div class='case'>
                <button @click='add'>加加</button>
                <button @click='sub'>减减</button>
            </div>
        </div>
	{{/vuex}}
        <h3>axios测试</h3>
        <hr>
        <div class='caselist'>
            <div class='case'>
                <button @click='sendReq'>发送请求</button>
            </div>
        </div>
    </div>
</template>

<script>
    {{#vuex}}
    import store from 'vuex/store';
    {{/vuex}}
    import Btn from 'components/button';
    import {getInfo} from 'services/studentService';

    export default {
        data: () => ({
            imgUrl: null
        }),
        computed: Vuex.mapState({
            count: state => state.count
        }),
        methods: {
	    {{#vuex}}
            add () {
                store.commit('increment', 10);
            },
            sub () {
                store.commit('decrement', 10);
            },
	    {{/vuex}}
            load () {
                this.imgUrl = '../statics/imgs/sysUpdate.png';
            },
            unload () {
                this.imgUrl = '';
            },
            say () {
                alert('正常 !');
            },
	    {{#i18n}}
            toggleLang () {
                Vue.config.lang = Vue.config.lang === 'en' ? 'cn' : 'en';
            },
	    {{/i18n}}
            sendReq () {
                getInfo({id: 1}).then(data => {
                    alert(JSON.stringify(data));
                }, (data) => {
                    alert(data.message);
                    console.error(data);
                })
            }
        },
	{{#vuex}}
        store,
	{{/vuex}}
        beforeRouteEnter (to, from, next) {
            console.log('好消息！第一个入口组件也可以使用 beforeRouteEnter 进行预处理。。');
            next();
        },
        components: {Btn}
    };
</script>

<style>
    body {
        background: url('../../statics/imgs/sideBack.png');
    }
</style>

<style scoped lang='less'>
    .hello {
        color: #fff;
    }

    .caselist {
        display: flex;

        .case {
            padding: 16px;
            margin: 16px;
            text-align: center;
            border-right: 1px solid #999;
        }
    }

    img {
        margin: 16px;
    }
</style>
