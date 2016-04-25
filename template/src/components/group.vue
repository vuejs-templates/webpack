<template>
    <div class="group"
         :class="{single:single,fixed:fixed}">
        <slot name="tip_top"></slot>
        <slot></slot>
        <slot name="tip_bottom"></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: [
            'single',
            'fixed'
        ],
        vuex: {
            getters: {},
            actions: {}
        },
        data () {
            return {}
        },
        computed: {},
        components: {},
        methods: {},
        events: {},
        created () {
        },
        attached () {
        }
    }
</script>

<style>
    .single .tip:first-child {
        padding: 0 0 10px;
    }

    .single .tip:last-child {
        padding: 10px 0 0;
    }
</style>

<style scoped>
    .group {
        margin-top: 10px;
    }

    /*.group:first-child {*/
    /*margin-top: 50px;*/
    /*}*/

    .group:last-child {
        margin-bottom: 80px;
    }

    .single {
        padding: 10px;
    }

    .fixed {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        padding: 10px;
        margin-top: 0;
        margin-bottom: 0 !important;
        background-color: #fff;
    }

    .fixed::before {
        content: "";
        width: 100%;
        height: 1px;
        border-top: 1px solid #d5d5d6;
        position: absolute;
        top: 0;
        left: 0;
        transform: scaleY(.5);
        transform-origin: 0 0;
    }
</style>
