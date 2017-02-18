<template>
    <div class='hello'>
        <h3>静态资源测试</h3>
        <hr>
        <div class='caselist'>
            <div class='case'>
                <btn @click='say'>背景(background-image)是否正常</btn>
            </div>
            <div class='case'>
                <p>测试 img 标签</p>
                <img src="../../statics/imgs/u16.png">
            </div>
            <div class='case'>
                <p>测试动态加载本地图片</p>
                <btn @click='load'>加载本地图片</btn>
                <btn @click='unload'>取消</btn>
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
                计数：\{{getCount}}
            </div>
            <div class='case'>
                <button @click='incrementCounter'>加加</button>
                <button @click='decrementCounter'>减减</button>
            </div>
        </div>
	{{/vuex}}
    </div>
</template>

<script>
    {{#vuex}}
    import store from 'vuex/store';
    import {getCount, incrementCounter, decrementCounter} from 'vuex/counter.action';
    {{/vuex}}
    import Btn from 'components/button';

    export default {
        data: () => ({
            imgUrl: null
        }),
        methods: {
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
            }
	    {{/i18n}}
        },
	{{#vuex}}
        vuex: {
            actions: {incrementCounter, decrementCounter},
            getters: {getCount}
        },
        store,
	{{/vuex}}
        created () {
            console.log('created');
            console.warn('按vue的说法，第一个入口组件无法使用 activate 做阻塞性处理，需要使用其他方式解决！');
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
