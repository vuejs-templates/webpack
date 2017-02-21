<template>
    <div id="wrapper" v-if="isShow">
        <h1>hello,world</h1>
        {{#router}}
        <router-view></router-view>
        {{/router}}
    </div>
</template>

<script>
    import Vue from 'vue'
    import base from "assets/js/common"
    import {eventBus, MSG} from "./events/systemEvent"
    import appInterFace from "./util/appInterFace"
    export default {
        name: 'app',
        data(){
            return {
                isShow: true
            }
        },
        created(){
            if (!base.isLocal) {
                if (!appInterFace.isNetConnect()) {
                    this.isShow = false;
                    appInterFace.isWebHasError();
                }
            }
        },
        mounted(){
            eventBus.on(SYSTEM_Msg.CONNECTERROT, ()=> {
                console.log('connectError' + "报错信息");
                this.isShow = false;
                appInterFace.isWebHasError();
            });
        }
    }
</script>

<style lang="Less">
    @import "assets/css/base.less";
</style>