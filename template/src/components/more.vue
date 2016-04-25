<template>
    <div>
        <span class="dot-1"></span>
        <span class="dot-2"></span>
        <span></span>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        vuex: {
            getters: {},
            actions: {}
        },
        data () {
            return {}
        },
        components: {},
        computed: {},
        methods: {},
        route: {},
        created () {
        },
        attached () {
        }
    }
</script>

<style scoped>
    @keyframes bounce {
        0%, 80%, to {
            transform: scale(0)
        }

        40% {
            transform: scale(1)
        }
    }

    div {
        text-align: center;
        margin: 10px 0;
    }

    span {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin: 0 3px;
        background-color: #ccc;
        border-radius: 100%;
        animation: bounce 1.6s infinite ease-in-out;
        animation-fill-mode: both;
    }

    .dot-1 {
        animation-delay: -.32s
    }

    .dot-2 {
        animation-delay: -.16s
    }
</style>
