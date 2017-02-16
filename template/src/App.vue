<template>
    <div id="wrapper" v-if="isShow">
        {{#router}}
        <router-view></router-view>
        {{/router}}
    </div>
</template>

<script>
    import Vue from 'vue'
    import base from "assets/js/common"
    import {eventBus, SYSTEM_Msg} from "./events/systemEvent"

    export default {
        name: 'app',
        data(){
            return {
                isShow: true
            }
        },
        created(){
            if (!base.isLocal) {
                try {
                    if (!HtmlInterface.isNetConnect()) {
                        this.isShow = false;
                        base.callClientError();
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        },
        mounted(){
            eventBus.on(SYSTEM_Msg.CONNECTERROT, ()=> {
                console.log('connectError' + "报错信息");
                this.isShow = false;
                base.callClientError();
            });
        }
    }
</script>

<style lang="Less">
    @import "assets/css/base.less";
</style>