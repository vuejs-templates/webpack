<template>
    <div id="backdrop"
         v-show="backdropShow"
         transition="fade"></div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: [
            'backdropShow'
        ],
        vuex: {
            getters: {},
            actions: {}
        },
        data () {
            return {}
        },
        computed: {},
        methods: {},
        events: {},
        created () {
        },
        attached () {
        }
    }
</script>

<style scoped>
    #backdrop {
        background: rgba(0, 0, 0, .6);
        z-index: 3;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .fade-transition {
        transition: .3s ease-out;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
    }
</style>
