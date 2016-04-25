<template>
    <div>
        <div v-show="show"
             id="loading"
             transition="slide">
            <div></div>
        </div>
        <div v-show="show"
             id="loading-drop"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: [
            'show'
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

<style scoped>
    #loading {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 4;
    }

    #loading > div {
        background: linear-gradient(to right, #FF973A 40%, #ED594E 50%, #FF973A 60%);
        width: 200%;
        height: 3px;
        animation-name: loading;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }

    @keyframes loading {
        0% {
            transform: translateX(-50%);
        }
        50% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    .slide-transition {
        transition: all .3s;
    }

    .slide-enter, .slide-leave {
        opacity: 0;
        transform: translateY(-100%);
    }

    #loading-drop {
        background: transparent;
        z-index: 3;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
