<template>
    <row class="box"
         :link="link"
         :hide="hide">
        <slot></slot>
        <slot name="right"></slot>
        <slot name="unit"></slot>
    </row>
</template>

<script type="text/ecmascript-6">
    import row from '../components/row'

    export default{
        props: [
            'link',
            'hide'
        ],
        vuex: {
            getters: {},
            actions: {}
        },
        data () {
            return {}
        },
        computed: {},
        components: {
            row
        },
        methods: {},
        events: {},
        created () {
        },
        attached () {
        }
    }
</script>

<style>
    [slot="unit"] {
        padding-left: 5px;
    }
</style>

<style scoped>
    .box {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        align-items: center;
    }
</style>
